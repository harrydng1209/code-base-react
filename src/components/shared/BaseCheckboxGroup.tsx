import type { TOptions } from '@/models/types/shared.type';

import { Checkbox } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';

interface IProps extends Omit<CheckboxGroupProps, 'options'> {
  options: TOptions[];
}

const { Group } = Checkbox;

export const BaseCheckboxGroup: React.FC<IProps> = (props) => {
  const { options, ...otherProps } = props;

  return (
    <Group {...otherProps}>
      {options.map((item, index) => (
        <Checkbox key={item.key || index} value={item.value}>
          {item.label}
        </Checkbox>
      ))}
    </Group>
  );
};
