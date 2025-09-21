"use client"

import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function LoginButton() {
  const { ready, authenticated, user, login, logout } = usePrivy()

  // Don't render anything until Privy is ready
  if (!ready) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <User className="h-4 w-4" />
        <span className="hidden sm:inline ml-2">Loading...</span>
      </Button>
    )
  }

  // If user is not authenticated, show login button
  if (!authenticated) {
    return (
      <Button variant="ghost" size="sm" onClick={login}>
        <User className="h-4 w-4" />
        <span className="hidden sm:inline ml-2">Sign In</span>
      </Button>
    )
  }

  // If user is authenticated, show user menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={user?.google?.profilePictureUrl || "/placeholder.svg"} />
            <AvatarFallback>{user?.google?.name?.charAt(0) || user?.email?.address?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{user?.google?.name || user?.email?.address || "User"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="mr-2">📊</span>
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
