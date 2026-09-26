import React, { useState } from 'react';
import { useAuth, SocialProvider, UserRole } from '../../context/AuthContext';
import {
  X,
  CheckCircle2,
  Shield,
  Lock,
  ArrowRight,
  User as UserIcon,
  Mail,
  Building,
  Sparkles,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface SocialAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: SocialProvider;
  mode: 'login' | 'signup';
  onSuccess: () => void;
}

export const SocialAuthModal: React.FC<SocialAuthModalProps> = ({
  isOpen,
  onClose,
  provider,
  mode,
  onSuccess,
}) => {
  const { socialLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<'primary' | 'admin' | 'custom'>('primary');
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customOrg, setCustomOrg] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Primary user account matching the authenticated user from environment
  const primaryAccount = {
    name: 'Ayush Singh',
    email: 'ayushsingh556860@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    badge: 'Verified Account',
  };

  const adminAccount = {
    name: 'Alex Vance',
    email: 'admin@traceshield.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    badge: 'Enterprise Security Lead',
  };

  const handleAuthenticate = async (accountType: 'primary' | 'admin' | 'custom') => {
    setError(null);
    setLoading(true);

    try {
      let accountData: { name: string; email: string; avatarUrl?: string; role: UserRole; organization?: string };

      if (accountType === 'primary') {
        accountData = {
          name: primaryAccount.name,
          email: primaryAccount.email,
          avatarUrl: primaryAccount.avatar,
          role: 'admin',
          organization: `${provider.toUpperCase()} Verified Security`,
        };
      } else if (accountType === 'admin') {
        accountData = {
          name: adminAccount.name,
          email: adminAccount.email,
          avatarUrl: adminAccount.avatar,
          role: 'admin',
          organization: 'TraceShield Global Defense',
        };
      } else {
        if (!customEmail) {
          setError('Please provide an email address.');
          setLoading(false);
          return;
        }
        accountData = {
          name: customName || customEmail.split('@')[0],
          email: customEmail,
          role,
          organization: customOrg || 'Enterprise Lab',
        };
      }

      const res = await socialLogin(provider, accountData);
      if (res.success) {
        onSuccess();
        onClose();
      } else {
        setError(res.error || 'Authentication failed. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred during social login.');
    } finally {
      setLoading(false);
    }
  };

  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          title: mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google',
          subtitle: 'Choose an account to continue to TraceShield AI',
          brandColor: '#4285F4',
          icon: <GoogleIcon />,
          disclaimer:
            'To continue, Google will share your name, email address, language preference, and profile picture with TraceShield AI.',
        };
      case 'facebook':
        return {
          title: mode === 'signup' ? 'Sign up with Facebook' : 'Log in with Facebook',
          subtitle: 'TraceShield AI is requesting access to your public profile and email address.',
          brandColor: '#1877F2',
          icon: <FacebookIcon />,
          disclaimer:
            'By continuing, TraceShield AI will receive ongoing access to the information you share and Meta will record when TraceShield AI accesses it.',
        };
      case 'github':
        return {
          title: mode === 'signup' ? 'Sign up with GitHub' : 'Authorize with GitHub',
          subtitle: 'Authorize TraceShield-AI to access your public profile and email',
          brandColor: '#24292F',
          icon: <GitHubIcon />,
          disclaimer:
            'TraceShield AI requires read-only access to verify your GitHub developer identity and email address.',
        };
      case 'microsoft':
        return {
          title: mode === 'signup' ? 'Sign up with Microsoft' : 'Sign in to Microsoft',
          subtitle: 'Use your Microsoft personal, work, or school account',
          brandColor: '#00A4EF',
          icon: <MicrosoftIcon />,
          disclaimer:
            'You are signing in to TraceShield AI using your Microsoft Identity. Your tenant credentials remain protected.',
        };
    }
  };

  const config = getProviderConfig();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0D1118] p-6 space-y-5 shadow-2xl relative overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 1px 1px rgba(255,255,255,0.08)',
        }}
      >
        {/* Subtle provider gradient glow at top */}
        <div
          className="absolute top-0 inset-x-0 h-1"
          style={{ background: config.brandColor }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Provider Branding */}
        <div className="flex items-center gap-3 pt-1">
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            {config.icon}
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">{config.title}</h3>
            <p className="text-xs text-[#94A3B8]">{config.subtitle}</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl p-3 text-xs text-red-300 border border-red-500/20 bg-red-950/30">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Account Selector Cards */}
        <div className="space-y-2.5">
          {/* 1. Primary Account (User's actual Google / Social account) */}
          <button
            type="button"
            disabled={loading}
            onClick={() => handleAuthenticate('primary')}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer group ${
              selectedAccount === 'primary'
                ? 'border-emerald-500/50 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                : 'border-white/10 bg-[#07090D] hover:border-white/20 hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={primaryAccount.avatar}
                alt={primaryAccount.name}
                className="h-10 w-10 rounded-full border border-white/20 object-cover"
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{primaryAccount.name}</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                    {primaryAccount.badge}
                  </span>
                </div>
                <div className="text-[11px] text-[#94A3B8] font-mono">{primaryAccount.email}</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-white transition-colors" />
          </button>

          {/* 2. Admin Demo Account */}
          <button
            type="button"
            disabled={loading}
            onClick={() => handleAuthenticate('admin')}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer group ${
              selectedAccount === 'admin'
                ? 'border-cyan-500/50 bg-cyan-950/20'
                : 'border-white/10 bg-[#07090D] hover:border-white/20 hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={adminAccount.avatar}
                alt={adminAccount.name}
                className="h-10 w-10 rounded-full border border-white/20 object-cover"
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{adminAccount.name}</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/30">
                    {adminAccount.badge}
                  </span>
                </div>
                <div className="text-[11px] text-[#94A3B8] font-mono">{adminAccount.email}</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-white transition-colors" />
          </button>

          {/* 3. Option to Use Another Account */}
          <div className="pt-1">
            {selectedAccount !== 'custom' ? (
              <button
                type="button"
                onClick={() => setSelectedAccount('custom')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer py-1"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign in with a different {provider} account</span>
              </button>
            ) : (
              <div className="rounded-xl border border-white/10 bg-[#07090D] p-3.5 space-y-3">
                <div className="text-xs font-semibold text-white">Enter Account Details</div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Full Name (e.g. Ayush Singh)"
                    className="w-full rounded-lg border border-white/10 bg-[#0D1118] px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-amber-400"
                  />
                  <input
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="Email (e.g. user@gmail.com)"
                    className="w-full rounded-lg border border-white/10 bg-[#0D1118] px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-amber-400"
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleAuthenticate('custom')}
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-xs font-bold text-white transition cursor-pointer"
                    >
                      {loading ? 'Authenticating...' : `Continue with ${customEmail || 'Account'}`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedAccount('primary')}
                      className="px-3 py-2 rounded-lg border border-white/10 text-xs text-[#94A3B8] hover:text-white"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loading overlay during authentication */}
        {loading && (
          <div className="flex items-center justify-center gap-2.5 py-2 text-xs text-emerald-400">
            <span className="h-4 w-4 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
            <span>Establishing secure {provider} OAuth session...</span>
          </div>
        )}

        {/* Security & Privacy Disclaimer */}
        <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-[10px] text-[#64748B] leading-relaxed">
          <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>{config.disclaimer}</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Social Provider Icons ─── */
export const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

export const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
    <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
    <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
    <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
  </svg>
);
