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
  },

  say(word, lang) {
    if (speechSynthesis.pending) return;

    if (lang === 'rus') {
      const voices = speechSynthesis.getVoices();
      const rus = new SpeechSynthesisUtterance(word);
      rus.voice = voices[17];
      speechSynthesis.speak(rus);
    } else {
      const eng = new SpeechSynthesisUtterance(word);
      console.log(eng);
      eng.lang = 'en-US';
      eng.rate = 0.7;
      speechSynthesis.speak(eng);
    }

    return true;
  },

  stop() {
    speechSynthesis.cancel();
  }
}