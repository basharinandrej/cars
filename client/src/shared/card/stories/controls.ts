import {StateTag} from '../../tag/enums/enums'

export const controls = {
    stateTag: {
        options: [StateTag.Danger, StateTag.Primary, StateTag.Success, StateTag.Warning],
        control: {type: 'select'}
    }
}