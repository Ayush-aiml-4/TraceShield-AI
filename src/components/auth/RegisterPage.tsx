import React, { useState } from 'react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { TraceShieldLogo } from '../TraceShieldLogo';
import {
  Eye, EyeOff, Lock, Mail, User as UserIcon, Building,
  ArrowRight, CheckCircle2, AlertCircle, Shield, ChevronLeft,
} from 'lucide-react';

interface RegisterPageProps {
  onNavigateLogin: () => void;
  onNavigateWorkspace: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onNavigateLogin,
  onNavigateWorkspace,
}) => {
  const { register, quickLogin, customLogoUrl } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<UserRole>('analyst');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const pwStrength = (() => {
    if (!password) return null;
    if (password.length < 6) return { label: 'Weak', pct: '25%', color: '#ef4444' };
    if (password.length < 10) return { label: 'Fair', pct: '55%', color: '#f59e0b' };
    return { label: 'Strong', pct: '100%', color: '#10b981' };
  })();

  const handleSocial = async (provider: 'google' | 'facebook') => {
    setSocialLoading(provider);
    await new Promise(r => setTimeout(r, 600));
    quickLogin(role);
    setSocialLoading(null);
    onNavigateWorkspace();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    const res = await register({ name, email, organization, role, password });
    setLoading(false);
    if (res.success) onNavigateWorkspace();
    else setError(res.error || 'Registration failed. Please try again.');
  };

  const inputStyle = (field: string) => ({
    background: 'rgba(255,255,255,0.04)',
    border: focused === field
      ? '1px solid rgba(251,191,36,0.55)'
      : '1px solid rgba(255,255,255,0.08)',
    boxShadow: focused === field ? '0 0 0 3px rgba(251,191,36,0.07)' : 'none',
    transition: 'all 0.2s',
  });

  return (
    <div
      className="min-h-screen w-full flex font-sans overflow-hidden relative"
      style={{ background: 'radial-gradient(ellipse at 80% 50%, #0d0900 0%, #060402 60%, #010101 100%)' }}
    >
      {/* Constellation overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <line x1="85%" y1="10%" x2="95%" y2="30%" stroke="#f59e0b" strokeWidth="0.5"/>
          <line x1="95%" y1="30%" x2="80%" y2="45%" stroke="#f59e0b" strokeWidth="0.5"/>
          <circle cx="85%" cy="10%" r="2" fill="#fbbf24" opacity="0.6"/>
          <circle cx="95%" cy="30%" r="1.5" fill="#fbbf24" opacity="0.5"/>
          <line x1="5%" y1="20%" x2="15%" y2="40%" stroke="#d97706" strokeWidth="0.5"/>
          <circle cx="5%" cy="20%" r="1.5" fill="#d97706" opacity="0.5"/>
          <circle cx="15%" cy="40%" r="1.5" fill="#d97706" opacity="0.4"/>
        </svg>
      </div>

      {/* ── RIGHT PANEL — Hero (desktop only) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] order-2 p-14 relative z-10">
        <div className="flex justify-end">
          <TraceShieldLogo size="md" customLogoUrl={customLogoUrl} subtitle="SECURE PERFORMANCE BY SNAPDRAGON" />
        </div>

        <div className="space-y-8">
          <div className="relative">
            <div
              className="absolute -inset-10 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.10) 0%, transparent 70%)' }}
            />
            <TraceShieldLogo size="xl" customLogoUrl={customLogoUrl} showText={false} />
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl font-black leading-none tracking-tight text-white">
              Join the{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #fef9c3 0%, #fbbf24 40%, #d97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                defense.
              </span>
            </h1>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs font-light">
              Deploy military-grade on-device AI evidence security for your entire security team.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-col gap-2.5">
            {[
              'End-to-end on-device processing',
              'Zero data sent to external servers',
              'Qualcomm Hexagon NPU acceleration',
              'Multi-policy security engine',
            ].map(f => (
              <div key={f} className="flex items-center gap-2.5 text-xs text-white/40">
                <CheckCircle2 className="w-4 h-4 text-amber-500/60 shrink-0"/>
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/15 font-mono tracking-widest uppercase text-right">
          TraceShield-AI · Enterprise Edition
        </p>
      </div>

      {/* ── LEFT PANEL — Registration Form ── */}
      <div className="flex-1 order-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-[420px] space-y-7">

          {/* Mobile brand */}
          <div className="lg:hidden flex justify-center">
            <TraceShieldLogo size="lg" customLogoUrl={customLogoUrl} subtitle="SECURE PERFORMANCE BY SNAPDRAGON" />
          </div>

          {/* Back to login */}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5"/>
            Back to sign in
          </button>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight">Create your account</h2>
            <p className="text-sm text-white/35">Join TraceShield-AI in under 60 seconds</p>
          </div>

          {/* Social signup */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocial('google')}
              disabled={!!socialLoading}
              className="flex items-center justify-center gap-2 h-11 rounded-2xl text-sm font-semibold text-white/70 hover:text-white transition-all cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              {socialLoading === 'google'
                ? <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>
                : <><GoogleIcon /><span>Google</span></>
              }
            </button>
            <button
              type="button"
              onClick={() => handleSocial('facebook')}
              disabled={!!socialLoading}
              className="flex items-center justify-center gap-2 h-11 rounded-2xl text-sm font-semibold text-white/70 hover:text-white transition-all cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              {socialLoading === 'facebook'
                ? <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>
                : <><FacebookIcon /><span>Facebook</span></>
              }
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.10))' }}/>
            <span className="text-xs text-white/20 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.10))' }}/>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs text-red-300 border border-red-500/20 bg-red-950/25">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0"/>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Org */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/35 tracking-wider uppercase">Name</label>
                <div className="relative flex items-center rounded-2xl" style={inputStyle('name')}>
                  <UserIcon className="absolute left-3.5 w-3.5 h-3.5 text-white/20"/>
                  <input
                    type="text" required value={name} onChange={e => setName(e.target.value)}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    placeholder="Alex Vance"
                    className="w-full bg-transparent pl-9 pr-3 py-2.5 text-sm text-white placeholder-white/15 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/35 tracking-wider uppercase">Org</label>
                <div className="relative flex items-center rounded-2xl" style={inputStyle('org')}>
                  <Building className="absolute left-3.5 w-3.5 h-3.5 text-white/20"/>
                  <input
                    type="text" value={organization} onChange={e => setOrganization(e.target.value)}
                    onFocus={() => setFocused('org')} onBlur={() => setFocused(null)}
                    placeholder="Cyber Ops"
                    className="w-full bg-transparent pl-9 pr-3 py-2.5 text-sm text-white placeholder-white/15 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/35 tracking-wider uppercase">Work Email</label>
              <div className="relative flex items-center rounded-2xl" style={inputStyle('email')}>
                <Mail className="absolute left-4 w-4 h-4 text-white/20"/>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  placeholder="name@organization.com"
                  className="w-full bg-transparent pl-11 pr-4 py-3 text-sm text-white placeholder-white/15 outline-none"
                />
              </div>
            </div>

            {/* Role toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/35 tracking-wider uppercase">Access Level</label>
              <div
                className="grid grid-cols-2 gap-0.5 rounded-2xl p-0.5"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {(['analyst', 'admin'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className="py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                    style={
                      role === r
                        ? { background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0c0800' }
                        : { color: 'rgba(255,255,255,0.3)' }
                    }
                  >
                    {r === 'analyst' ? '🔍 Analyst' : '⚙️ Admin'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/20 leading-relaxed">
                {role === 'admin'
                  ? 'Full portal access: NPU config, policies, team management & branding.'
                  : 'Evidence scanning, redaction, risk assessment & verification tools.'}
              </p>
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/35 tracking-wider uppercase">Password</label>
                <div className="relative flex items-center rounded-2xl" style={inputStyle('pw')}>
                  <Lock className="absolute left-3.5 w-3.5 h-3.5 text-white/20"/>
                  <input
                    type={showPassword ? 'text' : 'password'} required
                    value={password} onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocused('pw')} onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    className="w-full bg-transparent pl-9 pr-8 py-2.5 text-sm text-white placeholder-white/15 outline-none"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-white/20 hover:text-white/50 transition">
                    {showPassword ? <EyeOff className="w-3.5 h-3.5"/> : <Eye className="w-3.5 h-3.5"/>}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/35 tracking-wider uppercase">Confirm</label>
                <div className="relative flex items-center rounded-2xl" style={inputStyle('cpw')}>
                  <Lock className="absolute left-3.5 w-3.5 h-3.5 text-white/20"/>
                  <input
                    type={showPassword ? 'text' : 'password'} required
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocused('cpw')} onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    className="w-full bg-transparent pl-9 pr-3 py-2.5 text-sm text-white placeholder-white/15 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Strength bar */}
            {pwStrength && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white/25">Password strength</span>
                  <span style={{ color: pwStrength.color }} className="font-semibold">{pwStrength.label}</span>
                </div>
                <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: pwStrength.pct, background: pwStrength.color }}
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="w-full h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#0c0800',
                boxShadow: '0 4px 24px rgba(245,158,11,0.22)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 32px rgba(245,158,11,0.42)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(245,158,11,0.22)')}
            >
              {loading
                ? <span className="h-5 w-5 rounded-full border-2 border-black/30 border-t-black animate-spin"/>
                : <><span>Create Account</span><ArrowRight className="w-4 h-4"/></>
              }
            </button>
          </form>

          <p className="text-center text-xs text-white/20">
            Already have an account?{' '}
            <button
              type="button" onClick={onNavigateLogin}
              className="text-amber-500/70 hover:text-amber-400 font-semibold transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─── Inline brand icons ─── */
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
