import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retry<T>(fn: () => Promise<T>, retries = 3, initialDelay = 1000): Promise<T> {
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

function parseGeminiError(error: any): Error {
  const msg = error?.message || String(error);
  console.error("Gemini API Error Detail:", error);
  
  if (msg.includes("429") || msg.includes("Quota") || msg.includes("ResourceExhausted") || msg.includes("limit")) {
    return new Error("Batas kuota API terlampaui (429 Too Many Requests). Silakan tunggu beberapa saat.");
  }
  if (msg.includes("503") || msg.includes("ServiceUnavailable") || msg.includes("Unavailable") || msg.includes("busy")) {
    return new Error("Layanan Gemini sedang sibuk/tidak tersedia (503 Service Unavailable). Coba lagi nanti.");
  }
  if (msg.includes("API key") || msg.includes("API_KEY_INVALID") || msg.includes("invalid key") || msg.includes("not found") && msg.includes("key")) {
    return new Error("API Key tidak valid atau tidak memiliki izin akses. Periksa konfigurasi API Key Anda.");
  }
  if (msg.includes("404") || msg.includes("not found")) {
    return new Error("Model Gemini tidak ditemukan (404 Not Found). Silakan periksa konfigurasi model.");
  }
  return new Error(`Gangguan API: ${msg}`);
}

export async function generateCustomQuestion(phase: string, nuance: string, customTopic: string): Promise<string> {
  const prompt = `Sebagai seorang konselor hubungan yang menyenangkan, buat HANYA 1 pertanyaan unik untuk obrolan pasangan berdasarkan kombinasi berikut:
- Fase Hubungan: ${phase || 'Belum Jelas'}
- Nuansa Obrolan: ${nuance || 'Random'}
- Kata Kunci Khusus / Topik: ${customTopic}

Kriteria:
- Hasilkan tepat SATU pertanyaan saja.
- Gunakan bahasa Indonesia yang kasual, santai, dan mudah dimengerti.
- JANGAN sertakan nomor, tanda petik di awal dan akhir, bullet points, atau teks pengantar/penjelas lainnya. Hasilkan pertanyaannya saja secara langsung.`;

  try {
    return await retry(async () => {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return text.trim().replace(/^["']|["']$/g, ''); // Remove outer quotes if generated
    });
  } catch (error: any) {
    throw parseGeminiError(error);
  }
}

export async function generateFollowUpQuestions(mainQuestion: string): Promise<string[]> {
  const prompt = `Analisis pertanyaan utama pasangan berikut:
"${mainQuestion}"

Berdasarkan analisis tersebut, buatlah tepat SATU pertanyaan lanjutan (follow-up) dengan karakter/fokus utama yang kuat untuk memperdalam obrolan mereka.

Kriteria:
- Hasilkan tepat SATU pertanyaan lanjutan saja.
- Pertanyaan lanjutan harus memperdalam makna dari pertanyaan utama.
- Gunakan bahasa Indonesia yang kasual dan santai.
- JANGAN sertakan emoji bullet points (seperti 🔹), nomor, tanda petik, atau teks pengantar/penjelasan lainnya. Langsung tulis pertanyaannya.`;

  try {
    return await retry(async () => {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleaned = text.trim().replace(/^["']|["']$/g, '').replace(/^🔹\s*/, '');
      return [cleaned];
    });
  } catch (error: any) {
    throw parseGeminiError(error);
  }
}

