const mongoose = require("mongoose");

class Cosmos_Mongo {
  constructor() {}
  connectionString = process.env.COSMOS_MONGO_CONNECTIONSTRING;

  async connection() {

    console.log(this.connectionString),
    mongoose
      .connect(this.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to Cosmos MongoDB API"))
      .catch((err: any) =>
        console.log("Error connecting to Cosmos MongoDB API: ", err)
      );
  }
}

module.exports = new Cosmos_Mongo();
