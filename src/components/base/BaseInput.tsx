import { Input, InputProps, InputRef } from 'antd';
import { HTMLInputTypeAttribute } from 'react';

interface IProps extends InputProps, React.PropsWithChildren {
  type?: HTMLInputTypeAttribute;
}

const { Password, Search, TextArea } = Input;

const BaseInput = forwardRef<InputRef, IProps>((props, ref) => {
  const { children, type, ...otherProps } = props;

  if (type === 'password') {
    return (
      <Password ref={ref} {...otherProps}>
        {children}
      </Password>
    );
  }

  if (type === 'search') {
    return (
      <Search ref={ref} {...otherProps}>
        {children}
      </Search>
    );
  }

  if (type === 'textarea') {
    return <TextArea ref={ref}>{children}</TextArea>;
  }

  return (
    <Input ref={ref} {...otherProps}>
      {children}
    </Input>
  );
});

export default BaseInput;
