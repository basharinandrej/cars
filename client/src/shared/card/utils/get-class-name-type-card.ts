import { TypeCard } from "../enums/enums"
import styles from '../card.module.sass'

export const getClassNameTypeCard = (typeCard: TypeCard) => {

    return {
        [styles.row]: typeCard === TypeCard.Row,
        [styles.grid]: typeCard === TypeCard.Grid
    }
}