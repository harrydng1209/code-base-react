import { useDarkMode } from '@reactuses/core';
import { create } from 'zustand';

const { STORAGE_KEYS } = constants.shared;

interface IThemeStore {
  actions: {
    setDark: (isDarkMode: boolean) => void;
  };
  isDark: boolean;
}

type TTheme = 'DARK' | 'LIGHT';

const themeStore = create<IThemeStore>((set) => ({
  actions: {
    setDark: (isDarkMode: boolean) => {
      set(() => {
        return { isDark: isDarkMode };
      });
    },
  },
  isDark: false,
}));

const useThemeStore = () => {
  const [isDarkMode, changeTheme] = useDarkMode({
    classNameDark: 'dark',
    classNameLight: 'light',
    storageKey: STORAGE_KEYS.THEME,
  });

  const actions = themeStore((state) => state.actions);
  const isDark = themeStore((state) => state.isDark);

  const theme: TTheme = useMemo(() => (isDark ? 'DARK' : 'LIGHT'), [isDark]);

  useEffect(() => {
    if (isDarkMode !== null) actions.setDark(isDarkMode);
  }, [isDarkMode]);

  return { changeTheme, isDark, theme };
};

export default useThemeStore;
