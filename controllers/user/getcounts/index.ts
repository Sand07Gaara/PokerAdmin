import { Request, Response } from "express";

const cosmos = require("../../../utils/cosmos");

export const getCounts = async (req: Request, res: Response) => {
  try {
    const container = await cosmos.getContainer("nadja");
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const { resources: counts } = await container.items
      .query({
        query: `
          SELECT 
            SUM(IIF(c.created_date >= '${today.toISOString()}', 1, 0)) as userCountToday,
            SUM(IIF(c.created_date >= '${startOfWeek.toISOString()}' AND c.created_date < '${today.toISOString()}', 1, 0)) as userCountThisWeek,
            SUM(IIF(c.created_date >= '${startOfMonth.toISOString()}' AND c.created_date < '${today.toISOString()}', 1, 0)) as userCountThisMonth,
            SUM(IIF(c.created_date >= '${startOfYear.toISOString()}' AND c.created_date < '${today.toISOString()}', 1, 0)) as userCountThisYear
          FROM c
          WHERE c.created_date >= '${startOfYear.toISOString()}'
        `,
      })
      .fetchAll();

    // Return the counts
    return res.status(200).json({
      message: "User counts retrieved successfully",
      data: {
        userCountToday: counts[0].userCountToday,
        userCountThisWeek: counts[0].userCountThisWeek,
        userCountThisMonth: counts[0].userCountThisMonth,
        userCountThisYear: counts[0].userCountThisYear,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving users count",
      data: error,
    });
  }
};
