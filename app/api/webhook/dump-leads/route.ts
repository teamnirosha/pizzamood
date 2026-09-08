import { NextResponse } from "next/server";
import { getLeads } from "@/lib/db";
import { dumpAllLeadsToN8n } from "@/lib/webhook";

export async function POST() {
  try {
    const leads = await getLeads();
    const success = await dumpAllLeadsToN8n(leads);

    if (success) {
      return NextResponse.json({
        success: true,
        message: `Successfully dumped ${leads.length} leads to n8n webhook.`,
        count: leads.length,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Webhook responded with an error." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Dump leads webhook error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to dump leads to webhook." },
      { status: 500 }
    );
  }
}
