
import React, { useState } from 'react';
import { Bot, Plus, Terminal, Activity, BarChart2, Code, Settings, Play, Pause, Trash2, Edit, Server } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAgentStore } from '@/store/agentStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import { deployAgent } from '../services/aiService';

const CustomAgents = () => {
  const { agents, addAgent } = useAgentStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [agentType, setAgentType] = useState<'trading' | 'monitoring' | 'custom'>('trading');
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  
  const handleDeployAgent = async () => {
    if (!agentName.trim()) {
      toast.error("Please provide a name for your agent");
      return;
    }
    
    setIsDeploying(true);
    try {
      const configuration = {
        name: agentName,
        description: agentDescription,
        type: agentType,
      };
      
      const agent = await deployAgent(agentType, configuration);
      addAgent(agent);
      
      toast.success(`Agent "${agentName}" deployed successfully`);
      setIsDialogOpen(false);
      setAgentName('');
      setAgentDescription('');
    } catch (error) {
      toast.error("Failed to deploy agent");
      console.error(error);
    } finally {
      setIsDeploying(false);
    }
  };
  
  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'trading':
        return <BarChart2 size={18} className="text-green-400" />;
      case 'monitoring':
        return <Activity size={18} className="text-yellow-400" />;
      case 'custom':
        return <Code size={18} className="text-crypto-purple" />;
      default:
        return <Bot size={18} className="text-crypto-blue" />;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-purple">
                Custom AI Agents
              </span>
            </h1>
            <p className="text-white/70 text-lg mt-2">
              Deploy automated agents for trading, monitoring, and custom blockchain tasks
            </p>
          </div>
          
          <Button 
            className="bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            Deploy New Agent
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {agents.length > 0 ? (
            agents.map((agent) => (
              <Card key={agent.id} className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {getAgentIcon(agent.type)}
                      <CardTitle className="text-white ml-2 text-lg">{agent.configuration.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/5">
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/5">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-white/70 text-sm mb-4">
                    {agent.configuration.description || `A ${agent.type} agent for automated tasks`}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-white/80 text-sm">{agent.status}</span>
                    </div>
                    <div className="text-white/60 text-xs">
                      Created {new Date(agent.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" className="border-white/10 text-white/80 hover:bg-white/5">
                      <Server size={14} className="mr-1" />
                      Logs
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10 text-white/80 hover:bg-white/5">
                      <Settings size={14} className="mr-1" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10 text-white/80 hover:bg-white/5">
                      <Play size={14} className="mr-1" />
                      Run
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="lg:col-span-3 bg-crypto-dark/40 backdrop-blur-md rounded-xl border border-white/10 p-8 text-center">
              <Bot size={48} className="text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Agents Deployed</h3>
              <p className="text-white/70 mb-6">
                Deploy your first AI agent to automate blockchain operations
              </p>
              <Button 
                className="bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus size={16} className="mr-2" />
                Deploy New Agent
              </Button>
            </div>
          )}
        </div>
        
        {agents.length > 0 && (
          <div className="bg-crypto-dark/40 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-4 flex items-center">
              <Terminal size={20} className="mr-2 text-crypto-purple" />
              Agent Activity Log
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-crypto-darker rounded-lg border border-white/5">
                <div className="flex items-center text-white">
                  <span className="text-crypto-blue mr-2">[Trading-01]</span>
                  <span>Executed buy order: 0.05 BTC at $42,150</span>
                  <span className="ml-auto text-white/60 text-sm">2 mins ago</span>
                </div>
              </div>
              <div className="p-3 bg-crypto-darker rounded-lg border border-white/5">
                <div className="flex items-center text-white">
                  <span className="text-yellow-400 mr-2">[Monitor-03]</span>
                  <span>Alert: Gas prices exceed threshold (35 gwei)</span>
                  <span className="ml-auto text-white/60 text-sm">15 mins ago</span>
                </div>
              </div>
              <div className="p-3 bg-crypto-darker rounded-lg border border-white/5">
                <div className="flex items-center text-white">
                  <span className="text-crypto-purple mr-2">[Custom-02]</span>
                  <span>Contract event detected: New proposal submitted</span>
                  <span className="ml-auto text-white/60 text-sm">1 hour ago</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="border-white/10 text-white/80 hover:bg-white/5">
                View Full Activity History
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-crypto-dark border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">Deploy New AI Agent</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Tabs 
              defaultValue="trading" 
              value={agentType}
              onValueChange={(value) => setAgentType(value as 'trading' | 'monitoring' | 'custom')}
              className="w-full"
            >
              <TabsList className="bg-crypto-darker">
                <TabsTrigger value="trading" className="data-[state=active]:bg-white/10">
                  <BarChart2 size={16} className="mr-2" /> Trading
                </TabsTrigger>
                <TabsTrigger value="monitoring" className="data-[state=active]:bg-white/10">
                  <Activity size={16} className="mr-2" /> Monitoring
                </TabsTrigger>
                <TabsTrigger value="custom" className="data-[state=active]:bg-white/10">
                  <Code size={16} className="mr-2" /> Custom
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div>
              <Label htmlFor="name">Agent Name</Label>
              <Input 
                id="name" 
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="e.g., BTC Trading Agent" 
                className="bg-crypto-darker border-white/10 mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                value={agentDescription}
                onChange={(e) => setAgentDescription(e.target.value)}
                placeholder="What will this agent do?" 
                className="bg-crypto-darker border-white/10 h-20 mt-1"
              />
            </div>
            
            {agentType === 'trading' && (
              <>
                <div>
                  <Label htmlFor="strategy">Trading Strategy</Label>
                  <Select defaultValue="momentum">
                    <SelectTrigger className="bg-crypto-darker border-white/10">
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent className="bg-crypto-dark border-white/10">
                      <SelectItem value="momentum">Momentum Trading</SelectItem>
                      <SelectItem value="grid">Grid Trading</SelectItem>
                      <SelectItem value="arbitrage">Arbitrage</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="pairs">Trading Pairs</Label>
                  <Select defaultValue="btc-usdt">
                    <SelectTrigger className="bg-crypto-darker border-white/10">
                      <SelectValue placeholder="Select trading pairs" />
                    </SelectTrigger>
                    <SelectContent className="bg-crypto-dark border-white/10">
                      <SelectItem value="btc-usdt">BTC/USDT</SelectItem>
                      <SelectItem value="eth-usdt">ETH/USDT</SelectItem>
                      <SelectItem value="sol-usdt">SOL/USDT</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {agentType === 'monitoring' && (
              <>
                <div>
                  <Label htmlFor="monitorType">Monitoring Type</Label>
                  <Select defaultValue="price">
                    <SelectTrigger className="bg-crypto-darker border-white/10">
                      <SelectValue placeholder="Select monitoring type" />
                    </SelectTrigger>
                    <SelectContent className="bg-crypto-dark border-white/10">
                      <SelectItem value="price">Price Alerts</SelectItem>
                      <SelectItem value="gas">Gas Price Monitoring</SelectItem>
                      <SelectItem value="contract">Smart Contract Events</SelectItem>
                      <SelectItem value="wallet">Wallet Activity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="alertMethod">Alert Method</Label>
                  <Select defaultValue="email">
                    <SelectTrigger className="bg-crypto-darker border-white/10">
                      <SelectValue placeholder="Select alert method" />
                    </SelectTrigger>
                    <SelectContent className="bg-crypto-dark border-white/10">
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="webhook">Webhook</SelectItem>
                      <SelectItem value="dashboard">Dashboard Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {agentType === 'custom' && (
              <>
                <div>
                  <Label htmlFor="customLogic">Custom Logic</Label>
                  <Textarea 
                    id="customLogic" 
                    placeholder="Define your custom logic in pseudo-code or natural language" 
                    className="bg-crypto-darker border-white/10 h-32 font-mono text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="triggers">Triggers</Label>
                  <Select defaultValue="schedule">
                    <SelectTrigger className="bg-crypto-darker border-white/10">
                      <SelectValue placeholder="Select trigger type" />
                    </SelectTrigger>
                    <SelectContent className="bg-crypto-dark border-white/10">
                      <SelectItem value="schedule">Scheduled</SelectItem>
                      <SelectItem value="event">Event-based</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="api">API Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="border-white/10"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeployAgent}
              disabled={isDeploying || !agentName.trim()}
              className="bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90"
            >
              {isDeploying ? "Deploying..." : "Deploy Agent"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default CustomAgents;
