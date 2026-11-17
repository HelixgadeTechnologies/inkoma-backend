import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email ? String(body.email).trim().toLowerCase() : "";
    const otp = body?.otp ? String(body.otp).trim() : "";
    const newPassword = body?.newPassword ? String(body.newPassword) : "";

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Email, OTP, and new password are required." },
        { status: 400 }
      );
    }

    // Password validation: min 8 chars, 1 uppercase, 1 lowercase, 1 number
    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
        },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Verify OTP record
    const record = await db.collection("password_resets").findOne({
      email,
      otp,
      used: false,
    });

    if (!record) {
      return NextResponse.json(
        { success: false, message: "Invalid or already used verification code." },
        { status: 400 }
      );
    }

    if (new Date(record.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, message: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash the password with bcrypt (12 rounds)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user in MongoDB users collection
    const updateResult = await db.collection("users").updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );

    // Mark OTP as used
    await db.collection("password_resets").updateOne(
      { _id: record._id },
      {
        $set: {
          used: true,
          usedAt: new Date(),
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No registered account found with this email address.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your password has been successfully reset. You can now log in.",
    });
  } catch (err: unknown) {
    console.error("[ResetPassword API] Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to reset password." },
      { status: 500 }
    );
  }
}
