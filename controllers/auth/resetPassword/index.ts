import { Request, Response } from "express";
import crypto from "crypto";

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

    const iv = crypto.randomBytes(16);

    const secretKey = process.env.MANUAL_SECRET_KEY || "secret";

    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);

    let decodedEmail = decipher.update(encode, "base64", "utf8");

    decodedEmail += decipher.final("utf8");

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

    const { resource: updated_user } = await container.item(id).replace(user);

    return res.status(200).json({
      message: "Successfully updated",
      data: updated_user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data: error,
    });
  }
};
