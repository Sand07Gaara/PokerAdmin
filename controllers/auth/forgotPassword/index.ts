import { Request, Response } from "express";
import { EmailClient } from "@azure/communication-email";

import { randomBytes } from "crypto";

const bcrypt = require("bcrypt");

const cosmos = require("../../../utils/cosmos");

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

    const container = await cosmos.getContainer("tournament");

    const connection_string =
      process.env.AZURE_COMMUNICATIONS_CONNECTION_STRING;

    // Generate a random 6-digit OTP code
    const otp = randomBytes(3).toString("hex").toUpperCase();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(otp, salt);

    adminUser.password = hashedPassword;
    // TODO: Store the OTP code in a database or cache

    const { id } = adminUser;

    const { resource: updated_user } = await container
      .item(id)
      .replace(adminUser);

    const client = new EmailClient(connection_string ? connection_string : "");
    const subject = "Forgot Password";
    const body = `<p>New OTP is ${otp}.</p>`;

    type EmailAddress = {
      address: string;
    };

    type EmailRecipients = EmailAddress[];

    const options : any = {
      content: {
        subject,
        body: {
          contentType: "html",
          content: body,
        },
        plainText: "",
      },
      senderAddress: "nadja@poker.com",
      recipients: [
        {
          address: email,
        },
      ] as EmailRecipients, // Cast the array to the correct type
    };

    const response = await client.beginSend(options);

    console.log(response);

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
