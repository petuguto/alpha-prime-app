"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Dumbbell, Apple, Trophy, Award } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: TrendingUp },
  { href: "/evolucao", label: "Evolução", icon: TrendingUp },
  { href: "/treino", label: "Treino", icon: Dumbbell },
  { href: "/alimentacao", label: "Dieta", icon: Apple },
  { href: "/desafios", label: "Desafios", icon: Trophy },
  { href: "/conquistas", label: "Conquistas", icon: Award },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D] border-b border-[#00FF00]/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#00FF00] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-[#0D0D0D] font-bold text-lg">α</span>
            </div>
            <span className="text-[#FFFFFF] font-bold text-xl hidden sm:block">
              AlphaPrime
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#00FF00]/10 text-[#00FF00]"
                      : "text-[#FFFFFF]/70 hover:text-[#00FF00] hover:bg-[#00FF00]/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#00FF00] p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-[#00FF00]/20 bg-[#0D0D0D]">
        <div className="grid grid-cols-3 gap-1 p-2">
          {navItems.slice(0, 6).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#00FF00]/10 text-[#00FF00]"
                    : "text-[#FFFFFF]/70"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
