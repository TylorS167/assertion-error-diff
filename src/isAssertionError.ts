import { AssertionError } from './AssertionError'

/**
 * Given an Error it returns `true` if that Error is an AssertionError
 * `false` otherwise.
 *
 * @name isAssertionError :: Error -> boolean
 * @example
 * import { isAssertionError, createAssertionError } from 'assertion-error-diff'
 *
 * isAssertionError(new Error('foo')) // false
 * isAssertionError(createAssertionError('foo', 'bar', 'baz')) // true
 */
export function isAssertionError(error: Error): error is AssertionError<any> {
  return (
    error instanceof Error && error.hasOwnProperty('expected') && error.hasOwnProperty('actual')
  )
}
