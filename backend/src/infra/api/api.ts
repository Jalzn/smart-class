import { Server } from '../server'
import UsersController from './controllers/users.controller'

export class API {
    httpServer: Server

    constructor() {
        this.httpServer = new Server()
    }

    setup() {
        this.httpServer.init()

        this.httpServer.registerController(UsersController)

        this.httpServer.setupErrorHandler()
    }

    start() {
        this.httpServer.run()
    }
}
