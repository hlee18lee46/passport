"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bus, ArrowLeft, Shield, CheckCircle, XCircle, Search, Calendar, MapPin, User } from "lucide-react"

export default function VerifyPage() {
  const [tokenId, setTokenId] = useState("")
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)

    // Simulate verification process
    setTimeout(() => {
      // Mock verification results
      const mockResults = {
        "001": {
          valid: true,
          passType: "Bus Pass",
          icon: "🚌",
          owner: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e",
          zone: "Zone 1 - Downtown",
          expiresAt: "2024-02-15",
          mintedAt: "2024-01-15",
          status: "active",
        },
        "002": {
          valid: true,
          passType: "Campus Pass",
          icon: "🎓",
          owner: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e",
          zone: "University Campus",
          expiresAt: "2024-03-20",
          mintedAt: "2024-01-20",
          status: "active",
        },
        "003": {
          valid: false,
          passType: "Event Pass",
          icon: "🎫",
          owner: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e",
          zone: "Convention Center",
          expiresAt: "2024-01-10",
          mintedAt: "2024-01-09",
          status: "expired",
        },
      }

      const result = mockResults[tokenId as keyof typeof mockResults] || {
        valid: false,
        error: "Pass not found",
      }

      setVerificationResult(result)
      setIsVerifying(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <Bus className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PassPort</span>
          </Link>
          <Badge variant="outline" className="gap-2">
            <Shield className="h-4 w-4" />
            Verification
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Verify Transit Pass</h1>
            <p className="text-gray-600">Enter a token ID or scan a QR code to verify pass authenticity and validity</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Pass Verification
              </CardTitle>
              <CardDescription>Verify pass ownership and expiration on-chain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tokenId">Token ID or QR Code</Label>
                <Input
                  id="tokenId"
                  placeholder="Enter token ID (e.g., 001, 002, 003)"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Try: 001 (valid), 002 (valid), 003 (expired), or 999 (not found)
                </p>
              </div>

              <Button onClick={handleVerify} disabled={!tokenId || isVerifying} className="w-full" size="lg">
                {isVerifying ? "Verifying..." : "Verify Pass"}
              </Button>
            </CardContent>
          </Card>

          {/* Verification Result */}
          {verificationResult && (
            <Card
              className={`border-2 ${
                verificationResult.valid && verificationResult.status === "active"
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  {verificationResult.valid && verificationResult.status === "active" ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600" />
                  )}
                  <div>
                    <CardTitle
                      className={
                        verificationResult.valid && verificationResult.status === "active"
                          ? "text-green-800"
                          : "text-red-800"
                      }
                    >
                      {verificationResult.valid && verificationResult.status === "active"
                        ? "Valid Pass ✓"
                        : verificationResult.error
                          ? "Pass Not Found"
                          : "Invalid/Expired Pass"}
                    </CardTitle>
                    <CardDescription>
                      {verificationResult.valid && verificationResult.status === "active"
                        ? "This pass is authentic and currently valid"
                        : verificationResult.error
                          ? "No pass found with this token ID"
                          : "This pass has expired or is invalid"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              {verificationResult.passType && (
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{verificationResult.icon}</span>
                        <div>
                          <p className="font-semibold">{verificationResult.passType}</p>
                          <p className="text-sm text-gray-600">Token #{tokenId}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{verificationResult.zone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Expires: {new Date(verificationResult.expiresAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-mono text-xs">
                            {verificationResult.owner.slice(0, 6)}...{verificationResult.owner.slice(-4)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Badge
                        variant={verificationResult.status === "active" ? "default" : "secondary"}
                        className={verificationResult.status === "active" ? "bg-green-600" : "bg-red-600"}
                      >
                        {verificationResult.status.toUpperCase()}
                      </Badge>

                      <div className="text-xs text-gray-600">
                        <p>Minted: {new Date(verificationResult.mintedAt).toLocaleDateString()}</p>
                        <p>Verified on-chain ✓</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {/* Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">How Verification Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <p>Enter the token ID from the pass holder's QR code or NFT metadata</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <p>System queries the blockchain to verify pass ownership and expiration</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <p>Real-time validation ensures passes cannot be forged or duplicated</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
