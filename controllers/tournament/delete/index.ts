import { Request, Response } from "express";
import { DeleteTournamentRes } from "../../../interfaces/tournament";

const cosmos = require("../../../utils/cosmos");

export const remove = async (
  req: Request,
  res: Response<DeleteTournamentRes>
) => {
  const { id } = req.body;

  try {
    const container = await cosmos.getContainer("tournament");

    // Check if tournament exists
    const { resource: tournament } = await container.item(id).read();
    if (!tournament) {
      return res.status(404).json({
        message: "Tournament not found",
        data : {}
      });
    }

    const { resource } = await container.item(id).delete();

    res.status(200).json({
      message: "Tournament deleted successfully",
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting tournament",
      data: error as { id: string; name: string },
    });
  }
};
