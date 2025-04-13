
import { create } from 'zustand';

export type AgentType = 'trading' | 'monitoring' | 'custom';
export type AgentStatus = 'active' | 'paused' | 'error';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  configuration: any;
  createdAt: Date;
  lastActive?: Date;
}

interface AgentState {
  agents: Agent[];
  isDeploying: boolean;
  addAgent: (agent: Agent) => void;
  removeAgent: (id: string) => void;
  updateAgentStatus: (id: string, status: AgentStatus) => void;
  setDeploying: (deploying: boolean) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  isDeploying: false,
  addAgent: (agent) => set((state) => ({ 
    agents: [...state.agents, agent] 
  })),
  removeAgent: (id) => set((state) => ({ 
    agents: state.agents.filter(agent => agent.id !== id) 
  })),
  updateAgentStatus: (id, status) => set((state) => ({
    agents: state.agents.map(agent => 
      agent.id === id ? { ...agent, status, lastActive: new Date() } : agent
    )
  })),
  setDeploying: (deploying) => set({ isDeploying: deploying }),
}));
