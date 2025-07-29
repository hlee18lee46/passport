'use client'

import { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'

function extractFromIpfsUrl(ipfsUrl: string): string | null {
  if (!ipfsUrl) return null;

  const segments = ipfsUrl.split('/');
  const id = segments[segments.length - 1];

  // Sanitize filename from end (if included)
  return id.includes('?') ? id.split('?')[0] : id;
}
function extractWalrusId(ipfsUrl: string): string | null {
  try {
    const parts = ipfsUrl.split('/');
    return parts.at(-1) || null;
  } catch {
    return null;
  }
}
function getWalrusAssetId(url: string): string | null {
  if (!url) return null;
  const parts = url.split('/');
  return parts[parts.length - 1] || null;
}

export default function PassesPage() {
  const { user, ready, authenticated, logout } = usePrivy()
  const [uploads, setUploads] = useState<any[]>([])

  useEffect(() => {
    const fetchUploads = async () => {
      if (user?.wallet?.address) {
        try {
          const res = await fetch(`/api/my-uploads?address=${user.wallet.address}`) // ✅ correct

          if (!res.ok) {
            console.error("Failed to fetch uploads:", res.status)
            return
          }
          const data = await res.json()
          if (data.uploads) setUploads(data.uploads)
        } catch (err) {
          console.error("Error fetching uploads:", err)
        }
      }
    }

    fetchUploads()
  }, [user?.wallet?.address])

  if (!ready) return <p className="text-center mt-20">Loading...</p>
  if (!authenticated) return <p className="text-center mt-20">Please log in.</p>

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Passes</h1>
        <Button onClick={logout}>Logout</Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {uploads.length === 0 ? (
          <p>No uploaded passes found.</p>
        ) : (
          uploads
            .filter(u => u.ipfsUrl)
            .map((upload, i) => (
              <div key={i} className="border rounded-lg p-4 shadow bg-white">
                <p className="font-medium">File: {upload.filename}</p>
{upload.ipfsUrl && (
  <img
    src={`https://tusky.ai/view/${getWalrusAssetId(upload.ipfsUrl)}`}
    alt={upload.filename}
    className="w-full max-h-64 object-contain bg-gray-100 rounded mt-2"
    onError={(e) => {
      (e.target as HTMLImageElement).style.display = 'none';
      console.warn("Image failed to load:", upload.ipfsUrl);
    }}
  />
)}

                <a
                  href={upload.ipfsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mt-1 inline-block"
                >
                  Open in new tab
                </a>
                <p className="text-xs text-gray-400 mt-1">
                  Uploaded: {new Date(upload.createdAt).toLocaleString()}
                </p>
              </div>
            ))
        )}
      </div>
    </main>
  )
}
