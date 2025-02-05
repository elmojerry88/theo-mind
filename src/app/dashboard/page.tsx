import { getUser } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  
  const user = await getUser();

  if (!user) {
    return redirect('/');
  } else {
    redirect('/dashboard/overview');
  }

  
}
