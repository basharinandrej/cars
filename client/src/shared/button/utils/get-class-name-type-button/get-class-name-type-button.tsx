import { TypeButton } from "../../enums/enums";
import styles from '../../button.module.sass'


export const getClassNameTypeButton = (type: TypeButton) => {

    console.log('>> type', type)
    return {
        [styles.primary]: TypeButton.Primary === type,
        [styles.secondary]: TypeButton.Secondary === type
    }
}