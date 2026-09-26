import React, { useState, useRef, useEffect } from 'react';
import { AudienceRole, SiteStatus } from '../types';
import { 
  Shield, 
  Radio, 
  ExternalLink, 
  Database, 
  Download, 
  Trash2, 
  MoreVertical,
  Briefcase,
  Eye,
  Users
} from 'lucide-react';

interface HeaderProps {
  currentRole: AudienceRole;
  onRoleChange: (role: AudienceRole) => void;
  siteStatus: SiteStatus | null;
  onOpenDossier: () => void;
  isCheckingSite: boolean;
  onRefreshPing: () => void;
  onExportTranscript: () => void;
  onClearChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  siteStatus,
  onOpenDossier,
  isCheckingSite,
  onRefreshPing,
  onExportTranscript,
  onClearChat,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="border-b border-emerald-950/70 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-6 py-2 shrink-0">
      <div className="max-w-5xl mx-auto space-y-1.5">
        {/* Top Line: Brand Name - NEVER TRUNCATED - plus Action buttons */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand Identity */}
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-950/40">
                <Shield className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-slate-950 animate-pulse" />
            </div>

            <div className="flex items-center gap-2">
              <h1 className="font-bold tracking-wider text-slate-100 uppercase text-xs sm:text-base font-['Chakra_Petch',sans-serif] whitespace-nowrap">
                Marie Landry Spy Shop
              </h1>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono border border-emerald-500/30 whitespace-nowrap font-semibold">
                BOBBIE
              </span>
            </div>
          </div>

          {/* Quick Actions (Desktop & Mobile) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Desktop quick links */}
            <button
              onClick={onOpenDossier}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-emerald-500/40 text-slate-300 font-mono transition-all"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dossier</span>
            </button>

            <a
              href="https://marielandryspyshop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono transition-all"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Mobile / Dropdown Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-colors"
                aria-label="Options Menu"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-1.5 w-52 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl shadow-slate-950/90 p-1.5 z-50 text-xs font-mono space-y-1 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      onOpenDossier();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-emerald-400 text-left transition-colors"
                  >
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Intel Dossier</span>
                  </button>

                  <a
                    href="https://marielandryspyshop.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2.5 py-2 rounded-lg text-emerald-300 hover:bg-emerald-950/40 text-left transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5" />
                      <span>marielandryspyshop.com</span>
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="h-px bg-slate-800 my-1" />

                  <button
                    onClick={() => {
                      onExportTranscript();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-300 hover:bg-slate-800 text-left transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export Transcript</span>
                  </button>

                  <button
                    onClick={() => {
                      onClearChat();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-rose-400 hover:bg-rose-950/30 text-left transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset Chat Session</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sub-bar: Live Grounded Target & Role Switcher */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-900">
          {/* Live Status indicator */}
          <div 
            onClick={onRefreshPing}
            className="cursor-pointer hover:text-emerald-300 text-emerald-400/90 flex items-center gap-1.5 text-[10px] sm:text-xs font-mono shrink-0"
            title="Click to check site connection"
          >
            <Radio className={`w-3 h-3 text-emerald-400 ${isCheckingSite ? 'animate-spin' : 'animate-pulse'}`} />
            <span className="text-slate-400 hidden xs:inline">Live Grounded:</span>
            <span className="text-emerald-300 font-semibold underline underline-offset-2">marielandryspyshop.com</span>
            {siteStatus?.latencyMs && (
              <span className="text-slate-600 hidden sm:inline">• {siteStatus.latencyMs}ms</span>
            )}
          </div>

          {/* Role Switcher Tabs */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[11px] font-medium shrink-0">
            <button
              onClick={() => onRoleChange('client')}
              className={`flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded transition-all ${
                currentRole === 'client'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Client Mode (Hardware & OSINT)"
            >
              <Briefcase className="w-3 h-3" />
              <span>Client</span>
            </button>
            <button
              onClick={() => onRoleChange('visitor')}
              className={`flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded transition-all ${
                currentRole === 'visitor'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visitor Mode (About & Philosophy)"
            >
              <Eye className="w-3 h-3" />
              <span>Visitor</span>
            </button>
            <button
              onClick={() => onRoleChange('staff')}
              className={`flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded transition-all ${
                currentRole === 'staff'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Staff Mode (Internal Triage & Protocols)"
            >
              <Users className="w-3 h-3" />
              <span>Staff</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
