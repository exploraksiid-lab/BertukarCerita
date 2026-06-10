import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, MessageCircle, Play, Wand2, ArrowDownRight, Loader2, ChevronDown } from 'lucide-react';

// --- KONFIGURASI GEMINI API ---
const apiKey = ""; 
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

const callGeminiAPI = async (prompt, systemInstruction = "") => {
  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  if (systemInstruction) payload.systemInstruction = { parts: [{ text: systemInstruction }] };

  let retries = 5;
  let delay = 1000;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(res => setTimeout(res, delay));
      delay *= 2; 
    }
  }
};

// --- DATABASE INTERNAL (Fallback) ---
const questionsDB = [
  { id: 1, text: "Es kopi susu atau teh manis dingin pas cuaca lagi panas banget?", phase: "PDKT", nuance: "Fun" },
  { id: 2, text: "Makanan apa yang kamu suka banget tapi anehnya orang-orang pada nggak suka?", phase: "PDKT", nuance: "Random" },
  { id: 4, text: "Kalau lagi stres, makanan apa yang biasanya jadi comfort food kamu?", phase: "PDKT", nuance: "Deep" },
  { id: 8, text: "Apa kesan pertamamu saat melihatku?", phase: "PDKT", nuance: "Fun" },
  { id: 101, text: "Apa ketakutan terbesarmu dalam hubungan ini?", phase: "Pacaran", nuance: "Deep" },
  { id: 102, text: "Hal apa dari kebiasaanku yang paling bikin kamu gemes (dalam artian positif)?", phase: "Pacaran", nuance: "Fun" },
  { id: 103, text: "Kalau kita bisa liburan ke mana aja berdua besok tanpa mikirin biaya, kita ke mana?", phase: "Pacaran", nuance: "Random" },
  { id: 201, text: "Apa ketakutan yang kamu punya tentang aku yang semakin bertambah umur?", phase: "Menikah", nuance: "Deep" },
  { id: 202, text: "Kalau kita punya safeword pas lagi berantem biar langsung berhenti dan pelukan, kata apa yang pas?", phase: "Menikah", nuance: "Random" },
  { id: 203, text: "Hal apa yang sering aku ingetin ke kamu berkali-kali sampai rasanya kayak kaset rusak?", phase: "Menikah", nuance: "Fun" },
  { id: 205, text: "Would you rather: Rumah mewah tapi di lingkungan julid atau rumah sederhana di lingkungan super supportive?", phase: "Menikah", nuance: "Random" }
];

