'use client'

import { usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'

export default function AuthPage() {
  const { ready, authenticated, login, logout, user } = usePrivy()

  if (!ready) return <p>Loading...</p>
  if (!authenticated)
    return <Button onClick={login}>Connect Wallet</Button>

  return (
    <div>
      <p>Connected as: {user?.wallet?.address}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
