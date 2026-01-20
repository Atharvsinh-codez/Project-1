import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import crypto from 'crypto';
import { sendOTP } from "../../../lib/mail";

const requestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const verifySchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export async function GET() {
  try {
    const count = await prisma.waitlist.count({
      where: { verified: true }
    });
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist count" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { email } = requestSchema.parse(body);
    const normalizedEmail = email.toLowerCase().trim();

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    await prisma.waitlist.upsert({
      where: { email: normalizedEmail },
      update: {
        otp,
        otpExpiresAt,
      },
      create: {
        email: normalizedEmail,
        otp,
        otpExpiresAt,
        verified: false,
      },
    });

    const emailResult = await sendOTP(normalizedEmail, otp);

    if (!emailResult.success) {
      return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "OTP sent to your email" },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = verifySchema.parse(body);
    const normalizedEmail = email.toLowerCase().trim();

    const record = await prisma.waitlist.findUnique({
      where: { email: normalizedEmail },
    });

    if (!record || !record.otp || !record.otpExpiresAt) {
      return NextResponse.json({ error: "Invalid request or email not found" }, { status: 400 });
    }

    if (new Date() > record.otpExpiresAt) {
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    if (record.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP code" }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.waitlist.update({
        where: { email: normalizedEmail },
        data: {
          verified: true,
          otp: null,
          otpExpiresAt: null,
        },
      }),
      prisma.subscriber.create({
        data: { email: normalizedEmail }
      })
    ]);

    return NextResponse.json({ message: "Email verified successfully!" }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
       return NextResponse.json({ message: "Email already verified!" }, { status: 200 });
    }

    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}