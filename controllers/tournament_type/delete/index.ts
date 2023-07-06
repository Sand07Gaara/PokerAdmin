import { Request, Response } from "express";
import { DeleteTournamentRes } from "../../../interfaces/tournament";

const cosmos = require("../../../utils/cosmos");

export const remove = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const container = await cosmos.getContainer("tournament_type");

    // Check if tournament exists
    const { resource: tournament_type } = await container.item(id).read();
    if (!tournament_type) {
      return res.status(404).json({
        message: "Tournament type not found",
      });
    }

    const { resource } = await container.item(id).delete();

    return res.status(200).json({
      message: "Tournament type deleted successfully",
      data: resource,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting tournament type",
      data: error as { id: string; name: string },
    });
  }
};
