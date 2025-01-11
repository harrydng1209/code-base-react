import { Button, ButtonProps } from 'antd';
import { ButtonColorType, ButtonShape, ButtonVariantType } from 'antd/es/button';

interface IProps extends Omit<ButtonProps, 'color' | 'type'>, React.PropsWithChildren {
  color?: ButtonColorType;
  shape?: ButtonShape;
  variant?: ButtonVariantType;
}

const BaseButton: React.FC<IProps> = (props) => {
  const { children, color = 'primary', shape = 'round', variant = 'solid', ...otherProps } = props;

  return (
    <Button color={color} shape={shape} variant={variant} {...otherProps}>
      {children}
    </Button>
  );
};

export default BaseButton;
