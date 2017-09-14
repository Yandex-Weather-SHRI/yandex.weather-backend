import { AbstractError } from './abstract'


export class UserNotFound extends AbstractError {
  constructor(payload) {
    super('Пользователь не найден', 404)
    this.payload = payload
  }
}
