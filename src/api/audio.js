export const audio = {
  get(word, translate) {
    if (speechSynthesis.pending) return;
    const voices = speechSynthesis.getVoices();

    const eng = new SpeechSynthesisUtterance(word);
    eng.lang = 'en-US';
    eng.rate = 0.7;
    speechSynthesis.speak(eng);

    const rus = new SpeechSynthesisUtterance(translate);
    rus.voice = voices[17];
    speechSynthesis.speak(rus);
  }
}