
import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, BarChart3, PieChart as PieChartIcon, FileText, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const marketData = [
  { name: 'Jan', BTC: 42000, ETH: 3200, SOL: 150 },
  { name: 'Feb', BTC: 45000, ETH: 3100, SOL: 120 },
  { name: 'Mar', BTC: 40000, ETH: 2800, SOL: 110 },
  { name: 'Apr', BTC: 43000, ETH: 3000, SOL: 140 },
  { name: 'May', BTC: 38000, ETH: 2600, SOL: 100 },
  { name: 'Jun', BTC: 36000, ETH: 2400, SOL: 90 },
  { name: 'Jul', BTC: 39000, ETH: 2700, SOL: 115 },
];

const marketSentiment = [
  { name: 'Bullish', value: 55 },
  { name: 'Neutral', value: 30 },
  { name: 'Bearish', value: 15 },
];

const marketNews = [
  {
    title: "Ethereum's Layer 2 Solutions See Record Growth",
    time: "2 hours ago",
    source: "CryptoInsider",
    impact: "positive"
  },
  {
    title: "New Regulatory Framework Proposed for Stablecoins",
    time: "5 hours ago",
    source: "BlockchainNews",
    impact: "neutral"
  },
  {
    title: "Major Exchange Reports Security Breach",
    time: "1 day ago",
    source: "CoinDesk",
    impact: "negative"
  },
  {
    title: "Leading DeFi Protocol Launches Governance Token",
    time: "2 days ago",
    source: "DeFiPulse",
    impact: "positive"
  },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const MarketIntelligence = () => {
  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-purple">
              Market Intelligence
            </span>
          </h1>
          <p className="text-white/70 text-lg mt-2">
            AI-powered market analytics and insights for crypto and blockchain markets
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-lg">Market Overview</CardTitle>
              <TrendingUp size={20} className="text-crypto-blue" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #333', borderRadius: '4px' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="BTC" stroke="#F7931A" dot={false} />
                    <Line type="monotone" dataKey="ETH" stroke="#627EEA" dot={false} />
                    <Line type="monotone" dataKey="SOL" stroke="#00FFA3" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-lg">Market Sentiment</CardTitle>
              <PieChartIcon size={20} className="text-crypto-purple" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketSentiment}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {marketSentiment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #333', borderRadius: '4px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-lg">Trading Volume</CardTitle>
              <BarChart3 size={20} className="text-crypto-pink" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #333', borderRadius: '4px' }}
                    />
                    <Legend />
                    <Bar dataKey="BTC" fill="#F7931A" />
                    <Bar dataKey="ETH" fill="#627EEA" />
                    <Bar dataKey="SOL" fill="#00FFA3" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-lg">Market News & Analysis</CardTitle>
              <FileText size={20} className="text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketNews.map((news, index) => (
                  <div key={index} className="p-3 bg-crypto-darker rounded-lg border border-white/5">
                    <div className="flex items-start">
                      <div className={`mt-1 h-3 w-3 rounded-full ${
                        news.impact === 'positive' ? 'bg-green-500' : 
                        news.impact === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                      } mr-3`}></div>
                      <div>
                        <h3 className="text-white font-medium">{news.title}</h3>
                        <div className="flex text-white/60 text-sm mt-1">
                          <span>{news.source}</span>
                          <span className="mx-2">•</span>
                          <span>{news.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2 border-white/10 text-white/80 hover:bg-white/5">
                  View All News
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-lg">AI Market Predictions</CardTitle>
              <Zap size={20} className="text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-crypto-darker rounded-lg border border-white/5">
                  <h3 className="text-white font-medium">Bitcoin (BTC)</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white/60">Short term</span>
                    <div className="flex items-center">
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <span className="text-green-500">Bullish</span>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div className="p-3 bg-crypto-darker rounded-lg border border-white/5">
                  <h3 className="text-white font-medium">Ethereum (ETH)</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white/60">Short term</span>
                    <div className="flex items-center">
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <span className="text-green-500">Bullish</span>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div className="p-3 bg-crypto-darker rounded-lg border border-white/5">
                  <h3 className="text-white font-medium">Market Risks</h3>
                  <div className="flex items-center mt-2 text-yellow-500">
                    <AlertTriangle size={16} className="mr-2" />
                    <span className="text-sm">Regulatory uncertainty may impact short-term growth</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90">
                  Get Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketIntelligence;
