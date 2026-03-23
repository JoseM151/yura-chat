import React, { useState } from 'react';

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const Input = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder="Cuéntame, te escucho..."
        className="flex-1 bg-slate-50 border-transparent focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50 rounded-xl px-4 py-3 text-sm outline-none transition-all disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className="bg-violet-600 hover:bg-violet-700 active:scale-95 text-white p-3 rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-violet-600"
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default Input;
