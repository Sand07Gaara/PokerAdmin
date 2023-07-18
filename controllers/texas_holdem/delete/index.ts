import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const remove = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const container = await cosmos.getContainer("texas_holdem");

    // Check if game exists
    const { resource: texas_holdem } = await container.item(id).read();
    if (!texas_holdem) {
      return res.status(404).json({
        message: "Texas Hold'em not found",
      });
    }

    const { resource } = await container.item(id).delete();

    return res.status(200).json({
      message: "Texas Hold'em is deleted successfully",
      data: resource,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting",
      data: error,
    });
  }
};
