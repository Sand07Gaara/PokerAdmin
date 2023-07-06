import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const getList = async (
  req: Request,
  res: Response
) => {
  const pageNum = parseInt(req.body.pageNum as string) || 1;
  const rowsPerPage = parseInt(req.body.rowsPerPage as string) || 10;

  const skip = (pageNum - 1) * rowsPerPage;

  try {
    const container = await cosmos.getContainer("hand_history");

    // Query hand_history with pagination
    const { resources: hand_history, headers } = await container.items
      .query({
        query: "SELECT * FROM c OFFSET @skip LIMIT @limit",
        parameters: [
          { name: "@skip", value: skip },
          { name: "@limit", value: rowsPerPage },
        ],
      })
      .fetchAll();

    return res.status(200).json({
      message: "Hand history retrieved successfully",
      data: hand_history,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving hand history",
      data: error,
    });
  }
};
