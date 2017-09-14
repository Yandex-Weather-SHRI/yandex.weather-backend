import { categorySchema } from './schema'
import { toJSON } from './methods'


categorySchema.set('toJSON', toJSON)

export { categorySchema }
