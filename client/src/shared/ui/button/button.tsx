import {FC, Fragment} from 'react'
import {TypeButton} from './enums/enums'
import classNames from 'classnames'
import {getClassNameTypeButton} from './utils/get-class-name-type-button/get-class-name-type-button'
import Loader from '../loader/loader'
import { LoaderSize, LoaderType } from '../loader/enums/enums'

import styles from './button.module.sass'

const Button: FC<Props> = ({
    isDisabled = false,
    type = TypeButton.Primary,
    text,
    isLoading = false
}) => {

    const typeLoader = type === TypeButton.Primary ? LoaderType.Primary : LoaderType.Secondary

    return <button 
        disabled={isDisabled}
        className={classNames(
            styles.button,
            getClassNameTypeButton(type)
        )}
    >
        <Fragment>
            {isLoading && !isDisabled && <Loader className={styles.loader} size={LoaderSize.Small} type={typeLoader}/>}
            {text}
        </Fragment>
    </button>
}

interface Props {
    type: TypeButton
    text: string
    isDisabled?: boolean
    isLoading?: boolean
}

export default Button