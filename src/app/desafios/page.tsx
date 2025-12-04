"use client";

import { useState } from "react";
import { Trophy, Target, Flame, Dumbbell, Apple, TrendingUp, Clock, Award, ChevronRight, Check, X, Heart, Zap, Calendar, Users, Medal, Star, Activity } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: "treino" | "dieta" | "evolucao" | "consistencia";
  difficulty: "facil" | "medio" | "dificil" | "extremo";
  duration: string;
  reward: string;
  status: "disponivel" | "em-andamento" | "concluido" | "falhou";
  progress: number;
  maxProgress: number;
  deadline?: string;
  requirements: string[];
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Desafio 30 Dias de Treino",
    description: "Treine todos os dias por 30 dias consecutivos",
    icon: Flame,
    category: "consistencia",
    difficulty: "dificil",
    duration: "30 dias",
    reward: "Conquista Épica + 500 XP",
    status: "em-andamento",
    progress: 12,
    maxProgress: 30,
    deadline: "15 Jul 2024",
    requirements: ["Treinar 1x por dia", "Sem faltas", "Mínimo 30min por treino"]
  },
  {
    id: "2",
    title: "Perder 5kg em 2 Meses",
    description: "Alcance sua meta de perda de peso",
    icon: Target,
    category: "evolucao",
    difficulty: "medio",
    duration: "60 dias",
    reward: "Conquista Rara + 300 XP",
    status: "em-andamento",
    progress: 3.2,
    maxProgress: 5,
    deadline: "01 Ago 2024",
    requirements: ["Déficit calórico", "Treino regular", "Acompanhamento semanal"]
  },
  {
    id: "3",
    title: "Dieta Perfeita",
    description: "Siga seu plano alimentar por 7 dias sem falhas",
    icon: Apple,
    category: "dieta",
    difficulty: "medio",
    duration: "7 dias",
    reward: "Conquista Rara + 200 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 7,
    requirements: ["Seguir macros", "5-6 refeições/dia", "Hidratação adequada"]
  },
  {
    id: "4",
    title: "Ganho de Massa",
    description: "Ganhe 3kg de massa muscular",
    icon: Dumbbell,
    category: "treino",
    difficulty: "dificil",
    duration: "90 dias",
    reward: "Conquista Épica + 400 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 3,
    requirements: ["Treino de hipertrofia", "Superávit calórico", "Descanso adequado"]
  },
  {
    id: "5",
    title: "Evolução Rápida",
    description: "Melhore 3 medidas corporais em 1 mês",
    icon: TrendingUp,
    category: "evolucao",
    difficulty: "medio",
    duration: "30 dias",
    reward: "Conquista Rara + 250 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 3,
    requirements: ["Análise inicial", "Treino focado", "Análise final"]
  },
  {
    id: "6",
    title: "Maratona de Treino",
    description: "Complete 100 treinos",
    icon: Trophy,
    category: "treino",
    difficulty: "extremo",
    duration: "Sem limite",
    reward: "Conquista Lendária + 1000 XP",
    status: "em-andamento",
    progress: 45,
    maxProgress: 100,
    requirements: ["Qualquer tipo de treino", "Mínimo 30min", "Registrado no app"]
  },
  {
    id: "7",
    title: "Sequência de Ferro",
    description: "7 dias de treino sem faltar",
    icon: Flame,
    category: "consistencia",
    difficulty: "facil",
    duration: "7 dias",
    reward: "Conquista Comum + 100 XP",
    status: "concluido",
    progress: 7,
    maxProgress: 7,
    requirements: ["1 treino por dia", "Mínimo 20min"]
  },
  {
    id: "8",
    title: "Nutrição Balanceada",
    description: "Atinja suas macros por 14 dias",
    icon: Apple,
    category: "dieta",
    difficulty: "medio",
    duration: "14 dias",
    reward: "Conquista Rara + 300 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 14,
    requirements: ["Proteína: 2g/kg", "Carboidratos adequados", "Gorduras saudáveis"]
  },
  {
    id: "9",
    title: "Cardio Intenso",
    description: "Complete 20 sessões de cardio",
    icon: Heart,
    category: "treino",
    difficulty: "medio",
    duration: "30 dias",
    reward: "Conquista Rara + 250 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 20,
    requirements: ["Mínimo 20min por sessão", "Frequência cardíaca elevada", "Variedade de exercícios"]
  },
  {
    id: "10",
    title: "Hidratação Perfeita",
    description: "Beba 3L de água por dia durante 21 dias",
    icon: Activity,
    category: "dieta",
    difficulty: "facil",
    duration: "21 dias",
    reward: "Conquista Comum + 150 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 21,
    requirements: ["3L de água diariamente", "Registrar consumo", "Sem bebidas açucaradas"]
  },
  {
    id: "11",
    title: "Força Máxima",
    description: "Aumente sua carga em 20% em 3 exercícios",
    icon: Zap,
    category: "treino",
    difficulty: "dificil",
    duration: "60 dias",
    reward: "Conquista Épica + 400 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 3,
    requirements: ["Supino, agachamento e levantamento terra", "Progressão gradual", "Técnica correta"]
  },
  {
    id: "12",
    title: "Flexibilidade Total",
    description: "Pratique alongamento por 30 dias consecutivos",
    icon: Activity,
    category: "treino",
    difficulty: "medio",
    duration: "30 dias",
    reward: "Conquista Rara + 300 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 30,
    requirements: ["15min de alongamento diário", "Todos os grupos musculares", "Técnica adequada"]
  },
  {
    id: "13",
    title: "Jejum Intermitente",
    description: "Complete 30 dias de jejum 16/8",
    icon: Clock,
    category: "dieta",
    difficulty: "medio",
    duration: "30 dias",
    reward: "Conquista Rara + 300 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 30,
    requirements: ["16h de jejum", "8h janela alimentar", "Hidratação adequada"]
  },
  {
    id: "14",
    title: "Redução de BF",
    description: "Reduza 5% de gordura corporal",
    icon: TrendingUp,
    category: "evolucao",
    difficulty: "dificil",
    duration: "90 dias",
    reward: "Conquista Épica + 500 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 5,
    requirements: ["Déficit calórico controlado", "Treino regular", "Análises mensais"]
  },
  {
    id: "15",
    title: "Madrugador Fitness",
    description: "Treine antes das 7h por 14 dias",
    icon: Calendar,
    category: "consistencia",
    difficulty: "medio",
    duration: "14 dias",
    reward: "Conquista Rara + 250 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 14,
    requirements: ["Treino antes das 7h", "Mínimo 30min", "Sem faltas"]
  },
  {
    id: "16",
    title: "Treino em Grupo",
    description: "Participe de 10 treinos em grupo",
    icon: Users,
    category: "treino",
    difficulty: "facil",
    duration: "30 dias",
    reward: "Conquista Comum + 200 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 10,
    requirements: ["Aulas coletivas", "Treinos com parceiros", "Mínimo 45min"]
  },
  {
    id: "17",
    title: "Proteína Power",
    description: "Atinja meta de proteína por 30 dias",
    icon: Apple,
    category: "dieta",
    difficulty: "medio",
    duration: "30 dias",
    reward: "Conquista Rara + 300 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 30,
    requirements: ["2g de proteína por kg", "Distribuição ao longo do dia", "Fontes variadas"]
  },
  {
    id: "18",
    title: "Desafio 365",
    description: "Treine todos os dias por 1 ano",
    icon: Medal,
    category: "consistencia",
    difficulty: "extremo",
    duration: "365 dias",
    reward: "Conquista Lendária + 2000 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 365,
    requirements: ["1 treino por dia", "Sem exceções", "Mínimo 30min"]
  },
  {
    id: "19",
    title: "Transformação Completa",
    description: "Perca 10kg e ganhe 3kg de massa",
    icon: Star,
    category: "evolucao",
    difficulty: "extremo",
    duration: "120 dias",
    reward: "Conquista Lendária + 1500 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 2,
    requirements: ["Perda de gordura", "Ganho de massa", "Acompanhamento profissional"]
  },
  {
    id: "20",
    title: "Velocista",
    description: "Melhore seu tempo de corrida em 20%",
    icon: Zap,
    category: "treino",
    difficulty: "dificil",
    duration: "60 dias",
    reward: "Conquista Épica + 400 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 1,
    requirements: ["Teste inicial de 5km", "Treinos de velocidade", "Teste final"]
  },
  {
    id: "21",
    title: "Sono Reparador",
    description: "Durma 8h por noite durante 30 dias",
    icon: Activity,
    category: "consistencia",
    difficulty: "medio",
    duration: "30 dias",
    reward: "Conquista Rara + 250 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 30,
    requirements: ["8h de sono", "Horário regular", "Qualidade do sono"]
  },
  {
    id: "22",
    title: "Zero Açúcar",
    description: "Elimine açúcar refinado por 45 dias",
    icon: Apple,
    category: "dieta",
    difficulty: "dificil",
    duration: "45 dias",
    reward: "Conquista Épica + 450 XP",
    status: "disponivel",
    progress: 0,
    maxProgress: 45,
    requirements: ["Sem açúcar refinado", "Leitura de rótulos", "Alternativas saudáveis"]
  },
];

