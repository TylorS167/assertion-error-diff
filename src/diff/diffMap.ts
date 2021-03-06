import { ascend, equals, id, join, map, sort, uniq } from '167'
import { green, red } from 'typed-colors'
import { isEmpty, stringify } from './helpers'

export function diffMap(expected: Map<any, any>, actual: Map<any, any>): string {
  const expectedKeys = Array.from(expected.keys())
  const actualKeys = Array.from(actual.keys())

  if (isEmpty(expectedKeys) && isEmpty(actualKeys)) return wrapInMap('')

  if (isEmpty(expectedKeys))
    return wrapInMap(join('', map(key => addedEntry(key, actual.get(key)), actualKeys)))

  if (isEmpty(actualKeys))
    return wrapInMap(join('', map(key => removedEntry(key, expected.get(key)), expectedKeys)))

  const allKeys = sort(ascend(id), uniq([...expectedKeys, ...actualKeys]))

  let str = ''

  for (const key of allKeys) {
    if (expected.has(key) && actual.has(key)) {
      const expectedValue = expected.get(key)
      const actualValue = actual.get(key)

      if (equals(expectedValue, actualValue)) {
        str += `${stringify(key)} => ${stringify(actualValue)}`
      } else {
        str += removedEntry(key, expectedValue) + addedEntry(key, actualValue)
      }
    } else if (expected.has(key)) {
      str += removedEntry(key, expected.get(key))
    } else if (actual.has(key)) {
      str += addedEntry(key, actual.get(key))
    }
  }

  return wrapInMap(str)
}

function wrapInMap(entries: string): string {
  return `Map {\n${entries}}`
}

function removedEntry(key: any, value: any): string {
  return `${red('-')} "${stringify(key)}" => ${stringify(value)}\n`
}

function addedEntry(key: any, value: any): string {
  return `${green('+')} "${stringify(key)}" => ${stringify(value)}\n`
}
