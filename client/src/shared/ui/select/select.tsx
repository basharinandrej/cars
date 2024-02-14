import {FC} from 'react';
import { Select as SelectAntD } from 'antd';
import { SelectProps } from 'antd/es/select';

const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const Select: FC<SelectProps> = ({
    onChange,
    onFocus,
    onClear,
    options,
    placeholder,
    allowClear = true,
    value
}) => (
  <SelectAntD
    showSearch
    placeholder={placeholder}
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onClear={onClear}
    filterOption={filterOption}
    options={options}
    allowClear={allowClear}
    value={value}
  />
);
