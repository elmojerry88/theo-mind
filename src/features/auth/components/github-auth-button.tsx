'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useTransition } from 'react';
import { Provider } from '@supabase/supabase-js';
import { loginAction } from "@/app/actions/users";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"

export default function GithubSignInButton() {

  const { toast } = useToast()

  const router = useRouter();

  const [isPending, startTransition] = useTransition()

  const handleLoginButton = (provider : Provider) => {
    startTransition(async () => {
      const {errorMessage, url} = await loginAction(provider)

      if (!errorMessage && url) {
        router.push(url)
      }else{
        toast({
          variant: "destructive",
          title: "Uh oh! Algo correu mal",
          description: `§${errorMessage}`,
        })
      }
    })
  }

  return (
    <Button
      className='w-full'
      variant='outline'
      type='button'
      onClick={() => handleLoginButton("github")}
      disabled={isPending}
    >
      <Icons.gitHub className='mr-2 h-4 w-4' />
      {isPending ? "Entrando na sua conta..." : "Continuar com GitHub"}
    </Button>
  );
}
