import React, {FC, ChangeEventHandler, useState, useEffect} from 'react'

import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
const { Search } = Input;

export const InputSearch: FC<Props>= ({
    placeholder = 'Артикул или название детали',
    isLoading = false,
    onChange,
    onSearch,
    externalValue
}) => {

    return <Search 
        placeholder={placeholder} 
        enterButton="Search" 
        size="large"
        loading={isLoading}
        onChange={onChange}
        onSearch={onSearch}
        allowClear
        value={externalValue}
    />

}

interface Props extends SearchProps {
    placeholder?: string
    isLoading?: boolean
    externalValue?: string
    onChange: ChangeEventHandler<HTMLInputElement>
}