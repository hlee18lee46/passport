// app/api/my-uploads/route.ts
import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address")

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db("passport"); // ← explicitly use the right DB
await db.collection("ticket").insertOne({
  address,
  filename: file.name,
  ipfsUrl: result.url,
  uploadId: result.id,
  createdAt: new Date(),
});

    const uploads = await db.collection("passport.ticket")
      .find({ address })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ uploads })
  } catch (err) {
    console.error("Error fetching uploads:", err)
    return NextResponse.json({ error: "Failed to fetch uploads" }, { status: 500 })
  }
}
