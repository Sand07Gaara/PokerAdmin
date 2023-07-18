import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const getList = async (req: Request, res: Response) => {
  const page_num = parseInt(req.body.page_num as string) || 1;
  const rows_per_page = parseInt(req.body.rows_per_page as string) || 10;
  const search_string = req.body.search_string as string || "";

  const skip = (page_num - 1) * rows_per_page;

  try {
    const container = await cosmos.getContainer("texas_holdem");

    /////////////////???????????
    // Query texas hold'em with pagination and search
    const { resources: texas_holdem, headers } = await container.items
      .query({
        query: "SELECT * FROM c WHERE CONTAINS(c.table_name, @search_string) OFFSET @skip LIMIT @limit",
        parameters: [
          { name: "@search_string", value: search_string },
          { name: "@skip", value: skip },
          { name: "@limit", value: rows_per_page },
        ],
      })
      .fetchAll();

    // Get total count of texas_holdem
    const { resources: count } = await container.items
      .query({
        query: "SELECT VALUE COUNT(1) FROM c",
        parameters: [
          { name: "@search_string", value: search_string },
        ],
      })
      .fetchAll();

    return res.status(200).json({
      message: "Texas Hold'em retrieved successfully",
      data: texas_holdem,
      total_count: count[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving texas_holdem",
      data: error,
    });
  }
};
