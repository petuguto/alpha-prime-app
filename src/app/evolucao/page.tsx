"use client";

import { useState } from "react";
import { TrendingUp, Calendar, Weight, Ruler, Target, ChevronDown } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Dados mock para os gráficos
const weightData = [
  { date: "Jan", peso: 85, meta: 80 },
  { date: "Fev", peso: 83, meta: 80 },
  { date: "Mar", peso: 81.5, meta: 80 },
  { date: "Abr", peso: 80.8, meta: 80 },
  { date: "Mai", peso: 79.5, meta: 80 },
  { date: "Jun", peso: 78.2, meta: 80 },
];

const bodyFatData = [
  { date: "Jan", gordura: 22, musculo: 35 },
  { date: "Fev", gordura: 20, musculo: 36 },
  { date: "Mar", gordura: 18.5, musculo: 37 },
  { date: "Abr", gordura: 17, musculo: 38 },
  { date: "Mai", gordura: 16, musculo: 39 },
  { date: "Jun", gordura: 15, musculo: 40 },
];

const measurementsData = [
  { parte: "Peito", jan: 95, jun: 102 },
  { parte: "Braço", jan: 35, jun: 38 },
  { parte: "Cintura", jan: 85, jun: 78 },
  { parte: "Coxa", jan: 58, jun: 62 },
  { parte: "Panturrilha", jan: 38, jun: 40 },
];

const stats = [
  { label: "Peso Atual", value: "78.2 kg", change: "-6.8 kg", icon: Weight, color: "from-[#00FF00] to-[#00CC00]" },
  { label: "Gordura Corporal", value: "15%", change: "-7%", icon: TrendingUp, color: "from-[#00DD00] to-[#00FF00]" },
  { label: "Massa Muscular", value: "40 kg", change: "+5 kg", icon: Target, color: "from-[#00FF00] to-[#00EE00]" },
  { label: "Dias de Treino", value: "156", change: "+12 este mês", icon: Calendar, color: "from-[#00EE00] to-[#00FF00]" },
];

export default function EvolucaoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m");

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#FFFFFF] mb-2 font-[family-name:var(--font-inter)]">
            Dashboard de <span className="text-[#00FF00]">Evolução</span>
          </h1>
          <p className="text-[#FFFFFF]/60 font-[family-name:var(--font-inter)]">
            Acompanhe seu progresso e conquiste seus objetivos
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-8">
          {["1m", "3m", "6m", "1a"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? "bg-[#00FF00] text-[#0D0D0D]"
                  : "bg-[#1A1A1A] text-[#FFFFFF]/70 hover:bg-[#00FF00]/10 hover:text-[#00FF00]"
              }`}
            >
              {period === "1m" && "1 Mês"}
              {period === "3m" && "3 Meses"}
              {period === "6m" && "6 Meses"}
              {period === "1a" && "1 Ano"}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6 hover:border-[#00FF00]/50 transition-all hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-[#00FF00]/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#00FF00]" />
                    </div>
                    <span className="text-[#00FF00] text-sm font-medium">{stat.change}</span>
                  </div>
                  
                  <div className="text-3xl font-bold text-[#FFFFFF] mb-1">{stat.value}</div>
                  <div className="text-[#FFFFFF]/60 text-sm">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weight Progress Chart */}
          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#FFFFFF]">Evolução de Peso</h3>
              <Weight className="w-5 h-5 text-[#00FF00]" />
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weightData}>
                <defs>
                  <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF10" />
                <XAxis dataKey="date" stroke="#FFFFFF60" />
                <YAxis stroke="#FFFFFF60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #00FF0030",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                />
                <Area type="monotone" dataKey="peso" stroke="#00FF00" fillOpacity={1} fill="url(#colorPeso)" strokeWidth={2} />
                <Line type="monotone" dataKey="meta" stroke="#00FF0060" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Body Composition Chart */}
          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#FFFFFF]">Composição Corporal</h3>
              <TrendingUp className="w-5 h-5 text-[#00FF00]" />
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bodyFatData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF10" />
                <XAxis dataKey="date" stroke="#FFFFFF60" />
                <YAxis stroke="#FFFFFF60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #00FF0030",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="gordura" stroke="#FF6B6B" strokeWidth={2} name="% Gordura" />
                <Line type="monotone" dataKey="musculo" stroke="#00FF00" strokeWidth={2} name="Massa Muscular (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Measurements Chart */}
          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#FFFFFF]">Medidas Corporais</h3>
              <Ruler className="w-5 h-5 text-[#00FF00]" />
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={measurementsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF10" />
                <XAxis dataKey="parte" stroke="#FFFFFF60" />
                <YAxis stroke="#FFFFFF60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #00FF0030",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                />
                <Legend />
                <Bar dataKey="jan" fill="#FFFFFF30" name="Janeiro" radius={[8, 8, 0, 0]} />
                <Bar dataKey="jun" fill="#00FF00" name="Junho" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="mt-8 bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-[#FFFFFF] mb-6">Linha do Tempo</h3>
          
          <div className="space-y-4">
            {[
              { date: "15 Jun 2024", title: "Nova Análise Corporal", desc: "Gordura: 15% | Peso: 78.2kg", color: "bg-[#00FF00]" },
              { date: "01 Jun 2024", title: "Meta Atingida!", desc: "Perdeu 5kg em 3 meses", color: "bg-[#00FF00]" },
              { date: "15 Mai 2024", title: "Treino Atualizado", desc: "Novo plano de hipertrofia", color: "bg-[#00DD00]" },
              { date: "01 Mai 2024", title: "Dieta Ajustada", desc: "Aumento de proteínas", color: "bg-[#00CC00]" },
            ].map((event, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 ${event.color} rounded-full group-hover:scale-150 transition-transform`}></div>
                  {index < 3 && <div className="w-0.5 h-full bg-[#00FF00]/20 mt-2"></div>}
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="text-[#00FF00] text-sm mb-1">{event.date}</div>
                  <div className="text-[#FFFFFF] font-semibold mb-1">{event.title}</div>
                  <div className="text-[#FFFFFF]/60 text-sm">{event.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
