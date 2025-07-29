import { Tusky } from "@tusky-io/ts-sdk";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const address = formData.get("address") as string;

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

    // Upload the file to Tusky
    const result = await tusky.file.upload(vaultId, filePath, { encrypted: false });
    const uploadId = result.id;

    // List files in the vault to find the one we just uploaded
    const files = await tusky.file.list({ vaultId });
    const uploadedFile = files.items.find((f) => f.uploadId === uploadId);

    if (!uploadedFile || !uploadedFile.blobId) {
      throw new Error("Uploaded file not found or missing blobId");
    }

    const blobId = uploadedFile.blobId;
    const ipfsUrl = `https://walrus.ai/ipfs/${blobId}`;

    console.log("📥 Upload successful. Saving to MongoDB:", {
      address,
      filename: file.name,
      ipfsUrl,
      uploadId,
    });

    const client = await clientPromise;
    const db = client.db("passport");

    const insertResult = await db.collection("ticket").insertOne({
      address,
      filename: file.name,
      ipfsUrl,
      uploadId,
      createdAt: new Date(),
    });

    console.log("✅ MongoDB insert result:", insertResult);

    return NextResponse.json({ uploadId, url: ipfsUrl }, { status: 200 });
  } catch (err: any) {
    console.error("❌ Upload or DB error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
