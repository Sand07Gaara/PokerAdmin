import mongoose, { Connection } from "mongoose";
// import { MONGO_URI, MONGO_OPTIONS } from "../constants";

class MongoDB {
  private mongoose: typeof mongoose;
  private connection: Connection | null;
  private isConnected: boolean;

  constructor() {
    this.mongoose = mongoose;
    this.connection = null;
    this.isConnected = false;
  }

  MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/multipokerDB";
  MONGO_OPTIONS = process.env.MONGO_OPTIONS || {};

  async connect() {
    if (this.isConnected) return;

    try {
      this.connection = await this.mongoose.createConnection(
        this.MONGO_URI,
        this.MONGO_OPTIONS
      );

      this.isConnected = this.connection.readyState === 1;

      if (this.isConnected) {
        console.log("✅ MongoDB connected");
      }

      this.connection.on("connected", () =>
        console.log(`✅ MongoDB connected to ${this.MONGO_URI}`)
      );
      this.connection.on("disconnected", () =>
        console.log("❌ MongoDB disconnected")
      );
      this.connection.on("error", (error: Error) =>
        console.log("❌ MongoDB connection error", error)
      );
    } catch (error: any) {
      console.log("❌ MongoDB connection error:", error.message);
    }
  }
}

module.exports = new MongoDB();
