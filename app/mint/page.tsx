"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Bus, ArrowLeft, Calendar, MapPin, CreditCard, CheckCircle } from "lucide-react"

export default function MintPage() {
  const [passType, setPassType] = useState("")
  const [duration, setDuration] = useState("")
  const [zone, setZone] = useState("")
  const [isMinting, setIsMinting] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)

  const handleMint = async () => {
    setIsMinting(true)
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false)
      setMintSuccess(true)
    }, 3000)
  }

  const passTypes = [
    { id: "bus", name: "Bus Pass", price: "0.01 MATIC", icon: "🚌" },
    { id: "subway", name: "Subway Pass", price: "0.015 MATIC", icon: "🚇" },
    { id: "campus", name: "Campus Pass", price: "0.005 MATIC", icon: "🎓" },
    { id: "event", name: "Event Pass", price: "0.02 MATIC", icon: "🎫" },
  ]

  if (mintSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Bus className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">PassPort</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardHeader>
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle>Pass Minted Successfully!</CardTitle>
                <CardDescription>
                  Your NFT transit pass has been created and is now available in your wallet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 mb-2">Transaction Hash:</p>
                  <p className="font-mono text-xs break-all text-green-700">
                    0x1234567890abcdef1234567890abcdef12345678
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link href="/passes">
                    <Button className="w-full">View My Passes</Button>
                  </Link>
                  <Link href="/mint">
                    <Button variant="outline" className="w-full bg-transparent">
                      Mint Another
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/auth" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <Bus className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PassPort</span>
          </Link>
          <Badge variant="outline">Polygon Mumbai</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Mint Your Transit Pass</h1>
            <p className="text-gray-600">Create an NFT pass for seamless transit access</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pass Configuration
              </CardTitle>
              <CardDescription>Choose your pass type and duration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pass Type Selection */}
              <div className="space-y-3">
                <Label>Pass Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  {passTypes.map((type) => (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all ${
                        passType === type.id ? "ring-2 ring-blue-600 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setPassType(type.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <h3 className="font-semibold text-sm">{type.name}</h3>
                        <p className="text-xs text-gray-600">{type.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Duration
                </Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pass duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1day">1 Day Pass</SelectItem>
                    <SelectItem value="7days">7 Days Pass</SelectItem>
                    <SelectItem value="30days">30 Days Pass</SelectItem>
                    <SelectItem value="90days">90 Days Pass</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Zone */}
              <div className="space-y-2">
                <Label htmlFor="zone" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Zone
                </Label>
                <Select value={zone} onValueChange={setZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transit zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zone1">Zone 1 - Downtown</SelectItem>
                    <SelectItem value="zone2">Zone 2 - Suburbs</SelectItem>
                    <SelectItem value="zone3">Zone 3 - Extended</SelectItem>
                    <SelectItem value="all">All Zones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Summary */}
              {passType && duration && zone && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Pass Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{passTypes.find((p) => p.id === passType)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{duration.replace(/(\d+)/, "$1 ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Zone:</span>
                      <span>{zone}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Total:</span>
                      <span>{passTypes.find((p) => p.id === passType)?.price}</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleMint}
                disabled={!passType || !duration || !zone || isMinting}
                className="w-full"
                size="lg"
              >
                {isMinting ? "Minting Pass..." : "Mint NFT Pass"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
