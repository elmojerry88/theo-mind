'use server'

import { supabaseServer } from '@/lib/supabase/server';
import { Provider } from '@supabase/supabase-js';

export const loginAction = async (provider : Provider) => {

    const auth = await supabaseServer();

     try{
        const {data, error } = await auth.signInWithOAuth({
            provider, 
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback`,
            }
        })

        if (error) throw error;

        return {errorMessage: null, url:data.url}
        
     }
     
     catch (error){
        return {
            errorMessage: [`error supabase: ${error}`]
        }
     }
}