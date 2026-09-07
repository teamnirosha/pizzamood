import { NextResponse } from "next/server";
import { getLocations, saveLocation, deleteLocation } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const locations = await getLocations();
    const location = locations.find((l) => l.id === id);

    if (!location) {
      return NextResponse.json(
        { success: false, message: "Location not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, location });
  } catch (error) {
    console.error("GET Location ID error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch location details." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const locations = await getLocations();
    const existing = locations.find((l) => l.id === id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Location not found." },
        { status: 404 }
      );
    }

    const updated = await saveLocation({
      ...existing,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Location updated successfully.",
      location: updated,
    });
  } catch (error) {
    console.error("PUT Location ID error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update location." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteLocation(id);

    return NextResponse.json({
      success: true,
      message: "Location deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Location ID error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete location." },
      { status: 500 }
    );
  }
}
