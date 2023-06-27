// Get Cosmos Client
import { CosmosClient, Item } from "@azure/cosmos";
import { AuthRegisterReq } from "../interfaces/auth/register";
import { signToken } from "../middlewares/auth/index";

const bcrypt = require("bcrypt");

class CosmosDB {
  constructor() {}
  endpoint = process.env.COSMOS_URL;
  key = process.env.COSMOS_KEY;
  databaseID = "poker_admin";
  containerID = "admin_user";
  connectionString = `AccountEndpoint=${this.endpoint};AccountKey=${this.key};`;

  client = new CosmosClient(this.connectionString);

  ////////////////////check cosmos db connection
  async checkConnection() {
    try {
      const response = await this.client.getDatabaseAccount();
      const readableLocations = response?.resource?.readableLocations;
      if (readableLocations && readableLocations.length > 0) {
        const databaseAccountEndpoint = (readableLocations[0] as any)
          .databaseAccountEndpoint;
        console.log(`Connected to ${databaseAccountEndpoint}`);
      } else {
        console.error("Failed to get database account information");
      }
    } catch (error) {
      console.error("Failed to connect to Cosmos DB", error);
    }
  }

  /////////////////create a DB
  async createDB() {
    const { database } = await this.client.databases.createIfNotExists({
      id: this.databaseID,
    });

    console.log(`Create database: ${database.id}`);

    return database;
  }

  //////////////////create a container
  async createContainer(containerID: string) {
    const { container } = await this.client
      .database(this.databaseID)
      .containers.createIfNotExists({ id: containerID });
    return container;
  }

  ///////////////////create a user
  async createUser(user: AuthRegisterReq) {
    const container = await this.createContainer(this.containerID);

    // const { container } = await this.client
    //   .database(this.databaseID)
    //   .container(this.containerID);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    // const newUser = new User({ email: username, password: hashedPassword, email: email, role: role });

    const { resource } = await container.items.create(user);
    console.log(`Created user with id: ${resource?.id}`);

    const token = signToken({ email: user.email, password: user.password });

  }
  //////////////////// find with email
  async findUserByEmail(email: string) {
    const container = await this.createContainer(this.containerID);

    const querySpec = {
      query: "SELECT * FROM c WHERE c.email = @email",
      parameters: [
        {
          name: "@email",
          value: email,
        },
      ],
    };

    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources[0];
  }

  //////////////////find one with query
  async findOne(property: string, value: any, containerID: string) {
    const query = {
      query: `SELECT * FROM c WHERE c.${property} = @value`,
      parameters: [
        {
          name: "@value",
          value: value,
        },
      ],
    };

    const container = await this.createContainer(containerID);
    const { resources } = await container.items.query(query).fetchAll();

    if (resources.length > 0) {
      return resources[0];
    } else {
      return null;
    }
  }
}

module.exports = new CosmosDB();
