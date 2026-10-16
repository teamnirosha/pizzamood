import { DEFAULT_BUDGET } from "@/lib/pricing";
import { NextResponse } from "next/server";
import { getLeads, saveLead } from "@/lib/db";
import { sendLeadToN8n } from "@/lib/webhook";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const leads = await getLeads();
    return NextResponse.json({
      success: true,
      leads,
      count: leads.length,
    });
  } catch (error) {
    console.error("GET Leads error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, city, investmentBudget, id } = body;

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Full Name and Mobile Number are required.",
        },
        { status: 400 }
      );
    }

    const newLead = await saveLead({
      id: id || undefined,
      name,
      phone,
      whatsapp: body.whatsapp || phone,
      email: body.email || "",
      city: city && city.trim() ? city : "Not Specified",
      preferredLocation: body.preferredLocation || city || "Flexible",
      investmentBudget: investmentBudget || DEFAULT_BUDGET,
      ownsProperty: body.ownsProperty ?? false,
      preferredStoreType: body.preferredStoreType || "Cafe",
      timeline: body.timeline || "Immediate",
      message: body.message || "",
      status: "new",
      notes: [`Submitted via website franchise enquiry form on ${new Date().toLocaleDateString()}`],
      assignedTo: "Unassigned",
      source: body.source || {},
    });

    // The modal saves after every step; notify n8n only for the finished enquiry, not each partial save.
    // Awaited: on serverless hosts an un-awaited request can be cut off once the response is sent. sendLeadToN8n never throws.
    if (body.complete === true) {
      await sendLeadToN8n(newLead);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Franchise enquiry submitted successfully. Our team will contact you shortly.",
        lead: newLead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Lead error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to process franchise enquiry." },
      { status: 500 }
    );
  }
}