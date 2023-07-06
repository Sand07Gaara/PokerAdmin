import { Request, Response } from "express";
import { Tournament } from "../../../interfaces/tournament";
import Joi from "joi";

const cosmos = require("../../../utils/cosmos");

const containerID = "tournament";

export const create = async (req: Request<Tournament>, res: Response) => {
  const tournament: Tournament = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    admin_user_id: Joi.string().required(),
    tournament_type_id: Joi.string().required(),
    game_type_id: Joi.string().required(),
    buy_in_amount: Joi.number().required(),
    registration_start: Joi.date().required(),
    registration_end: Joi.date().required(),
    player_limit: Joi.number().required(),
    starting_chip_count: Joi.number().required(),
    prize_structure: Joi.string().required(),
    tournament_start_time: Joi.date().required(),
    level_duration: Joi.number().required(),
    starting_blinds: Joi.string().required(),
    blind_increase_schedule: Joi.string().required(),
    late_registration: Joi.number().required(),
    is_rebuyable: Joi.boolean().required(),
    breaks: Joi.number().required(),
    blind_increase_interval: Joi.number().required(),
  });

  const { error } = schema.validate(tournament);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
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
      data: error,
    });
  }
};
