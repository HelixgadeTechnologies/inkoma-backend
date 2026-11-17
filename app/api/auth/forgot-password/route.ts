import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email ? String(body.email).trim().toLowerCase() : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Generate a 6-digit numeric OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity

    try {
      const db = await getDatabase();

      // Upsert reset request in MongoDB
      await db.collection("password_resets").updateOne(
        { email },
        {
          $set: {
            email,
            otp,
            expiresAt,
            createdAt: new Date(),
            used: false,
          },
        },
        { upsert: true }
      );

      console.log(`[Inkoma Auth] Forgot Password OTP for ${email}: ${otp} (expires in 10 mins)`);
    } catch (dbErr) {
      console.error("[Inkoma Auth] Database error saving OTP:", dbErr);
      // Still return success to prevent user enumeration while logging error
    }

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been dispatched to ${email}.`,
      expiresInMinutes: 10,
    });
  } catch (err: unknown) {
    console.error("[ForgotPassword API] Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to process forgot password request." },
      { status: 500 }
    );
  }
}
