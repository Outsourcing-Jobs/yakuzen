import { sendBrevoEmail } from "../config/brevo-mail.config.js";
import { CONTACT_FORM_SUBMISSION_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplates.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailtemplates.js";
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailtemplates.js";

export const SendVerificationEmail = async (email, verificationcode) => {
  return sendBrevoEmail({
    to: email,
    subject: "Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationcode
    ),
    category: "Email verification",
  });
};

export const SendWelcomeEmail = async (email, firstname, lastname, role) => {
  const name =
    role === "HR-Admin"
      ? `${firstname} ${lastname} - HR`
      : `${firstname} ${lastname}`;

  const html = `
    <h2>Welcome 🎉</h2>
    <p>Xin chào <b>${name}</b>,</p>
    <p>Chào mừng bạn đến với hệ thống <b>EMS</b>.</p>
  `;

  return sendBrevoEmail({
    to: email,
    subject: "Welcome to EMS",
    html,
    category: "Welcome email",
  });
};

export const SendForgotPasswordEmail = async (email, resetURL) => {
  return sendBrevoEmail({
    to: email,
    subject: "Reset Your Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    category: "Password Reset",
  });
};

export const SendResetPasswordConfimation = async (email) => {
  return sendBrevoEmail({
    to: email,
    subject: "Password Reset Successfully",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    category: "Password Reset Confirmation",
  });
};

export const SendContactFormMail = async (customerData) => {
  const { email, firstname, lastname, phoneNumber, subject, message } = customerData;

  let htmlContent = CONTACT_FORM_SUBMISSION_TEMPLATE
    .replace(/{firstname}/g, firstname)
    .replace(/{lastname}/g, lastname)
    .replace(/{email}/g, email)
    .replace(/{phoneNumber}/g, phoneNumber)
    .replace(/{subject}/g, subject)
    .replace(/{message}/g, message);

  return sendBrevoEmail({
    to: process.env.ADMIN_EMAIL, 
    subject: `[EMS] Yêu cầu liên hệ mới: ${subject}`,
    html: htmlContent,
    category: "Contact Form Admin Notification",
  });
};