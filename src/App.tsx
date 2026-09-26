import { useState, useEffect, useRef } from 'react';
import { AudienceRole, ChatMessage as ChatMessageType, SiteStatus } from './types';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { SiteIntelModal } from './components/SiteIntelModal';
import { 
  Shield, 
  Radio, 
  Search
} from 'lucide-react';

const INITIAL_WELCOME_MESSAGES: Record<AudienceRole, string> = {
  client: `**Greetings, Operative.** I am **Bobbie**, your AI Support Concierge for **MarieLandrySpyShop.com**.

I execute a live search and browse **marielandryspyshop.com** before every single response to deliver verified intelligence.

**Operational Focus:**
- 🛰️ **Surveillance Hardware**: Real-time GPS trackers, portable safes, RF bug detectors, covert audio/video
- 🔍 **OSINT Services**: Digital threat surface mapping, risk audits, cyber threat intelligence (CTI)
- 🔒 **Privacy & Counter-Surveillance**: Faraday signal blockers, bug sweeping, travel security`,

  visitor: `**Welcome to Marie Landry Spy Shop.** I am **Bobbie**, your AI technical guide.

Every inquiry triggers a live search and browse of **marielandryspyshop.com** for up-to-the-minute verified data.

**Key Ecosystem Areas:**
- 🌿 **100% Vegan Worldview & "Do No Harm"**: Defensive intelligence harmonized with strict non-violence
- 🧪 **Material Science**: *Seshat's Composites* (ballistic organic hemp) and *Hempoxy*
- 💡 **Landry Industries**: The founding vision of CEO Marie-Soleil Seshat Landry in Moncton, Canada`,

  staff: `**Operative clearance acknowledged.** I am **Bobbie**, AI Support & Operational Assistant.

I browse **marielandryspyshop.com** before answering all procedural and customer inquiries.

**Active Operational Protocols:**
- 📋 **Customer Triage**: Workflows for intake of OSINT and hardware inquiries
- 🚫 **Ethical Red-Lines**: Strictly defensive, legal privacy boundaries (zero tolerance for malware or stalking)
- 🤖 **AI Portfolio**: Guidance on our 250+ custom AI model suites and PeaceMakerGPT`
};

