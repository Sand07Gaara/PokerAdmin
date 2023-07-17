import { Request, Response } from "express";
const MongoClient = require("mongodb").MongoClient;

const connectionString = process.env.COSMOS_MONGO_CONNECTIONSTRING;
const databaseName = "nadja";
const collectionName = "User_Data";

export const getCounts = async (req: Request, res: Response) => {
  try {
    const client = await MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const result = await collection.aggregate([
      {
        $facet: {
          today: [
            {
              $match: {
                created_date: {
                  $gte: new Date(startOfDay.setHours(0, 0, 0, 0)),
                  $lt: new Date(startOfDay.setHours(23, 59, 59, 999)),
                },
              },
            },
            {
              $count: "count",
            },
          ],
          thisWeek: [
            {
              $match: {
                created_date: {
                  $gte: new Date(startOfWeek.setHours(0, 0, 0, 0)),
                  $lt: new Date(startOfWeek.setHours(23, 59, 59, 999)),
                },
              },
            },
            {
              $count: "count",
            },
          ],
          thisMonth: [
            {
              $match: {
                created_date: {
                  $gte: new Date(startOfMonth.setHours(0, 0, 0, 0)),
                  $lt: new Date(new Date(today.getFullYear(), today.getMonth() + 1, 0).setHours(23, 59, 59, 999)),
                },
              },
            },
            {
              $count: "count",
            },
          ],
          thisYear: [
            {
              $match: {
                created_date: {
                  $gte: new Date(startOfYear.setHours(0, 0, 0, 0)),
                  $lt: new Date(new Date(today.getFullYear() + 1, 0, 0).setHours(23, 59, 59, 999)),
                },
              },
            },
            {
              $count: "count",
            },
          ],
        },
      },
    ]).toArray();

    res.status(200).json({
      today: result[0].today[0]?.count || 0,
      thisWeek: result[0].thisWeek[0]?.count || 0,
      thisMonth: result[0].thisMonth[0]?.count || 0,
      thisYear: result[0].thisYear[0]?.count || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
