import { StateTag } from '../../tag/enums/enums'
import {StateTagWear} from '../types/types'

export const mapTextTag: Record<StateTagWear, string> = {
    [StateTag.Danger]: 'Нужен ремонт',
    [StateTag.Success]: 'Новая',
    [StateTag.Warning]: 'Можно использовать'
}