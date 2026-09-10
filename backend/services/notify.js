import { Resend } from "resend";
import twilio from "twilio";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient =
  twilioAccountSid && twilioAuthToken
    ? twilio(twilioAccountSid, twilioAuthToken)
    : null;

export async function sendEmailOTP(email, otp) {
  if (!email) {
    return {
      skipped: true,
      message: "No email address available for OTP delivery",
    };
  }

  if (!resend || !process.env.FROM_EMAIL) {
    console.warn(
      "Email OTP delivery skipped: RESEND_API_KEY or FROM_EMAIL is not configured.",
    );
    return {
      skipped: true,
      message:
        "Email OTP delivery skipped because the Resend credentials are not configured.",
    };
  }

  const result = await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "Ikeja Electric Monitoring Dashboard — Your PIN Reset OTP",
    html: `
      <div style="font-family:sans-serif;max-width:400px;margin:auto">
        <h2 style="color:#167A3E">Ikeja Electric Security</h2>
        <p>Your one-time PIN reset code is:</p>
        <div style="font-size:36px;font-weight:bold;
                    letter-spacing:8px;color:#167A3E;
                    text-align:center;padding:20px">
          ${otp}
        </div>
        <p style="color:#666">This code expires in 10 minutes.</p>
        <p style="color:#666">If you did not request this, ignore this email.</p>
      </div>
    `,
  });
  return result;
}

export async function sendSMSOTP(phoneNumber, otp) {
  if (!phoneNumber) {
    return {
      skipped: true,
      message: "No phone number available for OTP delivery",
    };
  }

  if (!twilioClient) {
    console.warn(
      "SMS OTP delivery skipped: TWILIO credentials are not configured.",
    );
    return {
      skipped: true,
      message:
        "SMS OTP delivery skipped because the Twilio credentials are not configured.",
    };
  }

  const message = await twilioClient.messages.create({
    body: `Your Ikeja Electric Dashboard verification OTP is ${otp}`,
    from: process.env.TWILIO_FROM_NUMBER,
    to: phoneNumber,
  });

  return message;
}
