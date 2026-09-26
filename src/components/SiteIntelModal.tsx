import React from 'react';
import { 
  X, 
  Shield, 
  Search, 
  Cpu, 
  Leaf, 
  Radio, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Award,
  Users,
  CheckCircle2
} from 'lucide-react';

interface SiteIntelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
}

export const SiteIntelModal: React.FC<SiteIntelModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl shadow-emerald-950/50 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-100 font-['Chakra_Petch',sans-serif] text-base sm:text-lg">
                  MARIE LANDRY SPY SHOP DOSSIER
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  CLASSIFIED // VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Official Intelligence Matrix • HQ: Moncton, NB, Canada • marielandryspyshop.com
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs sm:text-sm text-slate-300">
          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-emerald-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                Platform Identity & Structure
              </span>
              <a
                href="https://marielandryspyshop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-mono"
              >
                Visit marielandryspyshop.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="leading-relaxed text-slate-300">
              <strong>Marie Landry Spy Shop</strong> is an independent hub for tactical spy technology, 
              open-source intelligence (OSINT), and ethical AI development, serving as the central headquarters 
              of the <strong>Landry Industries</strong> conglomerate, founded by <strong>Marie-Soleil Seshat Landry</strong> in Moncton, New Brunswick, Canada.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Founder & CEO</span>
                <span className="text-slate-200 font-medium">Marie Seshat Landry</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Headquarters</span>
                <span className="text-slate-200 font-medium">Moncton, NB, Canada</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Operating Model</span>
                <span className="text-slate-200 font-medium">100% Virtual / Affiliate</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Ethical Charter</span>
                <span className="text-emerald-400 font-medium">100% Vegan & Non-Violent</span>
              </div>
            </div>
          </div>

          {/* Core Categories with Prompt Launchers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category 1: Hardware */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <Shield className="w-4 h-4" />
                <h4 className="font-['Chakra_Petch',sans-serif] text-sm uppercase font-bold text-slate-100">
                  Surveillance & Counter-Surveillance Hardware
                </h4>
              </div>
              <p className="text-xs text-slate-400">
                High-performance gear curated for travelers, investigators, and security-conscious individuals:
              </p>
              <ul className="space-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>GPS Trackers (vehicle, luggage, and personal beacon)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Portable Safes & Tamper-Evident Security Cases</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>RF Bug Detectors & Pinhole Lens Finders</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Faraday Signal Blocking Bags (EMP / RF Shielding)</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  onSelectPrompt("What surveillance hardware and travel safes do you currently feature on marielandryspyshop.com?");
                  onClose();
                }}
                className="w-full mt-2 py-1.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Ask Bobbie About Hardware</span>
              </button>
            </div>

            {/* Category 2: OSINT */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-medium">
                <Search className="w-4 h-4" />
                <h4 className="font-['Chakra_Petch',sans-serif] text-sm uppercase font-bold text-slate-100">
                  OSINT & Cyber Threat Intelligence (CTI)
                </h4>
              </div>
              <p className="text-xs text-slate-400">
                Ethical data collation and intelligence mapping for businesses, researchers, and pioneers:
              </p>
              <ul className="space-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Digital Threat Surface Mapping & Audits</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Corporate Risk Evaluations & Counter-Espionage</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Managed Cyber Threat Intelligence (CTI) Subscriptions</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>AI-Assisted OSINT Investigation Dossiers</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  onSelectPrompt("What OSINT reports and Cyber Threat Intelligence subscriptions does Marie Landry Spy Shop offer?");
                  onClose();
                }}
                className="w-full mt-2 py-1.5 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Ask Bobbie About OSINT Services</span>
              </button>
            </div>

            {/* Category 3: AI Architectures */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-medium">
                <Cpu className="w-4 h-4" />
                <h4 className="font-['Chakra_Petch',sans-serif] text-sm uppercase font-bold text-slate-100">
                  Proprietary AI Systems & 250+ Model Suite
                </h4>
              </div>
              <p className="text-xs text-slate-400">
                Bespoke autonomous tools built for peace, truth verification, and operational efficiency:
              </p>
              <ul className="space-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>PeaceMakerGPT (combating hate speech & misinformation)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>SpyForMe (autonomous investigative workflows)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Portfolio of 250+ specialized custom AI models</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Automated blogger & digital intelligence architectures</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  onSelectPrompt("Explain PeaceMakerGPT, SpyForMe, and the 250+ specialized AI model ecosystem developed by Marie Landry.");
                  onClose();
                }}
                className="w-full mt-2 py-1.5 px-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Ask Bobbie About AI Frameworks</span>
              </button>
            </div>

            {/* Category 4: Vegan Worldview & Eco-Innovations */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <Leaf className="w-4 h-4" />
                <h4 className="font-['Chakra_Petch',sans-serif] text-sm uppercase font-bold text-slate-100">
                  Vegan Worldview & Seshat's Composites
                </h4>
              </div>
              <p className="text-xs text-slate-400">
                Pioneering sustainable sovereignty and lifeform rights under Landry Industries:
              </p>
              <ul className="space-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Vegan Worldview & Strict organic vetting</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Seshat's Composites: Ballistic-grade organic hemp composite</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Hempoxy: Biodegradable high-tensile bio-resins</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Universal Declaration of Organic Rights & Organic Law</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  onSelectPrompt("What is the philosophy behind the 100% Vegan Worldview, Organic Law, and Seshat's Composites?");
                  onClose();
                }}
                className="w-full mt-2 py-1.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Ask Bobbie About Vegan Ethics</span>
              </button>
            </div>

            {/* Category 5: StudioToHub Pipeline Specification */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3 md:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-medium">
                  <Layers className="w-4 h-4" />
                  <h4 className="font-['Chakra_Petch',sans-serif] text-sm uppercase font-bold text-slate-100">
                    StudioToHub Pipeline Specification (CI/CD v1.2)
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Open-Source Release v1.2
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Published by Marie Landry Spy Shop • Author: Marie-Soleil Seshat Landry (ORCID: 0009-0008-5027-3337). Standardizes transitioning Google AI Studio SPAs into production static hosting on GitHub Pages:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="font-mono text-emerald-400 block text-[11px] font-semibold">1. Relative Assets</span>
                  <span className="text-[11px] text-slate-400">Enforces <code>base: './'</code> in Vite to eliminate broken sub-path asset lookups on GitHub Pages.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="font-mono text-cyan-400 block text-[11px] font-semibold">2. Node.js 24 LTS</span>
                  <span className="text-[11px] text-slate-400">Binds <code>actions/setup-node@v4</code> to active Node 24 runtime with explicit workflow token permissions.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="font-mono text-purple-400 block text-[11px] font-semibold">3. Dependency Safety</span>
                  <span className="text-[11px] text-slate-400">Employs <code>--legacy-peer-deps</code> to gracefully bypass modern React ecosystem package collisions.</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onSelectPrompt("Explain the StudioToHub Pipeline Specification (v1.2) published by Marie Landry Spy Shop.");
                  onClose();
                }}
                className="w-full mt-2 py-1.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Ask Bobbie About StudioToHub Specification</span>
              </button>
            </div>
          </div>

          {/* Operational Protocols for Staff */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-medium">
              <Users className="w-4 h-4" />
              <h4 className="font-['Chakra_Petch',sans-serif] text-sm uppercase font-bold text-slate-100">
                Staff Protocols & Operating Standards
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Staff members and operatives must uphold the <strong>"Do No Harm"</strong> doctrine: 
              surveillance technology is strictly defensive and privacy-preserving. Requests for illegal hacking, 
              stalking, or malicious spyware are strictly declined. All affiliate tracking and referral 
              conversions directly fund autonomous peace research and eco-materials.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">
            Target Grounding: https://marielandryspyshop.com
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
