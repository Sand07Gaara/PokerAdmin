import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const getList = async (req: Request, res: Response) => {
  try {
    const container = await cosmos.getContainer("game_type");

    const { resources: game_types } = await container.items
      .query({
        query: "SELECT * FROM c OFFSET",
      })
      .fetchAll();

    return res.status(200).json({
      message: "Game types retrieved successfully",
      data: game_types,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving game types",
      data: [],
    });
  }
};
