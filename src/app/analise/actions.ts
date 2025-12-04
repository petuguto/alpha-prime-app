"use server";

import { analyzePhoto } from "@/lib/openai";

export async function analyzePhotoAction(imageBase64: string) {
  try {
    const result = await analyzePhoto(imageBase64);
    return { success: true, data: result };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao analisar foto" 
    };
  }
}
