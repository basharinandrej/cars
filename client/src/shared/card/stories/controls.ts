import {StateTag} from '../../tag/enums/enums'
import { TypeCard } from '../enums/enums'

export const controls = {
    stateTag: {
        options: [StateTag.Danger, StateTag.Primary, StateTag.Success, StateTag.Warning],
        control: {type: 'select'}
    },
    typeCard: {
        options: [TypeCard.Grid, TypeCard.Row],
        control: {type: 'select'}
    }
}