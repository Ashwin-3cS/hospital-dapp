import { NextResponse } from "next/server";
import twilio from "twilio";
import  RestException  from "twilio/lib/base/RestException";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber: to, channel = "sms", locale = "en" } = body;

    if (!to || to.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Missing 'to' parameter; please provide a phone number or email.",
        },
        { status: 400 }
      );
    }

    const client = twilio(
      process.env.ACCOUNT_SID!,
      process.env.AUTH_TOKEN!
    );

    const verification = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verifications.create({
        to,
        channel,
        locale,
      });

    console.log(`Sent verification: '${verification.sid}'`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof RestException) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.status || 400 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "An unknown error occurred." },
      { status: 400 }
    );
  }
}