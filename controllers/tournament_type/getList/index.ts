import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const getList = async (req: Request, res: Response) => {
  try {
    const container = await cosmos.getContainer("tournament_type");

    const { resources: tournament_types } = await container.items
      .query({
        query: "SELECT * FROM c",
      })
      .fetchAll();

    return res.status(200).json({
      message: "Tournament type retrieved successfully",
      data: tournament_types,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving tournament types",
      data: error,
    });
  }
};
