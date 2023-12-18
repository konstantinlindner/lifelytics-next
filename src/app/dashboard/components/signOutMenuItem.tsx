'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import type { Database } from '@/types/supabase.types';

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

function SignOutMenuItem() {
  const router = useRouter();
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut({});
      if (error) console.log(error);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
      Sign out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}

export default SignOutMenuItem;
