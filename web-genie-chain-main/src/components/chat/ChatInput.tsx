
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { SendHorizontal, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    // Auto-resize the textarea based on content
    if (inputRef.current) {
      inputRef.current.style.height = '0';
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = scrollHeight > 200 ? '200px' : `${scrollHeight}px`;
    }
  }, [message]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      
      // Reset height after sending
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  // Suggestions based on current model
  const suggestions = [
    "How do I create an NFT collection?",
    "Explain gas optimization techniques",
    "What are the best security practices for smart contracts?",
    "How can I implement token vesting?",
    "What's the difference between ERC-20 and ERC-721?"
  ];
  
  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        {!message && suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => setMessage(suggestion)}
            className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 text-white/70 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3 items-end border-t border-white/10 pt-4">
        <div className="flex-1 bg-white/5 text-white border border-white/10 rounded-lg px-4 py-2 focus-within:border-crypto-purple/50 focus-within:ring-1 focus-within:ring-crypto-purple/50">
          <textarea 
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a blockchain question..." 
            className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none resize-none min-h-[40px] max-h-[200px]"
            disabled={isLoading}
            rows={1}
          />
        </div>
        <Button 
          type="submit"
          className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90 h-[42px] w-[42px] p-0 flex items-center justify-center"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <SendHorizontal size={16} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
