import { Router } from 'express'

import { weatherAPI } from './weather'
import { userAPI } from './user'
import { dbAPI } from './db'


export const api = Router()

weatherAPI(api)
userAPI(api)
dbAPI(api)
