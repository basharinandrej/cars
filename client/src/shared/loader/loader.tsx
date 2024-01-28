import { FC } from 'react'
import { LoaderSize, LoaderType } from './enums/enums'
import classNames from 'classnames'
import {getClassNameSizeLoader} from './utils/get-class-name-size-loader/get-class-name-size-loader'
import {getClassNameTypeLoader} from './utils/get-class-name-type-loader/get-class-name-type-loader'

import styles from './loader.module.sass'

export const Loader: FC<Props> = ({
    size, type
}) => {
    return <div className={classNames(
        styles.loader,
        getClassNameSizeLoader(size),
        getClassNameTypeLoader(type),
    )}>
        <div />
        <div />
        <div />
        <div />
    </div>
}
interface Props {
    size: LoaderSize
    type: LoaderType
}

export default Loader