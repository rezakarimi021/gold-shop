import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^09\d{9}$/)
    .optional()
    .or(z.literal("")),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ø§Ø·Ù„Ø§Ø¹Ø§Øª ÙˆØ§Ø±Ø¯ Ø´Ø¯Ù‡ Ù†Ø§Ù…Ø¹ØªØ¨Ø± Ø§Ø³Øª" },
      { status: 400 },
    );
  }

  const { name, email, phone, password } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Ø§ÛŒÙ† Ø§ÛŒÙ…ÛŒÙ„ Ù‚Ø¨Ù„Ø§Ù‹ Ø«Ø¨Øª Ø´Ø¯Ù‡ Ø§Ø³Øª" },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.user.create({
    data: { name, email, phone: phone || null, passwordHash },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
