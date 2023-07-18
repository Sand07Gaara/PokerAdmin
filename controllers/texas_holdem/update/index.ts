import { Request, Response } from "express";
import { TexasHoldem } from "../../../interfaces/texas_holdem";

const cosmos = require("../../../utils/cosmos");

export const update = async (req: Request, res: Response) => {
  const { id } = req.body;
  const texasholdemUpdates: Partial<TexasHoldem> = req.body;

  try {
    const container = await cosmos.getContainer("texas_holdem");

    // Check if texas exists
    const { resource: existingTexasHoldem } = await container.item(id).read();
    if (!existingTexasHoldem) {
      return res.status(404).json({
        message: "Texas Hold'em not found",
      });
    }

    const updatedTournament = { ...existingTexasHoldem, ...texasholdemUpdates };

    const { resource: result } = await container.items.upsert(
      updatedTournament,
      { partitionKey: id }
    );

    return res.status(200).json({
      message: "Texas Hold'em updated successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error update Texas Hold'em",
      data: error 
    });
  }
};
