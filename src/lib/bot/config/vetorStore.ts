import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { supabase } from "./supabase";

export const vectorStore = await SupabaseVectorStore.fromExistingIndex(
  supabase,
  new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY || "",
  })
);

export async function saveToVectorStore(
  text: string,
  metadata: Record<string, any> = {}
): Promise<void> {
  await vectorStore.addDocuments([{ pageContent: text, metadata }]);
}

export async function searchVectorStore(query: string, k = 5): Promise<any[]> {
  return await vectorStore.similaritySearch(query, k);
}
