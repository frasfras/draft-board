import React, { useState } from 'react';
import { Plus, X, Search, ExternalLink } from 'lucide-react';

function WikipediaPanel({ onClose, onAddToCanvas }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWikipedia = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=10`
      );
      const data = await response.json();
      setResults(data.query.search);
    } catch (err) {
      setError('Failed to search Wikipedia. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchWikipedia();
    }
  };

  const addArticleToCanvas = (article) => {
    const articleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title.replace(/ /g, '_'))}`;
    onAddToCanvas(article.title, articleUrl, article.snippet);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Wikipedia Search</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search Wikipedia..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={searchWikipedia}
            disabled={loading || !query.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {loading && (
          <div className="text-center py-8 text-gray-500">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            Searching...
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {!loading && results.length === 0 && query && (
          <div className="text-center py-8 text-gray-500">
            No results found. Try a different search term.
          </div>
        )}

        {!loading && results.length === 0 && !query && (
          <div className="text-center py-8 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Search Wikipedia to find articles</p>
          </div>
        )}

        {results.map((article) => (
          <div
            key={article.pageid}
            className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors"
          >
            <h4 className="font-semibold text-sm mb-1 flex items-start justify-between gap-2">
              <span>{article.title}</span>
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(article.title.replace(/ /g, '_'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 flex-shrink-0"
                title="Open in Wikipedia"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </h4>
            <p
              className="text-xs text-gray-600 mb-2 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: article.snippet + '...' }}
            />
            <button
              onClick={() => addArticleToCanvas(article)}
              className="w-full px-3 py-1.5 bg-green-500 text-white rounded text-xs hover:bg-green-600 flex items-center justify-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add to Canvas
            </button>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-xs text-gray-600 p-3 bg-blue-50 rounded-lg">
        <p className="font-medium mb-1">How to use:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Search for Wikipedia articles</li>
          <li>Click "Add to Canvas" to embed</li>
          <li>Articles appear as text elements</li>
        </ul>
      </div>
    </div>
  );
}

export default WikipediaPanel;
