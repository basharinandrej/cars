import {Optional} from "sequelize/types";

export interface TokenAttributes {
    id: number
    refreshToken: string
    userId?: number
    organizationId?: number
}
  
