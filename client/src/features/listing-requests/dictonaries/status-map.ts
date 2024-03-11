import { StatusRequest } from "@shared"


export const statusMap: Record<StatusRequest, string> = {
    [StatusRequest.APPROVED]: 'Подтверждён',
    [StatusRequest.DECLINED]: 'Отклонён',
    [StatusRequest.IN_VIEWING]: 'Рассматривается',
    [StatusRequest.FINISHED]: 'Завершена',
}