const difficultyColors = {
  facil: { bg: "bg-[#00FF00]/10", text: "text-[#00FF00]", border: "border-[#00FF00]/30" },
  medio: { bg: "bg-[#FFD700]/10", text: "text-[#FFD700]", border: "border-[#FFD700]/30" },
  dificil: { bg: "bg-[#FF6B6B]/10", text: "text-[#FF6B6B]", border: "border-[#FF6B6B]/30" },
  extremo: { bg: "bg-[#9370DB]/10", text: "text-[#9370DB]", border: "border-[#9370DB]/30" },
};

const categoryIcons = {
  treino: Dumbbell,
  dieta: Apple,
  evolucao: TrendingUp,
  consistencia: Flame,
};

export default function DesafiosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("todas");
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null);

  const categories = ["todos", "treino", "dieta", "evolucao", "consistencia"];
  const difficulties = ["todas", "facil", "medio", "dificil", "extremo"];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === "todos" || challenge.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "todas" || challenge.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const stats = {
    emAndamento: challenges.filter(c => c.status === "em-andamento").length,
    concluidos: challenges.filter(c => c.status === "concluido").length,
    disponiveis: challenges.filter(c => c.status === "disponivel").length,
  };

  const handleAcceptChallenge = (challengeId: string) => {
    // Lógica para aceitar desafio
    console.log("Desafio aceito:", challengeId);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#FFFFFF] mb-2 font-[family-name:var(--font-inter)]">
            Seus <span className="text-[#00FF00]">Desafios</span>
          </h1>
          <p className="text-[#FFFFFF]/60 font-[family-name:var(--font-inter)]">
            Aceite desafios e conquiste recompensas exclusivas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#FFFFFF] mb-1">{stats.emAndamento}</div>
                <div className="text-[#FFFFFF]/60 text-sm">Em Andamento</div>
              </div>
              <Clock className="w-10 h-10 text-[#FFD700]" />
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#FFFFFF] mb-1">{stats.concluidos}</div>
                <div className="text-[#FFFFFF]/60 text-sm">Concluídos</div>
              </div>
              <Trophy className="w-10 h-10 text-[#00FF00]" />
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#FFFFFF] mb-1">{stats.disponiveis}</div>
                <div className="text-[#FFFFFF]/60 text-sm">Disponíveis</div>
              </div>
              <Target className="w-10 h-10 text-[#4169E1]" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category === "todos" ? Trophy : categoryIcons[category as keyof typeof categoryIcons];
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap capitalize ${
                    selectedCategory === category
                      ? "bg-[#00FF00] text-[#0D0D0D]"
                      : "bg-[#1A1A1A] text-[#FFFFFF]/70 hover:bg-[#00FF00]/10 hover:text-[#00FF00]"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap capitalize ${
                  selectedDifficulty === difficulty
                    ? "bg-[#00FF00]/20 text-[#00FF00] border border-[#00FF00]/50"
                    : "bg-[#1A1A1A] text-[#FFFFFF]/70 hover:bg-[#00FF00]/10 hover:text-[#00FF00]"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges List */}
        <div className="space-y-4">
          {filteredChallenges.map((challenge) => {
            const Icon = challenge.icon;
            const difficultyColor = difficultyColors[challenge.difficulty];
            const isExpanded = expandedChallenge === challenge.id;
            const progressPercentage = (challenge.progress / challenge.maxProgress) * 100;

            return (
              <div
                key={challenge.id}
                className={`bg-[#1A1A1A] border ${
                  challenge.status === "concluido" ? "border-[#00FF00]/50" :
                  challenge.status === "em-andamento" ? "border-[#FFD700]/50" :
                  "border-[#00FF00]/20"
                } rounded-2xl overflow-hidden transition-all hover:border-[#00FF00]/50`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 ${difficultyColor.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-7 h-7 ${difficultyColor.text}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#FFFFFF] mb-1">{challenge.title}</h3>
                          <p className="text-[#FFFFFF]/60 text-sm">{challenge.description}</p>
                        </div>

                        {/* Status Badge */}
                        <div className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
                          challenge.status === "concluido" ? "bg-[#00FF00]/20 text-[#00FF00]" :
                          challenge.status === "em-andamento" ? "bg-[#FFD700]/20 text-[#FFD700]" :
                          challenge.status === "falhou" ? "bg-[#FF6B6B]/20 text-[#FF6B6B]" :
                          "bg-[#4169E1]/20 text-[#4169E1]"
                        }`}>
                          {challenge.status === "concluido" && "Concluído"}
                          {challenge.status === "em-andamento" && "Em Andamento"}
                          {challenge.status === "disponivel" && "Disponível"}
                          {challenge.status === "falhou" && "Falhou"}
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-[#FFFFFF]/60 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{challenge.duration}</span>
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${difficultyColor.text}`}>
                          <Target className="w-4 h-4" />
                          <span className="capitalize">{challenge.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#00FF00] text-sm">
                          <Award className="w-4 h-4" />
                          <span>{challenge.reward}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {(challenge.status === "em-andamento" || challenge.status === "concluido") && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-[#FFFFFF]/60 mb-2">
                            <span>Progresso</span>
                            <span>{challenge.progress} / {challenge.maxProgress}</span>
                          </div>
                          <div className="relative w-full h-2 bg-[#FFFFFF]/10 rounded-full overflow-hidden">
                            <div 
                              className={`absolute top-0 left-0 h-full ${
                                challenge.status === "concluido" ? "bg-[#00FF00]" : "bg-[#FFD700]"
                              } transition-all duration-500`}
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Deadline */}
                      {challenge.deadline && challenge.status === "em-andamento" && (
                        <div className="text-[#FFD700] text-sm mb-4">
                          ⏰ Prazo: {challenge.deadline}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setExpandedChallenge(isExpanded ? null : challenge.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#00FF00]/10 text-[#00FF00] rounded-lg hover:bg-[#00FF00]/20 transition-all text-sm font-medium"
                        >
                          {isExpanded ? "Ocultar Detalhes" : "Ver Detalhes"}
                          <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>

                        {challenge.status === "disponivel" && (
                          <button
                            onClick={() => handleAcceptChallenge(challenge.id)}
                            className="px-4 py-2 bg-[#00FF00] text-[#0D0D0D] rounded-lg hover:bg-[#00DD00] transition-all text-sm font-bold"
                          >
                            Aceitar Desafio
                          </button>
                        )}

                        {challenge.status === "concluido" && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-[#00FF00]/20 text-[#00FF00] rounded-lg text-sm font-medium">
                            <Check className="w-4 h-4" />
                            Completado
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-[#00FF00]/20">
                      <h4 className="text-[#FFFFFF] font-bold mb-3">Requisitos:</h4>
                      <ul className="space-y-2">
                        {challenge.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-[#FFFFFF]/70 text-sm">
                            <Check className="w-4 h-4 text-[#00FF00] mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-[#FFFFFF]/20 mx-auto mb-4" />
            <p className="text-[#FFFFFF]/60">Nenhum desafio encontrado com os filtros selecionados</p>
          </div>
        )}
      </div>
    </div>
  );
}
