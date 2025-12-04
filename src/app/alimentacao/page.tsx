"use client";

import { useState } from "react";
import { Apple, Flame, Droplet, Beef, Wheat, Heart, Clock, Star, Lock, Plus } from "lucide-react";

const dietPlans = [
  {
    id: 1,
    name: "Dieta Hipertrofia",
    level: "Ganho de Massa",
    calories: "3200 kcal/dia",
    protein: "180g",
    carbs: "400g",
    fats: "90g",
    description: "Plano alimentar para maximizar ganho de massa muscular",
    meals: [
      {
        time: "07:00",
        name: "Café da Manhã",
        foods: [
          { name: "Ovos mexidos", qty: "4 unidades", cal: 280 },
          { name: "Aveia", qty: "80g", cal: 300 },
          { name: "Banana", qty: "1 unidade", cal: 105 },
          { name: "Pasta de amendoim", qty: "2 colheres", cal: 190 },
        ],
      },
      {
        time: "10:00",
        name: "Lanche da Manhã",
        foods: [
          { name: "Whey Protein", qty: "1 scoop", cal: 120 },
          { name: "Batata doce", qty: "200g", cal: 180 },
        ],
      },
      {
        time: "13:00",
        name: "Almoço",
        foods: [
          { name: "Frango grelhado", qty: "200g", cal: 330 },
          { name: "Arroz integral", qty: "150g", cal: 195 },
          { name: "Brócolis", qty: "100g", cal: 35 },
          { name: "Azeite", qty: "1 colher", cal: 120 },
        ],
      },
      {
        time: "16:00",
        name: "Lanche da Tarde",
        foods: [
          { name: "Iogurte grego", qty: "200g", cal: 130 },
          { name: "Granola", qty: "50g", cal: 220 },
          { name: "Frutas vermelhas", qty: "100g", cal: 50 },
        ],
      },
      {
        time: "19:00",
        name: "Jantar",
        foods: [
          { name: "Salmão", qty: "180g", cal: 360 },
          { name: "Quinoa", qty: "100g", cal: 120 },
          { name: "Aspargos", qty: "150g", cal: 30 },
        ],
      },
      {
        time: "22:00",
        name: "Ceia",
        foods: [
          { name: "Caseína", qty: "1 scoop", cal: 110 },
          { name: "Castanhas", qty: "30g", cal: 180 },
        ],
      },
    ],
    unlocked: true,
  },
  {
    id: 2,
    name: "Dieta Cutting",
    level: "Perda de Gordura",
    calories: "2000 kcal/dia",
    protein: "160g",
    carbs: "180g",
    fats: "60g",
    description: "Plano para definição muscular mantendo massa magra",
    meals: [
      {
        time: "07:00",
        name: "Café da Manhã",
        foods: [
          { name: "Claras de ovo", qty: "6 unidades", cal: 100 },
          { name: "Aveia", qty: "40g", cal: 150 },
          { name: "Morango", qty: "100g", cal: 32 },
        ],
      },
      {
        time: "10:00",
        name: "Lanche",
        foods: [
          { name: "Whey Protein", qty: "1 scoop", cal: 120 },
          { name: "Maçã", qty: "1 unidade", cal: 95 },
        ],
      },
      {
        time: "13:00",
        name: "Almoço",
        foods: [
          { name: "Peito de frango", qty: "150g", cal: 248 },
          { name: "Arroz integral", qty: "80g", cal: 104 },
          { name: "Salada verde", qty: "150g", cal: 25 },
        ],
      },
      {
        time: "16:00",
        name: "Lanche",
        foods: [
          { name: "Iogurte desnatado", qty: "150g", cal: 80 },
          { name: "Amêndoas", qty: "20g", cal: 120 },
        ],
      },
      {
        time: "19:00",
        name: "Jantar",
        foods: [
          { name: "Tilápia", qty: "150g", cal: 150 },
          { name: "Batata doce", qty: "100g", cal: 90 },
          { name: "Brócolis", qty: "100g", cal: 35 },
        ],
      },
    ],
    unlocked: true,
  },
  {
    id: 3,
    name: "Dieta do The Rock",
    level: "Celebridade",
    calories: "5000 kcal/dia",
    protein: "350g",
    carbs: "550g",
    fats: "120g",
    description: "Plano alimentar intenso usado pelo Dwayne Johnson",
    meals: [
      {
        time: "05:00",
        name: "Refeição 1",
        foods: [
          { name: "Filé mignon", qty: "300g", cal: 570 },
          { name: "Aveia", qty: "100g", cal: 375 },
          { name: "Claras de ovo", qty: "8 unidades", cal: 136 },
        ],
      },
      {
        time: "08:00",
        name: "Refeição 2",
        foods: [
          { name: "Bacalhau", qty: "250g", cal: 205 },
          { name: "Batata doce", qty: "300g", cal: 270 },
          { name: "Espinafre", qty: "200g", cal: 46 },
        ],
      },
      {
        time: "11:00",
        name: "Refeição 3",
        foods: [
          { name: "Frango", qty: "250g", cal: 413 },
          { name: "Arroz branco", qty: "200g", cal: 260 },
          { name: "Brócolis", qty: "150g", cal: 52 },
        ],
      },
    ],
    unlocked: false,
  },
  {
    id: 4,
    name: "Dieta da Scarlett Johansson",
    level: "Celebridade",
    calories: "1800 kcal/dia",
    protein: "120g",
    carbs: "150g",
    fats: "70g",
    description: "Plano equilibrado usado pela Viúva Negra",
    meals: [
      {
        time: "07:00",
        name: "Café da Manhã",
        foods: [
          { name: "Smoothie verde", qty: "300ml", cal: 180 },
          { name: "Torrada integral", qty: "2 fatias", cal: 140 },
          { name: "Abacate", qty: "50g", cal: 80 },
        ],
      },
      {
        time: "10:00",
        name: "Lanche",
        foods: [
          { name: "Mix de nuts", qty: "30g", cal: 180 },
          { name: "Maçã", qty: "1 unidade", cal: 95 },
        ],
      },
      {
        time: "13:00",
        name: "Almoço",
        foods: [
          { name: "Salmão grelhado", qty: "150g", cal: 300 },
          { name: "Quinoa", qty: "100g", cal: 120 },
          { name: "Salada mista", qty: "200g", cal: 50 },
        ],
      },
    ],
    unlocked: false,
  },
];

