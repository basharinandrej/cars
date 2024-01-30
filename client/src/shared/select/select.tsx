import {ChangeEvent} from "react"
import classNames from "classnames"

import styles from './select.module.sass'

const Select = function<T extends string>(props: SelectProps<T>) {
  const {className, options, onChange, externalValue} = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if(onChange) {
      onChange(e.target.value as T)
    }
  }

  return (
      <select
        value={externalValue}
        onChange={onChangeHandler}
        className={classNames(styles.select, className)}
      >
        <option value="" disabled selected hidden>Категория</option>
        {options.map((option, idx) => <option key={idx} value={option.value}>{option.text}</option>)}
      </select>
  )
}

export default Select

export interface SelectOption<T> {
  value: T,
  text: string
}

interface SelectProps<T> {
  className?: string
  options: SelectOption<T>[]
  onChange: (value: T) => void
  externalValue: T
}