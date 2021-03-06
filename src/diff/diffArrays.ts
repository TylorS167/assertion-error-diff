import { addedValue, isEmpty, isObject, removedValue, stringify } from './helpers'
import { equals, join, length, map } from '167'

export function diffArrays<A extends Array<any>>(expected: A, actual: A): string {
  if (equals(expected, actual)) return stringify(actual)

  if (isEmpty(expected)) return wrapInBraces(join('', map(addedValue, actual)))

  if (isEmpty(actual)) return wrapInBraces(join('', map(removedValue, expected)))

  const count = Math.max(length(expected), length(actual))

  let str = ''

  for (let i = 0; i < count; ++i) {
    const expectedValue = expected[i]
    const actualValue = actual[i]

    const expectedPadding = isObject(expectedValue) ? 2 : 0
    const actualPadding = isObject(actualValue) ? 2 : 0

    if (equals(expectedValue, actualValue)) str += `  ${stringify(actualValue)}`
    else if (i >= length(expected)) str += addedValue(actualValue, actualPadding)
    else if (i >= length(actual)) str += removedValue(expectedValue, expectedPadding)
    else
      str += removedValue(expectedValue, expectedPadding) + addedValue(actualValue, actualPadding)
  }

  return wrapInBraces(str)
}

function wrapInBraces(values: string): string {
  return `[\n` + values + `]`
}
