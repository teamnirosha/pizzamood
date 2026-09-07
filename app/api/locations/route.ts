import { NextResponse } from "next/server";
import { getLocations, saveLocation } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const search = searchParams.get("search");

    let locations = await getLocations();

    if (city) {
      locations = locations.filter(
        (loc) => loc.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      locations = locations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(q) ||
          loc.city.toLowerCase().includes(q) ||
          loc.area.toLowerCase().includes(q) ||
          loc.address.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      locations,
      count: locations.length,
    });
  } catch (error) {
    console.error("GET Locations error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch locations." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.city || !body.area) {
      return NextResponse.json(
        { success: false, message: "Store Name, City, and Area are required." },
        { status: 400 }
      );
    }

    const citySlug = body.city.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const areaSlug = body.area.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const generatedSlug = `${citySlug}/${areaSlug}`;

    const newLocation = await saveLocation({
      id: body.id || `pm-${citySlug}-${areaSlug}`,
      name: body.name,
      slug: body.slug || generatedSlug,
      city: body.city,
      area: body.area,
      state: body.state || "Maharashtra",
      country: body.country || "India",
      postalCode: body.postalCode || "",
      address: body.address || "",
      phone: body.phone || "",
      whatsapp: body.whatsapp || body.phone || "",
      email: body.email || "",
      latitude: Number(body.latitude) || 18.5204,
      longitude: Number(body.longitude) || 73.8567,
      googleMapsUrl: body.googleMapsUrl || `https://maps.google.com/?q=${body.latitude || 18.5204},${body.longitude || 73.8567}`,
      osmUrl: body.osmUrl || `https://www.openstreetmap.org/?mlat=${body.latitude || 18.5204}&mlon=${body.longitude || 73.8567}`,
      shortDescription: body.shortDescription || `Best pizza store in ${body.area}, ${body.city}.`,
      description: body.description || `Pizza Mood ${body.area} offers delicious pizzas, sides, and fast delivery in ${body.city}.`,
      status: body.status || "active",
      hours: body.hours || [
        { day: "Monday", isClosed: false, openingTime: "11:00 AM", closingTime: "11:00 PM" },
        { day: "Tuesday", isClosed: false, openingTime: "11:00 AM", closingTime: "11:00 PM" },
        { day: "Wednesday", isClosed: false, openingTime: "11:00 AM", closingTime: "11:00 PM" },
        { day: "Thursday", isClosed: false, openingTime: "11:00 AM", closingTime: "11:00 PM" },
        { day: "Friday", isClosed: false, openingTime: "11:00 AM", closingTime: "11:30 PM" },
        { day: "Saturday", isClosed: false, openingTime: "11:00 AM", closingTime: "11:30 PM" },
        { day: "Sunday", isClosed: false, openingTime: "11:00 AM", closingTime: "11:30 PM" },
      ],
      images: body.images || [{ url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80", alt: body.name }],
      popularProducts: body.popularProducts || [],
      amenities: body.amenities || ["Takeaway", "Home Delivery", "Contactless Payment"],
      nearbyLandmarks: body.nearbyLandmarks || [],
      seo: body.seo || {
        title: `Best Pizza Store in ${body.area}, ${body.city} | Pizza Mood`,
        description: `Visit Pizza Mood ${body.area}, ${body.city} for fresh pizza, fast food, store hours, contact & directions.`,
        focusKeyword: `best pizza store in ${body.area}`,
      },
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Location created successfully.",
        location: newLocation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Location error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to create location." },
      { status: 500 }
    );
  }
}
