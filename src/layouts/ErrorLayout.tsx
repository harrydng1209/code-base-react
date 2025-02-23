import BaseButton from '@/components/base/BaseButton';

const { HOME } = constants.routePages;

const ErrorLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tw-fixed-center">
      <h6 className="tw-mb-[16px]">This screen does not exist</h6>
      <BaseButton onClick={() => navigate(HOME)}>Go to home screen</BaseButton>
    </div>
  );
};

export default ErrorLayout;
