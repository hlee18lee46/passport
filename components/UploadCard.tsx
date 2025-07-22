"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploadUrl(data?.metadata?.url ?? null);
    setLoading(false);
  };

  return (
    <div className="p-6 border rounded-lg shadow bg-white text-center space-y-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm"
      />
      <Button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Uploading..." : "Upload to Walrus"}
      </Button>
      {uploadUrl && (
        <p className="text-sm text-green-700 break-words">
          ✅ Uploaded:{" "}
          <a href={uploadUrl} className="underline" target="_blank" rel="noopener noreferrer">
            {uploadUrl}
          </a>
        </p>
      )}
    </div>
  );
}