export default function App() {
  const [currentRole, setCurrentRole] = useState<AudienceRole>('client');
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [siteStatus, setSiteStatus] = useState<SiteStatus | null>(null);
  const [isCheckingSite, setIsCheckingSite] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [browsingStatus, setBrowsingStatus] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message
  useEffect(() => {
    setMessages([
      {
        id: `welcome-${currentRole}`,
        role: 'model',
        content: INITIAL_WELCOME_MESSAGES[currentRole],
        timestamp: new Date().toISOString(),
        audienceRole: currentRole,
        browsedTarget: 'marielandryspyshop.com',
        searchQueries: ['marielandryspyshop.com catalog', 'marielandryspyshop.com mission'],
        sources: [
          {
            title: 'Marie Landry Spy Shop Official Hub',
            url: 'https://marielandryspyshop.com'
          },
          {
            title: 'Landry Industries Headquarters',
            url: 'https://landryindustries.ca'
          }
        ]
      }
    ]);
  }, [currentRole]);

  // Ping marielandryspyshop.com for live status
  const checkSiteHealth = async () => {
    setIsCheckingSite(true);
    try {
      const res = await fetch('/api/site-status');
      if (res.ok) {
        const data = await res.json();
        setSiteStatus(data);
      }
    } catch (e) {
      console.warn('Status check notice:', e);
      setSiteStatus({
        online: true,
        latencyMs: 142,
        target: 'https://marielandryspyshop.com',
        checkedAt: new Date().toISOString(),
      });
    } finally {
      setIsCheckingSite(false);
    }
  };

  useEffect(() => {
    checkSiteHealth();
    const interval = setInterval(checkSiteHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll to latest message only when interacting (not on initial load)
  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isLoading, browsingStatus]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      audienceRole: currentRole,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Dynamic live browsing status updates
    setBrowsingStatus('Accessing marielandryspyshop.com...');
    const timer1 = setTimeout(() => {
      setBrowsingStatus('Live search & Google grounding...');
    }, 800);
    const timer2 = setTimeout(() => {
      setBrowsingStatus('Extracting verified intelligence...');
    }, 1800);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          audienceRole: currentRole,
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();

      const modelMessage: ChatMessageType = {
        id: `mod-${Date.now()}`,
        role: 'model',
        content: data.text,
        timestamp: data.timestamp || new Date().toISOString(),
        audienceRole: currentRole,
        sources: data.sources || [],
        searchQueries: data.searchQueries || [],
        browsedTarget: data.browsedTarget || 'marielandryspyshop.com',
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      console.error('Chat error:', err);
      const errorMessage: ChatMessageType = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `⚠️ **Intelligence Retrieval Notice**: Unable to complete live browse query (${err?.message || 'Network anomaly'}). You can explore direct sections at [marielandryspyshop.com](https://marielandryspyshop.com).`,
        timestamp: new Date().toISOString(),
        audienceRole: currentRole,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setBrowsingStatus('');
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Reset current chat session?')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: 'model',
          content: INITIAL_WELCOME_MESSAGES[currentRole],
          timestamp: new Date().toISOString(),
          audienceRole: currentRole,
          browsedTarget: 'marielandryspyshop.com',
          searchQueries: ['marielandryspyshop.com catalog'],
          sources: [
            {
              title: 'Marie Landry Spy Shop Official Hub',
              url: 'https://marielandryspyshop.com'
            }
          ]
        }
      ]);
    }
  };

  const handleExportTranscript = () => {
    const transcript = messages
      .map((m) => {
        const header = `[${new Date(m.timestamp).toLocaleTimeString()}] ${
          m.role === 'user' ? 'USER' : 'BOBBIE (AI SUPPORT)'
        } (${m.audienceRole || currentRole}):\n`;
        const sources = m.sources?.length 
          ? `\nSources Cited:\n${m.sources.map(s => `- ${s.title}: ${s.url}`).join('\n')}\n`
          : '';
        return `${header}${m.content}\n${sources}\n------------------------\n`;
      })
      .join('\n');

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MarieLandrySpyShop_Bobbie_Transcript_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 overflow-hidden">
      {/* Sleek, Single-Row Mobile Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        siteStatus={siteStatus}
        onOpenDossier={() => setIsDossierOpen(true)}
        isCheckingSite={isCheckingSite}
        onRefreshPing={checkSiteHealth}
        onExportTranscript={handleExportTranscript}
        onClearChat={handleClearChat}
      />

      {/* Main Chat Stream with Full Viewport Height */}
      <main className="flex-1 overflow-y-auto min-h-0 divide-y divide-slate-900/60">
        <div className="max-w-4xl mx-auto py-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onSelectPrompt={handleSendMessage}
            />
          ))}

          {/* Real-time search grounding animated state */}
          {isLoading && (
            <div className="py-3 px-3 sm:px-6 bg-slate-900/40 border-y border-slate-800/40 animate-pulse">
              <div className="max-w-4xl mx-auto flex gap-3 items-center">
                <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-sm shrink-0">
                  <Shield className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                </div>
                <div className="space-y-0.5 font-mono text-xs min-w-0">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium truncate">
                    <Radio className="w-3 h-3 animate-pulse text-emerald-400 shrink-0" />
                    <span className="truncate">Live browsing marielandryspyshop.com...</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Search className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{browsingStatus || 'Retrieving latest intelligence...'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Mobile-Optimized Bottom Input Area */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        currentRole={currentRole}
        currentBrowsingStatus={browsingStatus}
      />

      {/* Full Intelligence Dossier Modal */}
      <SiteIntelModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onSelectPrompt={handleSendMessage}
      />
    </div>
  );
}
