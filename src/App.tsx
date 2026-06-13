import { useState } from 'react';
import { ThemeWrapper } from './components/ThemeWrapper';
import { ButtonNeo } from './components/ButtonNeo';
import { SlotMachine } from './components/SlotMachine';
import { FollowUpDialog } from './components/FollowUpDialog';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import questionsData from './data/questions.json';
import { generateCustomQuestion, generateFollowUpQuestions } from './lib/gemini';

interface QuestionData {
  No: string;
  Pertanyaan: string;
  Fase: string;
  "Sub-Tag": string;
}

const localQuestions = questionsData as unknown as QuestionData[];

function App() {
  const [phase, setPhase] = useState<string | null>(null);
  const [nuance, setNuance] = useState<string | null>(null);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [dummyTexts, setDummyTexts] = useState<string[]>([]);
  
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false);

  const handleSpin = async () => {
    if (!phase || !nuance) return;
    
    // Reset follow ups
    setFollowUpQuestions([]);
    
    // Get 8-15 dummy texts from local DB that match phase & nuance
    const filteredQuestions = localQuestions.filter(q => q.Fase === phase && q['Sub-Tag'] === nuance);
    const dummies = Array.from({ length: 12 }).map(() => {
      const randIdx = Math.floor(Math.random() * filteredQuestions.length);
      return filteredQuestions[randIdx]?.Pertanyaan || "Apakah kamu percaya alien?";
    });
    
    setDummyTexts(dummies);
    
    // Wait a brief moment to update state before spinning
    setIsSpinning(false);
    setTimeout(async () => {
      setIsSpinning(true);
      
      let finalQuestion = "";
      if (isCustomOpen && customTopic.trim() !== '') {
        try {
          finalQuestion = await generateCustomQuestion(phase, nuance, customTopic);
        } catch (error) {
          console.error("Failed to generate custom question:", error);
          // Fallback to local
          const randIdx = Math.floor(Math.random() * filteredQuestions.length);
          finalQuestion = filteredQuestions[randIdx]?.Pertanyaan || "Ada masalah teknis, tapi apa kabar harimu?";
        }
      } else {
        const randIdx = Math.floor(Math.random() * filteredQuestions.length);
        finalQuestion = filteredQuestions[randIdx]?.Pertanyaan || "Pertanyaan tidak ditemukan!";
      }
      
      setCurrentQuestion(finalQuestion);
      
      // Stop spinning animation exactly after 3.5 seconds
      setTimeout(() => {
        setIsSpinning(false);
      }, 3500);
    }, 50);
  };

  const handleDirectCustom = async () => {
    if (!phase || !nuance || customTopic.trim() === '') return;
    setIsSpinning(false);
    setFollowUpQuestions([]);
    setCurrentQuestion("Sedang memikirkan topik spesifik...");
    try {
      const q = await generateCustomQuestion(phase, nuance, customTopic);
      setCurrentQuestion(q);
    } catch (error) {
      console.error("Failed to generate custom question:", error);
      setCurrentQuestion("Gagal memuat topik dari AI. Pastikan API Key valid!");
    }
  };

  const handleFollowUp = async () => {
    if (!currentQuestion) return;
    setIsFollowUpLoading(true);
    setFollowUpQuestions([]);
    try {
      const followUps = await generateFollowUpQuestions(currentQuestion);
      setFollowUpQuestions(followUps);
    } catch (error) {
      console.error("Failed to generate follow up questions:", error);
      setFollowUpQuestions(["Gagal memuat pertanyaan lanjutan. Coba lagi!"]);
    } finally {
      setIsFollowUpLoading(false);
    }
  };

  const isSpinReady = phase !== null && nuance !== null && !isSpinning;

  return (
    <ThemeWrapper phase={phase}>
      <header className="mb-6 text-center w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-md">
          Bertukar <span className="text-white neo-shadow bg-black px-2 py-1 rounded-md">Cerita</span>
        </h1>
        <p className="mt-3 text-lg font-bold max-w-lg mx-auto">
          Pemantik obrolan asik buat kamu dan pasangan!
        </p>
      </header>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative">
        
        {/* Sidebar Controls */}
        <div className="md:col-span-5 space-y-4 relative">
          
          {/* Playful Hint Arrow */}
          {(!phase || !nuance) && (
            <div className="absolute top-[-40px] left-4 animate-bounce text-center z-20 pointer-events-none hidden sm:block">
              <p className="font-bold text-sm bg-[#FFEB3B] text-black border-[3px] border-black px-3 py-1 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                👇 Pilih Fase & Nuansa dulu!
              </p>
            </div>
          )}

          <div className="bg-white text-black border-4 border-black neo-shadow p-4 rounded-2xl relative">
            <h2 className="text-xl font-bold mb-3">1. Fase Hubungan</h2>
            <div className="flex w-full space-x-2">
              <ButtonNeo 
                variant="phase" 
                isActive={phase === 'PDKT'} 
                onClick={() => setPhase('PDKT')}
                className="flex-1 px-1 text-sm md:text-base"
              >
                PDKT
              </ButtonNeo>
              <ButtonNeo 
                variant="phase" 
                isActive={phase === 'Pacaran'} 
                onClick={() => setPhase('Pacaran')}
                className="flex-1 px-1 text-sm md:text-base"
              >
                Pacaran
              </ButtonNeo>
              <ButtonNeo 
                variant="phase" 
                isActive={phase === 'Menikah'} 
                onClick={() => setPhase('Menikah')}
                className="flex-1 px-1 text-sm md:text-base"
              >
                Menikah
              </ButtonNeo>
            </div>
          </div>

          <div className="bg-white text-black border-4 border-black neo-shadow p-4 rounded-2xl">
            <h2 className="text-xl font-bold mb-3">2. Nuansa Obrolan</h2>
            <div className="flex w-full space-x-2">
              <ButtonNeo 
                variant="phase" 
                isActive={nuance === 'Fun'} 
                onClick={() => setNuance('Fun')}
                className="flex-1 px-1 text-sm md:text-base"
              >
                Fun
              </ButtonNeo>
              <ButtonNeo 
                variant="phase" 
                isActive={nuance === 'Deep'} 
                onClick={() => setNuance('Deep')}
                className="flex-1 px-1 text-sm md:text-base"
              >
                Deep
              </ButtonNeo>
              <ButtonNeo 
                variant="phase" 
                isActive={nuance === 'Random'} 
                onClick={() => setNuance('Random')}
                className="flex-1 px-0 text-[13px] md:text-base"
              >
                Random
              </ButtonNeo>
            </div>
          </div>

          <div className="bg-white text-black border-4 border-black neo-shadow rounded-2xl overflow-hidden">
            <button 
              className="w-full p-3 flex items-center justify-between font-bold text-base bg-[#FFEB3B] hover:bg-[#FDD835] transition-colors"
              onClick={() => setIsCustomOpen(!isCustomOpen)}
            >
              <span className="flex items-center gap-2"><Sparkles size={20} /> Punya topik khusus?</span>
              {isCustomOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            {isCustomOpen && (
              <div className="p-4 bg-white border-t-4 border-black flex flex-col space-y-3">
                <input 
                  type="text" 
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Misal: Keuangan, Masa Depan..."
                  className="w-full p-2 border-[3px] border-black rounded-lg font-bold text-sm focus:outline-none focus:ring-4 focus:ring-[#06D6A0]"
                />
                <ButtonNeo 
                  variant="primary" 
                  onClick={handleDirectCustom}
                  disabled={!phase || !nuance || customTopic.trim() === ''}
                  className="w-full py-2 text-sm disabled:opacity-50"
                >
                  Buat Langsung ⚡
                </ButtonNeo>
              </div>
            )}
          </div>
        </div>

        {/* Main Slot Machine Area */}
        <div className="md:col-span-7 flex flex-col items-center justify-start z-10">
          <SlotMachine 
            isSpinning={isSpinning} 
            result={currentQuestion} 
            dummyTexts={dummyTexts} 
          />
          
          <ButtonNeo 
            variant="primary" 
            className="text-xl md:text-2xl px-10 py-3 mb-4"
            disabled={!isSpinReady}
            onClick={handleSpin}
            style={{ opacity: isSpinReady ? 1 : 0.5, cursor: isSpinReady ? 'pointer' : 'not-allowed' }}
          >
            {isSpinning ? "MENGACAK..." : "SPIN SEKARANG"}
          </ButtonNeo>

          {currentQuestion && !isSpinning && (
            <ButtonNeo 
              variant="accent" 
              className="flex items-center gap-2 mt-4"
              onClick={handleFollowUp}
              disabled={isFollowUpLoading}
            >
              <Sparkles size={20} />
              {isFollowUpLoading ? "Memikirkan..." : "Kembangkan Topik"}
            </ButtonNeo>
          )}

          <FollowUpDialog questions={followUpQuestions} isLoading={isFollowUpLoading} />
        </div>
      </div>
    </ThemeWrapper>
  );
}

export default App;
