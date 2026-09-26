import React, { useState, useEffect } from 'react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { TraceShieldLogo } from '../TraceShieldLogo';
import {
  SocialAuthModal,
  SocialProvider,
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  MicrosoftIcon,
} from './SocialAuthModal';
import {
  Eye, EyeOff, Lock, Mail, ArrowRight,
  Sparkles, UserCheck, Shield, AlertCircle,
  ChevronRight,
} from 'lucide-react';

interface LoginPageProps {
  onNavigateRegister: () => void;
  onNavigateWorkspace: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateRegister,
  onNavigateWorkspace,
}) => {
  const { login, quickLogin, customLogoUrl } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [socialModalProvider, setSocialModalProvider] = useState<SocialProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  /* subtle floating particles */
  const particles = Array.from({ length: 18 }, (_, i) => i);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) onNavigateWorkspace();
    else setError(res.error || 'Authentication failed. Please try again.');
  };

  const handleOpenSocial = (provider: SocialProvider) => {
    setSocialModalProvider(provider);
  };

  const handleQuick = (role: UserRole) => {
    quickLogin(role);
    onNavigateWorkspace();
  };

  return (
    <div
      className="min-h-screen w-full flex font-sans overflow-hidden relative"
      style={{ background: 'radial-gradient(ellipse at 20% 50%, #0d0900 0%, #060402 60%, #010101 100%)' }}
    >
      {/* ── Floating particle field ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map(i => (
          <div
            key={i}
            className="absolute rounded-full opacity-0"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: `rgba(251,191,36,${Math.random() * 0.5 + 0.2})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatDot ${Math.random() * 10 + 8}s ease-in-out ${Math.random() * 6}s infinite alternate`,
            }}
          />
        ))}
        {/* Gold constellation lines SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <line x1="5%" y1="80%" x2="20%" y2="60%" stroke="#f59e0b" strokeWidth="0.5"/>
          <line x1="20%" y1="60%" x2="12%" y2="40%" stroke="#f59e0b" strokeWidth="0.5"/>
          <line x1="20%" y1="60%" x2="35%" y2="55%" stroke="#f59e0b" strokeWidth="0.5"/>
          <line x1="80%" y1="20%" x2="90%" y2="40%" stroke="#d97706" strokeWidth="0.5"/>
          <line x1="90%" y1="40%" x2="75%" y2="50%" stroke="#d97706" strokeWidth="0.5"/>
          <circle cx="20%" cy="60%" r="2" fill="#fbbf24" opacity="0.6"/>
          <circle cx="35%" cy="55%" r="1.5" fill="#fbbf24" opacity="0.5"/>
          <circle cx="5%"  cy="80%" r="1.5" fill="#fbbf24" opacity="0.4"/>
          <circle cx="90%" cy="40%" r="2" fill="#d97706" opacity="0.6"/>
          <circle cx="80%" cy="20%" r="1.5" fill="#d97706" opacity="0.4"/>
        </svg>
      </div>

      {/* ── LEFT PANEL — Hero Art ── */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] p-14 relative z-10">
        {/* Top brand */}
        <TraceShieldLogo size="md" customLogoUrl={customLogoUrl} subtitle="SECURE PERFORMANCE BY SNAPDRAGON" />

        {/* Center hero text */}
        <div className="space-y-6">
          {/* Large decorative emblem */}
          <div className="relative">
            <div
              className="absolute -inset-10 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.12) 0%, transparent 70%)' }}
            />
            <TraceShieldLogo size="xl" customLogoUrl={customLogoUrl} showText={false} />
          </div>

          <div className="space-y-3 pt-4">
            <h1 className="text-5xl font-black leading-none tracking-tight text-white">
              Intelligence that{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #fef9c3 0%, #fbbf24 40%, #d97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                protects.
              </span>
            </h1>
            <p className="text-base text-white/40 leading-relaxed max-w-xs font-light">
              On-device AI security that understands context, redacts secrets,
              and verifies evidence locally.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-7 pt-2">
            {[
              { val: 'ACTIVE', label: 'LOCAL-FIRST' },
              { val: '100%',   label: 'LOCAL PIPELINE' },
              { val: 'ARM64',  label: 'TARGET: SNAPDRAGON X' },
            ].map(s => (
              <div key={s.label}>
                <div
                  className="text-2xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.val}
                </div>
                <div className="text-[11px] text-white/30 font-medium tracking-wider uppercase mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-amber-500/50 font-mono tracking-wide pt-1">
            Target runtime: Snapdragon X Series
          </div>
        </div>

        {/* Footer caption */}
        <p className="text-xs text-white/20 font-mono tracking-widest uppercase">
          Snapdragon X Series Target · Local-First Architecture · Zero-Trust Boundary
        </p>
      </div>

      {/* ── RIGHT PANEL — Auth Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-[420px] space-y-7">

          {/* Mobile-only brand */}
          <div className="lg:hidden flex justify-center">
            <TraceShieldLogo size="lg" customLogoUrl={customLogoUrl} subtitle="SECURE PERFORMANCE BY SNAPDRAGON" />
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-white tracking-tight">Welcome back</h2>
            <p className="text-sm text-white/35">Sign in to your TraceShield-AI console</p>
          </div>

          {/* Social buttons */}
          <div className="space-y-2.5">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleOpenSocial('google')}
              className="w-full flex items-center justify-center gap-3 h-11 rounded-2xl border border-white/10 text-sm font-semibold text-white/90 hover:text-white hover:border-white/25 transition-all duration-200 relative overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(66,133,244,0.15)]"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => handleOpenSocial('facebook')}
              className="w-full flex items-center justify-center gap-3 h-11 rounded-2xl border border-white/10 text-sm font-semibold text-white/90 hover:text-white hover:border-white/25 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(24,119,242,0.15)]"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}
            >
              <FacebookIcon />
              <span>Continue with Facebook</span>
            </button>

            {/* GitHub & Microsoft row */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleOpenSocial('github')}
                className="flex items-center justify-center gap-2 h-10 rounded-2xl border border-white/10 text-xs font-semibold text-white/80 hover:text-white hover:border-white/25 transition-all duration-200 cursor-pointer hover:bg-white/[0.06]"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <GitHubIcon />
                <span>GitHub</span>
              </button>
              <button
                type="button"
                onClick={() => handleOpenSocial('microsoft')}
                className="flex items-center justify-center gap-2 h-10 rounded-2xl border border-white/10 text-xs font-semibold text-white/80 hover:text-white hover:border-white/25 transition-all duration-200 cursor-pointer hover:bg-white/[0.06]"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <MicrosoftIcon />
                <span>Microsoft</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12))' }}/>
            <span className="text-xs text-white/25 font-medium tracking-widest uppercase">or</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.12))' }}/>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs text-red-300 border border-red-500/20 bg-red-950/30">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400"/>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/40 tracking-wider uppercase">Email</label>
              <div
                className="relative flex items-center rounded-2xl transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: focused === 'email'
                    ? '1px solid rgba(251,191,36,0.6)'
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: focused === 'email' ? '0 0 0 3px rgba(251,191,36,0.08)' : 'none',
                }}
              >
                <Mail className="absolute left-4 w-4 h-4 text-white/25"/>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="admin@traceshield.ai"
                  className="w-full bg-transparent pl-11 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-white/40 tracking-wider uppercase">Password</label>
                <span className="text-xs text-amber-500/70 hover:text-amber-400 cursor-pointer transition-colors">
                  Forgot password?
                </span>
              </div>
              <div
                className="relative flex items-center rounded-2xl transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: focused === 'password'
                    ? '1px solid rgba(251,191,36,0.6)'
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: focused === 'password' ? '0 0 0 3px rgba(251,191,36,0.08)' : 'none',
                }}
              >
                <Lock className="absolute left-4 w-4 h-4 text-white/25"/>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent pl-11 pr-11 py-3 text-sm text-white placeholder-white/20 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>

            {/* Remember */}
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded transition-all"
                onClick={() => setRememberMe(!rememberMe)}
                style={{
                  background: rememberMe ? 'linear-gradient(135deg, #fbbf24, #d97706)' : 'transparent',
                  border: rememberMe ? 'none' : '1px solid rgba(255,255,255,0.2)',
                }}
              >
                {rememberMe && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L4 7L9 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-xs text-white/35 group-hover:text-white/50 transition-colors">
                Stay signed in on this device
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#0c0800',
                boxShadow: '0 4px 24px rgba(245,158,11,0.25)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 32px rgba(245,158,11,0.45)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(245,158,11,0.25)')}
            >
              {loading ? (
                <span className="h-5 w-5 rounded-full border-2 border-black/30 border-t-black animate-spin"/>
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4"/>
                </>
              )}
            </button>
          </form>

          {/* Quick demo strip */}
          <div
            className="rounded-2xl p-4 space-y-3"
            style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.12)' }}
          >
            <div className="flex items-center gap-2 text-xs text-amber-500/70">
              <Sparkles className="w-3.5 h-3.5"/>
              <span className="font-semibold tracking-wide uppercase">Quick Demo Access</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuick('admin')}
                className="flex items-center gap-2 h-9 px-3 rounded-xl text-xs font-semibold text-amber-300/80 hover:text-amber-200 transition-colors cursor-pointer"
                style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)' }}
              >
                <UserCheck className="w-3.5 h-3.5"/>
                <span>Admin Login</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuick('analyst')}
                className="flex items-center gap-2 h-9 px-3 rounded-xl text-xs font-semibold text-amber-300/80 hover:text-amber-200 transition-colors cursor-pointer"
                style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)' }}
              >
                <Shield className="w-3.5 h-3.5"/>
                <span>Analyst Login</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/25">Don't have an account?</span>
            <button
              type="button"
              onClick={onNavigateRegister}
              className="flex items-center gap-1 text-amber-500/80 hover:text-amber-400 font-semibold transition-colors cursor-pointer"
            >
              Create account <ChevronRight className="w-3.5 h-3.5"/>
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={onNavigateWorkspace}
              className="text-xs text-white/20 hover:text-white/40 transition-colors cursor-pointer"
            >
              Continue as guest →
            </button>
          </div>
        </div>
      </div>

      {/* Social Authentication Modal */}
      {socialModalProvider && (
        <SocialAuthModal
          isOpen={!!socialModalProvider}
          provider={socialModalProvider}
          mode="login"
          onClose={() => setSocialModalProvider(null)}
          onSuccess={onNavigateWorkspace}
        />
      )}

      {/* Particle animation keyframes */}
      <style>{`
        @keyframes floatDot {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(-40px) translateX(15px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
