import { TOptions } from '@/models/types/shared.type';
import { Select, SelectProps } from 'antd';

interface IProps extends Omit<SelectProps, 'options'>, React.PropsWithChildren {
  options: TOptions[];
}

const BaseSelect: React.FC<IProps> = (props) => {
  const { children, options, ...otherProps } = props;

  return (
    <Select {...otherProps}>
      {options.map((item, index) => (
        <Select.Option key={item.id || index} value={item.value}>
          {item.label}
        </Select.Option>
      ))}
      {children}
    </Select>
  );
};

export default BaseSelect;
