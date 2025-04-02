import { Pagination, PaginationProps } from 'antd';

interface IProps extends PaginationProps {
  pageSizes?: number[];
  total: number;
}

export const BasePagination: React.FC<IProps> = (props) => {
  const { pageSizes = [100, 200, 300, 400], total, ...otherProps } = props;

  return (
    <Pagination
      defaultPageSize={100}
      pageSizeOptions={pageSizes}
      showSizeChanger
      showTotal={(total) => `Total ${total} items`}
      total={total}
      {...otherProps}
    />
  );
};
