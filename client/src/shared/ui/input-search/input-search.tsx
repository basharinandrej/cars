import React, {FC, ChangeEventHandler} from 'react'

import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
const { Search } = Input;

export const InputSearch: FC<Props>= ({
    placeholder = 'Артикул или название детали',
    isLoading = false,
    onChange,
    onSearch,
    externalValue,
    suffix
}) => {

    return <Search 
        placeholder={placeholder} 
        enterButton="Поиск" 
        size="large"
        loading={isLoading}
        onChange={onChange}
        onSearch={onSearch}
        allowClear
        value={externalValue}
        suffix={suffix}
    />

}

interface Props extends SearchProps {
    placeholder?: string
    isLoading?: boolean
    externalValue?: string
    onChange: ChangeEventHandler<HTMLInputElement>
}