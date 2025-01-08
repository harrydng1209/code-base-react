import BaseButton from '@/components/base/BaseButton';

const ErrorLayout: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="tw-w-screen tw-h-screen tw-flex-center tw-gap-[12px] tw-flex-col">
      <h1>Oops! Something went wrong</h1>
      <h5>An unexpected error has occurred</h5>
      <BaseButton onClick={goBack}>Go Back</BaseButton>
    </div>
  );
};

export default ErrorLayout;
