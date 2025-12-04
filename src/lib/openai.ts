import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function analyzePhoto(imageBase64: string) {
  try {
    // Verifica se a API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('API_KEY_MISSING');
    }

    // Garante que o base64 está limpo (sem prefixo data:image)
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analise esta foto de forma detalhada para um app de fitness. Forneça:
              
1. Análise Corporal:
   - Tipo de corpo (ectomorfo, mesomorfo, endomorfo)
   - Percentual de gordura estimado
   - Massa muscular aparente
   - Postura e simetria

2. Pontos Fortes:
   - Grupos musculares desenvolvidos
   - Áreas de destaque

3. Áreas de Melhoria:
   - Grupos musculares que precisam de atenção
   - Sugestões específicas

4. Recomendações:
   - Tipo de treino ideal
   - Foco alimentar
   - Objetivos sugeridos

Seja específico, motivador e profissional. Retorne em formato JSON com as chaves: tipoCorpo, percentualGordura, massaMuscular, postura, pontoFortes (array), areasMelhoria (array), recomendacoes (objeto com treino, alimentacao, objetivos).`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${cleanBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Resposta vazia da API');
    }
    
    const parsedContent = JSON.parse(content);
    
    // Valida se o JSON tem a estrutura esperada
    if (!parsedContent.tipoCorpo || !parsedContent.pontoFortes || !parsedContent.recomendacoes) {
      throw new Error('Formato de resposta inválido');
    }
    
    return parsedContent;
  } catch (error: any) {
    console.error('Erro ao analisar foto:', error);
    
    // Tratamento específico para erro de API key não configurada
    if (error.message === 'API_KEY_MISSING') {
      throw new Error('Configure sua chave da API OpenAI nas variáveis de ambiente (OPENAI_API_KEY).');
    }
    
    // Tratamento de erros da API OpenAI
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      
      if (status === 401) {
        throw new Error('Chave da API OpenAI inválida. Verifique sua OPENAI_API_KEY.');
      }
      
      if (status === 429) {
        // Verifica se é erro de quota ou rate limit
        if (errorData?.error?.code === 'insufficient_quota') {
          throw new Error('Limite de créditos da API OpenAI excedido. Adicione créditos em sua conta OpenAI ou aguarde a renovação do limite.');
        }
        throw new Error('Muitas requisições. Aguarde alguns segundos e tente novamente.');
      }
      
      if (status === 400) {
        throw new Error('Imagem inválida ou muito grande. Tente com outra foto.');
      }
    }
    
    // Mensagens de erro genéricas baseadas no conteúdo
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Chave da API OpenAI inválida ou não configurada.');
      }
      if (error.message.includes('quota') || error.message.includes('insufficient_quota')) {
        throw new Error('Limite de créditos da API OpenAI excedido. Adicione créditos em sua conta OpenAI.');
      }
      if (error.message.includes('rate limit')) {
        throw new Error('Muitas requisições. Aguarde alguns segundos e tente novamente.');
      }
    }
    
    throw new Error('Falha ao analisar a foto. Verifique se a imagem está clara e tente novamente.');
  }
}
