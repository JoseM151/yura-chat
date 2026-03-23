import React from 'react';

const Message = ({ text, sender, time }) => {
  const isAI = sender === 'ai';

  return (
    <div className={`flex flex-col mb-4 ${isAI ? 'items-start' : 'items-end'}`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 ${
          isAI
            ? 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
            : 'bg-violet-600 text-white rounded-br-none'
        }`}
      >
        {text}
      </div>
      <span className="text-[10px] text-slate-400 mt-1 px-1">{time}</span>
    </div>
  );
};

export default Message;
