import { AddressAttributes } from "@models/address/types"
import {DtoAddressCreation} from "./types"


class DtoAddress {
    getDtoAddressCreation(address: AddressAttributes, organizationId?:number): DtoAddressCreation {
        return {
            city: 'Вологда',
            house: address.house,
            street: address.street,
            organizationId
        }
    }
}

export default new DtoAddress()