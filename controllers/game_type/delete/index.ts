import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const remove = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const container = await cosmos.getContainer("game_type");

    // Check if game exists
    const { resource: game_type } = await container.item(id).read();
    if (!game_type) {
      return res.status(404).json({
        message: "Game type not found",
      });
    }

    const { resource } = await container.item(id).delete();

    return res.status(200).json({
      message: "Game type deleted successfully",
      data: resource,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting game type",
      data: error as { id: string; name: string },
    });
  }
};
