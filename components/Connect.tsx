'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';

export default function Connect() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const wallet = wallets[0];

  if (!ready) return null;

  return (
    <div className="flex gap-4">
      {authenticated ? (
        <>
          <span className="text-sm text-gray-600">
            Connected: {wallet?.address?.slice(0, 6)}...{wallet?.address?.slice(-4)}
          </span>
          <Button onClick={logout} variant="outline">Logout</Button>
        </>
      ) : (
        <Button onClick={login}>Connect Wallet</Button>
      )}
    </div>
  );
}
