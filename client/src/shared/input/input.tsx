import {ChangeEventHandler, HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useState, FC} from 'react'

import cls from './input.module.sass'
import classNames from 'classnames'

export const Input: FC<InputProps> = ({
    externalValue = '',
    placeholder,
    externalErr,
    onChange,
    className,
    type = 'text',
}) => {
    const [value, setValue] = useState(externalValue)
    const [errors, setErrors] = useState([])

    useEffect(() => setValue(externalValue), [externalValue])
    // useEffect(() => setErrors(externalErr), [externalErr])

    const isShowPlaceholder = (!value && placeholder)

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target?.value
        onChange(value)
        setValue(value)
    }

    const mods: Record<string, boolean> = {
        [cls.errInput]: !!errors?.length,
    }

    return <div className={classNames(cls.inputBox, mods, className)}>
        {isShowPlaceholder && <span className={cls.placeholder}>{placeholder}</span>}

        <input className={cls.input} type={type} value={value} onChange={handleChange} />

        {Array.isArray(errors) && errors.map((err, idx) => {
            return <span key={idx} className={cls.errNotice}>{err}</span>
        })}
    </div>
}


type HTMLInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>

interface InputProps extends HTMLInput {
    onChange: (value: string) => void
    className?: string
    externalErr?: Array<string>
    externalValue?: string | number
    placeholder?: string
    type?: HTMLInputTypeAttribute
}