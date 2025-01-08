import { Button, ButtonProps } from 'antd';

interface IProps extends ButtonProps, React.PropsWithChildren {
  shape?: 'circle' | 'default' | 'round';
  type?: 'dashed' | 'default' | 'link' | 'primary' | 'text';
}

const BaseButton: React.FC<IProps> = (props) => {
  const { children, shape = 'round', type = 'primary', ...otherProps } = props;

  return (
    <Button shape={shape} type={type} {...otherProps}>
      {children}
    </Button>
  );
};

export default BaseButton;
