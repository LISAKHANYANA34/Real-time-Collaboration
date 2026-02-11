import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Folder, Users, Database, BarChart3, 
  Eye, Lock, Unlock, TrendingUp, AlertCircle, 
  Globe, Shield, Edit, Trash2, Layout, Kanban, Clock, Target, ListTodo, BookOpen
} from 'lucide-react';

// Define types
interface Canvas {
  id: number;
  name: string;
  members: number;
  updated: string;
  color: string;
  locked: boolean;
  lockedBy?: string;
  template?: string;
}

interface StorageUsage {
  used: number;
  total: number;
  percentage: number;
  status: string;
}

interface SimpleLayoutProps {
  children: React.ReactNode;
}

// Templates data
const canvasTemplates = [
  { id: 'mind-map', name: 'Mind Map', icon: Layout, color: 'bg-blue-500', description: 'Brainstorm and organize ideas' },
  { id: 'kanban', name: 'Kanban Board', icon: Kanban, color: 'bg-green-500', description: 'Track workflow progress' },
  { id: 'timeline', name: 'Timeline', icon: Clock, color: 'bg-purple-500', description: 'Plan project milestones' },
  { id: 'goals', name: 'Goals & OKRs', icon: Target, color: 'bg-orange-500', description: 'Set and track objectives' },
  { id: 'tasks', name: 'Task List', icon: ListTodo, color: 'bg-pink-500', description: 'Manage daily tasks' },
  { id: 'docs', name: 'Documentation', icon: BookOpen, color: 'bg-cyan-500', description: 'Create structured docs' }
];

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-slate-950">
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">CanvasCollab</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-300 text-sm">test@example.com</span>
          <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">T</span>
          </div>
        </div>
      </div>
    </nav>
    <main>{children}</main>
  </div>
);

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(false);
  const [editingCanvasId, setEditingCanvasId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  
  const [recentCanvases, setRecentCanvases] = useState<Canvas[]>([
    { id: 1, name: 'My First Canvas', members: 1, updated: 'Just now', color: 'bg-indigo-500', locked: false, template: 'Blank' },
    { id: 2, name: 'Product Roadmap Q4 2024', members: 5, updated: '2 hours ago', color: 'bg-blue-500', locked: false },
    { id: 3, name: 'Q4 Planning & Strategy', members: 8, updated: '1 day ago', color: 'bg-purple-500', locked: true, lockedBy: 'David Chen' }
  ]);

  const [storageUsage] = useState<StorageUsage>({
    used: 78.5,
    total: 100,
    percentage: 78.5,
    status: 'warning'
  });

  const handleViewCanvas = (canvasId: number): void => {
    const canvas = recentCanvases.find(c => c.id === canvasId);
    if (canvas?.locked) {
      if (window.confirm(`Canvas is locked by ${canvas.lockedBy}. Request access?`)) {
        window.alert(`Access request sent to ${canvas.lockedBy}`);
      }
    } else {
      navigate(`/canvas/${canvasId}`);
    }
  };

  const toggleCanvasLock = (canvasId: number): void => {
    setRecentCanvases(prev => prev.map(canvas => {
      if (canvas.id === canvasId) {
        return { 
          ...canvas, 
          locked: !canvas.locked, 
          lockedBy: !canvas.locked ? 'You' : undefined 
        };
      }
      return canvas;
    }));
  };

  const handleEditCanvas = (canvasId: number, currentName: string): void => {
    setEditingCanvasId(canvasId);
    setEditingName(currentName);
  };

  const handleSaveEdit = (canvasId: number): void => {
    if (editingName.trim()) {
      setRecentCanvases(prev => prev.map(canvas => {
        if (canvas.id === canvasId) {
          return { ...canvas, name: editingName, updated: 'Just now' };
        }
        return canvas;
      }));
      setEditingCanvasId(null);
      setEditingName('');
      window.alert('Canvas renamed successfully!');
    }
  };

  const handleDeleteCanvas = (canvasId: number): void => {
    if (window.confirm('Are you sure you want to delete this canvas? This action cannot be undone.')) {
      setRecentCanvases(prev => prev.filter(canvas => canvas.id !== canvasId));
      window.alert('Canvas deleted successfully!');
    }
  };

  const handleCreateFromTemplate = (template: typeof canvasTemplates[0]): void => {
    const name = window.prompt(`Enter name for your ${template.name}:`);
    if (name) {
      const newCanvas: Canvas = {
        id: recentCanvases.length + 1,
        name: name,
        members: 1,
        updated: 'Just now',
        color: template.color,
        locked: false,
        template: template.name
      };
      setRecentCanvases(prev => [newCanvas, ...prev]);
      setShowTemplates(false);
      window.alert(`"${name}" created from ${template.name} template!`);
    }
  };

  const handleCreateCanvas = (): void => {
    setShowTemplates(true);
  };

  const getStorageColor = (): string => {
    switch(storageUsage.status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getStorageMessage = (): string => {
    switch(storageUsage.status) {
      case 'critical': return 'Critical - Upgrade plan';
      case 'warning': return 'Warning - Consider cleaning';
      default: return 'Normal usage';
    }
  };

  return (
    <SimpleLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-2">Welcome back! Manage your canvases.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-slate-800/50 px-3 py-1.5 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-400">Live</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                <Folder className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Active Canvases</p>
                <p className="text-2xl font-bold text-white">4,892</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Team Members</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
            <div className="flex items-center mb-2">
              <div className="h-10 w-10 rounded-lg bg-orange-500/20 flex items-center justify-center mr-3">
                <Database className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Storage Used</p>
                <p className="text-2xl font-bold text-white">{storageUsage.used} GB</p>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <AlertCircle className="h-3 w-3 text-yellow-400 mr-1" />
              <span className="text-xs text-yellow-400">{getStorageMessage()}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className={`h-2 rounded-full ${getStorageColor()}`} style={{ width: `${storageUsage.percentage}%` }}></div>
            </div>
          </div>
          
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3">
                <BarChart3 className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Recent Edits</p>
                <p className="text-2xl font-bold text-white">42</p>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Modal */}
        {showTemplates && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-slate-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Choose a Template</h2>
                    <p className="text-slate-400 mt-1">Start with a pre-built template or blank canvas</p>
                  </div>
                  <button 
                    onClick={() => setShowTemplates(false)}
                    className="text-slate-400 hover:text-white text-2xl"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {canvasTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleCreateFromTemplate(template)}
                      className="flex items-start p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors text-left border border-slate-700/50 hover:border-blue-500/50"
                    >
                      <div className={`h-12 w-12 rounded-lg ${template.color} flex items-center justify-center mr-4`}>
                        <template.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{template.name}</h3>
                        <p className="text-sm text-slate-400 mt-1">{template.description}</p>
                      </div>
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handleCreateFromTemplate({ 
                      id: 'blank', 
                      name: 'Blank Canvas', 
                      icon: Layout, 
                      color: 'bg-gray-500', 
                      description: 'Start from scratch' 
                    })}
                    className="flex items-start p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors text-left border border-slate-700/50 col-span-2"
                  >
                    <div className="h-12 w-12 rounded-lg bg-gray-500 flex items-center justify-center mr-4">
                      <Layout className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Blank Canvas</h3>
                      <p className="text-sm text-slate-400 mt-1">Start from scratch with an empty canvas</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Canvases */}
        <div className="bg-slate-900/30 border border-slate-700/50 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Canvases</h2>
            <span className="text-sm text-slate-400">{recentCanvases.length} total</span>
          </div>
          
          <div className="space-y-3">
            {recentCanvases.map((canvas) => (
              <div 
                key={canvas.id} 
                className="group flex items-center justify-between p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`h-10 w-10 rounded-lg ${canvas.color} flex items-center justify-center`}>
                    <Folder className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    {editingCanvasId === canvas.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(canvas.id)}
                          className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingCanvasId(null)}
                          className="px-2 py-1 bg-slate-700 text-white text-xs rounded hover:bg-slate-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <h3 className="font-medium text-white">{canvas.name}</h3>
                          {canvas.template && (
                            <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                              {canvas.template}
                            </span>
                          )}
                          {canvas.locked && canvas.lockedBy && (
                            <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                              Locked by {canvas.lockedBy}
                            </span>
                          )}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {canvas.members} {canvas.members === 1 ? 'member' : 'members'} • {canvas.updated}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditCanvas(canvas.id, canvas.name)} 
                    className="p-1.5 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-slate-700/50"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      toggleCanvasLock(canvas.id); 
                    }} 
                    className="p-1.5 text-slate-400 hover:text-yellow-400 rounded-lg hover:bg-slate-700/50"
                    title={canvas.locked ? 'Unlock' : 'Lock'}
                  >
                    {canvas.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      handleViewCanvas(canvas.id); 
                    }} 
                    className="p-1.5 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-slate-700/50"
                    title="Open"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteCanvas(canvas.id)} 
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-700/50"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleCreateCanvas} 
            className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Canvas (Choose Template)
          </button>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default DashboardPage;
