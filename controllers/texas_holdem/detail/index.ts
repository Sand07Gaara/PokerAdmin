import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const detail = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const container = await cosmos.getContainer("texas_holdem");

    const querySpec = {
      query: "SELECT * FROM c WHERE c.id = @id",
      parameters: [
        {
          name: "@id",
          value: id,
        },
      ],
    };

    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    // Check if game exists
    if (items.length === 0) {
      return res.status(404).json({
        message: "Texas Hold'em not found",
      });
    } else {
      return res.status(200).json({
        message: "Retrieve successfully",
        data: items,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving",
      data: error,
    });
  }
};
