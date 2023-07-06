import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const remove = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const container = await cosmos.getContainer("hand_history");

    // Check if hand history exists
    const { resource: hand_history } = await container.item(id).read();
    if (!hand_history) {
      return res.status(404).json({
        message: "Hand history not found",
      });
    }

    const { resource } = await container.item(id).delete();

    return res.status(200).json({
      message: "Hand history deleted successfully",
      data: resource,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting hand history",
      data: error,
    });
  }
};
