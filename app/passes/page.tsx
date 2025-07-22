"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bus, ArrowLeft, QrCode, Calendar, MapPin, Plus, ExternalLink } from "lucide-react"

export default function PassesPage() {
  const [selectedPass, setSelectedPass] = useState<number | null>(null)

  // Mock user passes
  const passes = [
    {
      id: 1,
      type: "Bus Pass",
      icon: "🚌",
      duration: "30 Days",
      zone: "Zone 1 - Downtown",
      expiresAt: "2024-02-15",
      status: "active",
      tokenId: "001",
      qrCode: "QR_BUS_001_2024",
    },
    {
      id: 2,
      type: "Campus Pass",
      icon: "🎓",
      duration: "90 Days",
      zone: "University Campus",
      expiresAt: "2024-03-20",
      status: "active",
      tokenId: "002",
      qrCode: "QR_CAMPUS_002_2024",
    },
    {
      id: 3,
      type: "Event Pass",
      icon: "🎫",
      duration: "1 Day",
      zone: "Convention Center",
      expiresAt: "2024-01-10",
      status: "expired",
      tokenId: "003",
      qrCode: "QR_EVENT_003_2024",
    },
  ]

  const activePassesCount = passes.filter((p) => p.status === "active").length

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
          <div className="flex items-center gap-4">
            <Badge variant="outline">{activePassesCount} Active</Badge>
            <Link href="/mint">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Mint Pass
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Transit Passes</h1>
            <p className="text-gray-600">Manage and view your NFT transit passes</p>
          </div>

          {passes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Bus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Passes Yet</h3>
                <p className="text-gray-600 mb-6">Mint your first transit pass to get started</p>
                <Link href="/mint">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Mint Your First Pass
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {passes.map((pass) => (
                <Card
                  key={pass.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedPass === pass.id ? "ring-2 ring-blue-600" : ""
                  } ${pass.status === "expired" ? "opacity-60" : ""}`}
                  onClick={() => setSelectedPass(selectedPass === pass.id ? null : pass.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{pass.icon}</span>
                        <div>
                          <CardTitle className="text-lg">{pass.type}</CardTitle>
                          <CardDescription>Token #{pass.tokenId}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={pass.status === "active" ? "default" : "secondary"}
                        className={pass.status === "active" ? "bg-green-600" : ""}
                      >
                        {pass.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Valid for {pass.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{pass.zone}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Expires: {new Date(pass.expiresAt).toLocaleDateString()}
                      </div>
                    </div>

                    {selectedPass === pass.id && (
                      <div className="space-y-3 pt-4 border-t">
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                          <QrCode className="h-16 w-16 mx-auto mb-2 text-gray-600" />
                          <p className="text-xs font-mono text-gray-600">{pass.qrCode}</p>
                          <p className="text-xs text-gray-500 mt-1">Scan for verification</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Link href={`/verify?pass=${pass.tokenId}`}>
                            <Button variant="outline" size="sm" className="w-full gap-1 bg-transparent">
                              <ExternalLink className="h-3 w-3" />
                              Verify
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Share
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
