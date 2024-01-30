import { StateTag } from '../../tag/enums/enums'

export const getMapWithTextTagForWearDetail  = (): Record<StateTag, string> => {
    return {
        [StateTag.Danger]: 'Нужен ремонт',
        [StateTag.Success]: 'Новая',
        [StateTag.Warning]: 'Можно использовать',
        [StateTag.Primary]: '',
    }
}

export const getMapWithTextTagForStatusWork = (): Record<StateTag, string> => {
    return {
        [StateTag.Danger]: 'Занят',
        [StateTag.Success]: 'Свободен',
        [StateTag.Warning]: 'Есть заявка на расмотрении',
        [StateTag.Primary]: '',
    }
}