import { Table, TableProps } from 'antd';

interface IProps extends TableProps {
  data: Record<string, unknown>[];
}

const BaseTable: React.FC<IProps> = (props) => {
  const { data, ...otherProps } = props;

  return <Table dataSource={data} pagination={false} {...otherProps} />;
};

export default BaseTable;
