import { TOptions } from '@/models/types/shared.type';
import { RefSelectProps, Select, SelectProps } from 'antd';

interface IProps extends Omit<SelectProps, 'options'> {
  options: TOptions[];
}

const { Option } = Select;

const BaseSelect = forwardRef<RefSelectProps, IProps>((props, ref) => {
  const { children, options, ...otherProps } = props;

  return (
    <Select ref={ref} {...otherProps}>
      {options.map((item, index) => (
        <Option key={item.key || index} value={item.value}>
          {item.label}
        </Option>
      ))}
      {children}
    </Select>
  );
});

export default BaseSelect;
