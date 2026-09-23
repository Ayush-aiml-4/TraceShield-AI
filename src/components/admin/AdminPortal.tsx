import React, { useState } from 'react';
import { useAuth, User, UserRole } from '../../context/AuthContext';
import { TraceShieldLogo } from '../TraceShieldLogo';
import {
  Shield,
  Cpu,
  Users,
  Settings,
  Activity,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Plus,
  Trash2,
  Upload,
  RefreshCw,
  Search,
  ArrowLeft,
  Sliders,
  Sparkles,
  Zap,
  Globe,
  Database,
  ExternalLink,
} from 'lucide-react';

interface AdminPortalProps {
  onBackToWorkspace: () => void;
}

// Mock Audit Log Records for Admin View
const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-8841',
    timestamp: '2026-09-23 15:42:10',
    user: 'Alex Vance (Admin)',
    source: 'LOG_FILE',
    destination: 'Public GitHub Repository',
    findings: 3,
    verdict: 'SANITIZE',
    releaseStatus: 'ALLOWED',
    backend: 'QNN_NPU (0.42ms)',
  },
  {
    id: 'LOG-8840',
    timestamp: '2026-09-23 15:30:04',
    user: 'Sarah Chen (Analyst)',
    source: 'CLIPBOARD',
    destination: 'Public AI Chat (ChatGPT)',
    findings: 5,
    verdict: 'BLOCK',
    releaseStatus: 'BLOCKED',
    backend: 'QNN_NPU (0.38ms)',
  },
  {
    id: 'LOG-8839',
    timestamp: '2026-09-23 14:15:22',
    user: 'Sarah Chen (Analyst)',
    source: 'CODE_FILE',
    destination: 'Internal Enterprise Server',
    findings: 1,
    verdict: 'ALLOW',
    releaseStatus: 'ALLOWED',
    backend: 'CPU (14.2ms)',
  },
  {
    id: 'LOG-8838',
    timestamp: '2026-09-23 12:05:40',
    user: 'Alex Vance (Admin)',
    source: 'ENV_FILE',
    destination: 'Public GitHub Repository',
    findings: 8,
    verdict: 'BLOCK',
    releaseStatus: 'BLOCKED',
    backend: 'QNN_NPU (0.51ms)',
  },
];

