/* eslint-disable @typescript-eslint/no-unused-vars */
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
import ClassroomController from './controllers/classroom.controller'
import { ClassroomRepository } from '../repositories/classroom.repository'
import { TeachersController } from './controllers/teachers.controller'
import { StudentController } from './controllers/student.controller'
import { StudentRepository } from '../repositories/student.repository'

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
        this.registerClassroomController()
        this.registerTeacherController()
        this.registerStudentController()

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
        this.repositories['ClassroomRepository'] = new ClassroomRepository(this.database)
        this.repositories['StudentRepository'] = new StudentRepository(this.database)
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

    private registerClassroomController() {
        const classroomController = new ClassroomController(
            this.repositories['ClassroomRepository'],
            this.repositories['TeacherRepository']
        )

        const router = express.Router()

        router.get('/', (req, res, next) =>
            classroomController.findAll(req, res, next)
        )

        router.get('/:id', (req, res, next) =>
            classroomController.findById(req, res, next)
        )

        router.post('/', (req, res, next) =>
            classroomController.create(req, res, next)
        )

        router.post('/:classroomId/assign-teacher', (req, res, next) =>
            classroomController.assignTeacherSubject(req, res, next)
        )

        router.delete('/:classroomId', (req, res, next) =>
            classroomController.delete(req, res, next)
        )

        this.http.use('/classrooms', router)
    }

    private registerTeacherController() {
        const teacherController = new TeachersController(
            this.repositories['TeacherRepository']
        )

        const router = express.Router()

        router.get('/', (req, res, next) =>
            teacherController.findAll(req, res, next)
        )

        router.post('/', (req, res, next) =>
            teacherController.register(req, res, next)
        )

        router.delete('/:teacherId', (req, res, next) =>
            teacherController.deleteById(req, res, next)
        )

        this.http.use('/teachers', router)
    }

    private registerStudentController() {
        const studentController = new StudentController(
            this.repositories['StudentRepository']
        )

        const router = express.Router()

        router.get('/', (req, res, next) =>
            studentController.findAll(req, res, next)
        )

        router.post('/', (req, res, next) =>
            studentController.create(req, res, next)
        )

        this.http.use('/students', router)
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
