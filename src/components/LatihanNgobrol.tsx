import React, { useState } from 'react';
import latihanData from '../data/latihan_ngobrol.json';
import { SlotMachine } from './SlotMachine';
import { ButtonNeo } from './ButtonNeo';
import { Smile, Eye, MessageSquare, Unlock, ArrowRight, HandHeart, BookOpen } from 'lucide-react';

export function LatihanNgobrol() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentData, setCurrentData] = useState<any>(null);
  const [dummyTexts, setDummyTexts] = useState<string[]>([]);
  const [isContohOpen, setIsContohOpen] = useState(false);
  
  const [soften, setSoften] = useState({
    smile: false,
    open: false,
    forward: false,
    touch: false,
    eyeContact: false,
    nod: false
  });

  const handleSpin = () => {
    if (isSpinning) return;
    
    // Generate dummy texts for slot machine
    const dummies = Array.from({ length: 12 }).map(() => {
      const randIdx = Math.floor(Math.random() * latihanData.length);
      return latihanData[randIdx]?.question || "Pertanyaan dummy";
    });
    setDummyTexts(dummies);
    
    setIsSpinning(true);
    setCurrentData(null);
    
    setTimeout(() => {
      const randIdx = Math.floor(Math.random() * latihanData.length);
      setCurrentData(latihanData[randIdx]);
      setIsSpinning(false);
    }, 3500);
  };

  const parseMadLibs = (text: string) => {
    if (!text) return null;
    const regex = /\[(.*?)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <span key={match.index} className="text-[#8B0000] font-black inline-block px-1 rounded-md">
          [{match[1]}]
        </span>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div className="w-full max-w-6xl flex flex-col items-center gap-4 relative z-10 pb-20">
      <header className="mb-1 text-center w-full relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-md">
          Bertukar <span className="text-white neo-shadow bg-black px-2 py-1 rounded-md">Cerita</span>
        </h1>
        <p className="mt-3 text-lg font-bold max-w-4xl mx-auto italic">
          "Obrolan yang baik adalah tentang mendengarkan lebih banyak daripada berbicara."
        </p>
      </header>
      
      <div className="w-full flex flex-col md:flex-row gap-8 items-start text-black">
        <div className="w-full md:w-[35%] flex flex-col gap-6">
          {/* S.O.F.T.E.N Tips */}
          <details className="w-full bg-white neo-brutal-yellow p-6 rounded-2xl group cursor-pointer font-body-md [&>summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between list-none w-full">
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-3xl text-black">tips_and_updates</span>
                  <h3 className="font-black text-lg font-headline-lg">Tips Ngobrol Langsung (S.O.F.T.E.N)</h3>
                </div>
                <p className="text-sm font-bold text-gray-700 font-body-md ml-10">Pastiin untuk ngelakuin ini supaya obrolan makin ngalir</p>
              </div>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
            </summary>
            <ul className="space-y-4 border-t-2 border-black/10 pt-4 mt-4">
              <li className="flex items-start gap-3 cursor-pointer" onClick={() => setSoften({...soften, smile: !soften.smile})}>
                <div className={`w-6 h-6 border-[3px] border-black rounded flex items-center justify-center mt-1 shrink-0 transition-colors ${soften.smile ? 'bg-latihan-secondary-container text-black' : 'bg-white text-transparent'}`}>
                  <span className="material-symbols-outlined text-sm font-black">check</span>
                </div>
                <div>
                  <p className="font-black text-sm uppercase flex items-center gap-2"><Smile size={16} /> Smile</p>
                  <p className="text-xs font-bold text-gray-500 font-body-md">Tersenyum membuat suasana lebih cair dan ramah.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 cursor-pointer" onClick={() => setSoften({...soften, open: !soften.open})}>
                <div className={`w-6 h-6 border-[3px] border-black rounded flex items-center justify-center mt-1 shrink-0 transition-colors ${soften.open ? 'bg-latihan-secondary-container text-black' : 'bg-white text-transparent'}`}>
                  <span className="material-symbols-outlined text-sm font-black">check</span>
                </div>
                <div>
                  <p className="font-black text-sm uppercase flex items-center gap-2"><Unlock size={16} /> Open Posture</p>
                  <p className="text-xs font-bold text-gray-500 font-body-md">Tunjukkan bahwa kamu menerima ceritanya dengan baik.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 cursor-pointer" onClick={() => setSoften({...soften, forward: !soften.forward})}>
                <div className={`w-6 h-6 border-[3px] border-black rounded flex items-center justify-center mt-1 shrink-0 transition-colors ${soften.forward ? 'bg-latihan-secondary-container text-black' : 'bg-white text-transparent'}`}>
                  <span className="material-symbols-outlined text-sm font-black">check</span>
                </div>
                <div>
                  <p className="font-black text-sm uppercase flex items-center gap-2"><ArrowRight size={16} /> Forward Lean</p>
                  <p className="text-xs font-bold text-gray-500 font-body-md">Condong ke depan menunjukkan ketertarikanmu pada obrolannya.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 cursor-pointer" onClick={() => setSoften({...soften, touch: !soften.touch})}>
                <div className={`w-6 h-6 border-[3px] border-black rounded flex items-center justify-center mt-1 shrink-0 transition-colors ${soften.touch ? 'bg-latihan-secondary-container text-black' : 'bg-white text-transparent'}`}>
                  <span className="material-symbols-outlined text-sm font-black">check</span>
                </div>
                <div>
                  <p className="font-black text-sm uppercase flex items-center gap-2"><HandHeart size={16} /> Touch</p>
                  <p className="text-xs font-bold text-gray-500 font-body-md">Bisa berupa sentuhan atau juga nada suara yang lembut.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 cursor-pointer" onClick={() => setSoften({...soften, eyeContact: !soften.eyeContact})}>
                <div className={`w-6 h-6 border-[3px] border-black rounded flex items-center justify-center mt-1 shrink-0 transition-colors ${soften.eyeContact ? 'bg-latihan-secondary-container text-black' : 'bg-white text-transparent'}`}>
                  <span className="material-symbols-outlined text-sm font-black">check</span>
                </div>
                <div>
                  <p className="font-black text-sm uppercase flex items-center gap-2"><Eye size={16} /> Eye Contact</p>
                  <p className="text-xs font-bold text-gray-500 font-body-md">Menandakan kamu benar-benar memperhatikan lawan bicara.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 cursor-pointer" onClick={() => setSoften({...soften, nod: !soften.nod})}>
                <div className={`w-6 h-6 border-[3px] border-black rounded flex items-center justify-center mt-1 shrink-0 transition-colors ${soften.nod ? 'bg-latihan-secondary-container text-black' : 'bg-white text-transparent'}`}>
                  <span className="material-symbols-outlined text-sm font-black">check</span>
                </div>
                <div>
                  <p className="font-black text-sm uppercase flex items-center gap-2"><MessageSquare size={16} /> Nod</p>
                  <p className="text-xs font-bold text-gray-500 font-body-md">Mengangguk tanda kamu mengikuti alur ceritanya.</p>
                </div>
              </li>
            </ul>
          </details>
          
          {/* A.R.A Guide */}
          <details className="w-full bg-white neo-brutal-pink rounded-2xl p-6 group cursor-pointer font-body-md [&>summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between list-none w-full">
              <div className="flex items-center gap-2 text-left">
                <BookOpen size={24} className="text-black" />
                <h3 className="text-lg font-black font-headline-lg">A.R.A Guide</h3>
              </div>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
            </summary>
            <div className="space-y-4 border-t-2 border-black/10 pt-4 mt-4">
              <div className="flex flex-col">
                <p className="text-sm font-bold"><span className="text-latihan-primary font-black uppercase">Acknowledge:</span> Hargai ceritanya dengan respon singkat.</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold"><span className="text-latihan-primary font-black uppercase">Relate:</span> Hubungkan dengan pengalaman serupa yang kamu punya.</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold"><span className="text-latihan-primary font-black uppercase">Ask:</span> Tanya balik untuk menjaga obrolan tetap mengalir.</p>
              </div>
            </div>
          </details>
        </div>

        <div className="w-full md:w-[65%] flex flex-col items-center justify-start z-10">
          {currentData && (
            <div className="bg-black text-white px-6 py-2 rounded-t-2xl text-[14px] font-black tracking-widest relative z-0 mb-[-4px] border-4 border-black border-b-0">
              {currentData.category.toUpperCase()}
            </div>
          )}
          
          <SlotMachine 
            isSpinning={isSpinning} 
            result={currentData ? currentData.question : null} 
            dummyTexts={dummyTexts.length > 0 ? dummyTexts : ["Menyiapkan topik...", "Mencari inspirasi..."]} 
          />
          
          <ButtonNeo 
            variant="primary" 
            className="text-xl md:text-2xl px-10 py-3 mb-4 mt-2"
            onClick={handleSpin}
          >
            {isSpinning ? "MENGACAK..." : "SPIN SEKARANG"}
          </ButtonNeo>

          {/* Contoh Popup */}
          {currentData && !isSpinning && (
            <>
              <ButtonNeo 
                variant="accent" 
                className="flex items-center gap-2 mt-4 px-6 py-2 rounded-full text-lg"
                onClick={() => setIsContohOpen(true)}
              >
                <MessageSquare size={20} />
                Contoh
              </ButtonNeo>

              {isContohOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                  <div className="bg-white border-4 border-black neo-shadow rounded-[32px] p-6 max-w-md w-full relative transform transition-all">
                    <button 
                      onClick={() => setIsContohOpen(false)}
                      className="absolute top-4 right-4 bg-[#FFEB3B] border-2 border-black rounded-full p-1 neo-active"
                    >
                      <span className="material-symbols-outlined font-black">close</span>
                    </button>
                    <div className="flex items-center gap-2 mb-4">
                      <MessageSquare size={24} className="text-black" />
                      <h3 className="text-xl font-black font-headline-lg">Contoh</h3>
                    </div>
                    <div className="bg-latihan-brand-pink/20 p-4 rounded-xl border-2 border-black/10">
                      <ul className="space-y-4 list-none">
                        <li>
                          <span className="text-sm font-black text-black uppercase tracking-wider block mb-1">Acknowledge:</span>
                          <span className="text-sm font-bold text-black italic bg-white px-2 py-1 rounded block">
                            {parseMadLibs(currentData.acknowledge)}
                          </span>
                        </li>
                        <li>
                          <span className="text-sm font-black text-black uppercase tracking-wider block mb-1">Relate:</span>
                          <span className="text-sm font-bold text-black italic bg-white px-2 py-1 rounded block">
                            {parseMadLibs(currentData.relate)}
                          </span>
                        </li>
                        <li>
                          <span className="text-sm font-black text-black uppercase tracking-wider block mb-1">Ask:</span>
                          <span className="text-sm font-bold text-black italic bg-white px-2 py-1 rounded block">
                            {parseMadLibs(currentData.ask)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
