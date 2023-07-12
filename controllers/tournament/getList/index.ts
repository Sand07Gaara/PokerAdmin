import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const getList = async (req: Request, res: Response) => {
  const page_num = parseInt(req.body.page_num as string) || 1;
  const rows_per_page = parseInt(req.body.rows_per_page as string) || 10;

  const skip = (page_num - 1) * rows_per_page;

  console.log(page_num, rows_per_page)
  try {
    const container = await cosmos.getContainer("tournament");

    // Query tournaments with pagination
    const { resources: tournaments, headers } = await container.items
      .query({
        query: "SELECT * FROM c OFFSET @skip LIMIT @limit",
        parameters: [
          { name: "@skip", value: skip },
          { name: "@limit", value: rows_per_page },
        ],
      })
      .fetchAll();

    return res.status(200).json({
      message: "Tournaments retrieved successfully",
      data: tournaments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving tournaments",
      data: error,
    });
  }
};
