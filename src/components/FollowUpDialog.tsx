import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface FollowUpDialogProps {
  questions: string[];
  isLoading: boolean;
}

export const FollowUpDialog: React.FC<FollowUpDialogProps> = ({ questions, isLoading }) => {
  if (!isLoading && questions.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mt-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 relative">
      <div className="absolute -top-4 -left-4 bg-[#FFEB3B] border-4 border-black rounded-full p-2">
        <Sparkles size={24} fill="currentColor" />
      </div>
      
      <h3 className="text-xl font-bold mb-4 ml-6">Pertanyaan Lanjutan</h3>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-6">
          <Loader2 size={32} className="animate-spin mb-2" />
          <p className="font-semibold text-gray-600">Sedang memikirkan topik seru...</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {questions.map((q, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 text-xl">🔹</span>
              <span className="text-lg font-semibold">{q}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
