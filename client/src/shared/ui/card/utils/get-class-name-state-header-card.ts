import {StateCard} from '../enums/enums'
import styles from '../card.module.sass'


export const getClassNameStateHeaderCard = (stateCard: StateCard) => {
    return {
        [styles.danger]: StateCard.Danger === stateCard,
        [styles.success]: StateCard.Success === stateCard,
        [styles.warning]: StateCard.Warning === stateCard,
    }
}