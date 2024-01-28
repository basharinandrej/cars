import {FC} from 'react'
import styles from './button.module.sass'
import {TypeButton} from './enums/enums'
import classNames from 'classnames'
import {getClassNameTypeButton} from './utils/get-class-name-type-button/get-class-name-type-button'


const Button: FC<Props> = ({
    disabled = false,
    type = TypeButton.Primary,
    text
}) => {


    return <button 
        disabled={disabled}
        className={classNames(
            styles.button,
            getClassNameTypeButton(type)
        )}
    >
        {text}
    </button>
}

interface Props {
    disabled: boolean
    type: TypeButton
    text: string
}

export default Button