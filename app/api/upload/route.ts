import { Tusky } from "@tusky-io/ts-sdk";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(tmpdir(), `${randomUUID()}-${file.name}`);
  await writeFile(filePath, buffer);

  try {
    const tusky = await Tusky.init({ apiKey: process.env.TUSKY_API_KEY! });
    const vaultId = process.env.TUSKY_VAULT_ID!;
    const result = await tusky.file.upload(vaultId, filePath, { encrypted: false });
    return NextResponse.json({ uploadId: result.id, url: result.url }, { status: 200 });



  } catch (err: any) {
    console.error("Tusky upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
