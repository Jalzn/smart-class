import { PrismaClient } from '@prisma/client'
import express, { Express, NextFunction, Request, Response } from 'express'
import config from '../config'
import { prisma } from '../database'
import { TeacherRepository, UserRepository } from '../repositories'
import { HashService } from '../services/hash.service'
import { JwtService } from '../services/jwt.service'
import { AuthController } from './controllers/auth.controller'
import UsersController from './controllers/users.controller'
import { ApiError } from './errors'
import { AuthMiddleware } from './middlewares/auth.middleware'
import { TeachersController } from './controllers/teachers.controller'

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

        this.registerUsersController()
        this.registerAuthController()
        this.registerTeachersController()

        this.setupErrorHandler()
    }

    public start() {
        this.http.listen(config.port, () => {
            console.log(`Starting API at ${config.port}`)
        })
    }

    private registerRepositories() {
        this.repositories['UserRepository'] = new UserRepository(this.database)
        this.repositories['TeacherRepository'] = new TeacherRepository(this.database)
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

        this.http.use('/auth', router)
    }

    private registerUsersController() {
        const usersController = new UsersController(
            this.repositories['UserRepository'],
            this.services['HashService']
        )

        const router = express.Router()

        router.get('/', (req, res, next) =>
            usersController.findAll(req, res, next)
        )
        router.get('/:id', (req, res, next) =>
            usersController.findOneById(req, res, next)
        )
        router.post('/', (req, res, next) =>
            usersController.create(req, res, next)
        )
        router.delete('/:id', (req, res, next) =>
            usersController.delete(req, res, next)
        )

        this.http.use(
            '/users',
            (req, res, next) => this.middlewares['Auth'].use(req, res, next),
            router
        )
    }

    private registerTeachersController() {
        const teachersController = new TeachersController(
            this.repositories['TeacherRepository'],
            this.repositories['UserRepository'],
            this.services['JwtService'],
            this.services['HashService']
        )

        const router = express.Router()

        router.post('/', (req, res, next) => teachersController.register(req, res, next))

        this.http.use('/teachers', router)
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
