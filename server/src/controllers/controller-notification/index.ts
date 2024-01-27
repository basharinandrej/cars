import { Response } from "express";
import events from 'events'

export const emitter = new events.EventEmitter();

class ControllerNotification {
    getNotification(req: any, res: Response) {
        res.writeHead(200, {
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache'
        })

        emitter.on('new-request', (request, recipienId) => {
            const id = req.query.id

            if(recipienId === id) {
                res.write(`data: ${JSON.stringify(request)} \n\n`)
            }
        })
    }
}

export default new ControllerNotification()