import { useDarkMode } from '@reactuses/core';
import { create } from 'zustand';

interface IThemeStore {
  actions: {
    setDark: (isDarkMode: boolean) => void;
  };
  isDark: boolean;
}

const themeStore = create<IThemeStore>((set) => ({
  actions: {
    setDark: (isDarkMode: boolean) => {
      set(() => {
        return { isDark: isDarkMode };
      });
    }
  },
  isDark: false
}));

const useThemeStore = () => {
  const [isDarkMode, changeTheme] = useDarkMode({
    classNameDark: 'dark',
    classNameLight: 'light',
    storageKey: constants.shared.STORAGE_KEYS.THEME
  });

  const actions = themeStore((state) => state.actions);
  const isDark = themeStore((state) => state.isDark);

  useEffect(() => {
    if (isDarkMode !== null) actions.setDark(isDarkMode);
  }, [isDarkMode]);

  return { changeTheme, isDark };
};

export default useThemeStore;
