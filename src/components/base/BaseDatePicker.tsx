import { DatePicker, DatePickerProps } from 'antd';

interface IProps extends DatePickerProps {}

const BaseDatePicker: React.FC<IProps> = (props) => {
  const { ...otherProps } = props;

  return <DatePicker {...otherProps} />;
};

export default BaseDatePicker;
