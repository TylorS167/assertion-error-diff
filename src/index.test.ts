import { TestCollection, describe, given, it } from '@typed/test'

export const test: TestCollection = describe(`Foo`, [
  given(`Bar`, [
    it(`Baz`, ({ ok }) => { ok(true) })
  ])
])