export default function App() {
  // --- STATE MANAGEMENT ---
  const [phase, setPhase] = useState(null); 
  const [nuance, setNuance] = useState('Fun'); 
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [previousId, setPreviousId] = useState(null);
  
  // Slot Machine States
  const [reelItems, setReelItems] = useState([{ id: 'init', text: "Pilih fase dan nuansa di kiri, lalu tekan SPIN!" }]);
  const [reelClass, setReelClass] = useState("");
  const [reelStyle, setReelStyle] = useState({ transform: 'translateY(0px)' });

  // Gemini AI States
  const [showAITopic, setShowAITopic] = useState(false);
  const [customTopic, setCustomTopic] = useState("");
  const [followUpData, setFollowUpData] = useState("");
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // UI States
  const [particles, setParticles] = useState([]);
  
  const slotHeight = 240; // Diperbesar untuk efek lonjong/panjang

  // --- THEME LOGIC ---
  const getTheme = () => {
    switch (phase) {
      case 'PDKT': 
        return { bg: 'bg-[#FF8A9A]', text: 'text-[#2C0E13]', shadowText: 'drop-shadow-[2px_2px_0px_#FFFFFF]', particleColor: 'text-white/30' }; 
      case 'Pacaran': 
        return { bg: 'bg-[#FF3366]', text: 'text-[#FFF0F3]', shadowText: 'drop-shadow-[2px_2px_0px_#3D0011]', particleColor: 'text-black/10' }; 
      case 'Menikah': 
        return { bg: 'bg-[#800020]', text: 'text-[#FFE5EC]', shadowText: 'drop-shadow-[2px_2px_0px_#3D0011]', particleColor: 'text-white/10' }; 
      default: 
        return { bg: 'bg-[#06D6A0]', text: 'text-[#1A1A1A]', shadowText: 'drop-shadow-[2px_2px_0px_#FFFFFF]', particleColor: 'text-white/30' }; 
    }
  };
  const theme = getTheme();

  // --- BACKGROUND ANIMATION EFFECT ---
  useEffect(() => {
    // Generate random particles (hearts/sparkles)
    const particleArray = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `-${Math.random() * 15}s`,
      size: Math.random() * 24 + 16,
      type: Math.random() > 0.3 ? 'heart' : 'sparkle'
    }));
    setParticles(particleArray);
  }, []);

  // --- MAIN SPIN ACTION ---
  const handleSpin = async () => {
    if (!phase) {
      setReelItems([{ id: 'err', text: "Hei! Pilih Fase Hubungan dulu ya di sebelah kiri 👆" }]);
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    setFollowUpData(""); 
    setErrorMessage("");

    const filteredQuestions = questionsDB.filter(q => q.phase === phase && q.nuance === nuance);
    const safePool = filteredQuestions.length > 0 ? filteredQuestions : questionsDB;

    // 1. Tampilkan Animasi Spin Cepat
    const dummies = Array.from({length: 8}, () => safePool[Math.floor(Math.random()*safePool.length)]);
    setReelItems(dummies);
    setReelClass("animate-slot-fast");
    setReelStyle({});

    try {
      let finalQuestionText = "";

      if (customTopic.trim() !== "" && showAITopic) {
        const systemPrompt = "Kamu adalah konselor hubungan yang menyenangkan. Buat HANYA 1 pertanyaan untuk obrolan pasangan. Format langsung pertanyaannya saja.";
        const userPrompt = `Buatkan 1 pertanyaan untuk pasangan di fase "${phase}" dengan nuansa obrolan "${nuance}". Topik spesifik yang harus dibahas: "${customTopic}". Gunakan bahasa Indonesia kasual.`;
        finalQuestionText = await callGeminiAPI(userPrompt, systemPrompt);
        setPreviousId("AI_GENERATED");
      } else {
        await new Promise(res => setTimeout(res, 1200)); 
        let finalQuestions = filteredQuestions.length > 1 && previousId !== null 
            ? filteredQuestions.filter(q => q.id !== previousId) 
            : filteredQuestions;
        
        if (finalQuestions.length === 0) finalQuestionText = "Oops! Belum ada pertanyaan untuk kategori ini.";
        else {
          const selected = finalQuestions[Math.floor(Math.random() * finalQuestions.length)];
          finalQuestionText = selected.text;
          setPreviousId(selected.id);
        }
      }

      // 2. Transisi Stop Slot Machine secara Mulus
      setReelClass(""); 
      
      const landingFillers = Array.from({length: 15}, () => safePool[Math.floor(Math.random()*safePool.length)]);
      const finalReel = [...landingFillers, { id: 'final', text: finalQuestionText }];
      
      setReelItems(finalReel);
      setReelStyle({ transform: `translateY(0px)`, transition: 'none' });
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetY = - (finalReel.length - 1) * slotHeight;
          setReelStyle({ 
            transform: `translateY(${targetY}px)`, 
            transition: 'transform 3.5s cubic-bezier(0.15, 0.85, 0.35, 1)' 
          });
        });
      });

      setTimeout(() => {
        setIsSpinning(false);
      }, 3600);

    } catch (error) {
      console.error("Spin Error:", error);
      setReelClass("");
      setReelItems([{ id: 'err', text: "Ups, jaringan tersendat. Coba Spin lagi!" }]);
      setErrorMessage("Gagal mengambil respon dari AI.");
      setIsSpinning(false);
    }
  };

  const handleGenerateFollowUp = async () => {
    if (isGeneratingFollowUp) return;
    setIsGeneratingFollowUp(true);
    setErrorMessage("");
    try {
      const currentText = reelItems[reelItems.length - 1].text;
      const systemPrompt = "Buat 2 pertanyaan lanjutan (follow-up) dari topik yang sedang dibahas. Output formatnya langsung berupa bullet points (gunakan emoji 🔹) tanpa teks awalan/akhiran.";
      const userPrompt = `Fase "${phase}", nuansa "${nuance}". Pertanyaan utama: "${currentText}". Buat 2 pertanyaan lanjutan singkat yang saling terkait!`;

      const response = await callGeminiAPI(userPrompt, systemPrompt);
      setFollowUpData(response);
    } catch (error) {
      setErrorMessage("Gagal membuat pertanyaan lanjutan.");
    } finally {
      setIsGeneratingFollowUp(false);
    }
  };

  const neobrutalBtnBase = "px-4 py-3 border-[3px] border-black rounded-xl font-bold transition-all active:translate-x-1 active:translate-y-1 active:shadow-none select-none touch-manipulation shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1";
  
  return (
    <>
      {/* Inject CSS Animations & Shantell Sans */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:wght@800&display=swap');
        .font-shantell { font-family: 'Shantell Sans', cursive; }
        
        .slot-window { height: ${slotHeight}px; overflow: hidden; position: relative; }
        .slot-reel { display: flex; flex-direction: column; width: 100%; }
        
        .animate-slot-fast { animation: slotSpin 0.3s linear infinite; }
        @keyframes slotSpin {
            0% { transform: translateY(0); filter: blur(2px); }
            100% { transform: translateY(-${slotHeight * 6}px); filter: blur(2px); }
        }

        .animate-float { animation: floatUp linear infinite; }
        @keyframes floatUp {
            0% { transform: translateY(110vh) scale(0.5) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10vh) scale(1.2) rotate(45deg); opacity: 0; }
        }

        .fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
        @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* Main Container dengan Proporsi Layout Baru */}
      <div className={`relative min-h-screen w-full transition-colors duration-700 ease-in-out font-sans overflow-hidden flex items-center justify-center ${theme.bg} ${theme.text}`}>
        
        {/* Background Particles Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {particles.map((p) => (
            <div 
              key={p.id} 
              className={`absolute animate-float ${theme.particleColor} drop-shadow-md`}
              style={{ left: p.left, animationDuration: p.animationDuration, animationDelay: p.animationDelay }}
            >
              {p.type === 'heart' ? <Heart size={p.size} fill="currentColor" /> : <Sparkles size={p.size} />}
            </div>
          ))}
        </div>

        {/* Content Container (Lebih proporsional dan lebar) */}
        <div className="w-full max-w-[1280px] px-6 md:px-12 py-10 z-10">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-center">
            
            {/* --- KOLOM KIRI (Judul & Fase - 45%) --- */}
            <div className="w-full md:w-[45%] flex flex-col justify-center gap-6">
              
              <header className="text-center md:text-left">
                {/* Shantell Sans + Margin diperpendek */}
                <h1 className={`font-shantell text-5xl md:text-7xl font-extrabold mb-0 leading-[1.1] flex items-center justify-center md:justify-start gap-3 ${theme.shadowText}`}>
                  <MessageCircle size={56} className="drop-shadow-none shrink-0" />
                  <span>Bertukar<br className="hidden md:block"/>Cerita</span>
                </h1>
                <p className="font-bold opacity-90 text-lg md:text-xl mt-2 md:mt-3 tracking-wide">
                  Pemantik obrolan seru buat kita!
                </p>
              </header>

              <div className="mt-4 bg-white/10 p-6 rounded-[2rem] border-4 border-black/10 backdrop-blur-sm">
                <label className="block font-black mb-4 text-xl md:text-2xl drop-shadow-sm">1. Kita di fase apa nih?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['PDKT', 'Pacaran', 'Menikah'].map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPhase(p); setFollowUpData(""); }}
                      className={`${neobrutalBtnBase} py-4 ${
                        phase === p 
                          ? 'bg-black text-white translate-x-1 translate-y-1 shadow-none' 
                          : `bg-white text-black`
                      } text-base flex flex-col items-center justify-center gap-2`}
                    >
                      {p === 'PDKT' && <Sparkles size={24} />}
                      {p === 'Pacaran' && <Heart size={24} />}
                      {p === 'Menikah' && <Heart size={24} className="fill-current" />}
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* --- KOLOM KANAN (Nuansa, Mesin Slot, Output - 55%) --- */}
            <div className="w-full md:w-[55%] flex flex-col justify-center gap-5">
              
              <div className={`transition-opacity duration-300 ${!phase ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <label className="block font-black mb-3 text-lg md:text-xl drop-shadow-md">2. Mau obrolan yang gimana?</label>
                <div className="flex gap-3">
                  {['Fun', 'Deep', 'Random'].map((n) => (
                    <button
                      key={n}
                      onClick={() => setNuance(n)}
                      className={`${neobrutalBtnBase} flex-1 text-sm md:text-base ${
                        nuance === n 
                          ? 'bg-black text-white translate-x-1 translate-y-1 shadow-none' 
                          : 'bg-white text-black'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* --- SLOT MACHINE WINDOW (Bentuk Lonjong Ekstrim) --- */}
              <div className="mt-2 relative bg-[#FAFAFA] text-black border-[5px] border-black rounded-[3.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] z-20">
                {/* Overlay shadow / inner depth buat slot effect */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_20px_20px_-10px_rgba(0,0,0,0.15),inset_0px_-20px_20px_-10px_rgba(0,0,0,0.15)] z-10 rounded-[3rem]"></div>
                
                <div className="slot-window bg-transparent rounded-[3rem]">
                  <div className={`slot-reel ${reelClass}`} style={reelStyle}>
                    {reelItems.map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="w-full px-8 py-4 flex items-center justify-center text-center" style={{ height: `${slotHeight}px` }}>
                        <p className="text-2xl md:text-3xl font-black leading-normal md:leading-snug break-words w-full text-black">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Decorative Pins / Baut */}
                <div className="absolute top-6 left-6 w-4 h-4 bg-gray-300 rounded-full border-2 border-gray-500 shadow-inner"></div>
                <div className="absolute top-6 right-6 w-4 h-4 bg-gray-300 rounded-full border-2 border-gray-500 shadow-inner"></div>
                <div className="absolute bottom-6 left-6 w-4 h-4 bg-gray-300 rounded-full border-2 border-gray-500 shadow-inner"></div>
                <div className="absolute bottom-6 right-6 w-4 h-4 bg-gray-300 rounded-full border-2 border-gray-500 shadow-inner"></div>
              </div>

              {/* --- TOMBOL SPIN --- */}
              <div className="mt-4 flex flex-col items-center">
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || !phase}
                  className={`w-full py-5 border-4 border-black rounded-[2rem] font-black text-2xl flex items-center justify-center gap-3 transition-all touch-manipulation z-20
                    ${(!phase || isSpinning) 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed translate-x-1 translate-y-1 shadow-none' 
                      : 'bg-[#FF9F1C] text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 active:translate-x-1 active:translate-y-1 active:shadow-none'
                    }`}
                >
                  {isSpinning ? <>MENGACAK...</> : <><Play fill="currentColor" size={28} /> {customTopic && showAITopic ? "✨ BUAT PERTANYAAN" : "SPIN SEKARANG"}</>}
                </button>

                {/* --- TOPIK KHUSUS (Hyperlink & Dropdown AI) --- */}
                <div className={`mt-4 w-full transition-opacity duration-300 ${!phase ? 'opacity-50 pointer-events-none' : 'opacity-100'} z-20 text-center`}>
                  <button 
                    onClick={() => setShowAITopic(!showAITopic)} 
                    className="inline-flex items-center gap-2 font-bold text-sm md:text-base opacity-90 hover:opacity-100 hover:underline transition-all drop-shadow-md"
                  >
                    ✨ Punya topik khusus? (Opsional AI) <ChevronDown size={16} className={`transform transition-transform ${showAITopic ? 'rotate-180' : ''}`} />
                  </button>

                  {showAITopic && (
                    <div className="mt-3 relative fade-in-down">
                      <input 
                        type="text" 
                        placeholder="Misal: Keuangan, Liburan, Mantan..."
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        className="w-full p-4 pl-12 border-[3px] border-black rounded-2xl bg-white text-black text-base outline-none focus:ring-4 focus:ring-black/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold placeholder-gray-400"
                      />
                      <Wand2 className="absolute left-4 top-[16px] text-gray-500" size={20} />
                    </div>
                  )}
                </div>

                {/* AI FOLLOW UP & ERROR MSG */}
                {!isSpinning && previousId && reelItems.length > 1 && (!customTopic || !showAITopic) && currentQuestionText() !== "Oops! Belum ada pertanyaan untuk kategori ini." && (
                  <div className="flex flex-col items-end w-full animate-fade-in-up mt-2 z-20">
                    {!followUpData ? (
                      <button 
                        onClick={handleGenerateFollowUp}
                        disabled={isGeneratingFollowUp}
                        className="bg-[#C879FF] text-white border-4 border-black rounded-2xl px-6 py-3 font-black flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none text-base"
                      >
                        {isGeneratingFollowUp ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                        ✨ Kembangkan Topik
                      </button>
                    ) : (
                      <div className="bg-[#f8f9fa] border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black w-full relative mt-4">
                        <ArrowDownRight className="absolute -left-6 -top-6 text-black" size={40} />
                        <h4 className="font-black text-lg mb-3 flex items-center gap-2 border-b-4 border-black pb-2">
                          <Wand2 size={20}/> Pertanyaan Lanjutan
                        </h4>
                        <div className="text-base font-bold space-y-2 whitespace-pre-wrap leading-relaxed">
                          {followUpData}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {errorMessage && (
                  <div className="mt-4 w-full bg-red-100 text-red-800 border-4 border-red-600 rounded-2xl p-4 text-base font-bold text-center shadow-[4px_4px_0px_0px_#DC2626]">
                    {errorMessage}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Helper text
  function currentQuestionText() {
    return reelItems[reelItems.length - 1]?.text;
  }
}
