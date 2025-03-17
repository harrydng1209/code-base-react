import { AutoComplete, AutoCompleteProps } from 'antd';

interface IProps extends AutoCompleteProps {}

const BaseAutocomplete: React.FC<IProps> = (props) => {
  const { ...otherProps } = props;

  return <AutoComplete {...otherProps} />;
};

export default BaseAutocomplete;
