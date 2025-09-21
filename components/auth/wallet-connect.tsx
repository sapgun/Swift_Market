"use client"

import { usePrivy, useWallets } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { Wallet, Copy, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function WalletConnect() {
  const { ready, authenticated, createWallet } = usePrivy()
  const { wallets } = useWallets()

  // Don't render anything until Privy is ready
  if (!ready) {
    return (
      <Button size="sm" disabled>
        Loading...
      </Button>
    )
  }

  // If user is not authenticated, show connect wallet button
  if (!authenticated) {
    return (
      <Button size="sm" disabled>
        Connect Wallet
      </Button>
    )
  }

  // If user has no wallets, show create wallet button
  if (wallets.length === 0) {
    return (
      <Button size="sm" onClick={createWallet}>
        <Wallet className="h-4 w-4 mr-2" />
        Create Wallet
      </Button>
    )
  }

  // If user has wallets, show wallet dropdown
  const primaryWallet = wallets[0]
  const shortAddress = `${primaryWallet.address.slice(0, 6)}...${primaryWallet.address.slice(-4)}`

  const copyAddress = () => {
    navigator.clipboard.writeText(primaryWallet.address)
    toast.success("Wallet address copied to clipboard")
  }

  const viewOnExplorer = () => {
    // This would typically open the address on a blockchain explorer
    // For XRPL, we'll use the XRPL explorer
    window.open(`https://testnet.xrpl.org/accounts/${primaryWallet.address}`, "_blank")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">{shortAddress}</span>
          <Badge variant="secondary" className="hidden md:inline-flex">
            Connected
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <div className="text-sm font-medium mb-1">Address</div>
          <div className="text-xs text-muted-foreground font-mono break-all">{primaryWallet.address}</div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy Address</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={viewOnExplorer}>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>View on Explorer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
