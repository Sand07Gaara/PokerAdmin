import { Request, Response } from "express";
const bcrypt = require("bcrypt");

const cosmos = require("../../../utils/cosmos");

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { encode, password } = req.body;

    if (!encode || !password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const decodedEmail = Buffer.from(encode, 'base64').toString('ascii');

    const user = await cosmos.findUserByEmail(decodedEmail);

    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }

    const container = await cosmos.getContainer("admin_user");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    const { id } = user;

    const { resource: updated_user } = await container
      .item(id)
      .replace(user);

    return res.status(200).json({
      message: "Successfully updated",
      data: updated_user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data: error
    });
  }
};
