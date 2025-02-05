import { ConversationChain } from "langchain/chains";
import { model } from "../config/openai";
import { TheoMindTemplate as template } from "../prompts/theo-mind-template.js";
import { bufferMemory } from "../memory/bufferMemory";
import { vectorMemory } from "../memory/vectorMemory";
import { getUserProfile } from "../memory/profileManager";


export async function theomindChatBot(userMessage: string, userId: string) {
  // Recupera o perfil do usuário
  const userProfile = await getUserProfile(userId) || { nome: "Desconhecido" };

  // Salva a mensagem na memória de longo prazo
  await vectorMemory.saveContext({ userMessage });

  //chamar serviço para verificar o usuário

  // Configura a cadeia de conversação
  const chain = new ConversationChain({
    llm: model,
    memory: bufferMemory,
    prompt: template,
  });

  // Gera a resposta do chatbot
  const response = await chain.call({
    profile: JSON.stringify(userProfile),
    userMessage,
  });

  return response.response;
}
