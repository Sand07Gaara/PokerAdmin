import { Request, Response } from "express";
import { TournamentType } from "../../../interfaces/tournament";

const cosmos = require("../../../utils/cosmos");

const containerID = "tournament_type";

export const create = async (req: Request, res: Response) => {
  const tournament_type: TournamentType = req.body;

  if (!tournament_type.name) {
    return res.status(400).json({
      message: "Tournament type name is required",
    });
  }

  try {
    const container = await cosmos.createContainer(containerID);

    const tournamentTypeIsExist = await cosmos.findOne(
      "name",
      tournament_type.name,
      containerID
    );

    if (tournamentTypeIsExist) {
      return res.status(400).json({
        message: `Tournament type of name ${tournament_type.name} is exist.`,
      });
    } else {
      const { resource: createdTournamentType } = await container.items.create(
        tournament_type
      );

      return res.status(200).json({
        message: "Successfully created",
        data: createdTournamentType,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create tournament type",
      error,
    });
  }
};
