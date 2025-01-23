import useThemeStore from '@/stores/theme.store';

const Home: React.FC = () => {
  useThemeStore();

  return <div>Code Base React</div>;
};

export default Home;
