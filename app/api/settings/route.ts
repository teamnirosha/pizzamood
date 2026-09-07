import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/db";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("GET Settings error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch site settings." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await updateSiteSettings(body);
    return NextResponse.json({
      success: true,
      message: "Site settings updated successfully.",
      settings: updated,
    });
  } catch (error) {
    console.error("PUT Settings error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to update site settings." },
      { status: 500 }
    );
  }
}
