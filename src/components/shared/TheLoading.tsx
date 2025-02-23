import useLoadingStore from '@/stores/loading.store';
import { Spin } from 'antd';

const TheLoading: React.FC = () => {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return <Spin fullscreen={true} size="large" tip="Loading" />;
};

export default TheLoading;
