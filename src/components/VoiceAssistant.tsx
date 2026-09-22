import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';

interface VoiceAssistantProps {
  onAction: (action: string, data: any) => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onAction }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        processCommand(result);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error(`Voice error: ${event.error}`);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setFeedback('');
      recognitionRef.current.start();
      setIsListening(true);
      toast.info("Listening for commands...");
    }
  };

  const processCommand = async (text: string) => {
    setIsProcessing(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const lowerText = text.toLowerCase();
      let mockData: any = {
        action: 'SEARCH',
        data: { query: text },
        feedback: `Searching for ${text}`
      };

      if (lowerText.includes('add') || lowerText.includes('bill')) {
        mockData = {
            action: 'NAVIGATE',
            data: { path: '/billing' },
            feedback: "Opening billing terminal for you."
        };
      } else if (lowerText.includes('stock') || lowerText.includes('product')) {
        mockData = {
            action: 'NAVIGATE',
            data: { path: '/products' },
            feedback: "Navigating to product catalogue."
        };
      } else if (lowerText.includes('report')) {
        mockData = {
            action: 'NAVIGATE',
            data: { path: '/reports' },
            feedback: "Generating business reports."
        };
      }
      
      setFeedback(mockData.feedback);
      onAction(mockData.action, mockData.data);
      
      // Speak feedback
      const utterance = new SpeechSynthesisUtterance(mockData.feedback);
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error(error);
      toast.error("Voice simulation error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end gap-3">
        { (isListening || isProcessing || feedback) && (
          <div className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 shadow-2xl rounded-2xl p-4 w-72 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI Voice POS</span>
                </div>
                <button onClick={() => {setFeedback(''); setTranscript('');}} className="text-slate-400 hover:text-slate-600">
                    <X size={14} />
                </button>
            </div>
            
            {transcript && (
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 italic">
                    "{transcript}"
                </p>
            )}

            {isProcessing ? (
                <div className="flex items-center gap-2 text-indigo-600">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-xs">Processing intent...</span>
                </div>
            ) : feedback ? (
                <div className="flex items-start gap-2 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
                    <Volume2 size={14} className="mt-0.5 shrink-0" />
                    <span className="text-xs leading-relaxed">{feedback}</span>
                </div>
            ) : (
                <p className="text-[10px] text-slate-400">
                    Say things like "Add BC123" or "Search for blue silk"
                </p>
            )}
          </div>
        )}

        <Button
          onClick={toggleListening}
          size="icon"
          className={`h-14 w-14 rounded-full shadow-xl transition-all duration-300 ${
            isListening 
            ? 'bg-red-500 hover:bg-red-600 scale-110' 
            : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isListening ? <Mic className="h-6 w-6 text-white" /> : <MicOff className="h-6 w-6 text-white" />}
        </Button>
      </div>
    </div>
  );
};
