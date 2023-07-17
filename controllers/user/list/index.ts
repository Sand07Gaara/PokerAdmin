import { Request, Response } from "express";
const MongoClient = require("mongodb").MongoClient;

const connectionString = process.env.COSMOS_MONGO_CONNECTIONSTRING;
const databaseName = "nadja";
const collectionName = "User_Data";

export const getList = async (req: Request, res: Response) => {
  const page_num = parseInt(req.body.page_num as string) || 1;
  const rows_per_page = parseInt(req.body.rows_per_page as string) || 10;

  const skip = (page_num - 1) * rows_per_page;

  try {
    const client = await MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    // Query user with pagination and select necessary properties
    const users = await collection
      .find()
      .project({
        id: 1,
        username: 1,
        status: 1,
        created_date: 1,
        mail_date: 1,
        spin_date: 1,
        VTD: 1,
        country: 1,
      })
      .skip(skip)
      .limit(rows_per_page)
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
