import { Request, Response } from "express";
import { Tournament } from "../../../interfaces/tournament";

const cosmos = require("../../../utils/cosmos");

export const update = async (req: Request, res: Response) => {
  const { id } = req.body;
  const tournamentUpdates: Partial<Tournament> = req.body;

  try {
    const container = await cosmos.getContainer("tournament");

    // Check if tournament exists
    const { resource: existingTournament } = await container.item(id).read();
    if (!existingTournament) {
      return res.status(404).json({
        message: "Tournament not found",
        data: {},
      });
    }

    const updatedTournament = { ...existingTournament, ...tournamentUpdates };

    const { resource: result } = await container.items.upsert(
      updatedTournament,
      { partitionKey: id }
    );

    return res.status(200).json({
      message: "Tournament updated successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error update tournament",
      data: error as { id: string; name: string },
    });
  }
};
