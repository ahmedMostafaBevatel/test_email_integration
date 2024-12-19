const nodemailer = require("nodemailer");
const { config } = require("dotenv");
config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL_1,
    pass: process.env.USER_PASSWORD_1,
  },
});

async function sendEmail({ to, subject, text, html = null }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL_1,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    await sendEmail({
      to: "ahmed.mostafa@bevatel.com",
      subject: "test-smtp",
      text: "hello, this is a test",
    });
  } catch (err) {
    console.error(err.message);
  }
})();
