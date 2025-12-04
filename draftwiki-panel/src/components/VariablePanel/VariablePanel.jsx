import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

function VariablePanel({ variables, onUpdate, onDelete, onAdd, onClose }) {
  const [formula, setFormula] = useState('');
  const [copied, setCopied] = useState(false);

  const formatFormula = (text) => {
    // Replace common formula patterns with formatted versions
    let formatted = text;
    
    // Convert ^ to superscript notation
    const superscripts = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
    };
    
    formatted = formatted.replace(/\^(\d+)/g, (match, num) => {
      return num.split('').map(digit => superscripts[digit] || digit).join('');
    });
    
    // Convert common symbols
    formatted = formatted.replace(/\*/g, '×');
    formatted = formatted.replace(/\//g, '÷');
    formatted = formatted.replace(/<=/g, '≤');
    formatted = formatted.replace(/>=/g, '≥');
    formatted = formatted.replace(/!=/g, '≠');
    formatted = formatted.replace(/sqrt\(/g, '√(');
    
    return formatted;
  };

  const handleCopyFormula = () => {
    const formatted = formatFormula(formula);
    navigator.clipboard.writeText(formatted).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Draft Board -Variables</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs text-gray-600 mb-3 p-2 bg-blue-50 rounded">
        Use variables in text as <code className="bg-white px-1 rounded">{'{VariableName}'}</code>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Variables List */}
        <div className="space-y-2">
          {variables.map(variable => (
            <div key={variable.id} className="border border-gray-200 rounded-lg p-2">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={variable.name}
                  onChange={(e) => onUpdate(variable.id, 'name', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Variable name"
                />
                <button
                  onClick={() => onDelete(variable.id)}
                  className="p-1 hover:bg-red-100 rounded text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={variable.value}
                onChange={(e) => onUpdate(variable.id, 'value', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Value"
              />
            </div>
          ))}
        </div>

        {/* Formula Formatter */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold mb-2">Formula Formatter</h4>
          <div className="text-xs text-gray-600 mb-2 p-2 bg-green-50 rounded">
            Type formulas with * / ^ symbols. They'll be formatted when copied.
          </div>
          
          <textarea
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            placeholder="E.g., F = m * a^2"
            className="w-full px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
          />
          
          {formula && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
              <div className="text-xs text-gray-500 mb-1">Preview:</div>
              <div className="font-mono">{formatFormula(formula)}</div>
            </div>
          )}
          
          <button
            onClick={handleCopyFormula}
            disabled={!formula}
            className="mt-2 w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {copied ? '✓ Copied!' : 'Copy Formatted'}
          </button>
        </div>
      </div>

      <button
        onClick={onAdd}
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Variable
      </button>
    </div>
  );
}

export default VariablePanel;
