import { diffArrays } from './diffArrays'
import { diffMap } from './diffMap'
import { diffObjects } from './diffObjects'
import { equals } from '167'
import { stringify } from './helpers'

export function diff<A>(expected: A, actual: A): string {
  if (Array.isArray(expected) && Array.isArray(actual)) return diffArrays(expected, actual)

  if (expected instanceof Set && actual instanceof Set)
    return `Set ${diffArrays(Array.from(expected), Array.from(actual))}`

  if (expected instanceof Map && actual instanceof Map) return diffMap(expected, actual)

  if (typeof expected === 'object' && typeof actual === 'object')
    return diffObjects(expected as any, actual as any)

  if (equals(expected, actual)) return stringify(actual)

  return `${stringify(expected)} !== ${stringify(actual)}`
}
