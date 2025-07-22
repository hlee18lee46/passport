import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bus, Shield, Smartphone, Zap, ArrowRight } from "lucide-react"
import UploadCard from "@/components/UploadCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bus className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PassPort</span>
            <Badge variant="secondary" className="ml-2">
              Web3
            </Badge>
          </div>
          <Link href="/auth">
            <Button>Connect Wallet</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Digital Transit Pass,
            <span className="text-blue-600"> On-Chain</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Buy, store, and verify transit passes as NFTs. Apple Wallet meets Ethereum — decentralized, secure, and
            future-proof.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/verify">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Shield className="h-4 w-4" />
                Verify Pass
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Smartphone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Connect & Buy</CardTitle>
              <CardDescription>
                Connect your wallet via Privy and mint transit passes as NFTs on Polygon
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Bus className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Store & Display</CardTitle>
              <CardDescription>
                Your passes are stored on-chain with metadata on Walrus. Show QR codes for easy scanning
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Verify & Access</CardTitle>
              <CardDescription>
                Inspectors can verify pass validity on-chain. No central authority needed
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Real-World Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "City Transit", desc: "Monthly bus & subway passes", icon: "🚌" },
              { title: "Campus Access", desc: "Student ID & facility passes", icon: "🎓" },
              { title: "Event Tickets", desc: "Concert & conference entry", icon: "🎫" },
              { title: "Gym Membership", desc: "Fitness center access passes", icon: "💪" },
            ].map((useCase, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-gray-600">{useCase.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Built on Modern Web3 Stack</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Privy", desc: "Wallet Authentication", color: "bg-blue-100 text-blue-800" },
            { name: "Polygon", desc: "Fast, Cheap NFTs", color: "bg-purple-100 text-purple-800" },
            { name: "Walrus", desc: "Decentralized Storage", color: "bg-green-100 text-green-800" },
            { name: "ERC-721", desc: "NFT Standard", color: "bg-orange-100 text-orange-800" },
          ].map((tech, i) => (
            <div key={i} className="text-center">
              <Badge className={`${tech.color} text-lg px-4 py-2 mb-2`}>{tech.name}</Badge>
              <p className="text-sm text-gray-600">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
  <h2 className="text-3xl font-bold text-center mb-8">Try Uploading a Pass</h2>
  <div className="max-w-xl mx-auto">
    <UploadCard />
  </div>
</section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Decentralized?</h2>
          <p className="text-xl mb-8 opacity-90">Join the future of transit and access management</p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="gap-2">
              <Zap className="h-4 w-4" />
              Start Using PassPort
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bus className="h-6 w-6" />
            <span className="text-xl font-bold">PassPort</span>
          </div>
          <p className="text-gray-400">Decentralized Transit & Access Pass System • Built for ETHGlobal</p>
        </div>
      </footer>
    </div>
  )
}
