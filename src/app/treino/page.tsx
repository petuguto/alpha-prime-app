"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Dumbbell, Clock, Flame, Target, Star, ChevronRight, Play, Lock, Trophy, Home, Zap } from "lucide-react";

const workoutPlans = [
  // TREINOS COMUNS - INICIANTE
  {
    id: 1,
    name: "Treino Iniciante Academia",
    level: "Iniciante",
    location: "Academia",
    duration: "45 min",
    difficulty: "Fácil",
    category: "Geral",
    description: "Treino básico para quem está começando na academia",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Agachamento", sets: "3x10", rest: "60s", muscle: "Pernas" },
      { name: "Supino Reto", sets: "3x10", rest: "60s", muscle: "Peito" },
      { name: "Puxada Frontal", sets: "3x10", rest: "60s", muscle: "Costas" },
      { name: "Rosca Direta", sets: "3x10", rest: "60s", muscle: "Braços" },
      { name: "Abdominal", sets: "3x15", rest: "30s", muscle: "Abdômen" },
    ]
  },
  {
    id: 2,
    name: "Treino Iniciante Casa",
    level: "Iniciante",
    location: "Casa",
    duration: "30 min",
    difficulty: "Fácil",
    category: "Casa",
    description: "Treino sem equipamentos para fazer em casa",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Agachamento Sem Peso", sets: "3x15", rest: "45s", muscle: "Pernas" },
      { name: "Flexão de Braço", sets: "3x8", rest: "60s", muscle: "Peito" },
      { name: "Prancha", sets: "3x20s", rest: "30s", muscle: "Core" },
      { name: "Rosca com Garrafa", sets: "3x12", rest: "45s", muscle: "Braços" },
      { name: "Abdominal Bicicleta", sets: "3x15", rest: "30s", muscle: "Abdômen" },
    ]
  },
  {
    id: 3,
    name: "Treino Emagrecimento",
    level: "Iniciante",
    location: "Academia",
    duration: "50 min",
    difficulty: "Médio",
    category: "Emagrecimento",
    description: "Foco em queima calórica e definição muscular",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Esteira", sets: "20 min", rest: "-", muscle: "Cardio" },
      { name: "Agachamento", sets: "4x12", rest: "45s", muscle: "Pernas" },
      { name: "Remada Baixa", sets: "3x12", rest: "45s", muscle: "Costas" },
      { name: "Crucifixo", sets: "3x12", rest: "45s", muscle: "Peito" },
      { name: "Abdominal Infra", sets: "3x15", rest: "30s", muscle: "Abdômen" },
    ]
  },
  {
    id: 4,
    name: "Treino Hipertrofia",
    level: "Iniciante",
    location: "Academia",
    duration: "60 min",
    difficulty: "Médio",
    category: "Hipertrofia",
    description: "Foco no ganho de massa muscular",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Supino Inclinado", sets: "4x8", rest: "90s", muscle: "Peito" },
      { name: "Puxada Alta", sets: "4x8", rest: "90s", muscle: "Costas" },
      { name: "Leg Press", sets: "4x10", rest: "75s", muscle: "Pernas" },
      { name: "Rosca Scott", sets: "3x10", rest: "60s", muscle: "Braços" },
      { name: "Panturrilha", sets: "4x15", rest: "45s", muscle: "Pernas" },
    ]
  },
  {
    id: 5,
    name: "Treino Perda de Gordura",
    level: "Iniciante",
    location: "Casa",
    duration: "35 min",
    difficulty: "Médio",
    category: "Perda de Gordura",
    description: "Treino HIIT para queima máxima de gordura",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Burpee", sets: "4x10", rest: "30s", muscle: "Full Body" },
      { name: "Mountain Climber", sets: "4x20", rest: "30s", muscle: "Core" },
      { name: "Pulo no Lugar", sets: "4x30", rest: "20s", muscle: "Pernas" },
      { name: "Polichinelo", sets: "4x50", rest: "20s", muscle: "Cardio" },
      { name: "Abdominal Russo", sets: "3x15", rest: "30s", muscle: "Abdômen" },
    ]
  },

  // TREINOS INTERMEDIÁRIOS
  {
    id: 6,
    name: "Treino Intermediário ABC",
    level: "Intermediário",
    location: "Academia",
    duration: "75 min",
    difficulty: "Difícil",
    category: "Geral",
    description: "Divisão clássica A-B-C para intermediários",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Supino Reto", sets: "4x8-10", rest: "90s", muscle: "Peito" },
      { name: "Agachamento", sets: "4x8-10", rest: "120s", muscle: "Pernas" },
      { name: "Desenvolvimento", sets: "4x8-10", rest: "90s", muscle: "Ombros" },
      { name: "Puxada Frontal", sets: "4x8-10", rest: "90s", muscle: "Costas" },
      { name: "Rosca Direta", sets: "3x10-12", rest: "60s", muscle: "Braços" },
    ]
  },
  {
    id: 7,
    name: "Treino Casa Intermediário",
    level: "Intermediário",
    location: "Casa",
    duration: "45 min",
    difficulty: "Médio",
    category: "Casa",
    description: "Treino avançado sem equipamentos",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Flexão Diamante", sets: "4x10", rest: "60s", muscle: "Peito/Tríceps" },
      { name: "Agachamento Pistola", sets: "3x6", rest: "90s", muscle: "Pernas" },
      { name: "Barra Fixa", sets: "4x8", rest: "75s", muscle: "Costas" },
      { name: "Prancha Lateral", sets: "3x30s", rest: "45s", muscle: "Core" },
      { name: "Burpee Avançado", sets: "4x12", rest: "45s", muscle: "Full Body" },
    ]
  },
  {
    id: 8,
    name: "Treino Emagrecimento Intenso",
    level: "Intermediário",
    location: "Academia",
    duration: "60 min",
    difficulty: "Difícil",
    category: "Emagrecimento",
    description: "Treino HIIT + musculação para definição",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Corrida Intervalada", sets: "20 min", rest: "-", muscle: "Cardio" },
      { name: "Agachamento Búlgaro", sets: "4x10", rest: "60s", muscle: "Pernas" },
      { name: "Remada Unilateral", sets: "3x12", rest: "60s", muscle: "Costas" },
      { name: "Elevação Lateral", sets: "3x15", rest: "45s", muscle: "Ombros" },
      { name: "Abdominal Oblíquo", sets: "3x20", rest: "30s", muscle: "Abdômen" },
    ]
  },
  {
    id: 9,
    name: "Treino Hipertrofia Push-Pull",
    level: "Intermediário",
    location: "Academia",
    duration: "80 min",
    difficulty: "Difícil",
    category: "Hipertrofia",
    description: "Sistema push-pull para ganho muscular otimizado",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Supino Declinado", sets: "4x8", rest: "90s", muscle: "Peito" },
      { name: "Desenvolvimento Militar", sets: "4x8", rest: "90s", muscle: "Ombros" },
      { name: "Tríceps Francês", sets: "3x10", rest: "75s", muscle: "Braços" },
      { name: "Puxada Alta", sets: "4x8", rest: "90s", muscle: "Costas" },
      { name: "Rosca Martelo", sets: "3x10", rest: "60s", muscle: "Braços" },
    ]
  },
  {
    id: 10,
    name: "Treino Perda Gordura HIIT",
    level: "Intermediário",
    location: "Casa",
    duration: "40 min",
    difficulty: "Difícil",
    category: "Perda de Gordura",
    description: "HIIT intenso para queima máxima em casa",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Jumping Jack", sets: "4x50", rest: "20s", muscle: "Cardio" },
      { name: "Agachamento com Salto", sets: "4x15", rest: "30s", muscle: "Pernas" },
      { name: "Prancha com Toque", sets: "4x20", rest: "25s", muscle: "Core" },
      { name: "Burpee Box Jump", sets: "4x10", rest: "35s", muscle: "Full Body" },
      { name: "Mountain Climber", sets: "4x30", rest: "20s", muscle: "Core" },
    ]
  },

  // TREINOS AVANÇADOS
  {
    id: 11,
    name: "Treino Avançado 531",
    level: "Avançado",
    location: "Academia",
    duration: "90 min",
    difficulty: "Muito Difícil",
    category: "Geral",
    description: "Programa 5/3/1 para força máxima",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Agachamento", sets: "5/3/1", rest: "180s", muscle: "Pernas" },
      { name: "Supino", sets: "5/3/1", rest: "180s", muscle: "Peito" },
      { name: "Terra", sets: "5/3/1", rest: "180s", muscle: "Costas" },
      { name: "Desenvolvimento", sets: "5/3/1", rest: "180s", muscle: "Ombros" },
      { name: "Acesso Auxiliar", sets: "3x8", rest: "90s", muscle: "Variado" },
    ]
  },
  {
    id: 12,
    name: "Treino Casa Avançado",
    level: "Avançado",
    location: "Casa",
    duration: "55 min",
    difficulty: "Difícil",
    category: "Casa",
    description: "Treino elite sem equipamentos",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Handstand Push-up", sets: "4x6", rest: "90s", muscle: "Ombros" },
      { name: "Muscle-up", sets: "4x3", rest: "120s", muscle: "Full Body" },
      { name: "Pistol Squat", sets: "4x5", rest: "75s", muscle: "Pernas" },
      { name: "Dragon Flag", sets: "3x8", rest: "60s", muscle: "Core" },
      { name: "Planche", sets: "3x20s", rest: "45s", muscle: "Core" },
    ]
  },
  {
    id: 13,
    name: "Treino Emagrecimento Elite",
    level: "Avançado",
    location: "Academia",
    duration: "70 min",
    difficulty: "Muito Difícil",
    category: "Emagrecimento",
    description: "Programa de definição para atletas",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Sprint na Esteira", sets: "10x30s", rest: "60s", muscle: "Cardio" },
      { name: "Agachamento Frontal", sets: "4x8", rest: "90s", muscle: "Pernas" },
      { name: "Remada Curvada", sets: "4x8", rest: "90s", muscle: "Costas" },
      { name: "Crucifixo Inclinado", sets: "3x12", rest: "60s", muscle: "Peito" },
      { name: "Abdominal na Roda", sets: "3x15", rest: "45s", muscle: "Abdômen" },
    ]
  },
  {
    id: 14,
    name: "Treino Hipertrofia Westside",
    level: "Avançado",
    location: "Academia",
    duration: "100 min",
    difficulty: "Muito Difícil",
    category: "Hipertrofia",
    description: "Método Westside para hipertrofia máxima",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Supino Paused", sets: "4x6", rest: "120s", muscle: "Peito" },
      { name: "Agachamento Box", sets: "4x5", rest: "150s", muscle: "Pernas" },
      { name: "Puxada Fechada", sets: "4x8", rest: "90s", muscle: "Costas" },
      { name: "Desenvolvimento Sentado", sets: "4x6", rest: "120s", muscle: "Ombros" },
      { name: "Rosca Concentração", sets: "3x12", rest: "60s", muscle: "Braços" },
    ]
  },
  {
    id: 15,
    name: "Treino Perda Gordura Tabata",
    level: "Avançado",
    location: "Casa",
    duration: "30 min",
    difficulty: "Muito Difícil",
    category: "Perda de Gordura",
    description: "Protocolo Tabata para queima extrema",
    unlocked: true,
    requiredAchievement: null,
    exercises: [
      { name: "Burpee Tabata", sets: "8x20s", rest: "10s", muscle: "Full Body" },
      { name: "Mountain Climber Tabata", sets: "8x20s", rest: "10s", muscle: "Core" },
      { name: "Jump Squat Tabata", sets: "8x20s", rest: "10s", muscle: "Pernas" },
      { name: "Push-up Tabata", sets: "8x20s", rest: "10s", muscle: "Peito" },
      { name: "Plank Tabata", sets: "8x20s", rest: "10s", muscle: "Core" },
    ]
  },

  // TREINOS DE FAMOSOS - BLOQUEADOS
  {
    id: 16,
    name: "Treino do The Rock",
    level: "Lenda",
    location: "Academia",
    duration: "90 min",
    difficulty: "Muito Difícil",
    category: "Celebridade",
    description: "Treino intenso do Dwayne Johnson para manter 120kg de músculos",
    unlocked: false,
    requiredAchievement: "Queime 100.000 calorias",
    exercises: [
      { name: "Agachamento", sets: "4x12", rest: "120s", muscle: "Pernas" },
      { name: "Supino Reto", sets: "4x10", rest: "120s", muscle: "Peito" },
      { name: "Terra", sets: "4x8", rest: "150s", muscle: "Costas" },
      { name: "Desenvolvimento", sets: "4x12", rest: "90s", muscle: "Ombros" },
      { name: "Rosca Direta", sets: "3x15", rest: "60s", muscle: "Braços" },
    ]
  },
  {
    id: 17,
    name: "Treino do Chris Hemsworth",
    level: "Lenda",
    location: "Academia",
    duration: "75 min",
    difficulty: "Difícil",
    category: "Celebridade",
    description: "Treino do Thor para ganho muscular e força",
    unlocked: false,
    requiredAchievement: "Complete 100 treinos",
    exercises: [
      { name: "Supino Inclinado", sets: "4x8", rest: "90s", muscle: "Peito" },
      { name: "Agachamento Frontal", sets: "4x8", rest: "120s", muscle: "Pernas" },
      { name: "Remada Curvada", sets: "4x8", rest: "90s", muscle: "Costas" },
      { name: "Elevação Lateral", sets: "3x12", rest: "60s", muscle: "Ombros" },
      { name: "Rosca Martelo", sets: "3x10", rest: "60s", muscle: "Braços" },
    ]
  },
  {
    id: 18,
    name: "Treino do Arnold Schwarzenegger",
    level: "Lenda",
    location: "Academia",
    duration: "120 min",
    difficulty: "Muito Difícil",
    category: "Bodybuilder",
    description: "Treino clássico do 7x Mr. Olympia dos anos 70",
    unlocked: false,
    requiredAchievement: "Atinja nível 30",
    exercises: [
      { name: "Supino Reto", sets: "5x8", rest: "180s", muscle: "Peito" },
      { name: "Agachamento", sets: "5x8", rest: "180s", muscle: "Pernas" },
      { name: "Puxada Frontal", sets: "5x8", rest: "180s", muscle: "Costas" },
      { name: "Desenvolvimento", sets: "5x8", rest: "180s", muscle: "Ombros" },
      { name: "Rosca Direta", sets: "4x10", rest: "90s", muscle: "Braços" },
    ]
  },
  {
    id: 19,
    name: "Treino do Ronnie Coleman",
    level: "Lenda",
    location: "Academia",
    duration: "150 min",
    difficulty: "Extremo",
    category: "Bodybuilder",
    description: "Yeah Buddy! Treino do 8x Mr. Olympia",
    unlocked: false,
    requiredAchievement: "Complete 200 treinos",
    exercises: [
      { name: "Agachamento", sets: "6x8", rest: "240s", muscle: "Pernas" },
      { name: "Supino", sets: "6x8", rest: "240s", muscle: "Peito" },
      { name: "Terra", sets: "6x6", rest: "300s", muscle: "Costas" },
      { name: "Desenvolvimento", sets: "5x10", rest: "180s", muscle: "Ombros" },
      { name: "Rosca", sets: "5x12", rest: "120s", muscle: "Braços" },
    ]
  },
  {
    id: 20,
    name: "Treino do Cbum",
    level: "Lenda",
    location: "Academia",
    duration: "80 min",
    difficulty: "Difícil",
    category: "Bodybuilder",
    description: "Treino estético do 5x Mr. Olympia Classic Physique",
    unlocked: false,
    requiredAchievement: "Atinja 60 dias de sequência",
    exercises: [
      { name: "Supino Reto", sets: "4x10", rest: "90s", muscle: "Peito" },
      { name: "Agachamento", sets: "4x10", rest: "120s", muscle: "Pernas" },
      { name: "Remada Unilateral", sets: "4x12", rest: "75s", muscle: "Costas" },
      { name: "Elevação Frontal", sets: "3x15", rest: "60s", muscle: "Ombros" },
      { name: "Rosca Concentração", sets: "3x12", rest: "60s", muscle: "Braços" },
    ]
  },
  {
    id: 21,
    name: "Treino do Michael Phelps",
    level: "Lenda",
    location: "Piscina",
    duration: "120 min",
    difficulty: "Extremo",
    category: "Atleta",
    description: "Treino de natação do maior olímpico da história",
    unlocked: false,
    requiredAchievement: "Queime 150.000 calorias",
    exercises: [
      { name: "Nado Crawl", sets: "20x100m", rest: "30s", muscle: "Full Body" },
      { name: "Nado Peito", sets: "15x100m", rest: "45s", muscle: "Peito" },
      { name: "Nado Borboleta", sets: "10x100m", rest: "60s", muscle: "Costas" },
      { name: "Nado Costas", sets: "15x100m", rest: "45s", muscle: "Costas" },
      { name: "IM (Medley)", sets: "10x100m", rest: "60s", muscle: "Full Body" },
    ]
  },
  {
    id: 22,
    name: "Treino do LeBron James",
    level: "Lenda",
    location: "Quadra",
    duration: "90 min",
    difficulty: "Difícil",
    category: "Atleta",
    description: "Treino do rei do basquete para força e explosão",
    unlocked: false,
    requiredAchievement: "Treine 90 dias consecutivos",
    exercises: [
      { name: "Agachamento com Barra", sets: "4x8", rest: "120s", muscle: "Pernas" },
      { name: "Supino Reto", sets: "4x10", rest: "90s", muscle: "Peito" },
      { name: "Puxada Alta", sets: "4x10", rest: "90s", muscle: "Costas" },
      { name: "Desenvolvimento", sets: "3x12", rest: "75s", muscle: "Ombros" },
      { name: "Rosca Direta", sets: "3x15", rest: "60s", muscle: "Braços" },
    ]
  },
  {
    id: 23,
    name: "Treino do Usain Bolt",
    level: "Lenda",
    location: "Pista",
    duration: "60 min",
    difficulty: "Difícil",
    category: "Atleta",
    description: "Treino de velocidade do homem mais rápido do mundo",
    unlocked: false,
    requiredAchievement: "Complete 150 treinos",
    exercises: [
      { name: "Sprint 100m", sets: "10x100m", rest: "2min", muscle: "Pernas" },
      { name: "Sprint 200m", sets: "6x200m", rest: "3min", muscle: "Full Body" },
      { name: "Sprint 400m", sets: "4x400m", rest: "5min", muscle: "Cardio" },
      { name: "Agachamento", sets: "4x10", rest: "90s", muscle: "Pernas" },
      { name: "Abdominal", sets: "3x20", rest: "45s", muscle: "Core" },
    ]
  },
  {
    id: 24,
    name: "Treino do Tom Brady",
    level: "Lenda",
    location: "Campo",
    duration: "75 min",
    difficulty: "Médio",
    category: "Atleta",
    description: "Treino TB12 para longevidade e performance",
    unlocked: false,
    requiredAchievement: "Atinja nível 35",
    exercises: [
      { name: "Agachamento Búlgaro", sets: "3x12", rest: "75s", muscle: "Pernas" },
      { name: "Supino com Halteres", sets: "3x12", rest: "75s", muscle: "Peito" },
      { name: "Remada Sentada", sets: "3x12", rest: "75s", muscle: "Costas" },
      { name: "Elevação Lateral", sets: "3x15", rest: "60s", muscle: "Ombros" },
      { name: "Rosca Martelo", sets: "3x12", rest: "60s", muscle: "Braços" },
    ]
  },
  {
    id: 25,
    name: "Treino do Cristiano Ronaldo",
    level: "Lenda",
    location: "Campo",
    duration: "80 min",
    difficulty: "Difícil",
    category: "Atleta",
    description: "Treino do CR7 para manter físico de elite aos 38",
    unlocked: false,
    requiredAchievement: "Complete 250 treinos",
    exercises: [
      { name: "Agachamento", sets: "4x10", rest: "90s", muscle: "Pernas" },
      { name: "Supino Inclinado", sets: "4x10", rest: "90s", muscle: "Peito" },
      { name: "Puxada Frontal", sets: "4x10", rest: "90s", muscle: "Costas" },
      { name: "Desenvolvimento", sets: "3x12", rest: "75s", muscle: "Ombros" },
      { name: "Rosca Direta", sets: "3x15", rest: "60s", muscle: "Braços" },
    ]
  },
];

