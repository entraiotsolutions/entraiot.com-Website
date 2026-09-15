import nodemailer from "nodemailer";

// Debug SMTP env so missing credentials can be diagnosed quickly in dev
console.log("SMTP USER:", process.env.SMTP_USER);

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLeadEmail(lead) {
  try {
    const emailPayload = lead?.appointment
      ? { appointment: lead.appointment, ...lead }
      : lead;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "bde.entraiot@gmail.com",
      subject: "🚀 New Lead from Chatbot",
      text: JSON.stringify(emailPayload, null, 2),
    });

    if (lead?.email) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: lead.email,
        subject: "Thanks for contacting Entraiot",
        text: "We received your request. Our team will contact you shortly.",
      });
    }
  } catch (err) {
    console.error("sendLeadEmail error:", err);
    throw err;
  }
}

const mailer = { transporter, sendLeadEmail };
export default mailer;
