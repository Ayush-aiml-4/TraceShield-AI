import React from 'react';
import { ExecutionBackend, HardwarePlatform } from '../types';
import { Cpu, Gauge, Terminal, Shield, LogOut, Lock, User as UserIcon, Settings } from 'lucide-react';
import { InfoPopover } from './InfoPopover';
import { useAuth } from '../context/AuthContext';
import { TraceShieldLogo } from './TraceShieldLogo';

interface HeaderProps {
  hardwarePlatform: HardwarePlatform;
  executionBackend: ExecutionBackend;
  backendDisplay?: string;
  qnnValidated?: boolean;
  onToggleBackend: () => void;
  onOpenDemo: () => void;
  onOpenRuntime: () => void;
  onOpenDiagnostics: () => void;
  onNavigateAdmin?: () => void;
  onNavigateLogin?: () => void;
  onNavigateRegister?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  hardwarePlatform,
  executionBackend,
  backendDisplay,
  qnnValidated,
  onToggleBackend,
  onOpenDemo,
  onOpenRuntime,
  onOpenDiagnostics,
  onNavigateAdmin,
  onNavigateLogin,
  onNavigateRegister,
}) => {
  const { user, isAuthenticated, logout, customLogoUrl } = useAuth();

  const isQnn = executionBackend === ExecutionBackend.QNN_NPU;
  const displayString =
    backendDisplay ||
    (isQnn
      ? qnnValidated
        ? 'QNN NPU ✓'
        : 'QNN NPU (NOT VALIDATED)'
      : executionBackend === ExecutionBackend.CPU
      ? 'CPU'
      : executionBackend === ExecutionBackend.MOCK
      ? 'MOCK'
      : 'UNVALIDATED');

  return (
    <header className="border-b border-white/[0.07] bg-[#07090D]/90 px-4 sm:px-8 py-3 backdrop-blur-2xl sticky top-0 z-30 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      {/* Top subtle rim highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        {/* Brand & Vector/Custom Logo */}
        <div className="flex items-center gap-3">
          <TraceShieldLogo
            size="md"
            customLogoUrl={customLogoUrl}
            subtitle="Understand locally. Sanitize intelligently. Verify before you share."
          />
          <InfoPopover
            title="TraceShield-AI"
            description="Autonomous on-device security workspace designed to understand, sanitize, and independently verify technical evidence before release."
          />
        </div>

        {/* Right Navigation & Control Group */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs">
          {/* Target Hardware Badge */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-[#0D1118]/80 px-2.5 py-1.5 text-[#B7C0CB] backdrop-blur-md">
            <span className="text-[#7D8794] text-[11px] font-sans">Target:</span>
            <span className="text-[#F2F5F8] font-medium text-[11px] font-sans">Snapdragon X Series</span>
            <InfoPopover
              title="Target Hardware Profile"
              description="Challenge target platform is Qualcomm Snapdragon X Series. The current host inspection detects whether you are running on Snapdragon or host container."
            />
          </div>

          {/* Local Badge */}
          <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/25 bg-emerald-950/30 px-2.5 py-1.5 text-emerald-300 font-sans text-[11px] font-semibold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span className="tracking-wide">LOCAL</span>
          </div>

          {/* Execution Backend Cycle Button */}
          <button
            type="button"
            onClick={onToggleBackend}
            title="Click to cycle execution backend (CPU, QNN_NPU, DIRECTML, MOCK, UNVALIDATED)"
            aria-label={`Cycle execution backend. Currently ${displayString}`}
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-[#0D1118]/80 hover:bg-[#141A23] hover:border-white/15 px-2.5 py-1.5 text-[#B7C0CB] transition-colors cursor-pointer"
          >
            <Cpu className="h-3.5 w-3.5 text-[#7D8794]" />
            <span className="text-[#7D8794] text-[11px] font-sans">Backend:</span>
            <span
              className={`font-mono text-[11px] font-medium ${
                isQnn && qnnValidated
                  ? 'text-emerald-400'
                  : isQnn
                  ? 'text-amber-300'
                  : 'text-[#F2F5F8]'
              }`}
            >
              {displayString}
            </span>
          </button>

          {/* Action Drawers */}
          <button
            type="button"
            onClick={onOpenDemo}
            aria-label="Open demo scenarios drawer"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-[#0D1118]/80 hover:bg-[#141A23] hover:border-white/15 px-3 py-1.5 font-sans font-medium text-[#B7C0CB] hover:text-[#F2F5F8] transition-colors cursor-pointer"
          >
            <Terminal className="h-3.5 w-3.5 text-[#7D8794]" />
            <span>Demo</span>
          </button>

          <button
            type="button"
            onClick={onOpenRuntime}
            aria-label="Open runtime telemetry drawer"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-[#0D1118]/80 hover:bg-[#141A23] hover:border-white/15 px-3 py-1.5 font-sans font-medium text-[#B7C0CB] hover:text-[#F2F5F8] transition-colors cursor-pointer"
          >
            <Gauge className="h-3.5 w-3.5 text-[#7D8794]" />
            <span>Runtime</span>
          </button>

          <button
            type="button"
            onClick={onOpenDiagnostics}
            aria-label="Open hardware diagnostics modal"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-[#141A23] hover:bg-[#181F29] hover:border-white/20 px-3 py-1.5 font-sans font-semibold text-[#F2F5F8] shadow-[0_1px_4px_rgba(0,0,0,0.3)] transition-colors cursor-pointer"
          >
            <span>Diagnostics</span>
          </button>

          {/* Admin Portal Button */}
          {isAuthenticated && user?.role === 'admin' && onNavigateAdmin && (
            <button
              type="button"
              onClick={onNavigateAdmin}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 hover:from-emerald-900 hover:to-cyan-900 px-3 py-1.5 font-sans font-bold text-emerald-300 transition cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)]"
            >
              <Settings className="h-3.5 w-3.5 text-emerald-400" />
              <span>Admin Portal</span>
            </button>
          )}

          {/* Auth State Bar */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-white/10">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-white/10 bg-[#0D1118]">
                <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-[10px] text-white">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <span className="font-semibold text-white text-[11px] block leading-none">{user.name}</span>
                  <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase">{user.role}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Sign Out"
                className="p-1.5 rounded-lg border border-white/10 bg-[#0D1118] hover:bg-red-950/50 hover:border-red-500/40 text-slate-400 hover:text-red-300 transition cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-1 border-l border-white/10">
              {onNavigateLogin && (
                <button
                  type="button"
                  onClick={onNavigateLogin}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#0D1118] hover:bg-[#141A23] font-semibold text-[#CBD5E1] transition cursor-pointer text-xs"
                >
                  Sign In
                </button>
              )}
              {onNavigateRegister && (
                <button
                  type="button"
                  onClick={onNavigateRegister}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 font-bold text-white transition cursor-pointer text-xs shadow-md"
                >
                  Register
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
