import type { TOptions } from '@/models/types/shared.type';

import { Checkbox } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';

interface IProps extends Omit<CheckboxGroupProps, 'options'> {
  options: TOptions[];
}

const CheckboxGroup: React.FC<IProps> = (props) => {
  const { options, ...otherProps } = props;

  return (
    <Checkbox.Group {...otherProps}>
      {options.map((item, index) => (
        <Checkbox key={item.id || index} value={item.value}>
          {item.label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
};

export default CheckboxGroup;
