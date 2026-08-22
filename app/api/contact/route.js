import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const LINKEDIN_URL = "https://www.linkedin.com/in/ibrar-yousafzai";
const WHATSAPP_URL =
  "https://wa.me/923448935702?text=Hello%20Ibrar,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.";

const SUBJECT_OPTIONS = new Set([
  "Project Collaboration",
  "Job Opportunity / Hiring",
  "Freelance Work",
  "Speaking / Event Invitation",
  "General Question",
  "Other",
]);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function wrapEmailHtml(title, bodyHtml) {
  return `
    <div style="margin:0;padding:0;background:#f7faf9;color:#0f172a;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:24px;">
        <div style="border-radius:12px;border:1px solid #d6e5e2;overflow:hidden;background:#ffffff;">
          <div style="background:#14b8a6;color:#ffffff;padding:14px 20px;font-size:18px;font-weight:700;">
            ${escapeHtml(title)}
          </div>
          <div style="padding:24px;line-height:1.6;font-size:15px;white-space:normal;">
            ${bodyHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

function socialLinksHtml() {
  const linkedInIcon = "https://img.icons8.com/color/48/linkedin.png";
  const whatsappIcon = "https://img.icons8.com/color/48/whatsapp--v1.png";

  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;border-top:1px solid #d6e5e2;padding-top:16px;">
      <tr>
        <td style="padding-right:12px;">
          <a href="${LINKEDIN_URL}" style="display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid #d6e5e2;border-radius:999px;color:#0f172a;text-decoration:none;font-size:14px;line-height:1.2;white-space:nowrap;">
            <img src="${linkedInIcon}" width="24" height="24" alt="LinkedIn" style="display:block;border:0;outline:none;text-decoration:none;border-radius:6px;" />
            <span>LinkedIn</span>
          </a>
        </td>
        <td>
          <a href="${WHATSAPP_URL}" style="display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid #d6e5e2;border-radius:999px;color:#0f172a;text-decoration:none;font-size:14px;line-height:1.2;white-space:nowrap;">
            <img src="${whatsappIcon}" width="24" height="24" alt="WhatsApp" style="display:block;border:0;outline:none;text-decoration:none;border-radius:6px;" />
            <span>WhatsApp</span>
          </a>
        </td>
      </tr>
    </table>
  `;
}

function buildNotificationEmail({ name, email, subject, message }) {
  return wrapEmailHtml(
    "New Contact Message",
    `
      <p style="margin:0 0 16px;">New message from your portfolio contact form</p>
      <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 16px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p style="margin:0 0 8px;"><strong>Message:</strong></p>
      <div style="margin:0 0 16px;padding:16px;border-left:4px solid #14b8a6;background:#f8fafc;white-space:pre-wrap;">${escapeHtml(message)}</div>
      <p style="margin:0;">Sent from ibraryousafzai.dev contact form</p>
    `
  );
}

function buildAutoReplyEmail({ name, subject, message }) {
  return wrapEmailHtml(
    "Thanks for reaching out",
    `
      <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;">
        Thanks for reaching out through my portfolio! I've received your message about
        "${escapeHtml(subject)}" and I'll get back to you as soon as possible, usually within 1-2 business days.
      </p>
      <p style="margin:0 0 12px;">Here's a copy of what you sent, for your records:</p>
      <div style="margin:0 0 16px;padding:16px;border-left:4px solid #14b8a6;background:#f8fafc;white-space:pre-wrap;">"${escapeHtml(message)}"</div>
      <p style="margin:0 0 12px;">In the meantime, feel free to check out my work or connect with me here:</p>
      ${socialLinksHtml()}
      <p style="margin:0;">
        Best regards,<br />
        Ibrar Yousafzai<br />
        AI Engineer | Data Scientist<br />
        Founder, Khyber Future Hub
      </p>
    `
  );
}

function resolveSubject(subjectOption, customSubject) {
  if (!SUBJECT_OPTIONS.has(subjectOption)) {
    return "";
  }

  if (subjectOption === "Other") {
    return customSubject.trim();
  }

  return subjectOption.trim();
}

function validateEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value);
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();
  const subjectOption = String(payload?.subjectOption || "").trim();
  const customSubject = String(payload?.customSubject || "").trim();
  const message = String(payload?.message || "").trim();
  const subject = resolveSubject(subjectOption, customSubject);

  if (!name || !email || !subjectOption || !message) {
    return NextResponse.json(
      { error: "Name, email, subject, and message are required." },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!SUBJECT_OPTIONS.has(subjectOption)) {
    return NextResponse.json({ error: "Please choose a valid subject option." }, { status: 400 });
  }

  if (!subject) {
    return NextResponse.json(
      { error: "Please enter a custom subject when choosing Other." },
      { status: 400 }
    );
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const contactReceiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!gmailUser || !gmailAppPassword || !contactReceiverEmail) {
    return NextResponse.json(
      { error: "Server email configuration is incomplete." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const notificationMail = {
    from: `Portfolio Contact <${gmailUser}>`,
    to: contactReceiverEmail,
    replyTo: email,
    subject: `New Contact Form Message: ${subject}`,
    html: buildNotificationEmail({ name, email, subject, message }),
  };

  const autoReplyMail = {
    from: `Ibrar Yousafzai <${gmailUser}>`,
    to: email,
    replyTo: contactReceiverEmail,
    subject: `Thanks for reaching out, ${name}!`,
    html: buildAutoReplyEmail({ name, subject, message }),
  };

  const [notificationResult, autoReplyResult] = await Promise.allSettled([
    transporter.sendMail(notificationMail),
    transporter.sendMail(autoReplyMail),
  ]);

  const notificationOk = notificationResult.status === "fulfilled";
  const autoReplyOk = autoReplyResult.status === "fulfilled";

  if (notificationOk && autoReplyOk) {
    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 200 }
    );
  }

  if (notificationOk || autoReplyOk) {
    return NextResponse.json(
      {
        message: "Your message was sent, but one confirmation email failed to send.",
      },
      { status: 207 }
    );
  }

  return NextResponse.json(
    { error: "Unable to send the message right now. Please try again later." },
    { status: 500 }
  );
}