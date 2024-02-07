import React, {FC} from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';

import styles from './index.module.sass'


const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const SelectSearch: FC<SelectProps> = ({
    onChange,
    onSearch,
    onFocus,
    onClear,
    options,
    placeholder,
    allowClear = true,
    value
}) => (
  <Select
    showSearch
    placeholder={placeholder}
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    onFocus={onFocus}
    onClear={onClear}
    filterOption={filterOption}
    options={options}
    className={styles.selectSearch}
    allowClear={allowClear}
    value={value}
  />
);

