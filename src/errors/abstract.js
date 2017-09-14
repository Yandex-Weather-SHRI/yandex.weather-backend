export class AbstractError extends Error {
  /**
   * @param message {string}
   * @param status {number}
   */
  constructor(message, status = 500) {
    super(message)

    Object.defineProperty(this, 'status', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: status,
    })

    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: message,
    })

    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: this.constructor.name,
    })

    // eslint-disable-next-line no-prototype-builtins
    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor)
      return
    }

    Object.defineProperty(this, 'stack', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: (new Error(message)).stack,
    })
  }
}
