import React, { useState } from 'react';
import { Plus, FileText, ClipboardList, Paperclip, X } from 'lucide-react';

type CanvasNodeType = 'task' | 'note' | 'file';

interface CanvasNode {
  id: string;
  type: CanvasNodeType;
  content: string;
  x: number;
  y: number;
}

const InteractiveCanvasWorkspace: React.FC = () => {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [nextId, setNextId] = useState(1);

  const addNode = (type: CanvasNodeType) => {
    const newNode: CanvasNode = {
      id: `node-${nextId}`,
      type,
      content: '',
      x: Math.random() * 500,
      y: Math.random() * 300
    };
    setNodes([...nodes, newNode]);
    setNextId(nextId + 1);
  };

  const updateNodeContent = (id: string, content: string) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, content } : node
    ));
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
  };

  const getNodeIcon = (type: CanvasNodeType) => {
    switch(type) {
      case 'task': return <ClipboardList size={20} className="text-blue-500" />;
      case 'note': return <FileText size={20} className="text-green-500" />;
      case 'file': return <Paperclip size={20} className="text-purple-500" />;
      default: return <Plus size={20} />;
    }
  };

  const getNodeTitle = (type: CanvasNodeType) => {
    switch(type) {
      case 'task': return 'Task';
      case 'note': return 'Note';
      case 'file': return 'File';
      default: return 'Node';
    }
  };

  return (
    <div className="interactive-canvas-workspace p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Interactive Canvas Workspace
        </h2>
        <p className="text-gray-600 mb-4">
          Drag nodes from the sidebar to build your workflow
        </p>
        
        <div className="flex space-x-4">
          <button
            onClick={() => addNode('task')}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add Task
          </button>
          
          <button
            onClick={() => addNode('note')}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add Note
          </button>
          
          <button
            onClick={() => addNode('file')}
            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add File
          </button>
        </div>
      </div>

      <div className="canvas-area relative min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        {nodes.map(node => (
          <div
            key={node.id}
            className={`canvas-node ${node.type}`}
            style={{ left: `${node.x}px`, top: `${node.y}px` }}
          >
            <div className="node-header">
              <div className="flex items-center">
                {getNodeIcon(node.type)}
                <span className="ml-2 font-medium">
                  {getNodeTitle(node.type)}
                </span>
              </div>
              <button
                onClick={() => removeNode(node.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="node-content">
              <textarea
                value={node.content}
                onChange={(e) => updateNodeContent(node.id, e.target.value)}
                placeholder={`Write your ${node.type} here...`}
                className="w-full h-full border-none bg-transparent resize-none focus:outline-none"
                rows={3}
              />
            </div>
            
            <div className="node-actions">
              <button
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                onClick={() => {/* Save functionality */}}
              >
                Save
              </button>
              <button
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                onClick={() => updateNodeContent(node.id, '')}
              >
                Clear
              </button>
            </div>
          </div>
        ))}
        
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <div className="text-4xl mb-4">??</div>
            <p className="text-lg">No items yet. Click buttons above to add tasks, notes, or files.</p>
            <p className="text-sm mt-2">Double-click on canvas items to edit them</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>?? Tip: Drag nodes to reposition them. Edit content directly in each node.</p>
        <p>Your work is automatically saved as you type.</p>
      </div>
    </div>
  );
};

export default InteractiveCanvasWorkspace;
