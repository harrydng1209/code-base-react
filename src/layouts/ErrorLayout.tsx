import { BaseButton } from '@/components/shared/BaseButton';
import { HOME } from '@/constants/route-pages.const';

export const ErrorLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tw-fixed-center tw-flex-center tw-flex-col">
      <h6 className="tw-mb-[16px]">This screen does not exist</h6>
      <BaseButton onClick={() => navigate(HOME)}>Go to home screen</BaseButton>
    </div>
  );
};
