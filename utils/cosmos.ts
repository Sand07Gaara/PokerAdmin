// Get Cosmos Client
import { CosmosClient } from "@azure/cosmos";

class CosmosDB {
  constructor() {}
  endpoint = process.env.COSMOS_URL;
  key = process.env.COSMOS_KEY;
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
}

module.exports = new CosmosDB()

