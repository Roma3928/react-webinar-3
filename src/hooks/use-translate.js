import { useEffect, useState } from "react";
import useServices from "./use-services";

export default function useTranslate() {
  const { i18n } = useServices();
  const [currentLang, setCurrentLang] = useState(i18n.lang);
  const t = i18n.translate;

  useEffect(() => {
    const unsubscribe = i18n.subscribe(() => {
      setCurrentLang(i18n.lang);
    });
    return () => {
      unsubscribe();
    };
  }, [i18n]);

  const setLang = (lang) => {
    setCurrentLang(lang);
    i18n.setLang(lang);
  };

  return { lang: currentLang, setLang, t };
}
