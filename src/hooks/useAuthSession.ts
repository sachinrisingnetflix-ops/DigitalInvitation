import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import { getSession } from '@/services/supabaseAuth';

interface AuthSessionState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
}

export function useAuthSession() {
  const [state, setState] = useState<AuthSessionState>({
    isAuthenticated: false,
    isLoading: true,
    userEmail: null,
  });

  useEffect(() => {
    let mounted = true;
    const client = getSupabaseClient();

    const loadSession = async () => {
      if (!client) {
        setState({ isAuthenticated: false, isLoading: false, userEmail: null });
        return;
      }

      try {
        const { user } = await getSession();
        if (!mounted) return;

        setState({
          isAuthenticated: Boolean(user),
          isLoading: false,
          userEmail: user?.email ?? null,
        });
      } catch {
        if (!mounted) return;
        setState({ isAuthenticated: false, isLoading: false, userEmail: null });
      }
    };

    void loadSession();

    const { data } =
      client?.auth.onAuthStateChange((_event, session) => {
        setState({
          isAuthenticated: Boolean(session?.user),
          isLoading: false,
          userEmail: session?.user.email ?? null,
        });
      }) ?? {};

    return () => {
      mounted = false;
      data?.subscription.unsubscribe();
    };
  }, []);

  return state;
}
