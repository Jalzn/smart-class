import 'reflect-metadata'

import { API } from './infra/api/api'

const api = new API()

api.setup()
api.start()
