// Get Cosmos Client
import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_URL;
const key = process.env.COSMOS_KEY;

const connectionString = `AccountEndpoint=${endpoint};AccountKey=${key};`;

const client = new CosmosClient(connectionString);

async function checkConnection() {
    try {
      const response = await client.getDatabaseAccount();
      const databaseAccount = response?.resource;
      const readableLocations = response?.resource?.readableLocations;
      if (readableLocations && readableLocations.length > 0) {
        const databaseAccountEndpoint = (readableLocations[0] as any).databaseAccountEndpoint;
        console.log(`Connected to ${databaseAccountEndpoint}`);
      } else {
        console.error("Failed to get database account information");
      }
    } catch (error) {
      console.error("Failed to connect to Cosmos DB", error);
    }
  }

checkConnection();
