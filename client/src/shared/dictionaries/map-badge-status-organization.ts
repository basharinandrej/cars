import {StatusOrganization} from '../enums'

export const mapBadgeOrganizationStatus = {
    [StatusOrganization.Waiting]: {value: 'Рассматривает заявки', color: '#EAAA08'},
    [StatusOrganization.Busy]: {value: 'Занят', color: '#F04438'},
    [StatusOrganization.Free]: {value: 'Свободен', color: '#16B364'},
}