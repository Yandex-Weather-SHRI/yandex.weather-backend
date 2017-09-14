import mongoose from 'mongoose'

import { userSchema } from './schema'
import { toJSON } from './methods'


userSchema.set('toJSON', toJSON)

export { userSchema }
export const UserModel = mongoose.model('User', userSchema)
