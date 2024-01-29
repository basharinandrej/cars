import { SizeTag } from '../../enums/enums'
import styles from '../../tag.module.sass'


export const getClassNameSizeTag = (size: SizeTag) => {
    return {
        [styles.large]: SizeTag.Large === size,
        [styles.small]: SizeTag.Small === size,
    }
}