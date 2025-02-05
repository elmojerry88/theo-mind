import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sigin-view';
import { getUser } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'theoMind | Sign In',
  description: 'Sign In page for authentication.'
};

export default async function Page() {
  
  const user = await getUser();

  if(user){
    return redirect("/dashboard");
  }
  return <SignInViewPage/>;

  // return <SignInViewPage/>;
}
