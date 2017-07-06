import { AssertionError } from './AssertionError'
import { curry3 } from '167'

/**
 * Creates an AssertionError
 *
 * @name createAssertionError :: string -> a -> a -> AssertionError a
 * @example
 * import { createAssertionError } from 'assertion-error-diff'
 *
 * const error = createAssertionError('Not a truthy value', true, false)
 *
 * throw error
 */
export const createAssertionError: CreateAssertionError = curry3(function createAssertionError<A>(
  message: string,
  expected: A,
  actual: A
): AssertionError<A> {
  return new AssertionError<A>(message, expected, actual)
})

export interface CreateAssertionError {
  <A>(message: string, expected: A, actual: A): AssertionError<A>
  <A>(message: string): (expected: A, actual: A) => AssertionError<A>
  <A>(message: string, expected: A): (actual: A) => AssertionError<A>
  <A>(message: string): (expected: A) => (actual: A) => AssertionError<A>
}
