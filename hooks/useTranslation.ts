"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo, useState, useCallback } from "react";
import frTranslations from "@/locales/fr.json";
import enTranslations from "@/locales/en.json";

type Language = "fr" | "en";
type TranslationKey = string;
type Translations = typeof frTranslations;

// Cache pour les traductions dynamiques
const translationCache = new Map<string, string>();

export function useTranslation() {
  const { language } = useLanguage();
  const [translating, setTranslating] = useState(false);

  // Récupérer les traductions statiques selon la langue
  const translations = useMemo(() => {
    return language === "fr" ? frTranslations : enTranslations;
  }, [language]);

  // Fonction pour récupérer une traduction statique
  const t = useCallback(
    (key: TranslationKey): string => {
      const keys = key.split(".");
      let value: any = translations;

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k as keyof typeof value];
        } else {
          console.warn(`Translation key "${key}" not found`);
          return key;
        }
      }

      return typeof value === "string" ? value : key;
    },
    [translations]
  );

  // Fonction pour traduire dynamiquement du texte
  const translate = useCallback(
    async (text: string, from?: Language, to?: Language): Promise<string> => {
      const sourceLang = from || language;
      const targetLang = to || (language === "fr" ? "en" : "fr");

      // Si la langue source et cible sont identiques, retourner le texte original
      if (sourceLang === targetLang) {
        return text;
      }

      // Vérifier le cache
      const cacheKey = `${sourceLang}-${targetLang}-${text}`;
      if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey)!;
      }

      // Si le texte est vide, retourner vide
      if (!text || text.trim() === "") {
        return text;
      }

      setTranslating(true);
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            from: sourceLang,
            to: targetLang,
          }),
        });

        if (!response.ok) {
          throw new Error("Translation failed");
        }

        const data = await response.json();
        const translatedText = data.translatedText || text;

        // Mettre en cache
        translationCache.set(cacheKey, translatedText);

        return translatedText;
      } catch (error) {
        console.error("Translation error:", error);
        // Fallback vers le texte original en cas d'erreur
        return text;
      } finally {
        setTranslating(false);
      }
    },
    [language]
  );

  // Fonction pour traduire plusieurs textes en batch
  const translateBatch = useCallback(
    async (
      texts: string[],
      from?: Language,
      to?: Language
    ): Promise<string[]> => {
      const sourceLang = from || language;
      const targetLang = to || (language === "fr" ? "en" : "fr");

      if (sourceLang === targetLang) {
        return texts;
      }

      setTranslating(true);
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            texts,
            from: sourceLang,
            to: targetLang,
          }),
        });

        if (!response.ok) {
          throw new Error("Translation failed");
        }

        const data = await response.json();
        return data.translatedTexts || texts;
      } catch (error) {
        console.error("Batch translation error:", error);
        return texts;
      } finally {
        setTranslating(false);
      }
    },
    [language]
  );

  return {
    t,
    translate,
    translateBatch,
    language,
    translating,
  };
}


