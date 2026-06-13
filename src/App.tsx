import React, { useState, useEffect } from 'react';
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

const localQuestions = questionsData as QuestionData[];

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
      <header className="mb-8 text-center w-full">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter drop-shadow-md">
          Bertukar <span className="text-white neo-shadow bg-black px-2 py-1 rounded-md">Cerita</span>
        </h1>
        <p className="mt-4 text-xl font-bold max-w-lg mx-auto">
          Pemantik obrolan asik buat kamu dan pasangan!
        </p>
      </header>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sidebar Controls */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white border-4 border-black neo-shadow p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">1. Fase Hubungan</h2>
            <div className="flex flex-col space-y-3">
              <ButtonNeo 
                variant="phase" 
                isActive={phase === 'PDKT'} 
                onClick={() => setPhase('PDKT')}
              >
                PDKT
              </ButtonNeo>
              <ButtonNeo 
                variant="phase" 
                isActive={phase === 'Pacaran'} 
                onClick={() => setPhase('Pacaran')}
              >
                Pacaran
              </ButtonNeo>
              <ButtonNeo 
                variant="phase" 
                isActive={phase === 'Menikah'} 
                onClick={() => setPhase('Menikah')}
              >
                Menikah
              </ButtonNeo>
            </div>
          </div>

          <div className="bg-white border-4 border-black neo-shadow p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">2. Nuansa Obrolan</h2>
            <div className="grid grid-cols-3 gap-2">
              <ButtonNeo 
                variant="phase" 
                isActive={nuance === 'Fun'} 
                onClick={() => setNuance('Fun')}
                className="px-2"
              >
                Fun
              </ButtonNeo>
              <ButtonNeo 
                variant="phase" 
                isActive={nuance === 'Deep'} 
                onClick={() => setNuance('Deep')}
                className="px-2"
              >
                Deep
              </ButtonNeo>
              <ButtonNeo 
                variant="phase" 
                isActive={nuance === 'Random'} 
                onClick={() => setNuance('Random')}
                className="px-2"
              >
                Random
              </ButtonNeo>
            </div>
          </div>

          <div className="bg-white border-4 border-black neo-shadow rounded-2xl overflow-hidden">
            <button 
              className="w-full p-4 flex items-center justify-between font-bold text-lg bg-[#FFEB3B] hover:bg-[#FDD835] transition-colors"
              onClick={() => setIsCustomOpen(!isCustomOpen)}
            >
              <span className="flex items-center gap-2"><Sparkles size={20} /> Punya topik khusus?</span>
              {isCustomOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            {isCustomOpen && (
              <div className="p-4 bg-white border-t-4 border-black">
                <input 
                  type="text" 
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Misal: Keuangan, Masa Depan..."
                  className="w-full p-3 border-[3px] border-black rounded-lg font-bold focus:outline-none focus:ring-4 focus:ring-[#06D6A0]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Main Slot Machine Area */}
        <div className="md:col-span-8 flex flex-col items-center justify-center">
          <SlotMachine 
            isSpinning={isSpinning} 
            result={currentQuestion} 
            dummyTexts={dummyTexts} 
          />
          
          <ButtonNeo 
            variant="primary" 
            className="text-2xl px-12 py-4 mb-4"
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