export default function TreinoPage() {
  const { user, loading } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(workoutPlans[0]);
  const [filterCategory, setFilterCategory] = useState("Todos");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-[#00FF00] text-xl">Carregando...</div>
      </div>
    );
  }

  const categories = [
    "Todos",
    "Geral",
    "Casa",
    "Emagrecimento",
    "Hipertrofia",
    "Perda de Gordura",
    "Celebridade",
    "Bodybuilder",
    "Atleta",
  ];

  const filteredPlans = filterCategory === "Todos"
    ? workoutPlans
    : workoutPlans.filter((plan) => plan.category === filterCategory || plan.level === filterCategory);

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#FFFFFF] mb-2 font-[family-name:var(--font-inter)]">
            Planos de <span className="text-[#00FF00]">Treino</span>
          </h1>
          <p className="text-[#FFFFFF]/60 font-[family-name:var(--font-inter)]">
            Escolha seu plano de treino e alcance seus objetivos
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Treinos Completados", value: "45", icon: Target },
            { label: "Calorias Queimadas", value: "32.4k", icon: Flame },
            { label: "Tempo Total", value: "67h", icon: Clock },
            { label: "Sequência Atual", value: "12 dias", icon: Zap },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-xl p-4 hover:border-[#00FF00]/50 transition-all"
              >
                <Icon className="w-5 h-5 text-[#00FF00] mb-2" />
                <div className="text-2xl font-bold text-[#FFFFFF] mb-1">{stat.value}</div>
                <div className="text-[#FFFFFF]/60 text-xs">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  filterCategory === category
                    ? "bg-[#00FF00] text-[#0D0D0D]"
                    : "bg-[#1A1A1A] text-[#FFFFFF]/60 hover:bg-[#1A1A1A]/80 hover:text-[#FFFFFF]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout Plans List */}
          <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto pr-2">
            <h2 className="text-xl font-bold text-[#FFFFFF] mb-4 sticky top-0 bg-[#0D0D0D] py-2">
              Planos Disponíveis ({filteredPlans.length})
            </h2>

            {filteredPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => plan.unlocked && setSelectedPlan(plan)}
                className={`w-full text-left bg-[#1A1A1A] border rounded-xl p-4 transition-all ${
                  selectedPlan.id === plan.id
                    ? "border-[#00FF00] shadow-lg shadow-[#00FF00]/20"
                    : "border-[#00FF00]/20 hover:border-[#00FF00]/50"
                } ${!plan.unlocked && "opacity-60 cursor-not-allowed"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-[#FFFFFF] font-bold mb-1 flex items-center gap-2">
                      {plan.name}
                      {plan.level === "Lenda" && <Star className="w-4 h-4 text-[#FFD700]" />}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        plan.level === "Lenda"
                          ? "bg-[#FFD700]/20 text-[#FFD700]"
                          : plan.level === "Avançado"
                          ? "bg-[#00FF00]/20 text-[#00FF00]"
                          : plan.level === "Intermediário"
                          ? "bg-[#1E90FF]/20 text-[#1E90FF]"
                          : "bg-[#FFFFFF]/20 text-[#FFFFFF]"
                      }`}
                    >
                      {plan.level}
                    </span>
                  </div>
                  {!plan.unlocked && (
                    <div className="flex flex-col items-end">
                      <Lock className="w-5 h-5 text-[#FFFFFF]/40 mb-1" />
                      <Trophy className="w-4 h-4 text-[#FFD700]/60" />
                    </div>
                  )}
                </div>

                <p className="text-[#FFFFFF]/60 text-sm mb-3">{plan.description}</p>

                {!plan.unlocked && (
                  <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-2 mb-3">
                    <p className="text-[#FFD700] text-xs font-medium flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      {plan.requiredAchievement}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-[#FFFFFF]/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {plan.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {plan.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    {plan.location === "Casa" ? <Home className="w-3 h-3" /> : <Dumbbell className="w-3 h-3" />}
                    {plan.location}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Plan Details */}
          <div className="lg:col-span-2">
            <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6 relative">
              {/* Locked Overlay */}
              {!selectedPlan.unlocked && (
                <div className="absolute inset-0 bg-[#0D0D0D]/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-10 p-6">
                  <Lock className="w-16 h-16 text-[#FFD700] mb-4" />
                  <h3 className="text-2xl font-bold text-[#FFFFFF] mb-2 text-center">Treino Bloqueado</h3>
                  <p className="text-[#FFFFFF]/60 text-center mb-4">Complete a conquista para desbloquear:</p>
                  <div className="bg-[#FFD700]/20 border border-[#FFD700] rounded-xl p-4 max-w-md">
                    <p className="text-[#FFD700] font-bold text-center flex items-center justify-center gap-2">
                      <Trophy className="w-5 h-5" />
                      {selectedPlan.requiredAchievement}
                    </p>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-[#FFFFFF]">{selectedPlan.name}</h2>
                  {selectedPlan.level === "Lenda" && <Star className="w-6 h-6 text-[#FFD700]" />}
                </div>

                <p className="text-[#FFFFFF]/60 mb-4">{selectedPlan.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#00FF00]/10 px-3 py-2 rounded-lg">
                    <div className="text-[#00FF00] text-xs mb-1">Duração</div>
                    <div className="text-[#FFFFFF] text-sm font-bold">{selectedPlan.duration}</div>
                  </div>
                  <div className="bg-[#00FF00]/10 px-3 py-2 rounded-lg">
                    <div className="text-[#00FF00] text-xs mb-1">Dificuldade</div>
                    <div className="text-[#FFFFFF] text-sm font-bold">{selectedPlan.difficulty}</div>
                  </div>
                  <div className="bg-[#00FF00]/10 px-3 py-2 rounded-lg">
                    <div className="text-[#00FF00] text-xs mb-1">Local</div>
                    <div className="text-[#FFFFFF] text-sm font-bold">{selectedPlan.location}</div>
                  </div>
                  <div className="bg-[#00FF00]/10 px-3 py-2 rounded-lg">
                    <div className="text-[#00FF00] text-xs mb-1">Exercícios</div>
                    <div className="text-[#FFFFFF] text-sm font-bold">{selectedPlan.exercises.length}</div>
                  </div>
                </div>
              </div>

              {/* Exercises List */}
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] mb-3">Exercícios do Treino</h3>
                <div className="space-y-3">
                  {selectedPlan.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="group bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl p-4 hover:border-[#00FF00]/50 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-[#00FF00]/10 rounded-lg flex items-center justify-center">
                              <Dumbbell className="w-5 h-5 text-[#00FF00]" />
                            </div>
                            <div>
                              <h4 className="text-[#FFFFFF] font-semibold">{exercise.name}</h4>
                              <p className="text-[#00FF00] text-sm font-mono">{exercise.sets} séries</p>
                            </div>
                          </div>
                          <div className="ml-15 flex items-center gap-4 text-[#FFFFFF]/70 text-sm">
                            <span>Descanso: {exercise.rest}</span>
                            <span>Músculo: {exercise.muscle}</span>
                          </div>
                        </div>

                        <button className="w-10 h-10 bg-[#00FF00]/10 rounded-lg flex items-center justify-center hover:bg-[#00FF00] hover:text-[#0D0D0D] transition-all group-hover:scale-110">
                          <Play className="w-5 h-5 text-[#00FF00] group-hover:text-[#0D0D0D]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Workout Button */}
              <button
                disabled={!selectedPlan.unlocked}
                className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  selectedPlan.unlocked
                    ? "bg-[#00FF00] text-[#0D0D0D] hover:bg-[#00DD00] hover:scale-105 shadow-lg shadow-[#00FF00]/20"
                    : "bg-[#FFFFFF]/10 text-[#FFFFFF]/40 cursor-not-allowed"
                }`}
              >
                {selectedPlan.unlocked ? (
                  <>
                    <Play className="w-5 h-5" />
                    Iniciar Treino
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Bloqueado
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
