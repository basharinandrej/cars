import { Pagination} from '@common/types'
import { UserRoles } from "@common/enums";



export interface ParamsUserGetAll extends Pagination {
    role?: UserRoles
}
