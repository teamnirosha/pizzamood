import { NextResponse } from "next/server";
import { updateLeadStatus, getLeads } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, note, assignedTo } = body;

    const updated = await updateLeadStatus(id, status, note);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Lead not found." },
        { status: 404 }
      );
    }

    if (assignedTo) {
      updated.assignedTo = assignedTo;
    }

    return NextResponse.json({
      success: true,
      message: "Lead updated successfully.",
      lead: updated,
    });
  } catch (error) {
    console.error("PUT Lead error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update lead." },
      { status: 500 }
    );
  }
}
