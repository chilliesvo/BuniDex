import { Button, Checkbox, Popover } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const CheckboxGroup = Checkbox.Group;

interface Props {
  columns: ColumnsType<any> | undefined;
  hiddenColumnKeys: string[];
  setHiddenColumnKeys: Dispatch<SetStateAction<string[]>>;
}

const FilterColumnContent = (props: Props) => {
  const { columns, hiddenColumnKeys, setHiddenColumnKeys } = props;
  const { t } = useTranslation();

  const options = columns?.map((col: any) => ({
    label: col.title,
    value: col.dataIndex,
  }));

  const selectedValues = useMemo(
    () =>
      columns
        ?.filter((col: any) => hiddenColumnKeys.indexOf(col.dataIndex) === -1)
        ?.map((col: any) => col.dataIndex),
    [columns, hiddenColumnKeys],
  );

  const handleOnChange = (values: any) => {
    const hiddenValues: any = options
      ?.filter((option) => values?.indexOf(option.value) === -1)
      ?.map((option) => option?.value);
    setHiddenColumnKeys(hiddenValues);
  };

  const indeterminate = useMemo(() => {
    return hiddenColumnKeys?.length === 0;
  }, [hiddenColumnKeys]);

  const handleCheckAll = () => {
    if (indeterminate) {
      setHiddenColumnKeys((options || []).map((option) => option.value));
    } else {
      setHiddenColumnKeys([]);
    }
  };

  return (
    <div>
      <Checkbox checked={indeterminate} onChange={handleCheckAll}>
        {t('table.select-all')}
      </Checkbox>
      <div className="my-2 h-[1px] w-full bg-gray-100" />
      <CheckboxGroup
        options={options}
        defaultValue={selectedValues}
        onChange={handleOnChange}
        key={JSON.stringify(selectedValues)}
      />
    </div>
  );
};

const FilterColumn = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={<FilterColumnContent {...props} />}
      title={t('table.columns')}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottom"
    >
      <Button type="primary" icon={<SettingOutlined />} />
    </Popover>
  );
};

export default FilterColumn;
