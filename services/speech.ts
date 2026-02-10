
import { VoiceSettings } from "../types";

export const speak = (text: string, settings: VoiceSettings) => {
  if (!window.speechSynthesis) return;

  // Cancel current speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;

  // Personalities adjust tone slightly via pitch if available, 
  // but mostly handled by the prompt text.
  if (settings.personality === 'firm') {
    utterance.pitch = 0.8;
  } else if (settings.personality === 'funny') {
    utterance.pitch = 1.4;
  }

  window.speechSynthesis.speak(utterance);
};
