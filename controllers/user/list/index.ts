import { Request, Response } from "express";
import { ListRes, PlayerInfo } from "../../../interfaces/user";

const cosmos = require("../../../utils/cosmos");

export const getList = async (req: Request, res: Response) => {
  const pageNum = parseInt(req.body.pageNum as string) || 1;
  const rowsPerPage = parseInt(req.body.rowsPerPage as string) || 10;

  const skip = (pageNum - 1) * rowsPerPage;

  try {
    const container = await cosmos.getContainer("nadja");

    // Query user with pagination and select necessary properties
    const { resources: users, headers } = await container.items
      .query({
        query:
          "SELECT c.id, c.username, c.status, c.created_date, c.mail_date, c.spin_date, c.VTD, c.country FROM c OFFSET @skip LIMIT @limit",
        parameters: [
          { name: "@skip", value: skip },
          { name: "@limit", value: rowsPerPage },
        ],
      })
      .fetchAll();

    return res.status(200).json({
      message: "User list retrieved successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving user list",
      data: error,
    });
  }
};
