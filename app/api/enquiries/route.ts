import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Enquiry = {
    id: string;
    name: string;
    phone: string;
    city: string;
    shopType: string;
    message: string;
    status: "new" | "contacted" | "qualified" | "closed";
    createdAt: string;
};

const filePath = path.join(
    process.cwd(),
    "data",
    "enquiries.json"
);

export async function GET() {
    try {
        const file = await fs.readFile(filePath, "utf-8");
        const enquiries: Enquiry[] = JSON.parse(file);

        return NextResponse.json({
            success: true,
            enquiries,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to load enquiries.",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            name,
            phone,
            city,
            shopType,
            message,
        } = body;

        if (!name || !phone || !city || !shopType) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill all required fields.",
                },
                { status: 400 }
            );
        }

        let enquiries: Enquiry[] = [];

        try {
            const file = await fs.readFile(
                filePath,
                "utf-8"
            );

            enquiries = JSON.parse(file);
        } catch {
            enquiries = [];
        }

        const newEnquiry: Enquiry = {
            id: `PL-${Date.now()}`,
            name,
            phone,
            city,
            shopType,
            message: message || "",
            status: "new",
            createdAt: new Date().toISOString(),
        };

        enquiries.unshift(newEnquiry);

        await fs.mkdir(
            path.dirname(filePath),
            { recursive: true }
        );

        await fs.writeFile(
            filePath,
            JSON.stringify(enquiries, null, 2),
            "utf-8"
        );

        return NextResponse.json(
            {
                success: true,
                message: "Enquiry submitted successfully.",
                enquiry: newEnquiry,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Enquiry error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            { status: 500 }
        );
    }
}