import { Bans } from "../enums";

export const mapBadgeOrganizationBans: Record<Bans, {value: string, color: string}> = {
    [Bans.Null]: {
        value: 'Нет бана',
        color: '#16B364'
    },
    [Bans.Temporary]: {
        value: 'Есть бана',
        color: 'red'
    },
}