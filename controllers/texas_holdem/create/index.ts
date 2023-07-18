import { Request, Response } from "express";
import Joi from "joi";

const cosmos = require("../../../utils/cosmos");

const containerID = "texas_holdem";

export const create = async (req: Request, res: Response) => {
  const holdem = req.body;

  const schema = Joi.object({
    table_name: Joi.string().required(),
    admin_user_id: Joi.string().required(),
    //
    game_type_id: Joi.string().required(), 
    buy_in: Joi.number().required(),
    small_blind: Joi.number().required(),
    big_blind: Joi.number().required(),
    auto_start: Joi.boolean().required(),
    private_table: Joi.boolean().required(),
    //
    table_visiblity: Joi.boolean().required(),
    rake_percentage: Joi.number().required(),
    number_players: Joi.number().required(),
  });

  const { error } = schema.validate(holdem);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const container = await cosmos.createContainer(containerID);

    const texasIsExist = await cosmos.findOne(
      "table_name",
      holdem.table_name,
      containerID
    );

    if (texasIsExist) {
      return res.status(400).json({
        message: `Texas Hold'em of table name ${holdem.table_name} is exist.`,
      });
    } else {
      const { resource: result } = await container.items.create(holdem);

      return res.status(200).json({
        message: "Successfully created",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create Texas Hold'em",
      data: error,
    });
  }
};
