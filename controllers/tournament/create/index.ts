import { Request, Response } from "express";
import {
  CreateTournamentRes,
  Tournament,
} from "../../../interfaces/tournament";
import Joi from "joi";

const cosmos = require("../../../utils/cosmos");

const containerID = "tournament";

export const create = async (
  req: Request<Tournament>,
  res: Response<CreateTournamentRes>
) => {
  const tournament: Tournament = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    admin_user : Joi.string().required(),
    type: Joi.string().required(),
    gameType: Joi.string().required(),
    buyInAmount: Joi.number().required(),
    registrationStart: Joi.date().required(),
    registrationEnd: Joi.date().required(),
    playerLimit: Joi.number().required(),
    startingChipCount: Joi.number().required(),
    prizeStructure: Joi.string().required(),
    tournamentStartTime: Joi.date().required(),
    levelDuration: Joi.number().required(),
    startingBlinds: Joi.string().required(),
    blindIncreaseSchedule: Joi.string().required(),
    lateRegistration: Joi.number().required(),
    isRebuyable: Joi.boolean().required(),
    breaks: Joi.number().required(),
    blindIncreaseInterval: Joi.number().required(),
  });

  const { error } = schema.validate(tournament);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      data: {},
    });
  }

  try {
    const container = await cosmos.createContainer(containerID);

    const tournamentIsExist = await cosmos.findOne(
      "name",
      tournament.name,
      containerID
    );

    if (tournamentIsExist) {
      return res.status(400).json({
        message: `Tournament of name ${tournament.name} is exist.`,
        data: {},
      });
    } else {
      const { resource: result } = await container.items.create(tournament);

      return res.status(200).json({
        message: "Successfully created",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create tournament",
      data: {},
    });
  }
};
