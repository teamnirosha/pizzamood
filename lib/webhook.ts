const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://automate.nirosha.org/webhook/pizzamood";

export async function sendLeadToN8n(lead: any, eventType: string = "lead_created") {
  try {
    const payload = {
      event: eventType,
      lead_id: lead.id,
      name: lead.name,
      phone: lead.phone,
      whatsapp: lead.whatsapp || lead.phone,
      email: lead.email || "",
      city: lead.city,
      preferredLocation: lead.preferredLocation || lead.city,
      investmentBudget: lead.investmentBudget || "₹4–6 Lakh",
      ownsProperty: lead.ownsProperty ?? false,
      preferredStoreType: lead.preferredStoreType || "Takeaway",
      timeline: lead.timeline || "Immediate",
      message: lead.message || "",
      status: lead.status || "new",
      createdAt: lead.createdAt || new Date().toISOString(),
      source: lead.source || {},
      raw_lead: lead
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`[n8n webhook] Failed to send lead ${lead.id}: ${response.status}`);
      return false;
    }

    console.log(`[n8n webhook] Lead ${lead.id} successfully sent to n8n.`);
    return true;
  } catch (error) {
    console.error("[n8n webhook] Error sending lead to n8n:", error);
    return false;
  }
}

export async function dumpAllLeadsToN8n(leads: any[]) {
  try {
    // Send bulk summary
    const bulkResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "lead_dump",
        dumped_at: new Date().toISOString(),
        total_leads: leads.length,
        leads: leads,
      }),
    });

    // Send individual lead events as well
    for (const lead of leads) {
      await sendLeadToN8n(lead, "lead_dump_item");
    }

    return bulkResponse.ok;
  } catch (error) {
    console.error("[n8n webhook] Error dumping all leads:", error);
    return false;
  }
}
