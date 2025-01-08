import { Checkbox, CheckboxProps } from 'antd';

interface IProps extends CheckboxProps, React.PropsWithChildren {}

const BaseCheckbox: React.FC<IProps> = (props) => {
  const { children, ...otherProps } = props;

  return <Checkbox {...otherProps}>{children}</Checkbox>;
};

export default BaseCheckbox;
