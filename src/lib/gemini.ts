import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retry<T>(fn: () => Promise<T>, retries = 5, initialDelay = 1000): Promise<T> {
  let attempt = 0;
  let delay = initialDelay;
  
  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= retries) throw error;
      await wait(delay);
      delay *= 2; // Exponential backoff
    }
  }
  throw new Error("Max retries reached");
}

export async function generateCustomQuestion(phase: string, nuance: string, customTopic: string): Promise<string> {
  const prompt = `Sebagai seorang konselor hubungan yang menyenangkan, buat HANYA 1 pertanyaan untuk obrolan pasangan.
Fase Hubungan: ${phase || 'Belum Jelas'}
Nuansa Obrolan: ${nuance || 'Random'}
Topik Spesifik: ${customTopic}

Kriteria:
- Gunakan bahasa Indonesia yang kasual.
- Format HANYA pertanyaannya saja, tanpa teks awalan atau akhiran.`;

  return retry(async () => {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.trim();
  });
}

export async function generateFollowUpQuestions(mainQuestion: string): Promise<string[]> {
  const prompt = `Buat 2 pertanyaan lanjutan (follow-up) dari pertanyaan utama berikut:
"${mainQuestion}"

Kriteria:
- Output formatnya HANYA berupa bullet points (gunakan emoji 🔹).
- Singkat dan saling terkait.
- Tanpa teks awalan atau akhiran, langsung ke poinnya.`;

  return retry(async () => {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Parse the bullet points
    return text.split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('🔹'))
      .map(line => line.replace(/^🔹\s*/, ''));
  });
}
