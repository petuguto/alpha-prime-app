"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus, Mail, Lock, User, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        if (data.user) {
          router.push("/");
          router.refresh();
        }
      } else {
        // Cadastro
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          router.push("/");
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00FF00] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FF00] rounded-full blur-[150px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-[#00FF00]" />
            <span className="text-[#00FF00] text-sm font-medium">Powered by AI</span>
          </div>
          
          <h1 className="text-4xl font-bold text-[#FFFFFF] mb-2">
            Alpha<span className="text-[#00FF00]">Prime</span>
          </h1>
          <p className="text-[#FFFFFF]/60">
            {isLogin ? "Entre na sua conta" : "Crie sua conta"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field (apenas no cadastro) */}
            {!isLogin && (
              <div>
                <label className="block text-[#FFFFFF] text-sm font-medium mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00FF00]/50" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-[#00FF00]/20 rounded-lg pl-10 pr-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#00FF00]/50 transition-colors"
                    placeholder="Seu nome"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-[#FFFFFF] text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00FF00]/50" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-[#00FF00]/20 rounded-lg pl-10 pr-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#00FF00]/50 transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[#FFFFFF] text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00FF00]/50" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-[#00FF00]/20 rounded-lg pl-10 pr-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#00FF00]/50 transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00FF00] text-[#0D0D0D] py-3 rounded-lg font-bold hover:bg-[#00DD00] transition-all hover:scale-105 shadow-lg shadow-[#00FF00]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Carregando...</span>
              ) : (
                <>
                  {isLogin ? (
                    <>
                      <LogIn className="w-5 h-5" />
                      Entrar
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Criar Conta
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Cadastro */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-[#00FF00] hover:text-[#00DD00] transition-colors text-sm"
            >
              {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
