import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, text } = await req.json();
  console.log({name, email, text})

  if (!email || !text) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
   const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: "New Contact Form Message",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${text}</p>
      `,
    });

    console.log(info)

    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  } catch (err) {
    console.log(err)
    console.error("Email send error:", err);
    return NextResponse.json({ message: "Failed to send" }, { status: 500 });
  }
}
