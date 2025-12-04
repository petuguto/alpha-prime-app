"use client";

import { useState } from "react";
import { Camera, Upload, Loader2, CheckCircle, XCircle, TrendingUp, Target, Dumbbell } from "lucide-react";
import { analyzePhotoAction } from "./actions";

interface AnalysisResult {
  tipoCorpo: string;
  percentualGordura: string;
  massaMuscular: string;
  postura: string;
  pontoFortes: string[];
  areasMelhoria: string[];
  recomendacoes: {
    treino: string;
    alimentacao: string;
    objetivos: string;
  };
}

export default function AnalisePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Remove o prefixo data:image/...;base64,
      const base64Data = selectedImage.split(',')[1];
      
      const response = await analyzePhotoAction(base64Data);
      
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || "Erro ao analisar foto");
      }
    } catch (err) {
      setError("Erro ao processar análise. Tente novamente.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-full px-4 py-2 mb-4">
            <Camera className="w-4 h-4 text-[#00FF00]" />
            <span className="text-[#00FF00] text-sm font-medium">Análise com IA</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FFFFFF] mb-4 font-[family-name:var(--font-inter)]">
            Análise <span className="text-[#00FF00]">Corporal</span>
          </h1>
          
          <p className="text-lg text-[#FFFFFF]/70 max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            Envie uma foto e nossa IA fornecerá uma análise detalhada do seu corpo, pontos fortes e recomendações personalizadas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-[#FFFFFF] mb-6 font-[family-name:var(--font-inter)]">
                Upload da Foto
              </h2>

              {!selectedImage ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[#00FF00]/30 rounded-xl cursor-pointer hover:border-[#00FF00]/50 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-[#00FF00]/50 mb-4 group-hover:text-[#00FF00] transition-colors" />
                    <p className="mb-2 text-sm text-[#FFFFFF]/70">
                      <span className="font-semibold text-[#00FF00]">Clique para enviar</span> ou arraste
                    </p>
                    <p className="text-xs text-[#FFFFFF]/50">PNG, JPG ou JPEG (MAX. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <label className="flex-1 bg-[#00FF00]/10 border border-[#00FF00]/30 text-[#00FF00] px-4 py-3 rounded-lg font-medium text-center cursor-pointer hover:bg-[#00FF00]/20 transition-all">
                      Trocar Foto
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="flex-1 bg-[#00FF00] text-[#0D0D0D] px-4 py-3 rounded-lg font-bold hover:bg-[#00DD00] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analisando...
                        </>
                      ) : (
                        <>
                          <Camera className="w-5 h-5" />
                          Analisar Foto
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 font-[family-name:var(--font-inter)]">
                Dicas para melhor análise
              </h3>
              <ul className="space-y-2 text-sm text-[#FFFFFF]/70">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00FF00] mt-0.5 flex-shrink-0" />
                  <span>Use boa iluminação natural</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00FF00] mt-0.5 flex-shrink-0" />
                  <span>Tire foto de corpo inteiro</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00FF00] mt-0.5 flex-shrink-0" />
                  <span>Use roupas justas ou traje de banho</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00FF00] mt-0.5 flex-shrink-0" />
                  <span>Mantenha postura natural e relaxada</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-red-500 mb-2">Erro na Análise</h3>
                    <p className="text-red-400/80 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Análise Corporal */}
                <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-[#FFFFFF] mb-6 font-[family-name:var(--font-inter)]">
                    Análise Corporal
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-[#00FF00]/5 border border-[#00FF00]/20 rounded-xl p-4">
                      <div className="text-[#FFFFFF]/60 text-sm mb-1">Tipo de Corpo</div>
                      <div className="text-[#00FF00] font-bold text-lg">{result.tipoCorpo}</div>
                    </div>
                    
                    <div className="bg-[#00FF00]/5 border border-[#00FF00]/20 rounded-xl p-4">
                      <div className="text-[#FFFFFF]/60 text-sm mb-1">% Gordura Estimado</div>
                      <div className="text-[#00FF00] font-bold text-lg">{result.percentualGordura}</div>
                    </div>
                    
                    <div className="bg-[#00FF00]/5 border border-[#00FF00]/20 rounded-xl p-4">
                      <div className="text-[#FFFFFF]/60 text-sm mb-1">Massa Muscular</div>
                      <div className="text-[#00FF00] font-bold text-lg">{result.massaMuscular}</div>
                    </div>
                    
                    <div className="bg-[#00FF00]/5 border border-[#00FF00]/20 rounded-xl p-4">
                      <div className="text-[#FFFFFF]/60 text-sm mb-1">Postura</div>
                      <div className="text-[#00FF00] font-bold text-lg">{result.postura}</div>
                    </div>
                  </div>
                </div>

                {/* Pontos Fortes */}
                <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-[#00FF00]" />
                    <h3 className="text-lg font-bold text-[#FFFFFF] font-[family-name:var(--font-inter)]">
                      Pontos Fortes
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {result.pontoFortes.map((ponto, index) => (
                      <li key={index} className="flex items-start gap-2 text-[#FFFFFF]/80 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#00FF00] mt-0.5 flex-shrink-0" />
                        <span>{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Áreas de Melhoria */}
                <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-[#00FF00]" />
                    <h3 className="text-lg font-bold text-[#FFFFFF] font-[family-name:var(--font-inter)]">
                      Áreas de Melhoria
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {result.areasMelhoria.map((area, index) => (
                      <li key={index} className="flex items-start gap-2 text-[#FFFFFF]/80 text-sm">
                        <div className="w-4 h-4 border-2 border-[#00FF00] rounded-full mt-0.5 flex-shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recomendações */}
                <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Dumbbell className="w-5 h-5 text-[#00FF00]" />
                    <h3 className="text-lg font-bold text-[#FFFFFF] font-[family-name:var(--font-inter)]">
                      Recomendações Personalizadas
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-[#00FF00] font-semibold text-sm mb-2">Treino Ideal</div>
                      <p className="text-[#FFFFFF]/80 text-sm">{result.recomendacoes.treino}</p>
                    </div>
                    
                    <div>
                      <div className="text-[#00FF00] font-semibold text-sm mb-2">Foco Alimentar</div>
                      <p className="text-[#FFFFFF]/80 text-sm">{result.recomendacoes.alimentacao}</p>
                    </div>
                    
                    <div>
                      <div className="text-[#00FF00] font-semibold text-sm mb-2">Objetivos Sugeridos</div>
                      <p className="text-[#FFFFFF]/80 text-sm">{result.recomendacoes.objetivos}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!result && !error && !isAnalyzing && (
              <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-12 text-center">
                <Camera className="w-16 h-16 text-[#00FF00]/30 mx-auto mb-4" />
                <p className="text-[#FFFFFF]/50 font-[family-name:var(--font-inter)]">
                  Envie uma foto para começar a análise
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
