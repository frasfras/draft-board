import React, { useState, useRef } from 'react';
import { Square, Circle, PenLine, Type, Download, Trash2, RotateCw, Search, Upload } from 'lucide-react';
import Track from './Track';
import ImageUploadPanel from './components/ImageUploadPanel';
// import VariablePanel from './components/VariablePanel';
import WikipediaPanel from './components/WikipediaPanel';

// Properties Panel Component
function PropertiesPanel({ element, onUpdate }) {
  if (!element) return null;

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <h3 className="font-semibold mb-4">Properties</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            type="color"
            value={element.color}
            onChange={(e) => onUpdate(element.id, { color: e.target.value })}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Width</label>
          <input
            type="range"
            min="50"
            max="400"
            value={element.width}
            onChange={(e) => onUpdate(element.id, { width: parseInt(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm text-gray-600">{element.width}px</span>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Height</label>
          <input
            type="range"
            min="50"
            max="400"
            value={element.height}
            onChange={(e) => onUpdate(element.id, { height: parseInt(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm text-gray-600">{element.height}px</span>
        </div>

        {element.type === 'line' && (
          <div>
            <label className="block text-sm font-medium mb-1">Line Thickness</label>
            <input
              type="range"
              min="1"
              max="20"
              value={element.lineThickness || 4}
              onChange={(e) => {
                const thickness = parseInt(e.target.value);
                onUpdate(element.id, { 
                  lineThickness: thickness,
                  height: thickness
                });
              }}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{element.lineThickness || 4}px</span>
          </div>
        )}

        {element.type === 'text' && (
          <div>
            <label className="block text-sm font-medium mb-1">Font Size</label>
            <input
              type="range"
              min="12"
              max="72"
              value={element.fontSize || 24}
              onChange={(e) => onUpdate(element.id, { fontSize: parseInt(e.target.value) })}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{element.fontSize || 24}px</span>
          </div>
        )}

        {element.type === 'image' && element.numberValue && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium mb-1">Associated Number</label>
            <div className="text-lg font-semibold text-blue-600">{element.numberValue}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CanvasStarter() {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [draggingBadge, setDraggingBadge] = useState(null);
  const [variables, setVariables] = useState([
    { id: 1, name: 'Force', value: '100N' },
    { id: 2, name: 'Mass', value: '50kg' }
  ]);
  const [showVariablePanel, setShowVariablePanel] = useState(false);
  const [showImagePanel, setShowImagePanel] = useState(false);
  const [showWikipediaPanel, setShowWikipediaPanel] = useState(true);
  const canvasRef = useRef(null);

  // Replace variables in text with their values
  const replaceVariables = (text) => {
    let result = text;
    variables.forEach(variable => {
      const regex = new RegExp(`\\{${variable.name}\\}`, 'g');
      result = result.replace(regex, variable.value);
    });
    return result;
  };

  const addVariable = () => {
    const newVariable = {
      id: Date.now(),
      name: 'NewVar',
      value: '0'
    };
    setVariables([...variables, newVariable]);
  };

  const updateVariable = (id, field, value) => {
    setVariables(variables.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const deleteVariable = (id) => {
    setVariables(variables.filter(v => v.id !== id));
  };

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      x: 100,
      y: 100,
      width: type === 'text' ? 200 : type === 'line' ? 150 : 100,
      height: type === 'text' ? 50 : type === 'line' ? 4 : 100,
      rotation: 0,
      color: type === 'text' ? '#000000' : '#3b82f6',
      text: type === 'text' ? 'Type {Force} here' : null,
      fontSize: 24,
      lineThickness: type === 'line' ? 4 : null
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const addImageElement = (imageUrl, numberValue) => {
    const newElement = {
      id: Date.now(),
      type: 'image',
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      rotation: 0,
      imageUrl: imageUrl,
      numberValue: numberValue
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const deleteElement = () => {
    if (selectedId) {
      const currentIndex = elements.findIndex(el => el.id === selectedId);
      const filteredElements = elements.filter(el => el.id !== selectedId);
      setElements(filteredElements);
      
      // Keep focus on another element if available
      if (filteredElements.length > 0) {
        // Try to select the next element, or the previous one if we deleted the last
        const nextIndex = currentIndex < filteredElements.length ? currentIndex : filteredElements.length - 1;
        setSelectedId(filteredElements[nextIndex].id);
      } else {
        setSelectedId(null);
      }
    }
  };

  const rotateElement = () => {
    if (selectedId) {
      setElements(elements.map(el => 
        el.id === selectedId ? { ...el, rotation: (el.rotation + 45) % 360 } : el
      ));
    }
  };

  const updateElement = (id, updates) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const handleMouseDown = (e, element) => {
    e.stopPropagation();
    // e.preventDefault();
    setSelectedId(element.id);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragging({
      id: element.id,
      offsetX: e.clientX - rect.left - element.x,
      offsetY: e.clientY - rect.top - element.y
    });
  };

  const handleElementClick = (e, element) => {
    e.stopPropagation();
    setSelectedId(element.id);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      updateElement(dragging.id, {
        x: e.clientX - rect.left - dragging.offsetX,
        y: e.clientY - rect.top - dragging.offsetY
      });
    } else if (draggingBadge) {
      const rect = canvasRef.current.getBoundingClientRect();
      const element = elements.find(el => el.id === draggingBadge.id);
      if (element) {
        const elementScreenX = element.x + rect.left;
        const elementScreenY = element.y + rect.top;
        
        updateElement(draggingBadge.id, {
          badgeX: e.clientX - elementScreenX - draggingBadge.offsetX,
          badgeY: e.clientY - elementScreenY - draggingBadge.offsetY
        });
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setDraggingBadge(null);
  };

  const handleBadgeMouseDown = (e, element) => {
    e.stopPropagation();
    e.preventDefault();
    
    const rect = canvasRef.current.getBoundingClientRect();
    const elementScreenX = element.x + rect.left;
    const elementScreenY = element.y + rect.top;
    const currentBadgeX = element.badgeX || 10;
    const currentBadgeY = element.badgeY || 10;
    
    setDraggingBadge({
      id: element.id,
      offsetX: e.clientX - elementScreenX - currentBadgeX,
      offsetY: e.clientY - elementScreenY - currentBadgeY
    });
  };

  const exportCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawPromises = elements.map(el => {
      return new Promise((resolve) => {
        ctx.save();
        ctx.translate(el.x + el.width / 2, el.y + el.height / 2);
        ctx.rotate((el.rotation * Math.PI) / 180);
        ctx.translate(-el.width / 2, -el.height / 2);

        if (el.type === 'rectangle') {
          ctx.fillStyle = el.color;
          ctx.fillRect(0, 0, el.width, el.height);
          ctx.restore();
          resolve();
        } else if (el.type === 'circle') {
          ctx.fillStyle = el.color;
          ctx.beginPath();
          ctx.arc(el.width / 2, el.height / 2, el.width / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          resolve();
        } else if (el.type === 'line') {
          ctx.fillStyle = el.color;
          const thickness = el.lineThickness || 4;
          ctx.roundRect(0, 0, el.width, thickness, 2);
          ctx.fill();
          ctx.restore();
          resolve();
        } else if (el.type === 'text') {
          ctx.fillStyle = el.color;
          ctx.font = `${el.fontSize || 24}px Arial`;
          ctx.textBaseline = 'top';
          
          const displayText = replaceVariables(el.text);
          const lines = displayText.split('\n');
          
          lines.forEach((line, index) => {
            ctx.fillText(line, 10, 10 + (index * (el.fontSize || 24) * 1.2));
          });
          ctx.restore();
          resolve();
        } else if (el.type === 'image') {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, el.width, el.height);
            
            // Draw the badge if numberValue exists
            if (el.numberValue) {
              const badgeX = el.badgeX || 10;
              const badgeY = el.badgeY || 10;
              
              // Badge background
              ctx.fillStyle = '#3b82f6'; // blue-500
              ctx.roundRect(badgeX, badgeY, 60, 30, 4);
              ctx.fill();
              
              // Badge text
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 14px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(el.numberValue, badgeX + 30, badgeY + 15);
            }
            
            ctx.restore();
            resolve();
          };
          img.onerror = () => {
            ctx.restore();
            resolve();
          };
          img.src = el.imageUrl;
        }
      });
    });

    Promise.all(drawPromises).then(() => {
      const link = document.createElement('a');
      link.download = 'engineering-diagram.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const addWikipediaArticle = (title, url, snippet) => {
    const newElement = {
      id: Date.now(),
      type: 'text',
      x: 100,
      y: 100,
      width: 300,
      height: 150,
      rotation: 0,
      color: '#000000',
      text: `${title}\n\n${snippet.replace(/<[^>]*>/g, '')}...\n\n${url}`,
      fontSize: 14
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const togglePanel = (panelType) => {
    if (panelType === 'variables') {
      setShowVariablePanel(true);
      setShowImagePanel(false);
      setShowWikipediaPanel(false);
    } else if (panelType === 'image') {
      setShowImagePanel(true);
      setShowVariablePanel(false);
      setShowWikipediaPanel(false);
    } else if (panelType === 'wikipedia') {
      setShowWikipediaPanel(true);
      setShowImagePanel(false);
      setShowVariablePanel(false);
    }
  };

  const selectedElement = elements.find(el => el.id === selectedId);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4">
        <button
          onClick={() => addElement('rectangle')}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add Rectangle"
        >
          <Square className="w-6 h-6" />
        </button>
        <button
          onClick={() => addElement('circle')}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add Circle"
        >
          <Circle className="w-6 h-6" />
        </button>
        <button
          onClick={() => addElement('line')}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add Line"
        >
          <PenLine className="w-6 h-6" />
        </button>
        <button
          onClick={() => addElement('text')}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add Text"
        >
          <Type className="w-6 h-6" />
        </button>
        <button
          onClick={() => togglePanel('image')}
          className={`p-3 rounded-lg transition-colors ${showImagePanel ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          title="Upload Image"
        >
          <Upload className="w-6 h-6" />
        </button>
        <button
          onClick={() => togglePanel('wikipedia')}
          className={`p-3 rounded-lg transition-colors ${showWikipediaPanel ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          title="Wikipedia Search"
        >
          <Search className="w-6 h-6" />
        </button>
        <div className="flex-1" />
        <button
          onClick={exportCanvas}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Export PNG"
        >
          <Download className="w-6 h-6" />
        </button>
      </div>

      {/* Image Upload Panel - Now shown by default */}
        {showImagePanel && (
        <ImageUploadPanel
          onClose={() => setShowImagePanel(false)}
          onImageAdd={addImageElement}
        />
      )} 

      {/* Variable Panel - Hidden by default */}
      {/* {showVariablePanel && (
        <VariablePanel
          variables={variables}
          onUpdate={updateVariable}
          onDelete={deleteVariable}
          onAdd={addVariable}
          onClose={() => setShowVariablePanel(false)}
        />
      )} */}

      {/* Wikipedia Panel - Hidden by default */}
       {showWikipediaPanel && (
        <WikipediaPanel
          onClose={() => setShowWikipediaPanel(false)}
          onAddToCanvas={addWikipediaArticle}
        />
      )} 

      {/* Canvas */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 flex gap-2">
          {/* {!showImagePanel && (
            <button
              onClick={() => togglePanel('image')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Show Image Upload
            </button>
          )} */}
          {/* {!showVariablePanel && (
            <button
              onClick={() => togglePanel('variables')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Show Variables
            </button>
          )} */}
           {!showWikipediaPanel && (
            <button
              onClick={() => togglePanel('wikipedia')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Show Wikipedia
            </button>
          )} 
          <button
            onClick={rotateElement}
            disabled={!selectedId}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <RotateCw className="w-4 h-4" />
            Rotate
          </button>
          <button
            onClick={deleteElement}
            disabled={!selectedId}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div
            ref={canvasRef}
            className="relative bg-white shadow-lg"
            style={{ width: 800, height: 600 }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={() => setSelectedId(null)}
          >
            {elements.map(element => (
              <div
                key={element.id}
                className={`absolute cursor-move ${selectedId === element.id ? 'ring-2 ring-blue-500' : ''}`}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  transform: `rotate(${element.rotation}deg)`,
                  transformOrigin: 'center'
                }}
                onMouseDown={(e) => handleMouseDown(e, element)}
                onClick={(e) => handleElementClick(e, element)}
              >
                {element.type === 'rectangle' && (
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: element.color }}
                  />
                )}
                {element.type === 'circle' && (
                  <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: element.color }}
                  />
                )}
                {element.type === 'line' && (
                  <div
                    className="w-full"
                    style={{ 
                      backgroundColor: element.color,
                      height: `${element.lineThickness || 4}px`,
                      borderRadius: '2px'
                    }}
                  />
                )}
                {element.type === 'text' && (
                  <div className="relative w-full h-full">
                    <textarea
                      value={element.text}
                      onChange={(e) => updateElement(element.id, { text: e.target.value })}
                      className="w-full h-full font-bold border-none outline-none bg-transparent resize-none"
                      style={{ 
                        color: element.color,
                        fontSize: `${element.fontSize || 24}px`
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div 
                      className="absolute inset-0 pointer-events-none font-bold whitespace-pre-wrap"
                      style={{ 
                        color: element.color,
                        opacity: 0.6,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        fontSize: `${element.fontSize || 24}px`
                      }}
                    >
                      {replaceVariables(element.text)}
                    </div>
                  </div>
                )}
                {element.type === 'image' && (
                  <div className="w-full h-full relative">
                    <img
                      src={element.imageUrl}
                      alt="Uploaded"
                      className="w-full h-full object-contain"
                    />
                    {element.numberValue && (
                      <div 
                        className="absolute bg-blue-500 text-white px-2 py-1 rounded text-4xl font-semibold cursor-move hover:bg-blue-600 hover:shadow-lg transition-all"
                        style={{
                          left: `${element.badgeX || 10}px`,
                          top: `${element.badgeY || 10}px`
                        }}
                        onMouseDown={(e) => handleBadgeMouseDown(e, element)}
                        title="Drag to reposition badge"
                      >
                        {element.numberValue}
                      </div>
                    )}
                  </div>
                )}
                
              </div>
            ))}
            {/* <Dashboard /> */}
            
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      <PropertiesPanel
        element={selectedElement}
        onUpdate={updateElement}
      />
    </div>
  );
}