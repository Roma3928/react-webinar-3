import StoreModule from "../module";

class Language extends StoreModule {
  initState() {
    return {
      lang: "ru",
    };
  }

  setLang(lang) {
    this.setState(
      {
        ...this.getState(),
        lang,
      },
      "Смена языка"
    );
  }
}

export default Language;
