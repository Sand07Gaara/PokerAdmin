import { Request, Response } from "express";
import { GameType } from "../../../interfaces/tournament";

const cosmos = require("../../../utils/cosmos");

export const update = async (req: Request, res: Response) => {
  const { id } = req.body;
  const gameTypeUpdates: Partial<GameType> = req.body;

  try {
    const container = await cosmos.getContainer("game_type");

    // Check if game type exists
    const { resource: existingGameType } = await container.item(id).read();
    if (!existingGameType) {
      return res.status(404).json({
        message: "Game Type not found",
      });
    }

    const updatedGameType = {
      ...existingGameType,
      ...gameTypeUpdates,
    };

    const { resource: result } = await container.items.upsert(updatedGameType, {
      partitionKey: id,
    });

    return res.status(200).json({
      message: "Game Type updated successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error update Game type",
      data: error,
    });
  }
};