// Mock Security Rules
const INITIAL_POLICIES = [
  {
    id: 'POL-1',
    name: 'CloudOps Strict Security',
    description: 'Enforces immediate redaction for AWS Secret Keys, JWT tokens, and private RSA keys.',
    strictness: 'HIGH',
    active: true,
  },
  {
    id: 'POL-2',
    name: 'OpenSource Release Shield',
    description: 'Permits internal network IP addresses while redacting API keys and passwords.',
    strictness: 'MEDIUM',
    active: true,
  },
  {
    id: 'POL-3',
    name: 'Cybersecurity Zero-Trust',
    description: 'Blocks any text containing high-entropy strings or unverified network endpoints.',
    strictness: 'CRITICAL',
    active: false,
  },
];

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToWorkspace }) => {
  const { user, customLogoUrl, updateCustomLogo } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'policies' | 'audit' | 'users' | 'branding'>('analytics');

  // Custom Logo input state
  const [logoInputUrl, setLogoInputUrl] = useState(customLogoUrl || '');

  // Search state for logs
  const [logSearch, setLogSearch] = useState('');
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // User management state
  const [usersList, setUsersList] = useState<User[]>([
    {
      id: 'usr-admin-1',
      name: 'Alex Vance',
      email: 'admin@traceshield.ai',
      role: 'admin',
      organization: 'TraceShield Global Defense',
      createdAt: '2026-01-15',
    },
    {
      id: 'usr-analyst-1',
      name: 'Sarah Chen',
      email: 'analyst@traceshield.ai',
      role: 'analyst',
      organization: 'CloudOps Cyber Team',
      createdAt: '2026-02-01',
    },
    {
      id: 'usr-analyst-2',
      name: 'Marcus Brody',
      email: 'marcus.b@defense-node.io',
      role: 'analyst',
      organization: 'Security Operations Center',
      createdAt: '2026-03-10',
    },
  ]);

  const [policies, setPolicies] = useState(INITIAL_POLICIES);

  // New User Form Modal State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('analyst');
  const [newUserOrg, setNewUserOrg] = useState('');

  const handleSaveLogo = () => {
    updateCustomLogo(logoInputUrl.trim() ? logoInputUrl.trim() : null);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      organization: newUserOrg || 'Cyber Defense Unit',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsersList([newUser, ...usersList]);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserOrg('');
  };

  const handleDeleteUser = (id: string) => {
    setUsersList(usersList.filter((u) => u.id !== id));
  };

  const handleTogglePolicy = (id: string) => {
    setPolicies(
      policies.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.destination.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.verdict.toLowerCase().includes(logSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07090D] text-[#F2F5F8] flex flex-col font-sans relative antialiased selection:bg-emerald-900 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[1000px] h-[550px] bg-emerald-950/20 rounded-full blur-[240px]" />
        <div className="absolute top-[30%] right-[-10%] w-[900px] h-[650px] bg-cyan-950/20 rounded-full blur-[260px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[900px] h-[650px] bg-indigo-950/15 rounded-full blur-[280px]" />
      </div>

      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07090D]/90 backdrop-blur-2xl px-6 py-3.5 shadow-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToWorkspace}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0D1118] hover:bg-[#141A23] px-3 py-1.5 text-xs text-[#94A3B8] hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">Back to Workspace</span>
            </button>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            <TraceShieldLogo size="md" customLogoUrl={customLogoUrl} subtitle="Admin Command Portal" />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono font-medium">ON-DEVICE NPU: ACTIVE</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0D1118] px-3 py-1.5 text-xs">
              <Shield className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="font-semibold text-white leading-none">{user?.name}</div>
                <div className="text-[10px] text-emerald-400 font-mono uppercase font-bold mt-0.5">
                  {user?.role || 'ADMIN'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 mx-auto flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>Security Administration & Operations</span>
              <span className="text-xs font-mono bg-amber-950 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-md font-medium">
                SNAPDRAGON ENTERPRISE
              </span>
            </h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              Control hardware NPU acceleration, security profiles, telemetry audit logs, and team access.
            </p>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/40 shadow-lg'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>NPU Analytics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('policies')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition cursor-pointer ${
              activeTab === 'policies'
                ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/40 shadow-lg'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Policy Engine</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/40 shadow-lg'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Audit & Telemetry Logs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition cursor-pointer ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/40 shadow-lg'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>User Management</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition cursor-pointer ${
              activeTab === 'branding'
                ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/40 shadow-lg'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>App Logo & Branding</span>
          </button>
        </div>

        {/* TAB 1: ANALYTICS & NPU HEALTH */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-white/10 bg-[#0D1118]/80 p-5 backdrop-blur-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>NPU Latency (Average)</span>
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black font-mono text-emerald-400">0.42 ms</div>
                <div className="text-[11px] text-[#64748B]">
                  Qualcomm Hexagon NPU Vector Accelerator
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0D1118]/80 p-5 backdrop-blur-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Total Scans Today</span>
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black font-mono text-cyan-400">1,482</div>
                <div className="text-[11px] text-[#64748B]">
                  100% On-device Local Processing
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0D1118]/80 p-5 backdrop-blur-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Secrets Intercepted</span>
                  <Shield className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black font-mono text-amber-400">349</div>
                <div className="text-[11px] text-[#64748B]">
                  API keys, RSA keys, AWS Credentials
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0D1118]/80 p-5 backdrop-blur-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Network Egress Prevention</span>
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-black font-mono text-blue-400">100.0%</div>
                <div className="text-[11px] text-[#64748B]">
                  Zero bytes sent to unverified external endpoints
                </div>
              </div>
            </div>

            {/* Hardware & Memory Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-[#0D1118]/80 p-6 backdrop-blur-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>On-Device Hardware Utilization</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[#94A3B8] mb-1">
                      <span>Snapdragon X Series Hexagon NPU</span>
                      <span className="font-mono text-emerald-400">18% Load</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[18%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#94A3B8] mb-1">
                      <span>Qualcomm Adreno GPU (DirectML Engine)</span>
                      <span className="font-mono text-cyan-400">4% Standby</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[4%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#94A3B8] mb-1">
                      <span>Oryon CPU Core Allocation</span>
                      <span className="font-mono text-purple-400">12% Load</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-purple-500 w-[12%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0D1118]/80 p-6 backdrop-blur-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Destination Risk Breakdown</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#07090D]">
                    <span className="text-white font-medium">Public GitHub Repository</span>
                    <span className="font-mono text-red-400 font-bold">45% (High Exposure)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#07090D]">
                    <span className="text-white font-medium">Public AI Models (ChatGPT, Claude)</span>
                    <span className="font-mono text-amber-400 font-bold">35% (Medium Exposure)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#07090D]">
                    <span className="text-white font-medium">Internal Enterprise Server</span>
                    <span className="font-mono text-emerald-400 font-bold">20% (Low Risk)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POLICY ENGINE */}
        {activeTab === 'policies' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Security Rule Profiles</h3>
                <p className="text-xs text-[#94A3B8]">Configure automated redaction thresholds and policy profiles.</p>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-white shadow-lg transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Policy Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {policies.map((pol) => (
                <div
                  key={pol.id}
                  className="rounded-2xl border border-white/10 bg-[#0D1118]/80 p-5 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white text-sm">{pol.name}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                          pol.strictness === 'CRITICAL'
                            ? 'bg-red-950 text-red-400 border border-red-500/30'
                            : pol.strictness === 'HIGH'
                            ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                            : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                        }`}
                      >
                        {pol.strictness}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8]">{pol.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleTogglePolicy(pol.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        pol.active
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900'
                          : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {pol.active ? 'ACTIVE PROFILE' : 'DISABLED'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AUDIT & TELEMETRY LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <input
                  type="text"
                  value={logSearch}
                  onChange={(e) => setLogSearch(e.target.value)}
                  placeholder="Search audit logs by user, verdict, destination..."
                  className="w-full rounded-xl border border-white/10 bg-[#07090D] pl-10 pr-4 py-2 text-xs text-white placeholder-[#475569] outline-none focus:border-cyan-500"
                />
              </div>

              <div className="text-xs text-[#94A3B8]">
                Showing <span className="font-mono text-white">{filteredLogs.length}</span> audit events
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0D1118]/80 overflow-hidden backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#CBD5E1]">
                  <thead className="bg-[#07090D] text-[11px] uppercase tracking-wider text-[#64748B] border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3">Log ID & Time</th>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Destination</th>
                      <th className="px-4 py-3">Findings</th>
                      <th className="px-4 py-3">Verdict</th>
                      <th className="px-4 py-3">Backend & Latency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-3 font-sans">
                          <div className="font-bold text-white">{log.id}</div>
                          <div className="text-[10px] text-[#64748B]">{log.timestamp}</div>
                        </td>
                        <td className="px-4 py-3 font-sans text-white">{log.user}</td>
                        <td className="px-4 py-3 font-sans text-[#94A3B8]">{log.destination}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30 font-bold">
                            {log.findings} detected
                          </span>
                        </td>
                        <td className="px-4 py-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.verdict === 'BLOCK'
                                ? 'bg-red-950 text-red-400 border border-red-500/30'
                                : log.verdict === 'SANITIZE'
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            {log.verdict}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-cyan-400">{log.backend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Security Team Members</h3>
                <p className="text-xs text-[#94A3B8]">Manage authorized security personnel and role assignments.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-xs font-bold text-white shadow-lg transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {usersList.map((u) => (
                <div
                  key={u.id}
                  className="rounded-2xl border border-white/10 bg-[#0D1118]/80 p-5 backdrop-blur-xl space-y-4 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-white text-base">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">{u.name}</div>
                        <div className="text-[11px] text-[#94A3B8]">{u.email}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteUser(u.id)}
                      className="text-[#64748B] hover:text-red-400 p-1 rounded-lg transition"
                      title="Remove User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                    <span className="text-[#64748B]">{u.organization}</span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        u.role === 'admin'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add User Modal */}
            {showAddUserModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0D1118] p-6 space-y-5 shadow-2xl relative">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Add New Security Member</span>
                  </h3>

                  <form onSubmit={handleAddUser} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#CBD5E1]">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Marcus Brody"
                        className="w-full rounded-xl border border-white/10 bg-[#07090D] p-2.5 text-xs text-white outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#CBD5E1]">Email Address</label>
                      <input
                        type="email"
                        required
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="marcus@defense.io"
                        className="w-full rounded-xl border border-white/10 bg-[#07090D] p-2.5 text-xs text-white outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#CBD5E1]">Role Assignment</label>
                      <select
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                        className="w-full rounded-xl border border-white/10 bg-[#07090D] p-2.5 text-xs text-white outline-none focus:border-cyan-500"
                      >
                        <option value="analyst">Security Analyst</option>
                        <option value="admin">Security Administrator</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowAddUserModal(false)}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-white"
                      >
                        Add Member
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: APP LOGO & BRANDING */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#0D1118]/80 p-6 backdrop-blur-xl space-y-6 max-w-2xl">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-amber-400" />
                  <span>Custom App Logo Configuration</span>
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Upload or link a custom logo image file (PNG, SVG, JPG, WebP) to personalize your TraceShield AI console.
                </p>
              </div>

              {/* Live Preview Box */}
              <div className="rounded-xl border border-white/10 bg-[#07090D] p-5 space-y-3">
                <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Live Logo Preview
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <TraceShieldLogo size="xl" customLogoUrl={logoInputUrl || customLogoUrl} />
                </div>
              </div>

              {/* Logo URL Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#CBD5E1]">
                  Logo Image URL or Asset Path
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={logoInputUrl}
                    onChange={(e) => setLogoInputUrl(e.target.value)}
                    placeholder="https://example.com/your-custom-logo.png"
                    className="flex-1 rounded-xl border border-white/10 bg-[#07090D] px-3.5 py-2.5 text-xs text-white placeholder-[#475569] outline-none focus:border-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={handleSaveLogo}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-xs font-bold text-white transition cursor-pointer"
                  >
                    Apply Logo
                  </button>
                </div>
                {customLogoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoInputUrl('');
                      updateCustomLogo(null);
                    }}
                    className="text-xs text-red-400 hover:underline pt-1 block cursor-pointer"
                  >
                    Reset to Default TraceShield Vector Shield Logo
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
