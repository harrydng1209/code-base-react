import { TimePicker, TimePickerProps } from 'antd';

interface IProps extends TimePickerProps {}

const BaseTimePicker: React.FC<IProps> = (props) => {
  const { ...otherProps } = props;

  return <TimePicker {...otherProps} />;
};

export default BaseTimePicker;
