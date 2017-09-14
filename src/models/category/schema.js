import { Schema } from 'mongoose'


export const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  enabled: {
    type: Boolean,
    default: false,
  },
  group: {
    type: String,
    trim: true,
  },
})
