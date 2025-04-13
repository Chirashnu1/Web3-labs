
import React, { useState } from 'react';
import { Bot, Terminal, BarChart2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import { useAgentStore, Agent, AgentType } from '../store/agentStore';
import { deployAgent } from '../services/aiService';
import { toast } from 'sonner';

const AIAgents = () => {
  const { agents, isDeploying, addAgent, removeAgent, updateAgentStatus, setDeploying } = useAgentStore();
  const [open, setOpen] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [agentType, setAgentType] = useState<AgentType>('trading');
  const [riskLevel, setRiskLevel] = useState(50);
  const [frequency, setFrequency] = useState('hourly');
  const [budget, setBudget] = useState('');
  
  const handleDeploy = async () => {
    if (!agentName) {
      toast.error("Please provide a name for your agent");
      return;
    }
    
    setDeploying(true);
    
    try {
      // Create configuration based on agent type
      let configuration: any = { name: agentName };
      
      if (agentType === 'trading') {
        configuration = {
          ...configuration,
          riskLevel,
          budget: budget || '0.1 ETH',
          strategy: riskLevel < 30 ? 'conservative' : riskLevel > 70 ? 'aggressive' : 'balanced'
        };
      } else if (agentType === 'monitoring') {
        configuration = {
          ...configuration,
          frequency,
          alertThreshold: riskLevel,
          metrics: ['gas', 'price', 'volume']
        };
      } else {
        configuration = {
          ...configuration,
          customParameters: {
            complexity: riskLevel,
            automationLevel: Math.floor(riskLevel / 20)
          }
        };
      }
      
      const result = await deployAgent(agentType, configuration);
      
      // Add to our store
      addAgent({
        id: result.id,
        name: agentName,
        type: agentType,
        status: 'active',
        configuration,
        createdAt: new Date()
      });
      
      // Reset form
      setAgentName('');
      setRiskLevel(50);
      setFrequency('hourly');
      setBudget('');
      
      // Close dialog
      setOpen(false);
    } catch (error) {
      console.error('Error deploying agent:', error);
      toast.error("Failed to deploy agent. Please try again.");
    } finally {
      setDeploying(false);
    }
  };
  
  const handlePauseResume = (agent: Agent) => {
    const newStatus = agent.status === 'active' ? 'paused' : 'active';
    updateAgentStatus(agent.id, newStatus);
    toast.success(`Agent ${newStatus === 'active' ? 'resumed' : 'paused'} successfully`);
  };
  
  const handleDelete = (id: string) => {
    removeAgent(id);
    toast.success("Agent removed successfully");
  };
  
  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-crypto-blue to-crypto-pink flex items-center justify-center mr-3">
                <Bot size={20} className="text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-pink">
                  AI Agents Platform
                </span>
              </h1>
            </div>
            
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90">
                  Deploy New Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-crypto-dark border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle>Deploy AI Agent</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name">Agent Name</Label>
                    <Input
                      id="agent-name"
                      placeholder="Enter a name for your agent"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="agent-type">Agent Type</Label>
                    <Select value={agentType} onValueChange={(value) => setAgentType(value as AgentType)}>
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Select agent type" />
                      </SelectTrigger>
                      <SelectContent className="bg-crypto-darker border-white/10">
                        <SelectItem value="trading">Trading Agent</SelectItem>
                        <SelectItem value="monitoring">Monitoring Agent</SelectItem>
                        <SelectItem value="custom">Custom Logic Agent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {agentType === 'trading' && (
                    <>
                      <div className="space-y-2">
                        <Label>Risk Level: {riskLevel}%</Label>
                        <Slider 
                          value={[riskLevel]} 
                          min={10} 
                          max={90} 
                          step={10} 
                          onValueChange={(values) => setRiskLevel(values[0])} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget</Label>
                        <Input
                          id="budget"
                          placeholder="e.g., 0.1 ETH"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                    </>
                  )}
                  
                  {agentType === 'monitoring' && (
                    <>
                      <div className="space-y-2">
                        <Label>Alert Threshold: {riskLevel}%</Label>
                        <Slider 
                          value={[riskLevel]} 
                          min={10} 
                          max={90} 
                          step={10} 
                          onValueChange={(values) => setRiskLevel(values[0])} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="frequency">Check Frequency</Label>
                        <Select value={frequency} onValueChange={setFrequency}>
                          <SelectTrigger className="bg-white/5 border-white/10">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent className="bg-crypto-darker border-white/10">
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  
                  {agentType === 'custom' && (
                    <div className="space-y-2">
                      <Label>Complexity Level: {riskLevel}%</Label>
                      <Slider 
                        value={[riskLevel]} 
                        min={10} 
                        max={90} 
                        step={10} 
                        onValueChange={(values) => setRiskLevel(values[0])} 
                      />
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button onClick={handleDeploy} disabled={isDeploying} className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90">
                    {isDeploying ? 'Deploying...' : 'Deploy Agent'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {agents.length === 0 ? (
            <div className="bg-crypto-dark/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 p-10 text-center">
              <Bot size={48} className="mx-auto text-white/30 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Agents Deployed</h3>
              <p className="text-white/60 mb-6">
                Deploy your first AI agent to automate blockchain operations and monitoring.
              </p>
              <Button 
                onClick={() => setOpen(true)} 
                className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90"
              >
                Deploy Your First Agent
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div 
                  key={agent.id} 
                  className="bg-crypto-dark/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${
                        agent.type === 'trading' 
                          ? 'bg-crypto-purple/20' 
                          : agent.type === 'monitoring' 
                            ? 'bg-crypto-blue/20' 
                            : 'bg-crypto-pink/20'
                      }`}>
                        {agent.type === 'trading' && <BarChart2 size={20} className="text-crypto-purple" />}
                        {agent.type === 'monitoring' && <Terminal size={20} className="text-crypto-blue" />}
                        {agent.type === 'custom' && <Bot size={20} className="text-crypto-pink" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{agent.name}</h3>
                        <p className="text-white/60 text-sm capitalize">{agent.type} Agent</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agent.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : agent.status === 'paused' 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-red-500/20 text-red-400'
                    }`}>
                      {agent.status}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Created</span>
                      <span className="text-white/90">{agent.createdAt.toLocaleDateString()}</span>
                    </div>
                    
                    {agent.type === 'trading' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Strategy</span>
                          <span className="text-white/90 capitalize">{agent.configuration.strategy}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Budget</span>
                          <span className="text-white/90">{agent.configuration.budget}</span>
                        </div>
                      </>
                    )}
                    
                    {agent.type === 'monitoring' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Frequency</span>
                          <span className="text-white/90 capitalize">{agent.configuration.frequency}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Alerts</span>
                          <span className="text-white/90">{agent.configuration.alertThreshold}% threshold</span>
                        </div>
                      </>
                    )}
                    
                    {agent.type === 'custom' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Complexity</span>
                          <span className="text-white/90">{agent.configuration.customParameters.complexity}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Automation</span>
                          <span className="text-white/90">Level {agent.configuration.customParameters.automationLevel}</span>
                        </div>
                      </>
                    )}
                    
                    {agent.lastActive && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Last active</span>
                        <span className="text-white/90">{agent.lastActive.toLocaleTimeString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handlePauseResume(agent)}
                      className="flex-1 bg-transparent border border-white/10 text-white hover:bg-white/10"
                    >
                      {agent.status === 'active' ? 'Pause' : 'Resume'}
                    </Button>
                    
                    <Button 
                      onClick={() => handleDelete(agent.id)}
                      variant="destructive" 
                      className="flex-1"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 p-6 bg-crypto-dark/40 backdrop-blur-md rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">What Can AI Agents Do?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Trading Agents</h3>
                <p className="text-white/70 mb-4">
                  Automate trading strategies with customizable risk profiles and real-time
                  market monitoring. Set budgets, define entry/exit points, and let the AI handle execution.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Monitoring Agents</h3>
                <p className="text-white/70 mb-4">
                  Keep track of blockchain activities, gas prices, token movements, and smart contract events.
                  Receive alerts and detailed reports based on your custom parameters.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Custom Logic Agents</h3>
                <p className="text-white/70 mb-4">
                  Create agents with specialized logic for your unique blockchain use cases.
                  Integrate with contracts, automate workflows, and build complex automation systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAgents;
