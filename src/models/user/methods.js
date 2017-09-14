/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
export const toJSON = {
  transform(entry, json) {
    json.id = json._id
    delete json._id
  },
}
