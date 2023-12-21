import * as translations from "./translations";

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.defaultLang;
    this.listeners = [];
    this.translate = this.translate.bind(this);
  }

  translate(text, plural, lang) {
    lang = lang || this.lang;

    let result =
      translations[lang] && text in translations[lang]
        ? translations[lang][text]
        : text;

    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  setLang(currentLang) {
    if (this.lang !== currentLang) {
      this.lang = currentLang;
      this.notifySubscribers();
    }
  }

  notifySubscribers() {
    this.listeners.forEach((listener) => listener(this.lang));
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }
}

export default I18nService;
