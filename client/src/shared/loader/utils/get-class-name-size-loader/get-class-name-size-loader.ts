import { LoaderSize } from "../../enums/enums";
import styles from '../../loader.module.sass'


export const getClassNameSizeLoader = (size: LoaderSize) => {

    return {
        [styles.large]: LoaderSize.Large === size,
        [styles.small]: LoaderSize.Small === size
    }
}