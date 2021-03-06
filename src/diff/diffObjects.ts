import { ascend, equals, id, join, keys, length, map, sort, uniq } from '167'
import { green, red } from 'typed-colors'
import { isEmpty, isObject, padNewLine, stringify } from './helpers'

import { diff } from './diff'

export function diffObjects<A extends object>(expected: A, actual: A): string {
  if (equals(expected, actual)) return stringify(actual)

  const expectedKeys = keys(expected)
  const actualKeys = keys(actual)

  if (isEmpty(expectedKeys))
    return wrapInBrackets(join('', map(key => addedProperty(key, actual[key]), actualKeys)))

  if (isEmpty(actualKeys))
    return wrapInBrackets(join('', map(key => removedProperty(key, expected[key]), expectedKeys)))

  const allKeys = sort(ascend<keyof A, keyof A>(id), uniq([...expectedKeys, ...actualKeys]))

  return wrapInBrackets(join('', map(changeToString<A>(expected, actual), allKeys)))
}

function changeToString<A extends object>(expected: A, actual: A) {
  return function(key: keyof A): string {
    const change = findChange(key, expected, actual)

    if (change === 'removed') return removedProperty(key, expected[key])

    if (change === 'added') return addedProperty(key, actual[key])

    if (change === 'changed') {
      const expectedValue = expected[key]
      const actualValue = actual[key]

      if (isObject(expectedValue) && isObject(actualValue))
        return `  "${stringify(key)}": ` + formatNestedDiff(diff(expectedValue, actualValue)) + `\n`

      return removedProperty(key, expectedValue) + addedProperty(key, actualValue)
    }

    return `  "${stringify(key)}": ${stringify(actual[key])}\n`
  }
}

function formatNestedDiff(diff: string): string {
  const chars = padNewLine(4, diff)
  const characterCount = length(chars)

  let str = ''

  for (let i = 0; i < characterCount - 3; ++i) str += chars[i]

  return str + `}`
}

type Change = 'added' | 'removed' | 'changed' | 'none'

function findChange(key: string, expected: any, actual: any): Change {
  const expectedValue = expected[key]
  const actualValue = actual[key]

  if (equals(expectedValue, actualValue)) return 'none'

  const expectedHasProperty = expected.hasOwnProperty(key)
  const actualHasProperty = actual.hasOwnProperty(key)

  if (expectedHasProperty && actualHasProperty) return 'changed'

  return expectedHasProperty ? 'removed' : 'added'
}

function wrapInBrackets(keyValues: string): string {
  return `{\n` + keyValues + `}`
}

function removedProperty(key: string, value: any): string {
  return `${red('-')} "${stringify(key)}": ${stringify(value)}\n`
}

function addedProperty(key: string, value: any): string {
  return `${green('+')} "${stringify(key)}": ${stringify(value)}\n`
}
