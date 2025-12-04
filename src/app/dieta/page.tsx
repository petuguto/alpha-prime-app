'use client';

import React, { useState } from 'react';

interface Dieta {
  id: number;
  nome: string;
  tipo: string;
  categoria: 'geral' | 'celebridade';
  descricao: string;
  refeicoes: string[];
  macronutrientes: {
    proteinas: string;
    carboidratos: string;
    gorduras: string;
  };
  celebridade?: string;
}

const dietas: Dieta[] = [
  // Dietas gerais
  {
    id: 1,
    nome: 'Dieta para Ganhar Massa Muscular',
    tipo: 'Ganho de Massa',
    categoria: 'geral',
    descricao: 'Foco em proteínas e carboidratos para promover o crescimento muscular.',
    refeicoes: [
      'Café da manhã: Aveia com frutas e ovos',
      'Lanche: Iogurte grego com nozes',
      'Almoço: Peito de frango com arroz e vegetais',
      'Lanche: Banana com pasta de amendoim',
      'Jantar: Salmão com batata doce e salada'
    ],
    macronutrientes: {
      proteinas: '2.0-2.5g/kg',
      carboidratos: '4-6g/kg',
      gorduras: '1-1.5g/kg'
    }
  },
  {
    id: 2,
    nome: 'Dieta para Perder Gordura',
    tipo: 'Perda de Gordura',
    categoria: 'geral',
    descricao: 'Déficit calórico com foco em alimentos ricos em fibras e proteínas.',
    refeicoes: [
      'Café da manhã: Ovos mexidos com espinafre',
      'Lanche: Maçã com queijo cottage',
      'Almoço: Salada de frango grelhado',
      'Lanche: Cenoura com hummus',
      'Jantar: Peixe branco com quinoa e brócolis'
    ],
    macronutrientes: {
      proteinas: '1.6-2.2g/kg',
      carboidratos: '2-3g/kg',
      gorduras: '0.8-1.2g/kg'
    }
  },
  {
    id: 3,
    nome: 'Dieta para Hipertrofia',
    tipo: 'Hipertrofia',
    categoria: 'geral',
    descricao: 'Equilíbrio entre proteínas, carboidratos e gorduras para maximizar o ganho muscular.',
    refeicoes: [
      'Café da manhã: Smoothie de proteína com frutas',
      'Lanche: Sanduíche de peru com abacate',
      'Almoço: Carne magra com batata e legumes',
      'Lanche: Iogurte com granola',
      'Jantar: Atum com arroz integral e salada'
    ],
    macronutrientes: {
      proteinas: '1.8-2.4g/kg',
      carboidratos: '3-5g/kg',
      gorduras: '1-1.5g/kg'
    }
  },
  {
    id: 4,
    nome: 'Dieta Low Carb para Emagrecimento',
    tipo: 'Perda de Gordura',
    categoria: 'geral',
    descricao: 'Redução de carboidratos para acelerar a queima de gordura.',
    refeicoes: [
      'Café da manhã: Omelete com queijo',
      'Lanche: Nozes e sementes',
      'Almoço: Salada de atum',
      'Lanche: Pepino com cream cheese',
      'Jantar: Bife grelhado com abobrinha'
    ],
    macronutrientes: {
      proteinas: '2.0g/kg',
      carboidratos: '1-2g/kg',
      gorduras: '1.5-2g/kg'
    }
  },
  {
    id: 5,
    nome: 'Dieta High Protein para Massa',
    tipo: 'Ganho de Massa',
    categoria: 'geral',
    descricao: 'Ênfase extrema em proteínas para recuperação muscular.',
    refeicoes: [
      'Café da manhã: Whey protein shake',
      'Lanche: Peito de peru',
      'Almoço: Frango com feijão',
      'Lanche: Ovos cozidos',
      'Jantar: Carne vermelha com lentilhas'
    ],
    macronutrientes: {
      proteinas: '2.5-3g/kg',
      carboidratos: '3-4g/kg',
      gorduras: '1-1.5g/kg'
    }
  },
  {
    id: 16,
    nome: 'Dieta Cetogênica',
    tipo: 'Perda de Gordura',
    categoria: 'geral',
    descricao: 'Muito baixa em carboidratos para induzir cetose e queima de gordura.',
    refeicoes: [
      'Café da manhã: Ovos com abacate',
      'Lanche: Queijo e nozes',
      'Almoço: Salada com salmão',
      'Lanche: Azeitonas e queijo',
      'Jantar: Bife com brócolis'
    ],
    macronutrientes: {
      proteinas: '1.5g/kg',
      carboidratos: '0.5-1g/kg',
      gorduras: '2-3g/kg'
    }
  },
  {
    id: 17,
    nome: 'Dieta Mediterrânea',
    tipo: 'Manutenção',
    categoria: 'geral',
    descricao: 'Baseada em alimentos mediterrâneos para saúde cardiovascular.',
    refeicoes: [
      'Café da manhã: Pão integral com azeite',
      'Lanche: Frutas frescas',
      'Almoço: Peixe com vegetais',
      'Lanche: Iogurte grego',
      'Jantar: Salada com azeite e ervas'
    ],
    macronutrientes: {
      proteinas: '1.2-1.5g/kg',
      carboidratos: '3-4g/kg',
      gorduras: '1.5-2g/kg'
    }
  },
  {
    id: 18,
    nome: 'Dieta Intermitente',
    tipo: 'Perda de Gordura',
    categoria: 'geral',
    descricao: 'Janela de alimentação restrita para melhorar a queima de gordura.',
    refeicoes: [
      'Janela de alimentação: 12h-8h',
      'Café da manhã: Ovos e vegetais',
      'Almoço: Frango com salada',
      'Lanche: Nozes',
      'Jantar: Peixe com quinoa'
    ],
    macronutrientes: {
      proteinas: '1.8g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 19,
    nome: 'Dieta Paleo',
    tipo: 'Ganho de Massa',
    categoria: 'geral',
    descricao: 'Alimentos não processados, focando em carne, peixe e vegetais.',
    refeicoes: [
      'Café da manhã: Ovos com frutas',
      'Lanche: Nozes e sementes',
      'Almoço: Carne grelhada com vegetais',
      'Lanche: Abacate',
      'Jantar: Peixe com batata doce'
    ],
    macronutrientes: {
      proteinas: '2.2g/kg',
      carboidratos: '2-3g/kg',
      gorduras: '1.5-2g/kg'
    }
  },
  {
    id: 20,
    nome: 'Dieta Vegetariana para Hipertrofia',
    tipo: 'Hipertrofia',
    categoria: 'geral',
    descricao: 'Foco em proteínas vegetais para ganho muscular sem carne.',
    refeicoes: [
      'Café da manhã: Tofu scramble',
      'Lanche: Lentilhas',
      'Almoço: Quinoa com feijão',
      'Lanche: Iogurte vegetal',
      'Jantar: Tempeh com vegetais'
    ],
    macronutrientes: {
      proteinas: '2-2.5g/kg',
      carboidratos: '4-5g/kg',
      gorduras: '1-1.5g/kg'
    }
  },
  {
    id: 21,
    nome: 'Dieta para Definição Muscular',
    tipo: 'Cutting',
    categoria: 'geral',
    descricao: 'Controle calórico rigoroso para revelar definição muscular.',
    refeicoes: [
      'Café da manhã: Aveia com claras',
      'Lanche: Whey protein',
      'Almoço: Peito de frango grelhado',
      'Lanche: Vegetais crus',
      'Jantar: Atum em água'
    ],
    macronutrientes: {
      proteinas: '2.2g/kg',
      carboidratos: '1.5-2g/kg',
      gorduras: '0.8-1g/kg'
    }
  },
  {
    id: 61,
    nome: 'Dieta Bulking Limpo',
    tipo: 'Bulking',
    categoria: 'geral',
    descricao: 'Ganho de massa muscular com mínimo acúmulo de gordura.',
    refeicoes: [
      'Café da manhã: Aveia com whey e banana',
      'Lanche: Batata doce com frango',
      'Almoço: Arroz integral com carne magra',
      'Lanche: Shake de proteína com aveia',
      'Jantar: Salmão com quinoa e vegetais'
    ],
    macronutrientes: {
      proteinas: '2.2g/kg',
      carboidratos: '5-6g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 62,
    nome: 'Dieta Bulking Sujo',
    tipo: 'Bulking',
    categoria: 'geral',
    descricao: 'Máximo ganho de massa com alta ingestão calórica.',
    refeicoes: [
      'Café da manhã: Panquecas com mel e ovos',
      'Lanche: Sanduíche de pasta de amendoim',
      'Almoço: Massa com carne e queijo',
      'Lanche: Pizza proteica',
      'Jantar: Hambúrguer caseiro com batata'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '6-8g/kg',
      gorduras: '1.5-2g/kg'
    }
  },
  {
    id: 63,
    nome: 'Dieta Cutting Agressivo',
    tipo: 'Cutting',
    categoria: 'geral',
    descricao: 'Perda rápida de gordura mantendo massa muscular.',
    refeicoes: [
      'Café da manhã: Claras de ovos com espinafre',
      'Lanche: Whey isolado',
      'Almoço: Tilápia com brócolis',
      'Lanche: Pepino e cenoura',
      'Jantar: Frango grelhado com salada'
    ],
    macronutrientes: {
      proteinas: '2.5g/kg',
      carboidratos: '1-1.5g/kg',
      gorduras: '0.5-0.8g/kg'
    }
  },
  {
    id: 64,
    nome: 'Dieta Cutting Moderado',
    tipo: 'Cutting',
    categoria: 'geral',
    descricao: 'Perda gradual de gordura com melhor sustentabilidade.',
    refeicoes: [
      'Café da manhã: Ovos com aveia',
      'Lanche: Iogurte grego',
      'Almoço: Frango com batata doce',
      'Lanche: Maçã com pasta de amendoim',
      'Jantar: Peixe com quinoa'
    ],
    macronutrientes: {
      proteinas: '2.2g/kg',
      carboidratos: '2-2.5g/kg',
      gorduras: '0.8-1g/kg'
    }
  },
  {
    id: 65,
    nome: 'Dieta Recomposição Corporal',
    tipo: 'Recomposição',
    categoria: 'geral',
    descricao: 'Ganhar músculo e perder gordura simultaneamente.',
    refeicoes: [
      'Café da manhã: Ovos com aveia e frutas',
      'Lanche: Whey protein',
      'Almoço: Carne magra com arroz integral',
      'Lanche: Iogurte com nozes',
      'Jantar: Salmão com batata doce'
    ],
    macronutrientes: {
      proteinas: '2.3g/kg',
      carboidratos: '3-4g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 66,
    nome: 'Dieta Carb Cycling',
    tipo: 'Cutting',
    categoria: 'geral',
    descricao: 'Alternância de carboidratos para otimizar perda de gordura.',
    refeicoes: [
      'Dias altos: Arroz, batata, aveia',
      'Dias baixos: Vegetais, proteínas',
      'Dias médios: Quinoa, batata doce',
      'Sempre: Proteínas magras',
      'Gorduras: Moderadas e constantes'
    ],
    macronutrientes: {
      proteinas: '2.2g/kg',
      carboidratos: '1-5g/kg (variável)',
      gorduras: '1g/kg'
    }
  },
  {
    id: 67,
    nome: 'Dieta IIFYM (If It Fits Your Macros)',
    tipo: 'Flexível',
    categoria: 'geral',
    descricao: 'Flexibilidade alimentar focando em macronutrientes.',
    refeicoes: [
      'Café da manhã: Qualquer fonte de proteína + carbo',
      'Lanche: Ajuste conforme macros',
      'Almoço: Proteína + carbo + gordura',
      'Lanche: Conforme necessidade',
      'Jantar: Completar macros do dia'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '3-4g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 68,
    nome: 'Dieta Warrior',
    tipo: 'Perda de Gordura',
    categoria: 'geral',
    descricao: 'Uma grande refeição à noite após jejum diurno.',
    refeicoes: [
      'Manhã: Jejum ou frutas leves',
      'Tarde: Vegetais crus',
      'Noite: Grande refeição completa',
      'Proteínas: Carne, peixe, ovos',
      'Carboidratos: Arroz, batata, vegetais'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '3g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 69,
    nome: 'Dieta Anabólica',
    tipo: 'Ganho de Massa',
    categoria: 'geral',
    descricao: 'Ciclos de baixo e alto carboidrato para ganho muscular.',
    refeicoes: [
      'Dias de semana: Baixo carbo, alta gordura',
      'Fim de semana: Alto carbo, baixa gordura',
      'Proteínas: Sempre altas',
      'Timing: Carbos pós-treino',
      'Gorduras: Saudáveis e naturais'
    ],
    macronutrientes: {
      proteinas: '2.5g/kg',
      carboidratos: '1-6g/kg (ciclado)',
      gorduras: '1-2g/kg (ciclado)'
    }
  },
  {
    id: 70,
    nome: 'Dieta Carnívora',
    tipo: 'Perda de Gordura',
    categoria: 'geral',
    descricao: 'Apenas produtos de origem animal.',
    refeicoes: [
      'Café da manhã: Ovos e bacon',
      'Lanche: Queijo',
      'Almoço: Bife com manteiga',
      'Lanche: Carne seca',
      'Jantar: Salmão ou cordeiro'
    ],
    macronutrientes: {
      proteinas: '2-2.5g/kg',
      carboidratos: '0g/kg',
      gorduras: '2-3g/kg'
    }
  },
  {
    id: 31,
    nome: 'Dieta DASH',
    tipo: 'Perda de Gordura',
    categoria: 'geral',
    descricao: 'Dietary Approaches to Stop Hypertension, focada em reduzir pressão arterial e peso.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Iogurte desnatado',
      'Almoço: Peixe com vegetais',
      'Lanche: Nozes',
      'Jantar: Salada com frango'
    ],
    macronutrientes: {
      proteinas: '1.6g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 32,
    nome: 'Dieta Atkins',
    tipo: 'Perda de Gordura',
    categoria: 'geral',
    descricao: 'Fases de redução gradual de carboidratos para perda de peso rápida.',
    refeicoes: [
      'Café da manhã: Ovos com bacon',
      'Lanche: Queijo',
      'Almoço: Salada com carne',
      'Lanche: Nozes',
      'Jantar: Peixe com vegetais'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '1-2g/kg',
      gorduras: '2g/kg'
    }
  },
  {
    id: 33,
    nome: 'Dieta Zona',
    tipo: 'Manutenção',
    categoria: 'geral',
    descricao: 'Equilíbrio hormonal através de proporções específicas de macronutrientes.',
    refeicoes: [
      'Café da manhã: Ovos com vegetais',
      'Lanche: Proteína magra',
      'Almoço: Peixe com salada',
      'Lanche: Frutas',
      'Jantar: Carne com legumes'
    ],
    macronutrientes: {
      proteinas: '1.8g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 34,
    nome: 'Dieta South Beach',
    tipo: 'Perda de Gordura',
    categoria: 'geral',
    descricao: 'Fases que ensinam a escolher carboidratos bons e eliminar os ruins.',
    refeicoes: [
      'Café da manhã: Omelete com vegetais',
      'Lanche: Queijo cottage',
      'Almoço: Salada de atum',
      'Lanche: Nozes',
      'Jantar: Frango grelhado'
    ],
    macronutrientes: {
      proteinas: '1.8g/kg',
      carboidratos: '2-3g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 35,
    nome: 'Dieta Flexitariana',
    tipo: 'Manutenção',
    categoria: 'geral',
    descricao: 'Vegetariana flexível que permite carne ocasionalmente.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Iogurte',
      'Almoço: Lentilhas com vegetais',
      'Lanche: Nozes',
      'Jantar: Peixe ou tofu'
    ],
    macronutrientes: {
      proteinas: '1.5g/kg',
      carboidratos: '3g/kg',
      gorduras: '1.2g/kg'
    }
  },
  // Dietas de celebridades
  {
    id: 6,
    nome: 'Dieta de Cristiano Ronaldo',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Cristiano Ronaldo',
    descricao: 'Dieta equilibrada com foco em proteínas e vegetais frescos.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Frutas e nozes',
      'Almoço: Peixe com vegetais',
      'Lanche: Iogurte natural',
      'Jantar: Carne magra com salada'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '4g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 7,
    nome: 'Dieta de Dwayne Johnson (The Rock)',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Dwayne Johnson',
    descricao: 'Alta caloria com refeições frequentes para manutenção muscular.',
    refeicoes: [
      'Café da manhã: Ovos e aveia',
      'Lanche: Shake de proteína',
      'Almoço: Frango com arroz',
      'Lanche: Frutas',
      'Jantar: Peixe com batata doce'
    ],
    macronutrientes: {
      proteinas: '2.5g/kg',
      carboidratos: '5g/kg',
      gorduras: '1.5g/kg'
    }
  },
  {
    id: 8,
    nome: 'Dieta de Serena Williams',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Serena Williams',
    descricao: 'Dieta rica em vegetais e proteínas magras para performance atlética.',
    refeicoes: [
      'Café da manhã: Smoothie verde',
      'Lanche: Nozes',
      'Almoço: Salada de quinoa',
      'Lanche: Maçã',
      'Jantar: Salmão com vegetais'
    ],
    macronutrientes: {
      proteinas: '1.8g/kg',
      carboidratos: '3g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 9,
    nome: 'Dieta de LeBron James',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'LeBron James',
    descricao: 'Foco em carboidratos complexos e proteínas para energia.',
    refeicoes: [
      'Café da manhã: Panquecas de aveia',
      'Lanche: Banana',
      'Almoço: Frango com macarrão',
      'Lanche: Iogurte',
      'Jantar: Carne com batata'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '4.5g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 10,
    nome: 'Dieta de Chris Hemsworth',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Chris Hemsworth',
    descricao: 'Dieta paleo com ênfase em alimentos naturais.',
    refeicoes: [
      'Café da manhã: Ovos e frutas',
      'Lanche: Nozes',
      'Almoço: Carne grelhada',
      'Lanche: Abacate',
      'Jantar: Peixe com vegetais'
    ],
    macronutrientes: {
      proteinas: '2.2g/kg',
      carboidratos: '3g/kg',
      gorduras: '1.5g/kg'
    }
  },
  {
    id: 11,
    nome: 'Dieta de Tom Brady',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Tom Brady',
    descricao: 'Dieta anti-inflamatória com alimentos orgânicos.',
    refeicoes: [
      'Café da manhã: Aveia com sementes',
      'Lanche: Frutas',
      'Almoço: Salada de folhas',
      'Lanche: Nozes',
      'Jantar: Peixe com quinoa'
    ],
    macronutrientes: {
      proteinas: '1.5g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 12,
    nome: 'Dieta de Gisele Bündchen',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Gisele Bündchen',
    descricao: 'Dieta vegana com foco em alimentos crus.',
    refeicoes: [
      'Café da manhã: Smoothie de frutas',
      'Lanche: Salada',
      'Almoço: Quinoa com vegetais',
      'Lanche: Frutas',
      'Jantar: Salada de folhas'
    ],
    macronutrientes: {
      proteinas: '1.2g/kg',
      carboidratos: '3g/kg',
      gorduras: '0.8g/kg'
    }
  },
  {
    id: 13,
    nome: 'Dieta de Michael Phelps',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Michael Phelps',
    descricao: 'Alta caloria para suportar treinos intensos.',
    refeicoes: [
      'Café da manhã: Cereais com leite',
      'Lanche: Sanduíche',
      'Almoço: Massa com frango',
      'Lanche: Frutas',
      'Jantar: Pizza saudável'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '6g/kg',
      gorduras: '1.5g/kg'
    }
  },
  {
    id: 14,
    nome: 'Dieta de Jennifer Lopez',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Jennifer Lopez',
    descricao: 'Dieta balanceada com porções controladas.',
    refeicoes: [
      'Café da manhã: Iogurte com frutas',
      'Lanche: Nozes',
      'Almoço: Salada de frango',
      'Lanche: Maçã',
      'Jantar: Peixe com vegetais'
    ],
    macronutrientes: {
      proteinas: '1.6g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 15,
    nome: 'Dieta de Usain Bolt',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Usain Bolt',
    descricao: 'Foco em carboidratos para energia explosiva.',
    refeicoes: [
      'Café da manhã: Aveia com banana',
      'Lanche: Iogurte',
      'Almoço: Arroz com feijão',
      'Lanche: Frutas',
      'Jantar: Carne com batata'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '5g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 22,
    nome: 'Dieta de Arnold Schwarzenegger',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Arnold Schwarzenegger',
    descricao: 'Dieta clássica de bodybuilding com alto volume calórico.',
    refeicoes: [
      'Café da manhã: Ovos e aveia',
      'Lanche: Shake de proteína',
      'Almoço: Frango com arroz',
      'Lanche: Frutas e nozes',
      'Jantar: Carne vermelha com batata'
    ],
    macronutrientes: {
      proteinas: '2.5g/kg',
      carboidratos: '5-6g/kg',
      gorduras: '1.5g/kg'
    }
  },
  {
    id: 23,
    nome: 'Dieta de Beyoncé',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Beyoncé',
    descricao: 'Dieta vegana com foco em alimentos orgânicos e crus.',
    refeicoes: [
      'Café da manhã: Smoothie verde',
      'Lanche: Frutas',
      'Almoço: Salada de quinoa',
      'Lanche: Nozes',
      'Jantar: Vegetais grelhados'
    ],
    macronutrientes: {
      proteinas: '1.4g/kg',
      carboidratos: '3g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 24,
    nome: 'Dieta de David Beckham',
    tipo: 'Manutenção',
    categoria: 'celebridade',
    celebridade: 'David Beckham',
    descricao: 'Dieta equilibrada para manter forma física.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Iogurte',
      'Almoço: Peixe com vegetais',
      'Lanche: Frutas',
      'Jantar: Salada com frango'
    ],
    macronutrientes: {
      proteinas: '1.8g/kg',
      carboidratos: '3.5g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 25,
    nome: 'Dieta de Madonna',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Madonna',
    descricao: 'Dieta macrobiótica com ênfase em alimentos integrais.',
    refeicoes: [
      'Café da manhã: Cereais integrais',
      'Lanche: Frutas secas',
      'Almoço: Salada de algas',
      'Lanche: Chá verde',
      'Jantar: Vegetais cozidos no vapor'
    ],
    macronutrientes: {
      proteinas: '1.2g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '0.8g/kg'
    }
  },
  {
    id: 26,
    nome: 'Dieta de Elon Musk',
    tipo: 'Manutenção',
    categoria: 'celebridade',
    celebridade: 'Elon Musk',
    descricao: 'Dieta minimalista focada em eficiência energética.',
    refeicoes: [
      'Café da manhã: Café preto',
      'Lanche: Nozes',
      'Almoço: Salada simples',
      'Lanche: Frutas',
      'Jantar: Peixe grelhado'
    ],
    macronutrientes: {
      proteinas: '1.5g/kg',
      carboidratos: '2g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 27,
    nome: 'Dieta de Oprah Winfrey',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Oprah Winfrey',
    descricao: 'Dieta baseada em porções controladas e alimentos saudáveis.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Maçã',
      'Almoço: Salada de frango',
      'Lanche: Iogurte',
      'Jantar: Peixe com vegetais'
    ],
    macronutrientes: {
      proteinas: '1.6g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 28,
    nome: 'Dieta de Conor McGregor',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Conor McGregor',
    descricao: 'Dieta rica em proteínas para performance no MMA.',
    refeicoes: [
      'Café da manhã: Ovos e batata',
      'Lanche: Shake de proteína',
      'Almoço: Frango com arroz',
      'Lanche: Banana',
      'Jantar: Carne vermelha com legumes'
    ],
    macronutrientes: {
      proteinas: '2.3g/kg',
      carboidratos: '4g/kg',
      gorduras: '1.4g/kg'
    }
  },
  {
    id: 29,
    nome: 'Dieta de Gal Gadot',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Gal Gadot',
    descricao: 'Dieta mediterrânea adaptada para definição.',
    refeicoes: [
      'Café da manhã: Iogurte grego',
      'Lanche: Nozes',
      'Almoço: Salada de atum',
      'Lanche: Frutas',
      'Jantar: Peixe com azeite'
    ],
    macronutrientes: {
      proteinas: '1.7g/kg',
      carboidratos: '2.8g/kg',
      gorduras: '1.1g/kg'
    }
  },
  {
    id: 30,
    nome: 'Dieta de Ryan Reynolds',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Ryan Reynolds',
    descricao: 'Dieta balanceada com foco em proteínas e carboidratos.',
    refeicoes: [
      'Café da manhã: Aveia com ovos',
      'Lanche: Whey protein',
      'Almoço: Frango com batata doce',
      'Lanche: Maçã',
      'Jantar: Salmão com quinoa'
    ],
    macronutrientes: {
      proteinas: '2.1g/kg',
      carboidratos: '4.2g/kg',
      gorduras: '1.3g/kg'
    }
  },
  {
    id: 36,
    nome: 'Dieta de Kim Kardashian',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Kim Kardashian',
    descricao: 'Dieta low carb com foco em proteínas para manter curvas.',
    refeicoes: [
      'Café da manhã: Ovos com abacate',
      'Lanche: Iogurte grego',
      'Almoço: Salada de frango',
      'Lanche: Nozes',
      'Jantar: Peixe com vegetais'
    ],
    macronutrientes: {
      proteinas: '1.8g/kg',
      carboidratos: '2g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 37,
    nome: 'Dieta de Neymar',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Neymar',
    descricao: 'Dieta brasileira rica em carboidratos e proteínas para explosão.',
    refeicoes: [
      'Café da manhã: Pão com ovo',
      'Lanche: Banana',
      'Almoço: Arroz com feijão e frango',
      'Lanche: Iogurte',
      'Jantar: Carne com batata'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '5g/kg',
      gorduras: '1.3g/kg'
    }
  },
  {
    id: 38,
    nome: 'Dieta de Scarlett Johansson',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Scarlett Johansson',
    descricao: 'Dieta balanceada com ênfase em alimentos anti-inflamatórios.',
    refeicoes: [
      'Café da manhã: Smoothie de frutas',
      'Lanche: Nozes',
      'Almoço: Salada de quinoa',
      'Lanche: Maçã',
      'Jantar: Salmão com vegetais'
    ],
    macronutrientes: {
      proteinas: '1.6g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 39,
    nome: 'Dieta de Tom Cruise',
    tipo: 'Manutenção',
    categoria: 'celebridade',
    celebridade: 'Tom Cruise',
    descricao: 'Dieta rigorosa para manter forma para cenas de ação.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Proteína shake',
      'Almoço: Peito de frango grelhado',
      'Lanche: Vegetais crus',
      'Jantar: Peixe com salada'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '3g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 40,
    nome: 'Dieta de Rihanna',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Rihanna',
    descricao: 'Dieta caribenha com influências veganas e controle calórico.',
    refeicoes: [
      'Café da manhã: Smoothie tropical',
      'Lanche: Frutas',
      'Almoço: Salada de frutas do mar',
      'Lanche: Nozes',
      'Jantar: Vegetais grelhados'
    ],
    macronutrientes: {
      proteinas: '1.5g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 46,
    nome: 'Dieta de Taylor Swift',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Taylor Swift',
    descricao: 'Dieta balanceada com foco em saúde mental e controle de peso.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Iogurte grego',
      'Almoço: Salada de frango',
      'Lanche: Maçã',
      'Jantar: Peixe com vegetais'
    ],
    macronutrientes: {
      proteinas: '1.6g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 47,
    nome: 'Dieta de Leonardo DiCaprio',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Leonardo DiCaprio',
    descricao: 'Dieta vegana com foco em sustentabilidade e saúde planetária.',
    refeicoes: [
      'Café da manhã: Smoothie verde',
      'Lanche: Frutas',
      'Almoço: Salada de quinoa',
      'Lanche: Nozes',
      'Jantar: Vegetais orgânicos'
    ],
    macronutrientes: {
      proteinas: '1.4g/kg',
      carboidratos: '3g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 48,
    nome: 'Dieta de Angelina Jolie',
    tipo: 'Manutenção',
    categoria: 'celebridade',
    celebridade: 'Angelina Jolie',
    descricao: 'Dieta saudável para energia e bem-estar familiar.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Iogurte',
      'Almoço: Salada de atum',
      'Lanche: Nozes',
      'Jantar: Peixe grelhado'
    ],
    macronutrientes: {
      proteinas: '1.7g/kg',
      carboidratos: '2.8g/kg',
      gorduras: '1.1g/kg'
    }
  },
  {
    id: 49,
    nome: 'Dieta de Will Smith',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Will Smith',
    descricao: 'Dieta energética para performance em filmes de ação.',
    refeicoes: [
      'Café da manhã: Ovos e aveia',
      'Lanche: Shake de proteína',
      'Almoço: Frango com arroz',
      'Lanche: Banana',
      'Jantar: Carne com batata doce'
    ],
    macronutrientes: {
      proteinas: '2.2g/kg',
      carboidratos: '4.5g/kg',
      gorduras: '1.3g/kg'
    }
  },
  {
    id: 50,
    nome: 'Dieta de Emma Watson',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Emma Watson',
    descricao: 'Dieta vegana ativista com foco em direitos animais.',
    refeicoes: [
      'Café da manhã: Smoothie de frutas',
      'Lanche: Salada',
      'Almoço: Quinoa com vegetais',
      'Lanche: Frutas',
      'Jantar: Legumes grelhados'
    ],
    macronutrientes: {
      proteinas: '1.3g/kg',
      carboidratos: '3g/kg',
      gorduras: '0.9g/kg'
    }
  },
  {
    id: 56,
    nome: 'Dieta de Adele',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Adele',
    descricao: 'Dieta rigorosa para perda de peso significativa e manutenção.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Maçã',
      'Almoço: Salada de frango',
      'Lanche: Iogurte grego',
      'Jantar: Peixe grelhado com vegetais'
    ],
    macronutrientes: {
      proteinas: '1.8g/kg',
      carboidratos: '2g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 57,
    nome: 'Dieta de George Clooney',
    tipo: 'Manutenção',
    categoria: 'celebridade',
    celebridade: 'George Clooney',
    descricao: 'Dieta mediterrânea para longevidade e saúde cardíaca.',
    refeicoes: [
      'Café da manhã: Café com frutas',
      'Lanche: Nozes',
      'Almoço: Peixe com azeite',
      'Lanche: Queijo',
      'Jantar: Salada com ervas'
    ],
    macronutrientes: {
      proteinas: '1.6g/kg',
      carboidratos: '3g/kg',
      gorduras: '1.5g/kg'
    }
  },
  {
    id: 58,
    nome: 'Dieta de Hugh Jackman',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Hugh Jackman',
    descricao: 'Dieta intensa para Wolverine, focada em proteínas e força.',
    refeicoes: [
      'Café da manhã: Ovos e aveia',
      'Lanche: Shake de proteína',
      'Almoço: Frango com batata doce',
      'Lanche: Banana',
      'Jantar: Carne vermelha com legumes'
    ],
    macronutrientes: {
      proteinas: '2.4g/kg',
      carboidratos: '4g/kg',
      gorduras: '1.4g/kg'
    }
  },
  {
    id: 59,
    nome: 'Dieta de Zendaya',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Zendaya',
    descricao: 'Dieta vegana jovem com foco em energia e definição.',
    refeicoes: [
      'Café da manhã: Smoothie de frutas',
      'Lanche: Nozes',
      'Almoço: Salada de quinoa',
      'Lanche: Abacate',
      'Jantar: Tofu com vegetais'
    ],
    macronutrientes: {
      proteinas: '1.5g/kg',
      carboidratos: '3g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 60,
    nome: 'Dieta de Bruno Mars',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Bruno Mars',
    descricao: 'Dieta energética para performances no palco com foco em resistência.',
    refeicoes: [
      'Café da manhã: Panquecas de aveia',
      'Lanche: Frutas tropicais',
      'Almoço: Arroz com feijão',
      'Lanche: Iogurte',
      'Jantar: Frango com batata'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '5g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 71,
    nome: 'Dieta de Lionel Messi',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Lionel Messi',
    descricao: 'Dieta mediterrânea adaptada para futebol de alto nível.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Nozes e frutas secas',
      'Almoço: Peixe com vegetais',
      'Lanche: Iogurte',
      'Jantar: Frango com salada'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '4.5g/kg',
      gorduras: '1.2g/kg'
    }
  },
  {
    id: 72,
    nome: 'Dieta de Simone Biles',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Simone Biles',
    descricao: 'Alta energia para ginástica olímpica.',
    refeicoes: [
      'Café da manhã: Panquecas com frutas',
      'Lanche: Banana',
      'Almoço: Frango com arroz',
      'Lanche: Iogurte',
      'Jantar: Salmão com batata doce'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '5g/kg',
      gorduras: '1.3g/kg'
    }
  },
  {
    id: 73,
    nome: 'Dieta de Kevin Hart',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Kevin Hart',
    descricao: 'Dieta disciplinada para manter definição e energia.',
    refeicoes: [
      'Café da manhã: Ovos com aveia',
      'Lanche: Whey protein',
      'Almoço: Frango grelhado com vegetais',
      'Lanche: Maçã',
      'Jantar: Peixe com salada'
    ],
    macronutrientes: {
      proteinas: '2g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 74,
    nome: 'Dieta de Ariana Grande',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Ariana Grande',
    descricao: 'Dieta vegana com foco em alimentos integrais.',
    refeicoes: [
      'Café da manhã: Smoothie de frutas',
      'Lanche: Nozes',
      'Almoço: Salada de quinoa',
      'Lanche: Frutas',
      'Jantar: Tofu com vegetais'
    ],
    macronutrientes: {
      proteinas: '1.4g/kg',
      carboidratos: '3g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 75,
    nome: 'Dieta de Jason Momoa',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Jason Momoa',
    descricao: 'Dieta robusta para Aquaman com foco em força.',
    refeicoes: [
      'Café da manhã: Ovos e batata',
      'Lanche: Shake de proteína',
      'Almoço: Carne vermelha com arroz',
      'Lanche: Frutas',
      'Jantar: Peixe com batata doce'
    ],
    macronutrientes: {
      proteinas: '2.3g/kg',
      carboidratos: '4.5g/kg',
      gorduras: '1.4g/kg'
    }
  },
  {
    id: 76,
    nome: 'Dieta de Margot Robbie',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Margot Robbie',
    descricao: 'Dieta balanceada para manter forma de Harley Quinn.',
    refeicoes: [
      'Café da manhã: Aveia com frutas',
      'Lanche: Iogurte grego',
      'Almoço: Salada de frango',
      'Lanche: Nozes',
      'Jantar: Peixe com vegetais'
    ],
    macronutrientes: {
      proteinas: '1.7g/kg',
      carboidratos: '2.5g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 77,
    nome: 'Dieta de Shaquille O\'Neal',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Shaquille O\'Neal',
    descricao: 'Alta caloria para manter massa muscular gigante.',
    refeicoes: [
      'Café da manhã: Ovos e panquecas',
      'Lanche: Shake de proteína',
      'Almoço: Frango com arroz',
      'Lanche: Sanduíche',
      'Jantar: Carne com batata'
    ],
    macronutrientes: {
      proteinas: '2.2g/kg',
      carboidratos: '5.5g/kg',
      gorduras: '1.5g/kg'
    }
  },
  {
    id: 78,
    nome: 'Dieta de Billie Eilish',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Billie Eilish',
    descricao: 'Dieta vegana jovem com foco em bem-estar.',
    refeicoes: [
      'Café da manhã: Smoothie verde',
      'Lanche: Frutas',
      'Almoço: Salada de quinoa',
      'Lanche: Nozes',
      'Jantar: Vegetais grelhados'
    ],
    macronutrientes: {
      proteinas: '1.3g/kg',
      carboidratos: '3g/kg',
      gorduras: '1g/kg'
    }
  },
  {
    id: 79,
    nome: 'Dieta de Keanu Reeves',
    tipo: 'Ganho de Massa',
    categoria: 'celebridade',
    celebridade: 'Keanu Reeves',
    descricao: 'Dieta para John Wick com foco em resistência.',
    refeicoes: [
      'Café da manhã: Ovos com aveia',
      'Lanche: Proteína shake',
      'Almoço: Frango com batata doce',
      'Lanche: Banana',
      'Jantar: Carne com vegetais'
    ],
    macronutrientes: {
      proteinas: '2.1g/kg',
      carboidratos: '4g/kg',
      gorduras: '1.3g/kg'
    }
  },
  {
    id: 80,
    nome: 'Dieta de Shakira',
    tipo: 'Perda de Gordura',
    categoria: 'celebridade',
    celebridade: 'Shakira',
    descricao: 'Dieta mediterrânea para energia e definição.',
    refeicoes: [
      'Café da manhã: Iogurte com frutas',
      'Lanche: Nozes',
      'Almoço: Peixe com salada',
      'Lanche: Frutas',
      'Jantar: Vegetais com azeite'
    ],
    macronutrientes: {
      proteinas: '1.6g/kg',
      carboidratos: '2.8g/kg',
      gorduras: '1.2g/kg'
    }
  }
];

export default function DietaPage() {
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
  const [filtroCategoria, setFiltroCategoria] = useState<'geral' | 'celebridade' | 'todos'>('todos');

  const tipos = ['Todos', 'Ganho de Massa', 'Perda de Gordura', 'Hipertrofia', 'Cutting', 'Bulking', 'Recomposição', 'Flexível', 'Manutenção'];
  const categorias = ['todos', 'geral', 'celebridade'];

  const dietasFiltradas = dietas.filter(dieta => {
    const matchTipo = filtroTipo === 'Todos' || dieta.tipo === filtroTipo;
    const matchCategoria = filtroCategoria === 'todos' || dieta.categoria === filtroCategoria;
    return matchTipo && matchCategoria;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Planos de Dieta</h1>
        
        {/* Filtros */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Tipo de Dieta</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {tipos.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value as 'geral' | 'celebridade' | 'todos')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'todos' ? 'Todas' : cat === 'geral' ? 'Gerais' : 'Celebridades'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid de Dietas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dietasFiltradas.map(dieta => (
            <div key={dieta.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{dieta.nome}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  dieta.tipo === 'Ganho de Massa' ? 'bg-green-100 text-green-800' :
                  dieta.tipo === 'Perda de Gordura' ? 'bg-red-100 text-red-800' :
                  dieta.tipo === 'Hipertrofia' ? 'bg-blue-100 text-blue-800' :
                  dieta.tipo === 'Cutting' ? 'bg-orange-100 text-orange-800' :
                  dieta.tipo === 'Bulking' ? 'bg-emerald-100 text-emerald-800' :
                  dieta.tipo === 'Recomposição' ? 'bg-cyan-100 text-cyan-800' :
                  dieta.tipo === 'Flexível' ? 'bg-pink-100 text-pink-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {dieta.tipo}
                </span>
              </div>
              
              {dieta.celebridade && (
                <p className="text-sm text-gray-600 mb-2">Celebridade: {dieta.celebridade}</p>
              )}
              
              <p className="text-gray-700 mb-4">{dieta.descricao}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Macronutrientes (por kg):</h4>
                <div className="text-sm text-gray-600">
                  <p>Proteínas: {dieta.macronutrientes.proteinas}</p>
                  <p>Carboidratos: {dieta.macronutrientes.carboidratos}</p>
                  <p>Gorduras: {dieta.macronutrientes.gorduras}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Refeições Diárias:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {dieta.refeicoes.map((refeicao, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {refeicao}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {dietasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma dieta encontrada com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
