

export interface DtoWearCreation {
    id: number,
    name: string,
    description: string
}

export interface DtoWearGetAll {
    limit: number
    offset: number
}

export interface DtoWearGetById {
    id: number
}

