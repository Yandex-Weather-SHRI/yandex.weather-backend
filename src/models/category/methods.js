/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
export const toJSON = {
  transform(entry, json) {
    delete json._id
  },
}
