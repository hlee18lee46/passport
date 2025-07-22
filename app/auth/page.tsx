"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bus, Wallet, CheckCircle, ArrowLeft } from "lucide-react"

export default function AuthPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true)
      setWalletAddress("0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e")
      setIsConnecting(false)
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletAddress("")
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
          {isConnected && (
            <Badge variant="outline" className="gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Connected
            </Badge>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {!isConnected ? (
            <Card>
              <CardHeader className="text-center">
                <Wallet className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>Connect via Privy to start minting and managing your transit passes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleConnect} disabled={isConnecting} className="w-full" size="lg">
                  {isConnecting ? "Connecting..." : "Connect with Privy"}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>Supported networks:</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge variant="secondary">Polygon Mumbai</Badge>
                    <Badge variant="secondary">Ethereum Sepolia</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Wallet Connected!</CardTitle>
                <CardDescription>You're ready to start using PassPort</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Connected Address:</p>
                  <p className="font-mono text-sm break-all">{walletAddress}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link href="/mint">
                    <Button className="w-full">Mint Pass</Button>
                  </Link>
                  <Link href="/passes">
                    <Button variant="outline" className="w-full bg-transparent">
                      My Passes
                    </Button>
                  </Link>
                </div>

                <Button onClick={handleDisconnect} variant="ghost" className="w-full">
                  Disconnect Wallet
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
