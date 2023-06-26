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

  async createDB() {
    const { database } = await this.client.databases.createIfNotExists({
      id: this.databaseID,
    });

    console.log(`Create database: ${database.id}`);

    return database;
  }

  async createContainer() {
    const { container } = await this.client
      .database(this.databaseID)
      .containers.createIfNotExists({ id: this.containerID });
    console.log(`Created container: ${container.id}`);
    return container;
  }

  async createUser(user: AuthRegisterReq) {

    console.log('----')
    const container = await this.createContainer();

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

    console.log(token, "--------- token");
  }
}

module.exports = new CosmosDB();
