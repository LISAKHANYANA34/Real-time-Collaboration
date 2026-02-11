import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Users, Shield, Zap, BookOpen } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
      {/* Navigation - Removed CanvasCollab, Sign In, Sign Up Free */}
      <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto">
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Real-time Collaboration
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              for Modern Teams
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Create, connect, and collaborate on intelligent canvases. 
            Perfect for teams, designers, developers, and creative minds working in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all text-lg"
            >
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all text-lg border border-slate-700">
              View Demo
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Powerful Features for Modern Teams
        </h2>
        <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
          Everything you need to visualize ideas and collaborate effectively
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
            <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Collaboration</h3>
            <p className="text-slate-400">Work simultaneously with your team. See changes as they happen.</p>
          </div>
          
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
            <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Intelligent Nodes</h3>
            <p className="text-slate-400">AI-powered nodes, tasks, notes, and file attachments.</p>
          </div>
          
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
            <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Enterprise Security</h3>
            <p className="text-slate-400">End-to-end encryption and secure team workspaces.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-slate-400 mb-12">
          Choose the perfect plan for your team. All plans include core features.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-white">$0</span>
              <span className="text-slate-400">/forever</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">Perfect for individuals getting started</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Up to 3 canvases
              </li>
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                1 team member
              </li>
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Basic nodes
              </li>
            </ul>
            <button 
              onClick={() => navigate('/signup')}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Get Started
            </button>
          </div>
          
          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-blue-600/20 to-cyan-600/20 p-6 rounded-xl border border-blue-500/50 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-white">$12</span>
              <span className="text-slate-400">/user/month</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">For teams that need advanced features</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Unlimited canvases
              </li>
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Up to 10 team members
              </li>
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                AI-powered nodes
              </li>
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Export functionality
              </li>
            </ul>
            <button 
              onClick={() => navigate('/signup')}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              Try Free for 14 Days
            </button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-white">Custom</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">For large organizations with complex needs</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Unlimited everything
              </li>
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Custom integrations
              </li>
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Dedicated support
              </li>
              <li className="flex items-center text-slate-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                SLA guarantee
              </li>
            </ul>
            <button className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Documentation Section - Removed help text and View Full Documentation button */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Documentation & Resources
        </h2>
        <p className="text-center text-slate-400 mb-12">
          Everything you need to get started and become a CanvasCollab expert.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
            <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Getting Started Guide</h3>
            <p className="text-slate-400 mb-4">Learn the basics of creating canvases, adding nodes, and collaborating with your team.</p>
            <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center">
              Read Guide →
            </button>
          </div>
          
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
            <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Team Collaboration</h3>
            <p className="text-slate-400 mb-4">Best practices for team collaboration, permissions, and workflow management.</p>
            <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center">
              Read Guide →
            </button>
          </div>
          
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
            <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Features</h3>
            <p className="text-slate-400 mb-4">Master advanced features like AI nodes, custom integrations, and automation.</p>
            <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center">
              Read Guide →
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Empty */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800">
        <div className="text-center">
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
