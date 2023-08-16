import React, { useMemo, useState } from 'react';
import { Table as AntdTable, TableProps } from 'antd';
import FilterColumn from '@/components/Table/filterColumn';

const Table = (props: TableProps<any>) => {
  const { columns, dataSource } = props;
  const [hiddenColumnKeys, setHiddenColumnKeys] = useState<string[]>([]);

  const renderColumns = useMemo(
    () =>
      columns?.filter(
        (col: any) => hiddenColumnKeys.indexOf(col?.dataIndex) === -1,
      ),
    [hiddenColumnKeys, columns],
  );

  return (
    <div>
      <div className="mb-4 flex w-full flex-row justify-end">
        <FilterColumn
          columns={columns}
          hiddenColumnKeys={hiddenColumnKeys}
          setHiddenColumnKeys={setHiddenColumnKeys}
        />
      </div>

      <AntdTable columns={renderColumns} dataSource={dataSource} />
    </div>
  );
};

export default Table;
