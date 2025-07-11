import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const getUser = async () => {

  const auth = await supabaseServer();

  const user = (await auth.getUser()).data.user;

  return user;
}

export async function supabaseServer(){

  const cookieStore = await cookies()

  const supabaseClient =  createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )

  return supabaseClient.auth
}