import { NextResponse } from "next/server";
import twilio from "twilio";
import  RestException  from "twilio/lib/base/RestException";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, code } = body;

    if (!to || !code) {
      return NextResponse.json(
        { success: false, message: "Missing parameter." },
        { status: 400 }
      );
    }

    const client = twilio(
      process.env.ACCOUNT_SID!,
      process.env.AUTH_TOKEN!
    );

    const check = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verificationChecks.create({ to, code });

    if (check.status === "approved") {
      return NextResponse.json({
        success: true,
        message: "Verification success.",
      });
    }

    return NextResponse.json(
      { success: false, message: "Incorrect token." },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof RestException) {
      console.error(error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status || 400 }
      );
    } else if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
    console.error("Unknown error");
    return NextResponse.json(
      { success: false, message: "An unknown error occurred." },
      { status: 400 }
    );
  }
}