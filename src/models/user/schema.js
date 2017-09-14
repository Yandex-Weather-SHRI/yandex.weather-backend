import { Schema } from 'mongoose'

import { categorySchema } from 'models/category'


export const userSchema = new Schema({
  login: {
    type: String,
    trim: true,
  },
  settings: {
    categories: [categorySchema],
  },
}, {
  versionKey: false,
})
