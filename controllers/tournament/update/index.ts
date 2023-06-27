import { Request, Response } from "express";
import { Tournament } from "../../../interfaces/tournament";

const cosmos = require("../../../utils/cosmos");

const containerID = "tournament";

export const update = async (
  req: Request<{ name: string }, {}, Partial<Tournament>>,
  res: Response
) => {
  const { name } = req.params;
  const tournamentUpdates: Partial<Tournament> = req.body;

  try {
    const container = await cosmos.getContainer(containerID);
    const { resource: existingTournament } = await container
      .item(name, name)
      .fetch();

    if (!existingTournament) {
      return res.status(404).json({
        message: "Tournament not found.",
        data: {},
      });
    }

    const updatedTournament = { ...existingTournament, ...tournamentUpdates };

    const { resource: result } = await container.items.upsert(
      updatedTournament,
      { partitionKey: name }
    );

    return res.status(200).json({
      message: "Tournament updated successfully.",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error updating tournament.",
      data: {},
    });
  }
};
