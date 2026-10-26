import { NextResponse } from "next/server";
import { verifyEmailConfiguration } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await verifyEmailConfiguration();
  
  return NextResponse.json({
    status: result.connected ? "ok" : "warning",
    smtpConfigured: result.configured,
    smtpConnected: result.connected,
    details: result.message,
    timestamp: new Date().toISOString(),
  });
}
