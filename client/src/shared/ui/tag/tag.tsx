import { FC } from 'react'
import { SizeTag, StateTag } from './enums/enums'
import {getClassNameSizeTag} from './utils/get-class-name-size-tag/get-class-name-size-tag'
import {getClassNameStateTag} from './utils/get-class-name-state-tag/get-class-name-state-tag'
import classNames from 'classnames'

import styles from './tag.module.sass'

const Tag: FC<Props> = ({
    text,
    size = SizeTag.Small,
    state = StateTag.Primary,
    className
}) => {


    return <p className={classNames(
            styles.tag,
            className,
            getClassNameSizeTag(size),
            getClassNameStateTag(state)
        )}>
            {text}
        </p>
}

interface Props {
    text: string
    size?: SizeTag
    state?: StateTag
    className?: string
}

export default Tag