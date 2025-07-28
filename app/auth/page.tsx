'use client'

import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bus } from 'lucide-react' // Replace with correct icon import if needed
import UploadCard from "@/components/UploadCard";
import { useEffect, useState } from "react"





export default function AuthPage() {
  const { ready, authenticated, login, logout, user } = usePrivy()
  const [uploads, setUploads] = useState<any[]>([])

    useEffect(() => {
    const fetchUploads = async () => {
      if (user?.wallet?.address) {
        const res = await fetch(`/api/my-uploads?address=${user.wallet.address}`)
        const data = await res.json()
        if (data.uploads) setUploads(data.uploads)
      }
    }

    fetchUploads()
  }, [user?.wallet?.address])

  return (
    <>
      {/* Header without Connect Button */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bus className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PassPort</span>
            <Badge variant="secondary" className="ml-2">Web3</Badge>
          </div>
          <Link href="/">
            <span className="text-sm text-gray-500 hover:underline">Home</span>
          </Link>
        </div>
      </header>

      {/* Main Auth Section */}
      <main className="flex flex-col items-center justify-center min-h-screen space-y-4 px-4">
        {!ready ? (
          <p className="mt-10 text-center">Loading...</p>
        ) : !authenticated ? (
          <Button onClick={login}>Connect Wallet</Button>
        ) : (
          <>
            <p className="text-lg">Connected as: {user?.wallet?.address}</p>
            <Button onClick={logout}>Logout</Button>

            {/* Upload Feature */}
  <h2 className="text-3xl font-bold text-center mb-8">Try Uploading a Pass</h2>
  <div className="max-w-xl mx-auto">
    <UploadCard />
  </div>
    {/* Display Uploaded Passes */}
  <h2 className="text-2xl font-semibold text-center mt-12">Your Uploaded Passes</h2>
  <div className="grid gap-4 mt-4 max-w-2xl">
    {uploads.length === 0 ? (
      <p className="text-center text-gray-500">No passes uploaded yet.</p>
    ) : (
      uploads.map((upload, i) => (
        <div key={i} className="border rounded-lg p-4 shadow bg-white">
          <p className="font-medium">File: {upload.filename}</p>
          <a
            href={upload.ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            View Pass
          </a>
          <p className="text-xs text-gray-400">Uploaded on: {new Date(upload.createdAt).toLocaleString()}</p>
        </div>
      ))
    )}
  </div>

          </>
        )}
      </main>
    </>
  )
}
