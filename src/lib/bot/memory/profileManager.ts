import { supabase } from "../config/supabase.js";

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Erro ao buscar perfil:", error);
    return null;
  }
  return data;
}

export async function updateUserProfile(profileData: Object, userId: string) {
  const { error } = await supabase
    .from("user_profiles")
    .upsert({ id: userId, ...profileData });

  if (error) {
    console.error("Erro ao atualizar perfil:", error);
  }
}
