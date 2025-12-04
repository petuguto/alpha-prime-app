"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Trophy, Award, Star, Lock, Zap, Target, TrendingUp, Calendar, Flame, Crown, Heart, Dumbbell, Apple, Users, Medal, Activity, Clock, Gift } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedDate?: string;
  rarity: "comum" | "raro" | "epico" | "lendario";
  category: string;
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Primeira Análise",
    description: "Complete sua primeira análise corporal",
    icon: Target,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    unlockedDate: "15 Jun 2024",
    rarity: "comum",
    category: "Iniciante"
  },
  {
    id: "2",
    title: "Sequência de 7 Dias",
    description: "Treine por 7 dias consecutivos",
    icon: Flame,
    unlocked: true,
    progress: 7,
    maxProgress: 7,
    unlockedDate: "10 Jun 2024",
    rarity: "raro",
    category: "Consistência"
  },
  {
    id: "3",
    title: "Meta Alcançada",
    description: "Atinja sua primeira meta de peso",
    icon: Trophy,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    unlockedDate: "01 Jun 2024",
    rarity: "epico",
    category: "Objetivos"
  },
  {
    id: "4",
    title: "Transformação Total",
    description: "Perca 10kg de gordura corporal",
    icon: Crown,
    unlocked: false,
    progress: 6.8,
    maxProgress: 10,
    rarity: "lendario",
    category: "Objetivos"
  },
  {
    id: "5",
    title: "Sequência de 30 Dias",
    description: "Treine por 30 dias consecutivos",
    icon: Zap,
    unlocked: false,
    progress: 12,
    maxProgress: 30,
    rarity: "epico",
    category: "Consistência"
  },
  {
    id: "6",
    title: "Mestre do Treino",
    description: "Complete 100 treinos",
    icon: Award,
    unlocked: false,
    progress: 45,
    maxProgress: 100,
    rarity: "raro",
    category: "Treino"
  },
  {
    id: "7",
    title: "Evolução Constante",
    description: "Registre progresso por 6 meses",
    icon: TrendingUp,
    unlocked: false,
    progress: 4,
    maxProgress: 6,
    rarity: "epico",
    category: "Evolução"
  },
  {
    id: "8",
    title: "Disciplina de Ferro",
    description: "Complete 365 dias de treino",
    icon: Calendar,
    unlocked: false,
    progress: 156,
    maxProgress: 365,
    rarity: "lendario",
    category: "Consistência"
  },
  {
    id: "9",
    title: "Cardio Master",
    description: "Complete 50 sessões de cardio",
    icon: Heart,
    unlocked: false,
    progress: 23,
    maxProgress: 50,
    rarity: "raro",
    category: "Treino"
  },
  {
    id: "10",
    title: "Força Bruta",
    description: "Levante 100kg no supino",
    icon: Dumbbell,
    unlocked: false,
    progress: 85,
    maxProgress: 100,
    rarity: "epico",
    category: "Treino"
  },
  {
    id: "11",
    title: "Nutricionista",
    description: "Siga seu plano alimentar por 30 dias",
    icon: Apple,
    unlocked: false,
    progress: 18,
    maxProgress: 30,
    rarity: "raro",
    category: "Nutrição"
  },
  {
    id: "12",
    title: "Hidratação Perfeita",
    description: "Beba 3L de água por 21 dias",
    icon: Activity,
    unlocked: true,
    progress: 21,
    maxProgress: 21,
    unlockedDate: "05 Jun 2024",
    rarity: "comum",
    category: "Nutrição"
  },
  {
    id: "13",
    title: "Madrugador",
    description: "Treine antes das 7h por 14 dias",
    icon: Clock,
    unlocked: false,
    progress: 7,
    maxProgress: 14,
    rarity: "raro",
    category: "Consistência"
  },
  {
    id: "14",
    title: "Social Fitness",
    description: "Treine com amigos 20 vezes",
    icon: Users,
    unlocked: false,
    progress: 12,
    maxProgress: 20,
    rarity: "comum",
    category: "Social"
  },
  {
    id: "15",
    title: "Campeão",
    description: "Complete todos os desafios disponíveis",
    icon: Medal,
    unlocked: false,
    progress: 3,
    maxProgress: 10,
    rarity: "lendario",
    category: "Objetivos"
  },
  {
    id: "16",
    title: "Flexível",
    description: "Pratique alongamento por 30 dias",
    icon: Activity,
    unlocked: false,
    progress: 15,
    maxProgress: 30,
    rarity: "raro",
    category: "Treino"
  },
  {
    id: "17",
    title: "Proteína Power",
    description: "Atinja meta de proteína por 30 dias",
    icon: Apple,
    unlocked: false,
    progress: 22,
    maxProgress: 30,
    rarity: "raro",
    category: "Nutrição"
  },
  {
    id: "18",
    title: "Velocista",
    description: "Melhore tempo de corrida em 20%",
    icon: Zap,
    unlocked: false,
    progress: 0.15,
    maxProgress: 0.20,
    rarity: "epico",
    category: "Treino"
  },
  {
    id: "19",
    title: "Sono Reparador",
    description: "Durma 8h por noite durante 30 dias",
    icon: Activity,
    unlocked: false,
    progress: 20,
    maxProgress: 30,
    rarity: "comum",
    category: "Saúde"
  },
  {
    id: "20",
    title: "Zero Açúcar",
    description: "Elimine açúcar refinado por 45 dias",
    icon: Apple,
    unlocked: false,
    progress: 30,
    maxProgress: 45,
    rarity: "epico",
    category: "Nutrição"
  },
  {
    id: "21",
    title: "Lenda Fitness",
    description: "Alcance nível 50 no app",
    icon: Crown,
    unlocked: false,
    progress: 32,
    maxProgress: 50,
    rarity: "lendario",
    category: "Objetivos"
  },

  {
    id: "23",
    title: "Primeiro Treino",
    description: "Complete seu primeiro treino",
    icon: Dumbbell,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    unlockedDate: "20 Mai 2024",
    rarity: "comum",
    category: "Iniciante"
  },
  {
    id: "24",
    title: "Guerreiro",
    description: "Complete 200 treinos",
    icon: Medal,
    unlocked: false,
    progress: 45,
    maxProgress: 200,
    rarity: "lendario",
    category: "Treino"
  },
  {
    id: "25",
    title: "Transformação Rápida",
    description: "Perca 5kg em 30 dias",
    icon: TrendingUp,
    unlocked: false,
    progress: 3.2,
    maxProgress: 5,
    rarity: "epico",
    category: "Objetivos"
  },
  {
    id: "26",
    title: "Complete 50 Treinos",
    description: "Complete 50 treinos no total",
    icon: Dumbbell,
    unlocked: false,
    progress: 45,
    maxProgress: 50,
    rarity: "raro",
    category: "Treino"
  },
  {
    id: "27",
    title: "Atinja 30 Dias de Sequência",
    description: "Treine por 30 dias consecutivos",
    icon: Flame,
    unlocked: false,
    progress: 12,
    maxProgress: 30,
    rarity: "epico",
    category: "Consistência"
  },
  {
    id: "28",
    title: "Queime 50.000 Calorias",
    description: "Queime 50.000 calorias através dos treinos",
    icon: Flame,
    unlocked: false,
    progress: 32450,
    maxProgress: 50000,
    rarity: "epico",
    category: "Treino"
  },
  {
    id: "29",
    title: "Treine 60 Dias Consecutivos",
    description: "Mantenha uma sequência de 60 dias de treino",
    icon: Calendar,
    unlocked: false,
    progress: 12,
    maxProgress: 60,
    rarity: "lendario",
    category: "Consistência"
  },
  {
    id: "30",
    title: "Atinja Nível 25",
    description: "Alcance o nível 25 no sistema de progressão",
    icon: Star,
    unlocked: false,
    progress: 22,
    maxProgress: 25,
    rarity: "epico",
    category: "Objetivos"
  },
  {
    id: "31",
    title: "Complete 75 Treinos",
    description: "Complete 75 treinos no total",
    icon: Award,
    unlocked: false,
    progress: 45,
    maxProgress: 75,
    rarity: "raro",
    category: "Treino"
  },
  {
    id: "32",
    title: "Queime 75.000 Calorias",
    description: "Queime 75.000 calorias através dos treinos",
    icon: Flame,
    unlocked: false,
    progress: 32450,
    maxProgress: 75000,
    rarity: "lendario",
    category: "Treino"
  },
  {
    id: "33",
    title: "Atinja 45 Dias de Sequência",
    description: "Treine por 45 dias consecutivos",
    icon: Zap,
    unlocked: false,
    progress: 12,
    maxProgress: 45,
    rarity: "epico",
    category: "Consistência"
  },
  {
    id: "34",
    title: "Complete 150 Treinos",
    description: "Complete 150 treinos no total",
    icon: Medal,
    unlocked: false,
    progress: 45,
    maxProgress: 150,
    rarity: "epico",
    category: "Treino"
  },
];

