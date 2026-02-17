
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Send, Play, Download, Loader2, AlertTriangle, ExternalLink, Cpu, Trash2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { VideoAsset } from '../types';

interface VideoGeneratorProps {
  onBack: () => void;
  onVideoGenerated: (asset: VideoAsset) => void;
  videos: VideoAsset[];
}

export const VideoGenerator: React.FC<VideoGeneratorProps> = ({ onBack, onVideoGenerated, videos }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Establishing Neural Link...');

  useEffect(() => {
    const checkKey = async () => {
      const selected = await (window as any).aistudio.hasSelectedApiKey();
      setHasKey(selected);
    };
    checkKey();
  }, []);

  const handleOpenKey = async () => {
    await (window as any).aistudio.openSelectKey();
    setHasKey(true);
  };

  const messages = [
    "Establishing Neural Link...",
    "Injecting Cartel DNA...",
    "Rerouting Compute Power...",
    "Rendering Anarchy...",
    "Finalizing Visual Protocol...",
    "Synthesizing Frame Data...",
    "Bypassing Firewalls..."
  ];

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      let i = 0;
      interval = setInterval(() => {
        setLoadingMsg(messages[i % messages.length]);
        i++;
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const generateVideo = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `In the style of a high-tech underground crypto cartel vault, ${prompt}, cinematic, neon green lighting, matrix code, digital skulls, high resolution, cyberpunk aesthetic`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '9:16'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      const videoUrl = URL.createObjectURL(blob);

      onVideoGenerated({
        id: Date.now().toString(),
        url: videoUrl,
        prompt: prompt,
        timestamp: new Date().toLocaleTimeString()
      });
      setPrompt('');
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
        setError("API Key verification failed. Please re-select key.");
      } else {
        setError("Neural link severed. Ensure your API key has billing enabled.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-fade-in pb-32">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white border border-white/5">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles size={20} className="text-emerald-500" />
            Neural Processor
          </h2>
          <p className="text-[10px] text-emerald-500/70 font-mono">VEO_ENGINE_ENABLED</p>
        </div>
      </div>

      {!hasKey ? (
        <div className="glass-panel p-8 rounded-3xl text-center border border-emerald-500/30">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <AlertTriangle size={32} className="text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Auth Required</h3>
          <p className="text-sm text-neutral-400 mb-6">
            To use the Neural Video Engine, you must select an API key from a paid GCP project.
          </p>
          <button 
            onClick={handleOpenKey}
            className="w-full bg-emerald-500 text-black py-4 rounded-xl font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
          >
            Select API Key
          </button>
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[10px] text-emerald-500 mt-4 inline-block hover:underline">
            View Billing Documentation
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 bg-black/40">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your vision for the empire... (e.g., 'A cybernetic skull rotating in a sea of matrix code')"
              className="w-full bg-neutral-900/50 border border-emerald-500/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 min-h-[100px] resize-none placeholder:text-neutral-600"
            />
            
            {error && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle size={14} />
                {error}
              </div>
            )}

            <button 
              onClick={generateVideo}
              disabled={isGenerating || !prompt.trim()}
              className={`w-full mt-4 py-4 rounded-xl font-bold text-black transition-all flex items-center justify-center gap-2 ${
                isGenerating ? 'bg-neutral-800 text-emerald-500' : 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
              }`}
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <Cpu size={20} />}
              {isGenerating ? 'Processing...' : 'Generate Visuals (1000 BDCC)'}
            </button>
          </div>

          {isGenerating && (
            <div className="text-center py-8 animate-pulse">
              <Loader2 size={48} className="text-emerald-500 animate-spin mx-auto mb-4" />
              <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest">{loadingMsg}</p>
              <p className="text-neutral-500 text-[10px] mt-2 italic">This may take up to 2 minutes</p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest px-2">Recent Renders</h3>
            {videos.length === 0 ? (
              <div className="border border-dashed border-emerald-500/10 rounded-3xl py-12 text-center">
                <p className="text-neutral-600 text-xs">NO ASSETS GENERATED</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {videos.map(v => (
                  <div key={v.id} className="glass-panel p-3 rounded-3xl border border-emerald-500/20 bg-neutral-900/40">
                    <video 
                      src={v.url} 
                      className="w-full aspect-[9/16] rounded-2xl object-cover border border-emerald-500/10"
                      controls
                      autoPlay
                      loop
                      muted
                    />
                    <div className="p-3">
                      <p className="text-[10px] text-emerald-500 font-mono mb-1">{v.timestamp}</p>
                      <p className="text-xs text-neutral-300 italic line-clamp-2">"{v.prompt}"</p>
                      <div className="flex gap-2 mt-4">
                        <a 
                          href={v.url} 
                          download={`bdc_render_${v.id}.mp4`}
                          className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 uppercase"
                        >
                          <Download size={12} /> Save
                        </a>
                        <button className="w-10 h-10 bg-rose-500/10 text-rose-500 rounded-lg flex items-center justify-center border border-rose-500/20">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
