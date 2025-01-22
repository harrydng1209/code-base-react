import { ELanguageCode } from '@/models/enums/shared.enum';
import { useLocalStorage } from '@reactuses/core';
import { create } from 'zustand';

const { LANGUAGE } = constants.shared.STORAGE_KEYS;

interface ILanguageStore {
  actions: {
    setCurrentLanguage: (newLang: ELanguageCode) => void;
  };
  currentLanguage: ELanguageCode;
}

const languageStore = create<ILanguageStore>((set) => ({
  actions: {
    setCurrentLanguage: (newLang: ELanguageCode) =>
      set(() => ({ currentLanguage: newLang })),
  },
  currentLanguage: ELanguageCode.English,
}));

const useLanguageStore = () => {
  const { i18n } = useTranslation();
  const [language, changeLanguage] = useLocalStorage<ELanguageCode>(
    LANGUAGE,
    ELanguageCode.English,
  );

  const actions = languageStore((state) => state.actions);
  const currentLanguage = languageStore((state) => state.currentLanguage);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
      actions.setCurrentLanguage(language);
    }
  }, [language, i18n]);

  return { changeLanguage, currentLanguage };
};

export default useLanguageStore;
