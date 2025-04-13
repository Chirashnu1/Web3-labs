
import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../store/chatStore';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start gap-3 ${isUser ? '' : 'bg-white/5'} p-3 rounded-lg`}>
      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-crypto-purple/20' 
          : 'bg-gradient-to-r from-crypto-blue to-crypto-purple'
      }`}>
        {isUser ? (
          <span className="text-xs text-crypto-purple">You</span>
        ) : (
          <Bot size={16} className="text-white" />
        )}
      </div>
      
      <div className="text-white/90">
        {message.content.split('\n').map((paragraph, index) => (
          <p key={index} className={index > 0 ? 'mt-2' : ''}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;
