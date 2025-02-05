import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { supabase } from "../config/supabase.js";

export const vectorMemory = new SupabaseVectorStore({
  client: supabase,
  tableName: "long_term_memory", // Tabela no Supabase
  embeddingModel: "openai-text-embedding-ada-002",
});
