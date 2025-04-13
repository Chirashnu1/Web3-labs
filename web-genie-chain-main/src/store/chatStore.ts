
import { create } from 'zustand';

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  selectedModel: 'blockchain' | 'security' | 'contracts';
  addMessage: (content: string, role: MessageRole) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
  setSelectedModel: (model: 'blockchain' | 'security' | 'contracts') => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  selectedModel: 'blockchain',
  addMessage: (content, role) => 
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: new Date(),
        },
      ],
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] }),
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
