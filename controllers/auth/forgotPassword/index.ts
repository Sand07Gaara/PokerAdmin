import { Request, Response } from "express";
import { passwordToken } from "../../../middlewares/auth";

const { sendEmail } = require("../../../utils/email");
const cosmos = require("../../../utils/cosmos");
const { baseClientUrl } = require("../../../constants");

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const adminUser = await cosmos.findUserByEmail(email);

    if (!adminUser) {
      return res.status(404).json({
        message: "Invalid email",
      });
    }

    const token = passwordToken({ email });

    const resetLink = `${baseClientUrl}/reset-password?${token}`;

    const subject = "Forgot password.";

    const content = `<html>
        <head>
          <title> Password reset url is here.</title>
        </head>
        <body>
          <div>
            ${resetLink}
          </div>
          <div>
           This will be expired in 10 minutes.
        </div>
        </body>
      </html>`;

    const emailRes = await sendEmail(email, subject, content);

    if (emailRes === 200) {
      return res.status(200).json({
        message: "Password reset link sent to email",
      });
    } else {
      return res.status(500).json({
        message: "Failed to send password reset link",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
