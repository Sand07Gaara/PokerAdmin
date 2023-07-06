import { Request, Response } from "express";
import { TournamentType } from "../../../interfaces/tournament";

const cosmos = require("../../../utils/cosmos");

export const update = async (req: Request, res: Response) => {
  const { id } = req.body;
  const tournamentTypeUpdates: Partial<TournamentType> = req.body;

  try {
    const container = await cosmos.getContainer("tournament_type");

    // Check if tournament_type exists
    const { resource: existingTournamentType } = await container.item(id).read();
    
    if (!existingTournamentType) {
      return res.status(404).json({
        message: "Tournament Type not found",
      });
    }

    const updatedTournamentType = { ...existingTournamentType, ...tournamentTypeUpdates };

    const { resource: result } = await container.items.upsert(
      updatedTournamentType,
      { partitionKey: id }
    );

    return res.status(200).json({
      message: "Tournament Type updated successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error update tournament type",
      data: error,
    });
  }
};
