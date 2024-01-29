import { TypeCard, StateCard } from '../enums/enums'

export const controls = {
    stateCard: {
        options: [StateCard.Danger, StateCard.Primary, StateCard.Success, StateCard.Warning],
        control: {type: 'select'}
    },
    typeCard: {
        options: [TypeCard.Grid, TypeCard.Row],
        control: {type: 'select'}
    }
}