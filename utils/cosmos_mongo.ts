const MongoClient = require("mongodb").MongoClient;

class Cosmos_Mongo {
  constructor() {}
  connectionString = process.env.COSMOS_MONGO_CONNECTIONSTRING;

  client = new MongoClient(this.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

async connection() {
  try {
    await this.client.connect();
    console.log("✅ Connected to Cosmos MongoDB API");
  } catch (error) {
    console.error("Failed to connect to Cosmos MongoDB API", error);
  }
}

}

module.exports = new Cosmos_Mongo();
