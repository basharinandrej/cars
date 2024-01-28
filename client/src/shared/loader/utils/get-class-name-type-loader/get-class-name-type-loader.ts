import { LoaderType } from "../../enums/enums";
import styles from '../../loader.module.sass'


export const getClassNameTypeLoader = (type: LoaderType) => {

    return {
        [styles.primary]: LoaderType.Primary === type,
        [styles.secondary]: LoaderType.Secondary === type
    }
}