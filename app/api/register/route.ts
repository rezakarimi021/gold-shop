import { NextRequest, NextResponse } from "next/server";
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
    return NextResponse.json({ error: "اطلاعات وارد شده نامعتبر است" }, { status: 400 });
  }

  const { name, email, phone, password } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "این ایمیل قبلاً ثبت شده است" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.user.create({
    data: { name, email, phone: phone || null, passwordHash },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