export default function AlimentacaoPage() {
  const [selectedPlan, setSelectedPlan] = useState(dietPlans[0]);

  const totalCalories = selectedPlan.meals.reduce(
    (total, meal) => total + meal.foods.reduce((sum, food) => sum + food.cal, 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#FFFFFF] mb-2 font-[family-name:var(--font-inter)]">
            Planos <span className="text-[#00FF00]">Alimentares</span>
          </h1>
          <p className="text-[#FFFFFF]/60 font-[family-name:var(--font-inter)]">
            Nutrição personalizada para seus objetivos
          </p>
        </div>

        {/* Macros Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Calorias", value: selectedPlan.calories, icon: Flame, color: "text-orange-500" },
            { label: "Proteínas", value: selectedPlan.protein, icon: Beef, color: "text-red-500" },
            { label: "Carboidratos", value: selectedPlan.carbs, icon: Wheat, color: "text-yellow-500" },
            { label: "Gorduras", value: selectedPlan.fats, icon: Droplet, color: "text-blue-500" },
          ].map((macro, index) => {
            const Icon = macro.icon;
            return (
              <div
                key={index}
                className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-xl p-4 hover:border-[#00FF00]/50 transition-all"
              >
                <Icon className={`w-5 h-5 ${macro.color} mb-2`} />
                <div className="text-2xl font-bold text-[#FFFFFF] mb-1">{macro.value}</div>
                <div className="text-[#FFFFFF]/60 text-xs">{macro.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Diet Plans List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-[#FFFFFF] mb-4">Planos Disponíveis</h2>
            
            {dietPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => plan.unlocked && setSelectedPlan(plan)}
                className={`w-full text-left bg-[#1A1A1A] border rounded-xl p-4 transition-all ${
                  selectedPlan.id === plan.id
                    ? "border-[#00FF00] shadow-lg shadow-[#00FF00]/20"
                    : "border-[#00FF00]/20 hover:border-[#00FF00]/50"
                } ${!plan.unlocked && "opacity-50"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-[#FFFFFF] font-bold mb-1">{plan.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      plan.level === "Celebridade"
                        ? "bg-[#FFD700]/20 text-[#FFD700]"
                        : plan.level === "Ganho de Massa"
                        ? "bg-[#00FF00]/20 text-[#00FF00]"
                        : "bg-[#FF6B6B]/20 text-[#FF6B6B]"
                    }`}>
                      {plan.level}
                    </span>
                  </div>
                  {!plan.unlocked && <Lock className="w-4 h-4 text-[#FFFFFF]/40" />}
                  {plan.level === "Celebridade" && <Star className="w-4 h-4 text-[#FFD700]" />}
                </div>
                
                <p className="text-[#FFFFFF]/60 text-sm mb-3">{plan.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-[#FFFFFF]/60">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {plan.calories}
                  </span>
                  <span className="flex items-center gap-1">
                    <Beef className="w-3 h-3" />
                    {plan.protein}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Plan Details */}
          <div className="lg:col-span-2">
            <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-[#FFFFFF]">{selectedPlan.name}</h2>
                  {selectedPlan.level === "Celebridade" && (
                    <Star className="w-6 h-6 text-[#FFD700]" />
                  )}
                </div>
                
                <p className="text-[#FFFFFF]/60 mb-4">{selectedPlan.description}</p>
                
                {/* Macros Bar */}
                <div className="bg-[#0D0D0D] rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#FFFFFF]/60 text-sm">Distribuição de Macros</span>
                    <span className="text-[#00FF00] font-bold">{totalCalories} kcal</span>
                  </div>
                  <div className="h-3 bg-[#1A1A1A] rounded-full overflow-hidden flex">
                    <div className="bg-red-500" style={{ width: "35%" }}></div>
                    <div className="bg-yellow-500" style={{ width: "45%" }}></div>
                    <div className="bg-blue-500" style={{ width: "20%" }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-red-500">Proteínas {selectedPlan.protein}</span>
                    <span className="text-yellow-500">Carbos {selectedPlan.carbs}</span>
                    <span className="text-blue-500">Gorduras {selectedPlan.fats}</span>
                  </div>
                </div>
              </div>

              {/* Meals Timeline */}
              <div className="space-y-4">
                {selectedPlan.meals.map((meal, mealIndex) => {
                  const mealCalories = meal.foods.reduce((sum, food) => sum + food.cal, 0);
                  
                  return (
                    <div
                      key={mealIndex}
                      className="bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl p-4 hover:border-[#00FF00]/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#00FF00]/10 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-[#00FF00]" />
                          </div>
                          <div>
                            <h3 className="text-[#FFFFFF] font-bold">{meal.name}</h3>
                            <p className="text-[#FFFFFF]/60 text-sm">{meal.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[#00FF00] font-bold">{mealCalories} kcal</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {meal.foods.map((food, foodIndex) => (
                          <div
                            key={foodIndex}
                            className="flex items-center justify-between py-2 border-t border-[#FFFFFF]/5"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#00FF00] rounded-full"></div>
                              <span className="text-[#FFFFFF] text-sm">{food.name}</span>
                              <span className="text-[#FFFFFF]/40 text-xs">({food.qty})</span>
                            </div>
                            <span className="text-[#FFFFFF]/60 text-sm">{food.cal} kcal</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="bg-[#00FF00] text-[#0D0D0D] py-3 rounded-xl font-bold hover:bg-[#00DD00] transition-all hover:scale-105 shadow-lg shadow-[#00FF00]/20 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Salvar Plano
                </button>
                <button className="bg-[#00FF00]/10 text-[#00FF00] border border-[#00FF00]/30 py-3 rounded-xl font-bold hover:bg-[#00FF00]/20 transition-all flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Personalizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
