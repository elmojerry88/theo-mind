import { ChatOpenAI } from "@langchain/openai";

const openaiApiKey = process.env.OPENAI_API_KEY || "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"; 

export const model = new ChatOpenAI({
  temperature: 0.7,
  modelName: "gpt-4o-mini",
  openAIApiKey: openaiApiKey,
});
