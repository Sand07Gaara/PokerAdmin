import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const detail = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const container = await cosmos.getContainer("tournament");

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

    // Check if user exists
    if (items.length === 0) {
      return res.status(404).json({
        message: "Tournament not found",
      });
    } else {
      return res.status(200).json({
        message: "Retrieve tournament successfully",
        data: items,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving tournament",
      data: error as { id: string },
    });
  }
};
