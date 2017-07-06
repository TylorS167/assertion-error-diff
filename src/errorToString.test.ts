import { TestCollection, describe, given, it } from '@typed/test'

import { createAssertionError } from './createAssertionError'
import { errorToString } from './errorToString'
import { strip } from 'typed-colors'

export const test: TestCollection = describe(`errorToString`, [
  given(`an Error`, [
    it(`returns a string representation`, ({ ok }) => {
      const error = new Error(`Not true`)

      const expected = `Error: Not true\n`

      ok(errorToString(error).startsWith(expected))
    }),
  ]),
  given(`an AssertionError`, [
    it(`returns a string representation`, ({ equal }) => {
      const expected = true
      const actual = false
      const message = `Not a truthy value`

      const error = createAssertionError(message, expected, actual)

      const expectedString =
        `AssertionError: ${message}\n` + `  - expected + actual\n\n` + `  true !== false`

      equal(expectedString, strip(errorToString(error)))
    }),
  ]),
])
