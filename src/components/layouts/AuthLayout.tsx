import { Outlet, Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-black text-ivory font-body grid lg:grid-cols-2">
      {/* Left Panel — Visual */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=1600&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 p-12">
          <Link to="/" className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-gold" />
            <span className="font-display text-xl font-medium">
              Velvet <span className="text-gold">&</span> Gold
            </span>
          </Link>
        </div>

        <div className="relative z-10 p-12 space-y-6">
          <div className="gold-line w-16 mb-6" />
          <h2 className="font-display text-3xl font-medium leading-tight">
            Where every invitation becomes a timeless keepsake
          </h2>
          <p className="font-body text-ivory/60 max-w-md leading-relaxed">
            Join thousands of couples who have chosen Velvet & Gold to announce
            their most cherished moments with unparalleled elegance.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex flex-col items-center justify-center p-8 md:p-12 relative">
        {/* Mobile logo */}
        <div className="lg:hidden mb-12">
          <Link to="/" className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-gold" />
            <span className="font-display text-xl font-medium">
              Velvet <span className="text-gold">&</span> Gold
            </span>
          </Link>
        </div>

        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
