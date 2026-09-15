/**
 * src/app/admin/knowledge/page.tsx
 * Admin UI for managing Knowledge Base.
 */

"use client";

import React, { useState } from 'react';
import { chatbotSystem } from '@/lib/chatbot/chatbotSystem';

export default function KnowledgeAdmin() {
  const [entries, setEntries] = useState(chatbotSystem.getKB().getAll());
  const [newEntry, setNewEntry] = useState({ question: '', answer: '', keywords: '' });

  const addEntry = () => {
    if (!newEntry.question || !newEntry.answer) return;
    const entry = {
      id: Date.now().toString(),
      category: 'general',
      question: newEntry.question,
      answer: newEntry.answer,
      keywords: newEntry.keywords.split(',').map(k => k.trim())
    };
    chatbotSystem.getKB().addEntry(entry);
    setEntries([...chatbotSystem.getKB().getAll()]);
    setNewEntry({ question: '', answer: '', keywords: '' });
  };

  const deleteEntry = (id: string) => {
    chatbotSystem.getKB().deleteEntry(id);
    setEntries([...chatbotSystem.getKB().getAll()]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Knowledge Base Admin</h1>
      
      {/* Add New Entry */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Question" 
            className="w-full p-2 border rounded"
            value={newEntry.question}
            onChange={e => setNewEntry({...newEntry, question: e.target.value})}
          />
          <textarea 
            placeholder="Answer" 
            className="w-full p-2 border rounded h-24"
            value={newEntry.answer}
            onChange={e => setNewEntry({...newEntry, answer: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Keywords (comma separated)" 
            className="w-full p-2 border rounded"
            value={newEntry.keywords}
            onChange={e => setNewEntry({...newEntry, keywords: e.target.value})}
          />
          <button 
            onClick={addEntry}
            className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700 transition"
          >
            Add to Knowledge Base
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="p-4 border rounded-xl flex justify-between items-start bg-white shadow-sm">
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">{entry.question}</h3>
              <p className="text-slate-600 mt-1">{entry.answer}</p>
              <div className="flex gap-2 mt-2">
                {entry.keywords.map(k => (
                  <span key={k} className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">#{k}</span>
                ))}
              </div>
            </div>
            <button 
              onClick={() => deleteEntry(entry.id)}
              className="text-red-500 hover:text-red-700 px-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
