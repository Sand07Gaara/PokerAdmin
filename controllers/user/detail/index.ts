import { Request, Response } from "express";

const ObjectId = require("mongodb").ObjectId;
const cosmos_mongo = require("../../../utils/cosmos_mongo");

const databaseName = "nadja";
const collectionName = "User_Data";

export const detail = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {

    const db = cosmos_mongo.client.db(databaseName);
    const collection = db.collection(collectionName);

     const user = await collection.findOne({ _id: new ObjectId(id) });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        message: "Retrieve user successfully",
        data : user
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error retrieving user",
      data: error,
    });
  }
};
