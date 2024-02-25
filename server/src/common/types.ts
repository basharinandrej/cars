import { Request } from "express";
import { UserRoles } from "@common/enums";

export type EmptyString = ''

export interface PayloadToken {
    id: number,
    name: string,
    role?: UserRoles
    isOrganization?: boolean
}

export interface RequestCreation<T> extends Request<Record<string, unknown>, EmptyString, T> {}

export interface RequestGetAll<T> extends Request<Record<string, unknown>, EmptyString, EmptyString, T> {}

export interface RequestGetOne<T> extends Request<Record<string, unknown>, EmptyString, EmptyString, T> {}

export interface RequestDelete<T> extends Request<Record<string, unknown>, EmptyString, EmptyString, T> {}


export interface Pagination {
    limit?: number,
    offset?: number
}
