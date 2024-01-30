import {StateCard} from '../enums/enums'
import { StateTag } from '../../tag/enums/enums'


export const getStateTag = (stateCard: StateCard): StateTag => {
    let result = null
    
    if(stateCard === StateCard.Danger) {
        result = StateTag.Danger
    } else if(stateCard === StateCard.Warning) {
        result = StateTag.Warning
    } else if(stateCard === StateCard.Success) {
        result = StateTag.Success
    } else {
        result = StateTag.Primary
    }
    
    return result
}