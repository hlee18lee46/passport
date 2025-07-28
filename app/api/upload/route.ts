import { Tusky } from "@tusky-io/ts-sdk";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
import clientPromise from "@/lib/mongodb"; // <- make sure you have this

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const address = formData.get("address") as string; // <-- Get user wallet address

  if (!file || !address) {
    return NextResponse.json({ error: "Missing file or address" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(tmpdir(), `${randomUUID()}-${file.name}`);
  await writeFile(filePath, buffer);

  try {
    const tusky = await Tusky.init({ apiKey: process.env.TUSKY_API_KEY! });
    const vaultId = process.env.TUSKY_VAULT_ID!;
    const result = await tusky.file.upload(vaultId, filePath, { encrypted: false });

    // Store in MongoDB
// Store in MongoDB
try {
  console.log("📥 Upload successful. Saving to MongoDB:", {
    address,
    filename: file.name,
    ipfsUrl: result.url,
    uploadId: result.id,
  });

  const client = await clientPromise;
  const db = client.db("passport"); // ← explicitly use the right DB
await db.collection("ticket").insertOne({
  address,
  filename: file.name,
  ipfsUrl: result.url,
  uploadId: result.id,
  createdAt: new Date(),
});


  const insertResult = await db.collection("passport.ticket").insertOne({
    address,
    filename: file.name,
    ipfsUrl: result.url,
    uploadId: result.id,
    createdAt: new Date(),
  });

  console.log("✅ MongoDB insert result:", insertResult);
} catch (mongoErr) {
  console.error("❌ MongoDB insert error:", mongoErr);
}


    return NextResponse.json({ uploadId: result.id, url: result.url }, { status: 200 });
  } catch (err: any) {
    console.error("Tusky upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
