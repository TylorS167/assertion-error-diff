import { green, red } from 'typed-colors'

import { diff } from './diff'
import { isAssertionError } from './isAssertionError'
import { padNewLine } from './diff/helpers'

/**
 * Given an `Error` it will create a string representation. If the `Error` given
 * is an `AssertionError` it will create a diff of the expected and actual values.
 *
 * @name errorToString :: Error -> string
 * @example
 * import { errorToString, createAsssertionError } from 'assertion-error-diff'
 *
 * errorToString(new Error('foo')) // 'Error: foo'
 *
 * errorToString(createAssertionError('foo', 'bar', 'baz'))
 * // AssertionError: foo
 * // - expected + actual
 * //
 * // bar !== baz
 */
export function errorToString(error: Error): string {
  if (isAssertionError(error)) {
    return (
      `AssertionError: ${error.message}\n` +
      `  ${red('-')} expected ${green('+')} actual\n` +
      padNewLine(2, `\n${diff(error.expected, error.actual)}`)
    )
  }

  if (error.stack) return error.stack

  return `Error: ${error.message}`
}
