import {ChangeEventHandler, HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useState, FC} from 'react'
import classNames from 'classnames'

import cls from './input.module.sass'

export const Input: FC<InputProps> = ({
    externalValue = '',
    placeholder = 'Введи название пипелаца',
    externalErr,
    onChange,
    className,
    type = 'text',
}) => {
    const [value, setValue] = useState(externalValue)
    const [error, setError] = useState<string>()

    useEffect(() => setValue(externalValue), [externalValue])
    useEffect(() => setError(externalErr), [externalErr])

    const isShowPlaceholder = (!value && placeholder)

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target?.value
        onChange(value)
        setValue(value)
    }

    const mods: Record<string, boolean> = {
        [cls.errInput]: !!error,
    }

    return <div className={classNames(cls.inputBox, mods, className)}>
        {isShowPlaceholder && <span className={cls.placeholder}>{placeholder}</span>}

        <input className={cls.input} type={type} value={value} onChange={handleChange} />

        {error && <span className={cls.errNotice}>{error}</span>}
    </div>
}


type HTMLInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>

interface InputProps extends HTMLInput {
    onChange: (value: string) => void
    className?: string
    externalErr?: string
    externalValue?: string | number
    placeholder?: string
    type?: HTMLInputTypeAttribute
}