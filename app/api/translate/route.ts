import { NextRequest, NextResponse } from "next/server";

// Cache simple en mémoire pour éviter les appels API répétés
const cache = new Map<string, string>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, texts, from = "fr", to = "en" } = body;

    // Traduction batch
    if (texts && Array.isArray(texts)) {
      const results = await Promise.all(
        texts.map((t: string) => translateText(t, from, to))
      );
      return NextResponse.json({ translatedTexts: results });
    }

    // Traduction simple
    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const translatedText = await translateText(text, from, to);
    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}

async function translateText(text: string, from: string, to: string): Promise<string> {
  // Vérifier le cache
  const cacheKey = `${from}-${to}-${text}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  // Essayer LibreTranslate d'abord
  try {
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: "text",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const translated = data.translatedText || text;
      
      // Mettre en cache
      cache.set(cacheKey, translated);
      
      return translated;
    }
  } catch (error) {
    console.warn("LibreTranslate failed, trying MyMemory:", error);
  }

  // Fallback vers MyMemory API
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    );

    if (response.ok) {
      const data = await response.json();
      const translated = data.responseData?.translatedText || text;
      
      // Mettre en cache
      cache.set(cacheKey, translated);
      
      return translated;
    }
  } catch (error) {
    console.error("MyMemory API failed:", error);
  }

  // Si tout échoue, retourner le texte original
  return text;
}


