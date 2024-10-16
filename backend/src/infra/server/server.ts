import express, { Express, NextFunction, Request, Response } from 'express'

import config from '@/infra/config'

import { Context } from './context'
import { Handler, IRouter, MetaDataKeys } from './types'

type ControllerInstance = { [handleName: string]: Handler }

export class Server {
    private http: Express

    private routes: Array<{ api: string; handler: string }> = []

    constructor() {
        this.http = express()
    }

    public init() {
        this.http.use(express.json())
    }

    public registerController(controllerClass: any) {
        const controllerInstance: ControllerInstance = new controllerClass()

        const basePath = Reflect.getMetadata(
            MetaDataKeys.BASE_PATH,
            controllerClass
        )
        const routers: IRouter[] = Reflect.getMetadata(
            MetaDataKeys.ROUTERS,
            controllerClass
        )

        const svRouter = express.Router()

        routers.forEach(({ method, path, handlerName }) => {
            const fn =
                controllerInstance[String(handlerName)].bind(controllerInstance)

            svRouter[method](path, async (req, res, next) => {
                const ctx = new Context(req, res)

                try {
                    await fn(ctx)
                } catch (err) {
                    next(err)
                }
            })
            this.routes.push({
                api: `${method.toLocaleUpperCase()} ${basePath + path}`,
                handler: `${controllerClass.name}.${String(handlerName)}`,
            })
        })

        this.http.use(basePath, svRouter)
    }

    public setupErrorHandler() {
        this.http.use(
            (
                err: { status: number; message: string },
                req: Request,
                res: Response,
                // eslint-disable-next-line
                next: NextFunction
            ) => {
                res.status(err.status).send({
                    staus: err.status,
                    message: err.message,
                })
            }
        )
    }

    public run() {
        this.http.listen(config.port, () => {
            console.log(`Server starting at port ${config.port}`)
            console.table(this.routes)
        })
    }
}
