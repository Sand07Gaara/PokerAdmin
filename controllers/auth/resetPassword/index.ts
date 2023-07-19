import { Request, Response } from 'express';
import crypto from 'crypto';

const bcrypt = require('bcrypt');
const cosmos = require('../../../utils/cosmos');

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password ) {
      return res.status(400).json({
        message: 'password is required',
      });
    }

    const user = await cosmos.findUserByEmail(email);

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