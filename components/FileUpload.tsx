"use client";

import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("address", user.wallet.address) // 👈 Add this

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-4 space-y-4">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
      {result && (
        <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
