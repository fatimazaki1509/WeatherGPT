"use client";
import { useState, useEffect } from "react";
import { History, X, MapPin, Clock } from "lucide-react";

interface QueryHistoryProps {
  onClose: () => void;
}

export default function QueryHistory({ onClose }: QueryHistoryProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/history");
      const data = await res.json();
      setHistory(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#0f172a] border-2 border-yellow-500/50 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-700 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 sticky top-0">
          <div>
            <h3 className="font-bold text-white text-lg">Recent Queries</h3>
            <p className="text-xs text-gray-400">Your conversation history</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading history...</div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No queries yet. Start chatting!</div>
          ) : (
            history.map((item, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-yellow-500/50 transition">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>{new Date(item.time).toLocaleTimeString()}</span>
                  </div>
                </div>
                <p className="text-white font-medium mb-1">Q: {item.query}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}