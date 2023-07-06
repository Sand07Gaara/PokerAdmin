import { Request, Response } from "express";
import { GameType } from "../../../interfaces/tournament";

const cosmos = require("../../../utils/cosmos");

const containerID = "game_type";

export const create = async (req: Request, res: Response) => {
  const game_type: GameType = req.body;

  if (!game_type.name) {
    return res.status(400).json({
      message: "Game type name is required",
    });
  }

  try {
    const container = await cosmos.createContainer(containerID);

    const gameTypeIsExist = await cosmos.findOne(
      "name",
      game_type.name,
      containerID
    );

    if (gameTypeIsExist) {
      return res.status(400).json({
        message: `Game type of name ${game_type.name} is exist.`,
      });
    } else {
      const { resource: createdGameType } = await container.items.create(
        game_type
      );

      return res.status(200).json({
        message: "Successfully created",
        data: createdGameType,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create Game type",
      error,
    });
  }
};
