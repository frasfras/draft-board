import React, { useState, useRef } from 'react';
import { Plus, X, Upload } from 'lucide-react';

function ImageUploadPanel({ onClose, onImageAdd }) {
  const [imageUrl, setImageUrl] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (imageUrl) {
      onImageAdd(imageUrl, numberValue);
      setImageUrl('');
      setNumberValue('');
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Bib Maker Image Upload</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 space-y-4">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {!imageUrl ? (
            <div className="space-y-3">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Choose Image
                </button>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <img
                src={imageUrl}
                alt="Preview"
                className="max-w-full max-h-48 mx-auto rounded"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Change Image
              </button>
            </div>
          )}
        </div>

        {/* Number Field */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Number Value
          </label>
          <input
            type="text"
            value={numberValue}
            onChange={(e) => setNumberValue(e.target.value)}
            placeholder="Enter a number (e.g., 100, 3.14)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional: Associate a number with this image
          </p>
        </div>

        {/* Add to Canvas Button */}
        <button
          onClick={handleAddImage}
          disabled={!imageUrl}
          className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add to Canvas
        </button>

        {/* Instructions */}
        <div className="text-xs text-gray-600 p-3 bg-blue-50 rounded-lg">
          <p className="font-medium mb-1">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload an image from your device</li>
            <li>Optionally enter a number value</li>
            <li>Click "Add to Canvas" to place it</li>
            <li>Drag and resize on the canvas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadPanel;
