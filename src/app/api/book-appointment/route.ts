import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const bookingSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(25),
  company: z.string().trim().min(2).max(120),
  selectedDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  selectedTime: z.string().trim().regex(/^\d{2}:\d{2}$/),
  message: z.string().trim().min(10).max(2000),
  source: z.string().trim().max(80).optional(),
});

type BookingRecord = z.infer<typeof bookingSchema> & {
  referenceId: string;
  createdAt: string;
};

async function persistBooking(record: BookingRecord): Promise<void> {
  const filePath = path.join(process.cwd(), "info", "booking-submissions.ndjson");
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
}

async function forwardToWebhook(record: BookingRecord): Promise<boolean> {
  const webhookUrl = process.env.BOOKING_WEBHOOK_URL || process.env.CRM_BOOKING_WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      console.error("Booking webhook failed with status", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Booking webhook request failed", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid booking request.";
      return NextResponse.json(
        {
          success: false,
          message: firstError,
        },
        { status: 400 }
      );
    }

    const record: BookingRecord = {
      ...parsed.data,
      referenceId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    await persistBooking(record);
    await forwardToWebhook(record);

    return NextResponse.json({
      success: true,
      referenceId: record.referenceId,
      message: "Booking request submitted successfully.",
    });
  } catch (error) {
    console.error("Book appointment API error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while processing your booking request.",
      },
      { status: 500 }
    );
  }
}

