import { Link } from 'react-router-dom';
import { Home, Crown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

export function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-lg">
        <div className="relative inline-block">
          <div className="h-24 w-24 rounded-full bg-gold/10 border border-gold/20 mx-auto flex items-center justify-center">
            <Crown className="h-10 w-10 text-gold" />
          </div>
          <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
            <span className="font-display text-xs text-gold">!</span>
          </div>
        </div>

        <div className="space-y-4">
          <Title as="h1" variant="display" color="gold" align="center">
            404
          </Title>
          <div className="gold-line w-16 mx-auto" />
          <Title as="h2" variant="section" color="ivory" align="center">
            This page has vanished into the ether
          </Title>
          <p className="font-body text-body-md text-ivory/50 max-w-md mx-auto leading-relaxed">
            The page you seek does not exist in our realm. Perhaps it was never meant to be, or perhaps it has moved to a more prestigious address.
          </p>
        </div>

        <Link to="/">
          <Button variant="gold" size="md">
            <Home className="mr-2 h-4 w-4" />
            Return to Elegance
          </Button>
        </Link>
      </div>
    </div>
  );
}
