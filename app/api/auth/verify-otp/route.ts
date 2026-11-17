import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email ? String(body.email).trim().toLowerCase() : "";
    const otp = body?.otp ? String(body.otp).trim() : "";

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and OTP are required." },
        { status: 400 }
      );
    }

    if (otp.length !== 6) {
      return NextResponse.json(
        { success: false, message: "Verification code must be exactly 6 digits." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const record = await db.collection("password_resets").findOne({
      email,
      otp,
      used: false,
    });

    if (!record) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code. Please check and try again." },
        { status: 400 }
      );
    }

    if (new Date(record.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, message: "This verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      valid: true,
      message: "Verification code confirmed.",
    });
  } catch (err: unknown) {
    console.error("[VerifyOTP API] Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to verify code." },
      { status: 500 }
    );
  }
}
