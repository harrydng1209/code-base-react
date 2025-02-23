import { useLocalStorage } from 'usehooks-ts';

const { STORAGE_KEYS } = constants.shared;

type TTheme = 'DARK' | 'LIGHT';

const useTheme = () => {
  const [isDark, setIsDark] = useLocalStorage<boolean>(
    STORAGE_KEYS.THEME,
    false,
  );

  const changeTheme = () => setIsDark((state) => !state);

  const theme: TTheme = useMemo(() => (isDark ? 'DARK' : 'LIGHT'), [isDark]);

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDark) {
      htmlElement.classList.add('dark');
      return;
    }
    htmlElement.classList.remove('dark');
  }, [isDark]);

  return {
    changeTheme,
    isDark,
    theme,
  };
};

export default useTheme;
