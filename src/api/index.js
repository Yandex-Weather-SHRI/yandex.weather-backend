import { Router } from 'express'

import { weatherAPI } from './weather'
import { userAPI } from './user'


export const api = Router()

weatherAPI(api)
userAPI(api)
