import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Title } from '@/components/ui/Title';
import { getSession, signInWithEmail, signOut, signUpWithEmail, upsertUserProfile } from '@/services/supabaseAuth';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { user } = await getSession();
        if (user?.email) {
          setUserEmail(user.email);
          navigate('/admin', { replace: true });
        }
      } catch (err) {
        console.warn('No active Supabase session yet', err);
      }
    };

    void loadSession();
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      if (mode === 'sign-up') {
        const data = await signUpWithEmail(email, password, { role: 'admin' });
        if (data.user) {
          await upsertUserProfile({
            id: data.user.id,
            name: data.user.email?.split('@')[0] ?? 'Admin',
            email: data.user.email,
            role: 'admin',
          });
        }

        if (data.session) {
          setUserEmail(data.session.user.email ?? null);
          setMessage('Account created. You are now signed in.');
          navigate('/admin', { replace: true });
        } else {
          setMessage('Account created. Please confirm your email before signing in.');
        }
      } else {
        const data = await signInWithEmail(email, password);
        if (data.user) {
          await upsertUserProfile({
            id: data.user.id,
            name: data.user.email?.split('@')[0] ?? 'Admin',
            email: data.user.email,
            role: 'admin',
          });
        }

        setUserEmail(data.user?.email ?? null);
        setMessage('Signed in successfully.');
        navigate('/admin', { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserEmail(null);
      setMessage('Signed out successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign out');
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Title as="h1" variant="card" color="ivory">
          {mode === 'sign-in' ? 'Welcome back' : 'Create your account'}
        </Title>
        <p className="font-body text-body-sm text-ivory/50">
          {mode === 'sign-in'
            ? 'Enter your credentials to access your account'
            : 'Set up Supabase authentication for your invitation workspace'}
        </p>
      </div>

      {userEmail ? (
        <div className="rounded-elegant border border-gold/20 bg-black-50 p-4 text-sm text-ivory/70">
          <p>Signed in as {userEmail}</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : null}

      {message ? <p className="text-sm text-green-400">{message}</p> : null}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block font-body text-label uppercase tracking-[0.15em] text-ivory/70">
              Password
            </label>
            <Link
              to="/"
              className="font-body text-body-sm text-gold hover:text-gold-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full bg-black-50 border border-gold/15 text-ivory placeholder:text-ivory/30 font-body text-body-md rounded-elegant px-4 py-3 pr-12 transition-all duration-300 ease-luxury focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 hover:border-gold/30"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/30 hover:text-ivory/60 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" variant="gold" size="md" className="flex-1" isLoading={isLoading}>
            {mode === 'sign-in' ? 'Sign In' : 'Create Account'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => {
              setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in');
              setError('');
              setMessage('');
            }}
          >
            {mode === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="gold-line w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-4 font-body text-label text-ivory/30">
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="dark" size="md" className="w-full">
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google
      </Button>

      <p className="text-center font-body text-body-sm text-ivory/40">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={() => setMode('sign-up')}
          className="text-gold hover:text-gold-400 transition-colors font-medium"
        >
          Get started
        </button>
      </p>
    </div>
  );
}
