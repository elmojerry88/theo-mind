import { BufferMemory } from "langchain/memory";

export const bufferMemory = new BufferMemory({
  memoryKey: "chat_history", // Chave para armazenar o histórico
});
