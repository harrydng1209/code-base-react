import { ELanguageCode } from '@/models/enums/shared.enum';
import { useLocalStorage } from '@reactuses/core';
import { create } from 'zustand';

const { STORAGE_KEYS } = constants.shared;

interface ILanguageStore {
  actions: {
    setCurrentLanguage: (newLang: ELanguageCode) => void;
  };
  language: ELanguageCode;
}

const languageStore = create<ILanguageStore>((set) => ({
  actions: {
    setCurrentLanguage: (newLang: ELanguageCode) =>
      set(() => ({ language: newLang })),
  },
  language: ELanguageCode.English,
}));

const useLanguageStore = () => {
  const { i18n } = useTranslation();
  const [languageStorage, setLanguage] = useLocalStorage<ELanguageCode>(
    STORAGE_KEYS.LANGUAGE,
    ELanguageCode.English,
  );

  const actions = languageStore((state) => state.actions);
  const language = languageStore((state) => state.language);

  useEffect(() => {
    if (languageStorage) {
      i18n.changeLanguage(languageStorage);
      actions.setCurrentLanguage(languageStorage);
    }
  }, [languageStorage, i18n]);

  return { language, setLanguage };
};

export default useLanguageStore;
