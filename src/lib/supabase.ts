import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      body_measurements: {
        Row: {
          id: string;
          user_id: string;
          weight: number;
          body_fat: number;
          muscle_mass: number;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          weight: number;
          body_fat: number;
          muscle_mass: number;
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          weight?: number;
          body_fat?: number;
          muscle_mass?: number;
          date?: string;
          created_at?: string;
        };
      };
      workouts: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          exercises: any;
          completed: boolean;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          exercises: any;
          completed?: boolean;
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          exercises?: any;
          completed?: boolean;
          date?: string;
          created_at?: string;
        };
      };
      meals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          calories: number;
          protein: number;
          carbs: number;
          fats: number;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          calories: number;
          protein: number;
          carbs: number;
          fats: number;
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          calories?: number;
          protein?: number;
          carbs?: number;
          fats?: number;
          date?: string;
          created_at?: string;
        };
      };
      challenges: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          target: number;
          progress: number;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          target: number;
          progress?: number;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          target?: number;
          progress?: number;
          completed?: boolean;
          created_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          icon: string;
          unlocked: boolean;
          unlocked_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          icon: string;
          unlocked?: boolean;
          unlocked_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          icon?: string;
          unlocked?: boolean;
          unlocked_at?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
