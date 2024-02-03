import React, {FC} from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';



const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const SelectSearch: FC<SelectProps> = ({
    onChange,
    onSearch,
    options
}) => (
  <Select
    showSearch
    placeholder="Выберете брнд"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={options}
  />
);