export default function ConquistasPage() {
  const { user, loading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-[#00FF00] text-xl">Carregando...</div>
      </div>
    );
  }

  const categories = ["Todos", ...Array.from(new Set(achievements.map(a => a.category)))];

  const filteredAchievements = selectedCategory === "Todos" 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "comum": return "text-[#FFFFFF]/60 bg-[#FFFFFF]/10";
      case "raro": return "text-[#00DDFF] bg-[#00DDFF]/10";
      case "epico": return "text-[#BB00FF] bg-[#BB00FF]/10";
      case "lendario": return "text-[#FFD700] bg-[#FFD700]/10";
      default: return "text-[#FFFFFF]/60 bg-[#FFFFFF]/10";
    }
  };

  const getProgressPercentage = (progress: number, maxProgress: number) => {
    return Math.min((progress / maxProgress) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#FFFFFF] mb-2 flex items-center justify-center gap-3 font-[family-name:var(--font-inter)]">
            <Trophy className="text-[#00FF00]" size={40} />
            Conquistas
          </h1>
          <p className="text-[#FFFFFF]/70 text-lg font-[family-name:var(--font-inter)]">
            Acompanhe seu progresso e desbloqueie novas conquistas!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-[#00FF00]" size={24} />
              <span className="font-semibold text-[#FFFFFF] font-[family-name:var(--font-inter)]">Concluídas</span>
            </div>
            <div className="text-2xl font-bold text-[#00FF00] font-[family-name:var(--font-inter)]">
              {achievements.filter(a => a.unlocked).length}
            </div>
          </div>
          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-[#FFD700]" size={24} />
              <span className="font-semibold text-[#FFFFFF] font-[family-name:var(--font-inter)]">Lendárias</span>
            </div>
            <div className="text-2xl font-bold text-[#FFD700] font-[family-name:var(--font-inter)]">
              {achievements.filter(a => a.unlocked && a.rarity === "lendario").length}
            </div>
          </div>
          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-[#00FF00]" size={24} />
              <span className="font-semibold text-[#FFFFFF] font-[family-name:var(--font-inter)]">Progresso Total</span>
            </div>
            <div className="text-2xl font-bold text-[#00FF00] font-[family-name:var(--font-inter)]">
              {Math.round((achievements.reduce((acc, a) => acc + getProgressPercentage(a.progress, a.maxProgress), 0) / achievements.length))}%
            </div>
          </div>
          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="text-[#FFFFFF]/60" size={24} />
              <span className="font-semibold text-[#FFFFFF] font-[family-name:var(--font-inter)]">Bloqueadas</span>
            </div>
            <div className="text-2xl font-bold text-[#FFFFFF]/60 font-[family-name:var(--font-inter)]">
              {achievements.filter(a => !a.unlocked).length}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-[#FFFFFF] mb-3 font-[family-name:var(--font-inter)]">Filtrar por Categoria</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all font-[family-name:var(--font-inter)] ${
                  selectedCategory === category
                    ? "bg-[#00FF00] text-[#0D0D0D]"
                    : "bg-[#FFFFFF]/10 text-[#FFFFFF] hover:bg-[#FFFFFF]/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => {
            const IconComponent = achievement.icon;
            const progressPercent = getProgressPercentage(achievement.progress, achievement.maxProgress);
            
            return (
              <div
                key={achievement.id}
                className={`bg-[#1A1A1A] rounded-lg p-6 transition-all duration-300 hover:scale-105 ${
                  achievement.unlocked ? "border-2 border-[#00FF00]" : "border-2 border-[#FFFFFF]/20"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${
                      achievement.unlocked ? "bg-[#00FF00]/20" : "bg-[#FFFFFF]/10"
                    }`}>
                      <IconComponent 
                        size={24} 
                        className={achievement.unlocked ? "text-[#00FF00]" : "text-[#FFFFFF]/40"} 
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#FFFFFF] font-[family-name:var(--font-inter)]">{achievement.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRarityColor(achievement.rarity)} font-[family-name:var(--font-inter)]`}>
                        {achievement.rarity}
                      </span>
                    </div>
                  </div>
                  {achievement.unlocked ? (
                    <div className="text-[#00FF00]">
                      <Award size={20} />
                    </div>
                  ) : (
                    <div className="text-[#FFFFFF]/40">
                      <Lock size={20} />
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-[#FFFFFF]/60 text-sm mb-4 font-[family-name:var(--font-inter)]">{achievement.description}</p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-[#FFFFFF]/60 mb-1 font-[family-name:var(--font-inter)]">
                    <span>Progresso</span>
                    <span>{achievement.progress} / {achievement.maxProgress}</span>
                  </div>
                  <div className="w-full bg-[#FFFFFF]/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        achievement.unlocked ? "bg-[#00FF00]" : "bg-[#00FF00]/50"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Unlock Date */}
                {achievement.unlocked && achievement.unlockedDate && (
                  <div className="text-xs text-[#FFFFFF]/50 font-[family-name:var(--font-inter)]">
                    Desbloqueado em {achievement.unlockedDate}
                  </div>
                )}

                {/* Category */}
                <div className="mt-3 text-xs text-[#FFFFFF]/50 font-[family-name:var(--font-inter)]">
                  Categoria: {achievement.category}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
