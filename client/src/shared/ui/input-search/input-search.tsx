import React, {FC, ChangeEventHandler} from 'react'

import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
const { Search } = Input;

export const InputSearch: FC<Props>= ({
    placeholder = 'Артикул или название детали',
    isLoading = false,
    onChange,
    onSearch
}) => {


    return <Search 
        placeholder={placeholder} 
        enterButton="Search" 
        size="large"
        loading={isLoading}
        onChange={onChange}
        onSearch={onSearch}
        allowClear
    />

}

interface Props extends SearchProps {
    placeholder?: string
    isLoading?: boolean
    onChange: ChangeEventHandler<HTMLInputElement>
}