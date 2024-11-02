import { PrismaClient } from '@prisma/client'
import express, { Express, NextFunction, Request, Response } from 'express'
import config from '../config'
import { prisma } from '../database'
import { TeacherRepository, UserRepository } from '../repositories'
import { HashService } from '../services/hash.service'
import { JwtService } from '../services/jwt.service'
import { AuthController } from './controllers/auth.controller'
import { ApiError } from './errors'
import { AuthMiddleware } from './middlewares/auth.middleware'

export class API {
    private http: Express

    private database: PrismaClient

    private repositories: Record<string, any>
    private services: Record<string, any>
    private middlewares: Record<string, any>

    constructor() {
        this.http = express()

        this.repositories = {}
        this.services = {}
        this.middlewares = {}

        this.database = prisma
    }

    public setup() {
        this.http.use(express.json())

        this.registerRepositories()
        this.registerServices()
        this.registerMiddlewares()

        this.registerAuthController()

        this.setupErrorHandler()
    }

    public start() {
        this.http.listen(config.port, () => {
            console.log(`Starting API at ${config.port}`)
        })
    }

    private registerRepositories() {
        this.repositories['UserRepository'] = new UserRepository(this.database)
        this.repositories['TeacherRepository'] = new TeacherRepository(
            this.database
        )
    }

    private registerServices() {
        this.services['HashService'] = new HashService()
        this.services['JwtService'] = new JwtService()
    }

    private registerMiddlewares() {
        this.middlewares['Auth'] = new AuthMiddleware(
            this.repositories['UserRepository'],
            this.services['JwtService']
        )
    }

    private registerAuthController() {
        const authController = new AuthController(
            this.repositories['UserRepository'],
            this.services['JwtService'],
            this.services['HashService']
        )

        const router = express.Router()

        router.post('/login', (req, res, next) =>
            authController.login(req, res, next)
        )

        router.post('/register', (req, res, next) =>
            authController.register(req, res, next)
        )

        this.http.use('/auth', router)
    }


    private setupErrorHandler() {
        this.http.use(
            (
                err: ApiError,
                req: Request,
                res: Response,
                next: NextFunction
            ) => {
                res.status(err.status).send({
                    message: err.message,
                    status: err.status,
                })
            }
        )
    }
}
