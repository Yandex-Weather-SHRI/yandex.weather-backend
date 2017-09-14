import { AbstractError } from './abstract'


export class ValidationError extends AbstractError {
  constructor(payload) {
    super('Ошибка валидации', 400)
    this.payload = payload
  }
}
