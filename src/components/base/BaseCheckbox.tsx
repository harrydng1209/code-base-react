import { Checkbox, CheckboxProps, CheckboxRef } from 'antd';

interface IProps extends CheckboxProps {}

const BaseCheckbox = forwardRef<CheckboxRef, IProps>((props, ref) => {
  const { children, ...otherProps } = props;

  return (
    <Checkbox ref={ref} {...otherProps}>
      {children}
    </Checkbox>
  );
});

export default BaseCheckbox;
