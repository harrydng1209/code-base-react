import { InputNumber, InputNumberProps } from 'antd';

interface IProps extends InputNumberProps, React.PropsWithChildren {}

const BaseInputNumber: React.FC<IProps> = (props) => {
  const { children, ...otherProps } = props;

  return <InputNumber {...otherProps}>{children}</InputNumber>;
};

export default BaseInputNumber;
