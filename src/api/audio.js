export const audio = {
  initiate() {
    const voices = speechSynthesis.getVoices();
    const rus = new SpeechSynthesisUtterance('');
    rus.lang = 'ru-RU';
    rus.voice = voices[17];
    speechSynthesis.speak(rus);
    speechSynthesis.cancel();
  },

  get(word, translate) {
    if (speechSynthesis.pending) return;
    const voices = speechSynthesis.getVoices();

    const eng = new SpeechSynthesisUtterance(word);
    eng.lang = 'en-US';
    eng.rate = 0.7;
    speechSynthesis.speak(eng);
    eng.onend = () => {
      speechSynthesis.cancel();
      const rus = new SpeechSynthesisUtterance(translate);
      rus.lang = 'ru-RU';
      rus.voice = voices[17];
      speechSynthesis.speak(rus);
    }
  },

  say(word, lang) {
    if (speechSynthesis.pending) return;

    speechSynthesis.cancel();
    if (lang === 'rus') {
      const voices = speechSynthesis.getVoices();
      const rus = new SpeechSynthesisUtterance(word);
      rus.lang = 'ru-RU';
      rus.voice = voices[17];
      speechSynthesis.speak(rus);
    } else {
      const eng = new SpeechSynthesisUtterance(word);
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