"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { LogIn, UserPlus, Mail, Lock, User, Zap, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const { loading: authLoading } = useAuth(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        // O hook useAuth vai redirecionar automaticamente
      } else {
        // Cadastro
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;

        if (data.user) {
          // Criar perfil do usuário
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([
              {
                id: data.user.id,
                email: email,
                name: name,
              },
            ]);

          if (profileError) console.error("Erro ao criar perfil:", profileError);

          // Mostra mensagem de confirmação de email
          setShowEmailConfirmation(true);
          setEmail("");
          setPassword("");
          setName("");
        }
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-[#00FF00] text-xl">Carregando...</div>
      </div>
    );
  }

  // Tela de confirmação de email
  if (showEmailConfirmation) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 py-12">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#00FF00] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FF00] rounded-full blur-[150px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-8 shadow-xl shadow-[#00FF00]/5 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-[#00FF00]" />
            </div>

            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-3">
              Confirme seu email
            </h2>

            <p className="text-[#FFFFFF]/60 mb-6">
              Enviamos um link de confirmação para o seu email. Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
            </p>

            <div className="bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-xl p-4 mb-6">
              <p className="text-[#00FF00] text-sm">
                <Mail className="w-4 h-4 inline mr-2" />
                Não se esqueça de verificar a pasta de spam!
              </p>
            </div>

            <button
              onClick={() => {
                setShowEmailConfirmation(false);
                setIsLogin(true);
              }}
              className="w-full bg-[#00FF00] text-[#0D0D0D] py-3 rounded-xl font-bold hover:bg-[#00DD00] transition-all hover:scale-105 shadow-lg shadow-[#00FF00]/20"
            >
              Voltar para Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00FF00] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FF00] rounded-full blur-[150px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-[#00FF00]" />
            <span className="text-[#00FF00] text-sm font-medium">Powered by AI</span>
          </div>

          <h1 className="text-4xl font-bold text-[#FFFFFF] mb-2 font-[family-name:var(--font-inter)]">
            Alpha<span className="text-[#00FF00]">Prime</span>
          </h1>

          <p className="text-[#FFFFFF]/60 font-[family-name:var(--font-inter)]">
            {isLogin ? "Entre na sua conta" : "Crie sua conta"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-8 shadow-xl shadow-[#00FF00]/5">
          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-6 bg-[#0D0D0D] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                isLogin
                  ? "bg-[#00FF00] text-[#0D0D0D]"
                  : "text-[#FFFFFF]/60 hover:text-[#FFFFFF]"
              }`}
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                !isLogin
                  ? "bg-[#00FF00] text-[#0D0D0D]"
                  : "text-[#FFFFFF]/60 hover:text-[#FFFFFF]"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Cadastro
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-[#FFFFFF]/80 text-sm font-medium mb-2">
                  Nome
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFFFFF]/40" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required={!isLogin}
                    className="w-full bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl pl-11 pr-4 py-3 text-[#FFFFFF] placeholder:text-[#FFFFFF]/40 focus:outline-none focus:border-[#00FF00]/50 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[#FFFFFF]/80 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFFFFF]/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl pl-11 pr-4 py-3 text-[#FFFFFF] placeholder:text-[#FFFFFF]/40 focus:outline-none focus:border-[#00FF00]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#FFFFFF]/80 text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFFFFF]/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl pl-11 pr-4 py-3 text-[#FFFFFF] placeholder:text-[#FFFFFF]/40 focus:outline-none focus:border-[#00FF00]/50 transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00FF00] text-[#0D0D0D] py-3 rounded-xl font-bold hover:bg-[#00DD00] transition-all hover:scale-105 shadow-lg shadow-[#00FF00]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-[#FFFFFF]/60">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-[#00FF00] hover:underline font-medium"
            >
              {isLogin ? "Cadastre-se" : "Faça login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
