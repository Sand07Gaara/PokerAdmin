import { Request, Response } from "express";
import { randomBytes } from "crypto";

const { sendEmail } = require("../../../utils/email");
const bcrypt = require("bcrypt");
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

    const container = await cosmos.getContainer("admin_user");

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

    const url = baseClientUrl + "/api";

    const subject = "Forgot password.";

    const content = `<html>
        <head>
          <title></title>
        </head>
        <body>
          <div class="container" style="height:500px;width:450px;border:1px solid silver;margin:0 auto">
            <header style="height:200px;background-image: url('https://i.imgur.com/a1ItuWs.jpg');"></header>
            <section style="height: 280px;background: #ecfaff">
              <center>
                <br>
                <span style="font-size: 30px;font-family: arial;">OTP is ${otp}</span>
                <br><br>
              </center>
            </section>
            <footer style="height:100px;background: #ecfaff;text-align: center;font-family: arial;">
              <center>
                <br>
                <div style="height: 40px; width: 150px; background-color: SlateBlue;">
                  <div style="height: 10px"/>
                  <a style="font-size: 15px; font-family: arial; color: white" href = ${url}>Reset Password</a>
                </div>
              </center>
            </footer>
          </div>
        </body>
      </html>`;

    const emailRes = await sendEmail(email, subject, content);

    console.log(emailRes);

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      message: "Internal server error",
      data: error,
    });
  }
};
