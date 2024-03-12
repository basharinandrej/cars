import { lazy } from 'react'

//@ts-ignore
export const PageServices = lazy(async () => await import('./page-services'))