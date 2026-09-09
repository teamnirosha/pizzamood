import { NextResponse } from "next/server";
import { getLeads, saveLead } from "@/lib/db";
import { sendLeadToN8n } from "@/lib/webhook";

export async function GET() {
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
      investmentBudget: investmentBudget || "₹4–6 Lakh",
      ownsProperty: body.ownsProperty ?? false,
      preferredStoreType: body.preferredStoreType || "Takeaway",
      timeline: body.timeline || "Immediate",
      message: body.message || "",
      status: "new",
      notes: [`Submitted via website franchise enquiry form on ${new Date().toLocaleDateString()}`],
      assignedTo: "Unassigned",
      source: body.source || {},
    });

    // Trigger n8n Webhook forward asynchronously
    sendLeadToN8n(newLead).catch((err) =>
      console.error("n8n webhook background error:", err)
    );

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