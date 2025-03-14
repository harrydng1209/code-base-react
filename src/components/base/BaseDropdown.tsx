import { Dropdown, DropdownProps } from 'antd';

interface IProps extends DropdownProps {}

const BaseDropdown: React.FC<IProps> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Dropdown trigger={['click']} {...otherProps}>
      {children}
    </Dropdown>
  );
};

export default BaseDropdown;
