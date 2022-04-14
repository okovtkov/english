export const audio = {
  get(word) {
    if (speechSynthesis.pending) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  }
}