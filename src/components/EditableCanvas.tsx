import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';

interface Canvas {
  id: number;
  name: string;
  members: number;
  updated: string;
  color: string;
  type: string;
  status: string;
  locked: boolean;
  lockedBy?: string;
  liveUsers: string[];
}

interface EditableCanvasProps {
  canvas: Canvas;
  onSave: (id: number, newName: string) => void;
  onLockToggle: (id: number) => void;
}

const EditableCanvas: React.FC<EditableCanvasProps> = ({ canvas, onSave, onLockToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(canvas.name);

  const handleSave = () => {
    onSave(canvas.id, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(canvas.name);
    setIsEditing(false);
  };

  return (
    <div className="recent-canvas-item p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        {isEditing ? (
          <div className="flex-1 mr-2">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        ) : (
          <h4 className="font-semibold text-gray-800 flex-1 cursor-text" 
              onDoubleClick={() => setIsEditing(true)}>
            {canvas.name}
          </h4>
        )}
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
                title="Save"
              >
                <Save size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onLockToggle(canvas.id)}
                className={`p-1 rounded ${canvas.locked ? 'text-red-600 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-100'}`}
                title={canvas.locked ? 'Unlock' : 'Lock'}
              >
                {canvas.locked ? '??' : '??'}
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full mr-2 bg-${canvas.color}-500`}></span>
          <span className="capitalize">{canvas.type}</span>
          <span className="mx-2">•</span>
          <span className="capitalize">{canvas.status}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">?? {canvas.members}</span>
          <span>{canvas.updated}</span>
        </div>
      </div>
      
      {canvas.locked && canvas.lockedBy && (
        <div className="mt-2 text-xs text-red-600">
          Locked by {canvas.lockedBy}
        </div>
      )}
      
      {canvas.liveUsers && canvas.liveUsers.length > 0 && (
        <div className="mt-2 flex items-center">
          <div className="flex -space-x-2 mr-2">
            {canvas.liveUsers.slice(0, 3).map((user, index) => (
              <div key={index} className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                {user.charAt(0)}
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {canvas.liveUsers.length} user{canvas.liveUsers.length > 1 ? 's' : ''} online
          </span>
        </div>
      )}
    </div>
  );
};

export default EditableCanvas;
