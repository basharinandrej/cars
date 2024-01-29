import {StateTag } from '../../enums/enums'
import styles from '../../tag.module.sass'


export const getClassNameStateTag = (state: StateTag) => {
    return {
        [styles.primary]: StateTag.Primary === state,
        [styles.danger]: StateTag.Danger === state,
        [styles.success]: StateTag.Success === state,
        [styles.warning]: StateTag.Warning === state,
    }
}