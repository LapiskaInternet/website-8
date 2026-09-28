import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { ADDONS, CONTACT, PACKAGES, whatsappLink } from "@/lib/banhu-data";

export const dynamic = "force-dynamic";

const bookingSchema = z.object({
  type: z.enum(["package", "custom"]),
  packageName: z.string().max(120).optional().nullable(),
  addons: z.array(z.string().max(60)).max(12).optional().default([]),
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number")
    .max(30),
  travelDate: z.string().max(30).optional().nullable(),
  partySize: z.number().int().min(1).max(100).optional().nullable(),
  destination: z.string().max(500).optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
});

type BookingInput = z.infer<typeof bookingSchema>;

function addonNames(ids: string[]): string[] {
  return ids
    .map((id) => ADDONS.find((a) => a.id === id)?.name ?? id)
    .filter(Boolean);
}

function buildWhatsAppMessage(input: BookingInput): string {
  const lines: string[] = ["Sawubona Banhu Tourism! New booking request:"];
  lines.push("");
  lines.push(
    input.type === "package"
      ? "• Booking type: Pre-Planned Tour"
      : "• Booking type: Custom Tour"
  );

  if (input.type === "package" && input.packageName) {
    lines.push(`• Package: ${input.packageName}`);
  }
  if (input.type === "custom" && input.destination) {
    lines.push(`• Destinations / areas: ${input.destination}`);
  }

  const addons = addonNames(input.addons ?? []);
  if (addons.length > 0) {
    lines.push(`• Add-on experiences: ${addons.join(", ")}`);
  }

  lines.push(`• Name: ${input.fullName}`);
  lines.push(`• Email: ${input.email}`);
  lines.push(`• Phone: ${input.phone}`);

  if (input.travelDate) {
    lines.push(`• Preferred start date: ${input.travelDate}`);
  }
  if (input.partySize) {
    lines.push(`• Travellers: ${input.partySize}`);
  }
  if (input.notes) {
    lines.push(`• Notes: ${input.notes}`);
  }

  lines.push("");
  lines.push("Please confirm availability and send banking details (EFT).");
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    const firstError =
      parsed.error.issues[0]?.message ?? "Please check the booking details.";
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  const input = parsed.data;

  // Guard: package bookings must reference a known package
  if (
    input.type === "package" &&
    input.packageName &&
    !PACKAGES.some((p) => p.name === input.packageName) &&
    input.packageName !== "No package — add-ons only"
  ) {
    return NextResponse.json(
      { error: "Unknown package selected." },
      { status: 422 }
    );
  }

  try {
    const booking = await db.booking.create({
      data: {
        type: input.type,
        packageName: input.packageName ?? null,
        addons: JSON.stringify(input.addons ?? []),
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        travelDate: input.travelDate ?? null,
        partySize: input.partySize ?? null,
        destination: input.destination ?? null,
        notes: input.notes ?? null,
      },
    });

    const message = buildWhatsAppMessage(input);

    return NextResponse.json({
      ok: true,
      bookingId: booking.id,
      whatsappUrl: whatsappLink(message),
      supportPhone: CONTACT.phoneDisplay,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "We could not save your request right now. Please try again or WhatsApp us directly.",
      },
      { status: 500 }
    );
  }
}
