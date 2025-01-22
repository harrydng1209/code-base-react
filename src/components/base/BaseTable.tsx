import { Table, TableProps } from 'antd';

interface IProps extends TableProps {
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
}

const BaseTable: React.FC<IProps> = (props) => {
  const { columns, data, ...otherProps } = props;

  return (
    <Table
      bordered
      columns={columns}
      dataSource={data}
      pagination={false}
      {...otherProps}
    />
  );
};

export default BaseTable;
