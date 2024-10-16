import { Request, Response } from 'express'

export class Context {
    private req: Request
    private res: Response

    constructor(req: Request, res: Response) {
        this.req = req
        this.res = res
    }

    public send(payload: any, code: number = 200) {
        this.res.status(code).send(payload)
    }

    public params(): Record<string, string> {
        return this.req.params
    }

    public body(): Record<string, any> {
        return this.req.body
    }
}
