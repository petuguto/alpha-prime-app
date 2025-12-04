"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { TrendingUp, Dumbbell, Apple, Trophy, Award, Zap, LogOut } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Dashboard de Evolução",
    description: "Acompanhe seu progresso com gráficos detalhados",
    href: "/evolucao",
    color: "from-[#00FF00] to-[#00DD00]",
  },
  {
    icon: Dumbbell,
    title: "Planos de Treino",
    description: "Treinos personalizados para seus objetivos",
    href: "/treino",
    color: "from-[#00DD00] to-[#00FF00]",
  },
  {
    icon: Apple,
    title: "Planos Alimentares",
    description: "Dietas balanceadas para máximos resultados",
    href: "/alimentacao",
    color: "from-[#00CC00] to-[#00FF00]",
  },
  {
    icon: Trophy,
    title: "Sistema de Desafios",
    description: "Complete desafios e ganhe recompensas",
    href: "/desafios",
    color: "from-[#00FF00] to-[#00EE00]",
  },
  {
    icon: Award,
    title: "Níveis e Conquistas",
    description: "Suba de nível e desbloqueie conquistas",
    href: "/conquistas",
    color: "from-[#00EE00] to-[#00FF00]",
  },
];

export default function Home() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-[#00FF00] text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header com botão de logout */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/80 backdrop-blur-sm border-b border-[#00FF00]/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#00FF00]" />
            <span className="text-[#FFFFFF] font-bold text-xl">
              Alpha<span className="text-[#00FF00]">Prime</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[#FFFFFF]/60 text-sm hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={signOut}
              className="flex items-center gap-2 bg-[#1A1A1A] border border-[#00FF00]/20 text-[#FFFFFF] px-4 py-2 rounded-lg hover:border-[#00FF00]/50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#00FF00] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FF00] rounded-full blur-[150px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-[#00FF00]" />
              <span className="text-[#00FF00] text-sm font-medium">Powered by AI</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold text-[#FFFFFF] mb-6 font-[family-name:var(--font-inter)]">
              Alpha<span className="text-[#00FF00]">Prime</span>
            </h1>
            
            <p className="text-xl text-[#FFFFFF]/70 max-w-2xl mx-auto mb-8 font-[family-name:var(--font-inter)]">
              Transforme seu corpo com inteligência artificial. Análise precisa, treinos personalizados e resultados garantidos.
            </p>

            <Link
              href="/evolucao"
              className="inline-flex items-center gap-2 bg-[#00FF00] text-[#0D0D0D] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#00DD00] transition-all hover:scale-105 shadow-lg shadow-[#00FF00]/20"
            >
              <TrendingUp className="w-5 h-5" />
              Ver Minha Evolução
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <Link
                  key={index}
                  href={feature.href}
                  className="group relative bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6 hover:border-[#00FF00]/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#00FF00]/10"
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#00FF00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00FF00]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#00FF00]" />
                    </div>
                    
                    <h3 className="text-[#FFFFFF] font-bold text-lg mb-2 font-[family-name:var(--font-inter)]">
                      {feature.title}
                    </h3>
                    
                    <p className="text-[#FFFFFF]/60 text-sm font-[family-name:var(--font-inter)]">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-t border-[#00FF00]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Usuários Ativos" },
              { value: "50K+", label: "Análises Realizadas" },
              { value: "95%", label: "Taxa de Sucesso" },
              { value: "24/7", label: "Suporte IA" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#00FF00] mb-2 font-[family-name:var(--font-inter)]">
                  {stat.value}
                </div>
                <div className="text-[#FFFFFF]/60 text-sm font-[family-name:var(--font-inter)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
