import { Input, InputProps } from 'antd';

interface IProps extends InputProps, React.PropsWithChildren {}

const BaseInput: React.FC<IProps> = (props) => {
  const { children, ...otherProps } = props;

  return <Input {...otherProps}>{children}</Input>;
};

export default BaseInput;
