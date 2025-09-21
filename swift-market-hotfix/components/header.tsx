"use client"

import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SM</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Swift Market</span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="search" placeholder="상품을 검색하세요..." className="pl-10 pr-4 py-2 w-full" />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
              카테고리
            </a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
              판매하기
            </a>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
              <ShoppingCart className="h-4 w-4 mr-2" />
              장바구니
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              로그인
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="search" placeholder="상품을 검색하세요..." className="pl-10 pr-4 py-2 w-full" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                카테고리
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                판매하기
              </a>
              <Button variant="ghost" size="sm" className="justify-start text-gray-600 hover:text-emerald-600">
                <ShoppingCart className="h-4 w-4 mr-2" />
                장바구니
              </Button>
              <Button variant="outline" size="sm" className="justify-start bg-transparent">
                <User className="h-4 w-4 mr-2" />
                로그인
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
