"use client";

import { useState } from "react";
import { User, Shirt, Glasses, Watch, Crown, Palette, Sparkles, Lock, Check, Zap } from "lucide-react";

interface AvatarItem {
  id: string;
  name: string;
  category: "corpo" | "cabelo" | "roupa" | "acessorio";
  unlocked: boolean;
  requirement?: string;
}

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  unlocked: boolean;
  requirement?: string;
}

interface AvatarCustomization {
  corpo: string;
  cabelo: string;
  corCabelo: string;
  roupa: string;
  corRoupa: string;
  acessorio: string;
  corAcessorio: string;
}

const bodyTypes: AvatarItem[] = [
  { id: "corpo-1", name: "Iniciante", category: "corpo", unlocked: true },
  { id: "corpo-2", name: "Atlético", category: "corpo", unlocked: true },
  { id: "corpo-3", name: "Musculoso", category: "corpo", unlocked: false, requirement: "Ganhe 5kg de massa" },
  { id: "corpo-4", name: "Definido", category: "corpo", unlocked: false, requirement: "Reduza 5% BF" },
  { id: "corpo-5", name: "Bodybuilder", category: "corpo", unlocked: false, requirement: "Complete 200 treinos" },
];

const hairStyles: AvatarItem[] = [
  { id: "cabelo-1", name: "Careca", category: "cabelo", unlocked: true },
  { id: "cabelo-2", name: "Curto", category: "cabelo", unlocked: true },
  { id: "cabelo-3", name: "Médio", category: "cabelo", unlocked: true },
  { id: "cabelo-4", name: "Longo", category: "cabelo", unlocked: false, requirement: "Sequência de 30 dias" },
  { id: "cabelo-5", name: "Moicano", category: "cabelo", unlocked: false, requirement: "Complete 50 treinos" },
  { id: "cabelo-6", name: "Coque", category: "cabelo", unlocked: false, requirement: "Conquista Épica" },
  { id: "cabelo-7", name: "Trançado", category: "cabelo", unlocked: false, requirement: "Sequência de 60 dias" },
];

const outfits: AvatarItem[] = [
  { id: "roupa-1", name: "Básica", category: "roupa", unlocked: true },
  { id: "roupa-2", name: "Regata", category: "roupa", unlocked: true },
  { id: "roupa-3", name: "Esportiva", category: "roupa", unlocked: true },
  { id: "roupa-4", name: "Compressão", category: "roupa", unlocked: false, requirement: "Complete 10 treinos" },
  { id: "roupa-5", name: "Premium", category: "roupa", unlocked: false, requirement: "Atinja meta de peso" },
  { id: "roupa-6", name: "Elite", category: "roupa", unlocked: false, requirement: "Complete 100 treinos" },
  { id: "roupa-7", name: "Lendária", category: "roupa", unlocked: false, requirement: "Conquista Lendária" },
  { id: "roupa-8", name: "Campeão", category: "roupa", unlocked: false, requirement: "Complete todos desafios" },
];

const accessories: AvatarItem[] = [
  { id: "acess-1", name: "Nenhum", category: "acessorio", unlocked: true },
  { id: "acess-2", name: "Óculos", category: "acessorio", unlocked: true },
  { id: "acess-3", name: "Boné", category: "acessorio", unlocked: true },
  { id: "acess-4", name: "Relógio", category: "acessorio", unlocked: false, requirement: "Sequência de 7 dias" },
  { id: "acess-5", name: "Fone", category: "acessorio", unlocked: false, requirement: "Complete 30 treinos" },
  { id: "acess-6", name: "Corrente", category: "acessorio", unlocked: false, requirement: "Ganhe 3kg de massa" },
  { id: "acess-7", name: "Coroa", category: "acessorio", unlocked: false, requirement: "Conquista Lendária" },
  { id: "acess-8", name: "Luvas", category: "acessorio", unlocked: false, requirement: "Complete 50 treinos" },
];

