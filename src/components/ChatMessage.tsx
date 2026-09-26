import React, { useState } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { marked } from 'marked';
import { 
  Shield, 
  User, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  Globe, 
  CheckCircle2, 
  Radio
} from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectPrompt?: (text: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isModel = message.role === 'model';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Configure marked for clean HTML output
  const renderMarkdown = (content: string) => {
    try {
      return marked.parse(content, { gfm: true, breaks: true }) as string;
    } catch {
      return content;
    }
  };

  return (
    <div
      className={`py-3 sm:py-4 px-2.5 sm:px-6 transition-colors ${
        isModel
          ? 'bg-slate-900/35 border-y border-slate-800/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-4xl mx-auto flex gap-2.5 sm:gap-3.5">
        {/* Avatar */}
        <div className="shrink-0 pt-0.5">
          {isModel ? (
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-sm">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          ) : (
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          )}
        </div>

        {/* Content body */}
        <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
          {/* Header metadata */}
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-xs sm:text-sm text-slate-200">
                {isModel ? 'Bobbie' : 'You'}
              </span>

              {isModel && (
                <>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                    MarieLandrySpyShop.com
                  </span>
                  {message.audienceRole && (
                    <span className="text-[9px] uppercase font-mono text-slate-400 bg-slate-800/80 px-1 py-0.2 rounded">
                      {message.audienceRole}
                    </span>
                  )}
                </>
              )}

              <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors shrink-0"
              title="Copy message text"
            >
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Live Search & Browse Telemetry Indicator for Model responses */}
          {isModel && (
            <div className="p-1.5 sm:p-2 rounded-lg bg-slate-950/70 border border-emerald-500/20 space-y-1 text-[11px] font-mono">
              <div className="flex items-center justify-between gap-1 text-[10px] sm:text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium truncate">
                  <Radio className="w-3 h-3 animate-pulse text-emerald-400 shrink-0" />
                  <span className="text-slate-400">Live Browsed:</span>
                  <a
                    href="https://marielandryspyshop.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-emerald-300 text-emerald-300 font-semibold truncate"
                  >
                    marielandryspyshop.com
                  </a>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  <span className="hidden xs:inline">Verified Grounded</span>
                </div>
              </div>

              {/* Executed search queries if present */}
              {message.searchQueries && message.searchQueries.length > 0 && (
                <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-0.5 border-t border-slate-800/60 overflow-x-auto scrollbar-none">
                  <Search className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                  {message.searchQueries.slice(0, 2).map((q, idx) => (
                    <span
                      key={idx}
                      className="px-1 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[9px] shrink-0 truncate max-w-[200px]"
                    >
                      "{q}"
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Message Markdown Body */}
          <div
            className="prose prose-invert prose-emerald max-w-none text-slate-200 text-xs sm:text-sm leading-relaxed prose-p:my-1.5 prose-headings:text-slate-100 prose-headings:font-['Chakra_Petch',sans-serif] prose-headings:my-2 prose-a:text-emerald-400 prose-a:underline hover:prose-a:text-emerald-300 prose-code:font-mono prose-code:text-emerald-300 prose-code:bg-slate-950 prose-code:px-1 prose-code:py-0.2 prose-code:rounded prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-ul:my-1.5 prose-li:my-0.5"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
          />

          {/* Retrieved Grounding Sources / Links */}
          {message.sources && message.sources.length > 0 && (
            <div className="pt-1.5 border-t border-slate-800/60 space-y-1">
              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Verified Sources:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {message.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all text-[11px] text-slate-300 hover:text-emerald-300 group max-w-full"
                  >
                    <ExternalLink className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    <span className="truncate max-w-[220px] sm:max-w-xs">{src.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
