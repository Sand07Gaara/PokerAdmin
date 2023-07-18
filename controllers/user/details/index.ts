import { Request, Response } from "express";
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const connectionString = process.env.COSMOS_MONGO_CONNECTIONSTRING;
const databaseName = "nadja";
const collectionName = "User_Data";

export const details = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    const client = await MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    // Query user with pagination and select necessary properties
    const users = await collection
      .find({ _id: { $in: ids.map((id: string) => new ObjectId(id)) } })
      .project({
        _id: 0,
        username: 1,
        status: 1,
        created_date: 1,
        mail_date: 1,
        spin_date: 1,
        country: 1,
      })
      .toArray();

    return res.status(200).json({
      message: "User list retrieved successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving user list",
      data: error,
    });
  }
};