const colors: ColorOption[] = [
  { id: "cor-1", name: "Verde Neon", hex: "#00FF00", unlocked: true },
  { id: "cor-2", name: "Azul", hex: "#4169E1", unlocked: true },
  { id: "cor-3", name: "Vermelho", hex: "#FF6B6B", unlocked: true },
  { id: "cor-4", name: "Branco", hex: "#FFFFFF", unlocked: true },
  { id: "cor-5", name: "Preto", hex: "#000000", unlocked: true },
  { id: "cor-6", name: "Dourado", hex: "#FFD700", unlocked: false, requirement: "Complete 50 treinos" },
  { id: "cor-7", name: "Roxo", hex: "#9370DB", unlocked: false, requirement: "Conquista Épica" },
  { id: "cor-8", name: "Rosa", hex: "#FF69B4", unlocked: false, requirement: "Sequência de 30 dias" },
  { id: "cor-9", name: "Laranja", hex: "#FF8C00", unlocked: false, requirement: "Complete 20 treinos" },
  { id: "cor-10", name: "Ciano", hex: "#00CED1", unlocked: false, requirement: "Perca 5kg" },
];

export default function AvatarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("corpo");
  const [colorTarget, setColorTarget] = useState<"cabelo" | "roupa" | "acessorio">("roupa");
  const [customization, setCustomization] = useState<AvatarCustomization>({
    corpo: "corpo-1",
    cabelo: "cabelo-2",
    corCabelo: "#00FF00",
    roupa: "roupa-1",
    corRoupa: "#00FF00",
    acessorio: "acess-1",
    corAcessorio: "#00FF00",
  });

  const categories = [
    { id: "corpo", label: "Corpo", icon: User },
    { id: "cabelo", label: "Cabelo", icon: User },
    { id: "roupa", label: "Roupa", icon: Shirt },
    { id: "acessorio", label: "Acessórios", icon: Glasses },
    { id: "cores", label: "Cores", icon: Palette },
  ];

  const totalItems = [...bodyTypes, ...hairStyles, ...outfits, ...accessories, ...colors].length;
  const unlockedItems = [...bodyTypes, ...hairStyles, ...outfits, ...accessories, ...colors].filter(i => i.unlocked).length;

  const handleSelectItem = (itemId: string, category: string) => {
    if (category === "corpo") {
      const item = bodyTypes.find(i => i.id === itemId);
      if (item?.unlocked) setCustomization(prev => ({ ...prev, corpo: itemId }));
    } else if (category === "cabelo") {
      const item = hairStyles.find(i => i.id === itemId);
      if (item?.unlocked) setCustomization(prev => ({ ...prev, cabelo: itemId }));
    } else if (category === "roupa") {
      const item = outfits.find(i => i.id === itemId);
      if (item?.unlocked) setCustomization(prev => ({ ...prev, roupa: itemId }));
    } else if (category === "acessorio") {
      const item = accessories.find(i => i.id === itemId);
      if (item?.unlocked) setCustomization(prev => ({ ...prev, acessorio: itemId }));
    }
  };

  const handleSelectColor = (hex: string) => {
    const color = colors.find(c => c.hex === hex);
    if (!color?.unlocked) return;

    if (colorTarget === "cabelo") {
      setCustomization(prev => ({ ...prev, corCabelo: hex }));
    } else if (colorTarget === "roupa") {
      setCustomization(prev => ({ ...prev, corRoupa: hex }));
    } else if (colorTarget === "acessorio") {
      setCustomization(prev => ({ ...prev, corAcessorio: hex }));
    }
  };

  const getBodyWidth = () => {
    if (customization.corpo === "corpo-1") return "w-24";
    if (customization.corpo === "corpo-2") return "w-28";
    if (customization.corpo === "corpo-3") return "w-32";
    if (customization.corpo === "corpo-4") return "w-28";
    if (customization.corpo === "corpo-5") return "w-36";
    return "w-24";
  };

  const getBodyHeight = () => {
    if (customization.corpo === "corpo-1") return "h-48";
    if (customization.corpo === "corpo-2") return "h-52";
    if (customization.corpo === "corpo-3") return "h-56";
    if (customization.corpo === "corpo-4") return "h-52";
    if (customization.corpo === "corpo-5") return "h-60";
    return "h-48";
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#FFFFFF] mb-2 font-[family-name:var(--font-inter)]">
            Personalize seu <span className="text-[#00FF00]">Avatar</span>
          </h1>
          <p className="text-[#FFFFFF]/60 font-[family-name:var(--font-inter)]">
            Desbloqueie itens exclusivos através de conquistas
          </p>
        </div>

        {/* Progress */}
        <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-[#FFFFFF] mb-1">
                {unlockedItems} / {totalItems} Itens Desbloqueados
              </div>
              <div className="text-[#FFFFFF]/60 text-sm">Continue treinando para desbloquear mais</div>
            </div>
            <Sparkles className="w-10 h-10 text-[#00FF00]" />
          </div>
          
          <div className="relative w-full h-2 bg-[#FFFFFF]/10 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] transition-all duration-500"
              style={{ width: `${(unlockedItems / totalItems) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Preview - MAIOR E MAIS DETALHADO */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-8 sticky top-24">
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 text-center">Preview</h3>
              
              {/* Avatar Display - MUITO MAIOR */}
              <div className="relative w-full aspect-square rounded-2xl flex items-center justify-center mb-6 overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]">
                {/* Avatar Container */}
                <div className="relative flex flex-col items-center justify-center">
                  {/* Head */}
                  <div className="relative mb-2">
                    {/* Hair */}
                    {customization.cabelo !== "cabelo-1" && (
                      <div 
                        className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-12 rounded-t-full"
                        style={{ backgroundColor: customization.corCabelo }}
                      >
                        {customization.cabelo === "cabelo-4" && (
                          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full" style={{ backgroundColor: customization.corCabelo }}></div>
                        )}
                        {customization.cabelo === "cabelo-5" && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-16" style={{ backgroundColor: customization.corCabelo }}></div>
                        )}
                        {customization.cabelo === "cabelo-6" && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full" style={{ backgroundColor: customization.corCabelo }}></div>
                        )}
                        {customization.cabelo === "cabelo-7" && (
                          <>
                            <div className="absolute -bottom-2 left-2 w-3 h-20 rounded-full" style={{ backgroundColor: customization.corCabelo }}></div>
                            <div className="absolute -bottom-2 right-2 w-3 h-20 rounded-full" style={{ backgroundColor: customization.corCabelo }}></div>
                          </>
                        )}
                      </div>
                    )}
                    
                    {/* Face */}
                    <div className="w-20 h-20 rounded-full bg-[#D4A574] border-4 border-[#FFFFFF]/10 relative z-10">
                      {/* Eyes */}
                      <div className="absolute top-7 left-4 w-3 h-3 rounded-full bg-[#000000]"></div>
                      <div className="absolute top-7 right-4 w-3 h-3 rounded-full bg-[#000000]"></div>
                      {/* Mouth */}
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-[#000000]/20"></div>
                    </div>

                    {/* Accessories on Head */}
                    {customization.acessorio === "acess-2" && (
                      <div 
                        className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-6 rounded-lg opacity-80"
                        style={{ backgroundColor: customization.corAcessorio }}
                      ></div>
                    )}
                    {customization.acessorio === "acess-3" && (
                      <div 
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-8 rounded-t-full"
                        style={{ backgroundColor: customization.corAcessorio }}
                      ></div>
                    )}
                    {customization.acessorio === "acess-7" && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl">
                        👑
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className={`relative ${getBodyWidth()} ${getBodyHeight()} rounded-2xl transition-all duration-300`} style={{ backgroundColor: customization.corRoupa }}>
                    {/* Arms */}
                    <div className="absolute -left-6 top-4 w-6 h-20 rounded-full" style={{ backgroundColor: customization.corRoupa }}></div>
                    <div className="absolute -right-6 top-4 w-6 h-20 rounded-full" style={{ backgroundColor: customization.corRoupa }}></div>
                    
                    {/* Body Details */}
                    {customization.corpo === "corpo-3" && (
                      <>
                        <div className="absolute top-8 left-2 w-8 h-8 rounded-full bg-[#FFFFFF]/10"></div>
                        <div className="absolute top-8 right-2 w-8 h-8 rounded-full bg-[#FFFFFF]/10"></div>
                      </>
                    )}
                    {customization.corpo === "corpo-5" && (
                      <>
                        <div className="absolute top-6 left-1 w-10 h-10 rounded-full bg-[#FFFFFF]/20"></div>
                        <div className="absolute top-6 right-1 w-10 h-10 rounded-full bg-[#FFFFFF]/20"></div>
                        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-12 h-16 rounded-lg bg-[#FFFFFF]/10"></div>
                      </>
                    )}

                    {/* Accessories on Body */}
                    {customization.acessorio === "acess-4" && (
                      <div 
                        className="absolute top-6 -left-8 w-8 h-8 rounded-full border-4"
                        style={{ borderColor: customization.corAcessorio }}
                      ></div>
                    )}
                    {customization.acessorio === "acess-5" && (
                      <>
                        <div className="absolute -top-2 -left-8 w-6 h-6 rounded-full" style={{ backgroundColor: customization.corAcessorio }}></div>
                        <div className="absolute -top-2 -right-8 w-6 h-6 rounded-full" style={{ backgroundColor: customization.corAcessorio }}></div>
                      </>
                    )}
                    {customization.acessorio === "acess-6" && (
                      <div 
                        className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full"
                        style={{ backgroundColor: customization.corAcessorio }}
                      ></div>
                    )}
                    {customization.acessorio === "acess-8" && (
                      <>
                        <div className="absolute bottom-2 -left-8 w-8 h-12 rounded-lg" style={{ backgroundColor: customization.corAcessorio }}></div>
                        <div className="absolute bottom-2 -right-8 w-8 h-12 rounded-lg" style={{ backgroundColor: customization.corAcessorio }}></div>
                      </>
                    )}
                  </div>

                  {/* Legs */}
                  <div className="flex gap-2 mt-2">
                    <div className="w-10 h-24 rounded-b-2xl bg-[#2A2A2A]"></div>
                    <div className="w-10 h-24 rounded-b-2xl bg-[#2A2A2A]"></div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${customization.corRoupa}, transparent)` }}
                ></div>
              </div>

              {/* Current Selection Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#FFFFFF]/60">Corpo:</span>
                  <span className="text-[#FFFFFF] font-medium">
                    {bodyTypes.find(i => i.id === customization.corpo)?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#FFFFFF]/60">Cabelo:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: customization.corCabelo }}></div>
                    <span className="text-[#FFFFFF] font-medium">
                      {hairStyles.find(i => i.id === customization.cabelo)?.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#FFFFFF]/60">Roupa:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: customization.corRoupa }}></div>
                    <span className="text-[#FFFFFF] font-medium">
                      {outfits.find(i => i.id === customization.roupa)?.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#FFFFFF]/60">Acessório:</span>
                  <div className="flex items-center gap-2">
                    {customization.acessorio !== "acess-1" && (
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: customization.corAcessorio }}></div>
                    )}
                    <span className="text-[#FFFFFF] font-medium">
                      {accessories.find(i => i.id === customization.acessorio)?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button className="w-full px-6 py-3 bg-[#00FF00] text-[#0D0D0D] rounded-xl hover:bg-[#00DD00] transition-all font-bold flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Salvar Avatar
              </button>
            </div>
          </div>

          {/* Customization Options */}
          <div className="lg:col-span-2">
            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category.id
                        ? "bg-[#00FF00] text-[#0D0D0D]"
                        : "bg-[#1A1A1A] text-[#FFFFFF]/70 hover:bg-[#00FF00]/10 hover:text-[#00FF00]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Color Target Selector (only for colors tab) */}
            {selectedCategory === "cores" && (
              <div className="mb-6 bg-[#1A1A1A] border border-[#00FF00]/20 rounded-xl p-4">
                <p className="text-[#FFFFFF]/60 text-sm mb-3">Aplicar cor em:</p>
                <div className="flex gap-2">
                  {(["cabelo", "roupa", "acessorio"] as const).map((target) => (
                    <button
                      key={target}
                      onClick={() => setColorTarget(target)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                        colorTarget === target
                          ? "bg-[#00FF00] text-[#0D0D0D]"
                          : "bg-[#2A2A2A] text-[#FFFFFF]/70 hover:bg-[#00FF00]/10 hover:text-[#00FF00]"
                      }`}
                    >
                      {target}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {/* Body Types */}
              {selectedCategory === "corpo" && bodyTypes.map((item) => {
                const isSelected = customization.corpo === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item.id, "corpo")}
                    disabled={!item.unlocked}
                    className={`relative bg-[#1A1A1A] border rounded-2xl p-4 transition-all ${
                      item.unlocked 
                        ? isSelected
                          ? "border-[#00FF00] shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                          : "border-[#00FF00]/20 hover:border-[#00FF00]/50 hover:scale-105"
                        : "border-[#FFFFFF]/10 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#00FF00] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#0D0D0D]" />
                      </div>
                    )}
                    {!item.unlocked && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#FFFFFF]/10 rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-[#FFFFFF]/50" />
                      </div>
                    )}
                    <div className="text-center">
                      <User className={`w-12 h-12 mx-auto mb-2 ${item.unlocked ? "text-[#00FF00]" : "text-[#FFFFFF]/30"}`} />
                      <div className={`font-bold text-sm ${item.unlocked ? "text-[#FFFFFF]" : "text-[#FFFFFF]/50"}`}>
                        {item.name}
                      </div>
                      {item.requirement && !item.unlocked && (
                        <div className="text-xs text-[#FFFFFF]/60 mt-2">
                          🔒 {item.requirement}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Hair Styles */}
              {selectedCategory === "cabelo" && hairStyles.map((item) => {
                const isSelected = customization.cabelo === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item.id, "cabelo")}
                    disabled={!item.unlocked}
                    className={`relative bg-[#1A1A1A] border rounded-2xl p-4 transition-all ${
                      item.unlocked 
                        ? isSelected
                          ? "border-[#00FF00] shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                          : "border-[#00FF00]/20 hover:border-[#00FF00]/50 hover:scale-105"
                        : "border-[#FFFFFF]/10 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#00FF00] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#0D0D0D]" />
                      </div>
                    )}
                    {!item.unlocked && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#FFFFFF]/10 rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-[#FFFFFF]/50" />
                      </div>
                    )}
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full" style={{ backgroundColor: item.unlocked ? customization.corCabelo : "#FFFFFF20" }}></div>
                      <div className={`font-bold text-sm ${item.unlocked ? "text-[#FFFFFF]" : "text-[#FFFFFF]/50"}`}>
                        {item.name}
                      </div>
                      {item.requirement && !item.unlocked && (
                        <div className="text-xs text-[#FFFFFF]/60 mt-2">
                          🔒 {item.requirement}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Outfits */}
              {selectedCategory === "roupa" && outfits.map((item) => {
                const isSelected = customization.roupa === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item.id, "roupa")}
                    disabled={!item.unlocked}
                    className={`relative bg-[#1A1A1A] border rounded-2xl p-4 transition-all ${
                      item.unlocked 
                        ? isSelected
                          ? "border-[#00FF00] shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                          : "border-[#00FF00]/20 hover:border-[#00FF00]/50 hover:scale-105"
                        : "border-[#FFFFFF]/10 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#00FF00] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#0D0D0D]" />
                      </div>
                    )}
                    {!item.unlocked && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#FFFFFF]/10 rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-[#FFFFFF]/50" />
                      </div>
                    )}
                    <div className="text-center">
                      <Shirt className={`w-12 h-12 mx-auto mb-2 ${item.unlocked ? "text-[#00FF00]" : "text-[#FFFFFF]/30"}`} />
                      <div className={`font-bold text-sm ${item.unlocked ? "text-[#FFFFFF]" : "text-[#FFFFFF]/50"}`}>
                        {item.name}
                      </div>
                      {item.requirement && !item.unlocked && (
                        <div className="text-xs text-[#FFFFFF]/60 mt-2">
                          🔒 {item.requirement}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Accessories */}
              {selectedCategory === "acessorio" && accessories.map((item) => {
                const isSelected = customization.acessorio === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item.id, "acessorio")}
                    disabled={!item.unlocked}
                    className={`relative bg-[#1A1A1A] border rounded-2xl p-4 transition-all ${
                      item.unlocked 
                        ? isSelected
                          ? "border-[#00FF00] shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                          : "border-[#00FF00]/20 hover:border-[#00FF00]/50 hover:scale-105"
                        : "border-[#FFFFFF]/10 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#00FF00] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#0D0D0D]" />
                      </div>
                    )}
                    {!item.unlocked && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#FFFFFF]/10 rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-[#FFFFFF]/50" />
                      </div>
                    )}
                    <div className="text-center">
                      <Glasses className={`w-12 h-12 mx-auto mb-2 ${item.unlocked ? "text-[#00FF00]" : "text-[#FFFFFF]/30"}`} />
                      <div className={`font-bold text-sm ${item.unlocked ? "text-[#FFFFFF]" : "text-[#FFFFFF]/50"}`}>
                        {item.name}
                      </div>
                      {item.requirement && !item.unlocked && (
                        <div className="text-xs text-[#FFFFFF]/60 mt-2">
                          🔒 {item.requirement}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Colors */}
              {selectedCategory === "cores" && colors.map((color) => {
                const isSelected = 
                  (colorTarget === "cabelo" && customization.corCabelo === color.hex) ||
                  (colorTarget === "roupa" && customization.corRoupa === color.hex) ||
                  (colorTarget === "acessorio" && customization.corAcessorio === color.hex);
                
                return (
                  <button
                    key={color.id}
                    onClick={() => handleSelectColor(color.hex)}
                    disabled={!color.unlocked}
                    className={`relative bg-[#1A1A1A] border rounded-2xl p-4 transition-all ${
                      color.unlocked 
                        ? isSelected
                          ? "border-[#00FF00] shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                          : "border-[#00FF00]/20 hover:border-[#00FF00]/50 hover:scale-105"
                        : "border-[#FFFFFF]/10 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#00FF00] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#0D0D0D]" />
                      </div>
                    )}
                    {!color.unlocked && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#FFFFFF]/10 rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-[#FFFFFF]/50" />
                      </div>
                    )}
                    <div className="text-center">
                      <div 
                        className="w-12 h-12 mx-auto mb-2 rounded-full border-2 border-[#FFFFFF]/20"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <div className={`font-bold text-sm ${color.unlocked ? "text-[#FFFFFF]" : "text-[#FFFFFF]/50"}`}>
                        {color.name}
                      </div>
                      {color.requirement && !color.unlocked && (
                        <div className="text-xs text-[#FFFFFF]/60 mt-2">
                          🔒 {color.requirement}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Unlock Hint */}
            <div className="mt-8 bg-[#00FF00]/5 border border-[#00FF00]/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-[#00FF00] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-[#FFFFFF] font-bold mb-2">Como Desbloquear Itens</h4>
                  <p className="text-[#FFFFFF]/70 text-sm mb-3">
                    Complete desafios, conquiste objetivos e mantenha sua consistência para desbloquear itens exclusivos para seu avatar.
                  </p>
                  <ul className="space-y-1 text-[#FFFFFF]/60 text-sm">
                    <li>• Complete treinos para desbloquear roupas e acessórios</li>
                    <li>• Atinja metas de peso para itens premium</li>
                    <li>• Mantenha sequências para estilos de cabelo especiais</li>
                    <li>• Conquistas lendárias desbloqueiam itens únicos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
