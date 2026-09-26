import React, { useState, useRef, useEffect } from 'react';
import { AudienceRole } from '../types';
import { Send, Sparkles, Radio, Loader2, Search } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  currentRole: AudienceRole;
  currentBrowsingStatus?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  currentRole,
  currentBrowsingStatus,
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Suggested questions tailored to the audience role
  const suggestionsByRole: Record<AudienceRole, string[]> = {
    client: [
      "What GPS trackers & travel safes do you feature?",
      "How do I commission an AI OSINT threat assessment?",
      "What RF bug detectors do you have for hotel sweeps?",
      "What is the warranty and return policy on hardware?"
    ],
    visitor: [
      "Tell me about Marie-Soleil Seshat Landry & founding story.",
      "What is the 100% Vegan Worldview & 'Do No Harm' ethics?",
      "What are Seshat's Composites and Hempoxy materials?",
      "How does the affiliate model support independent peace research?"
    ],
    staff: [
      "What are the intake triage guidelines for client inquiries?",
      "What are our strict ethical red-lines on surveillance gear?",
      "Explain the 250+ specialized AI model workflow.",
      "What are the affiliate attribution procedures?"
    ]
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="border-t border-emerald-950/70 bg-slate-950/95 p-2 sm:p-3.5 backdrop-blur-md shrink-0">
      <div className="max-w-4xl mx-auto space-y-1.5 sm:space-y-2">
        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 whitespace-nowrap shrink-0">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span className="hidden xs:inline">Prompts:</span>
          </div>
          {suggestionsByRole[currentRole].map((suggestion, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => onSendMessage(suggestion)}
              className="whitespace-nowrap px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 transition-all text-[11px] sm:text-xs cursor-pointer disabled:opacity-50 shrink-0"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="relative rounded-xl border border-slate-800 bg-slate-900/90 focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/30 transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={`Ask Bobbie anything (${currentRole} inquiry)...`}
            className="w-full bg-transparent px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none pr-10 min-h-[38px] sm:min-h-[42px]"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-1.5 bottom-1.5 p-1.5 rounded-lg transition-all ${
              input.trim() && !isLoading
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-sm'
                : 'text-slate-600 bg-slate-800/40 cursor-not-allowed'
            }`}
            title="Send inquiry"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Search Grounding Live Indicator */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-500 px-0.5">
          <div className="flex items-center gap-1 text-slate-400 truncate">
            <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">Live search & browse marielandryspyshop.com active</span>
          </div>

          {isLoading && currentBrowsingStatus && (
            <div className="flex items-center gap-1 text-emerald-400 animate-pulse shrink-0 ml-2">
              <Search className="w-2.5 h-2.5" />
              <span className="truncate max-w-[130px] sm:max-w-none">{currentBrowsingStatus}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
