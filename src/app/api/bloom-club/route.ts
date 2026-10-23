import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { bloomClubSignups } from "@/db/schema";
import { ensureCatalogSeeded } from "@/lib/seed";

const schema = z.object({
  email: z.email(),
  source: z.string().max(80).optional(),
});

export async function POST(request: Request) {
  await ensureCatalogSeeded();
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  try {
    await db
      .insert(bloomClubSignups)
      .values({
        email,
        source: parsed.data.source ?? "demo",
      })
      .onConflictDoNothing();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not save this demo signup." },
      { status: 500 },
    );
  }
}
