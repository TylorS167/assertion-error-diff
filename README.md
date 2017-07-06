# AssertionError Diff

## Get It
```sh
npm install --save assertion-error-diff
# or
yarn add assertion-error-diff
```

## API

<details>
  <summary id=createAssertionError>createAssertionError :: string -&gt a -&gt a -&gt AssertionError a</summary>
  <p>Creates an AssertionError</p>


  <p><strong>Example:</strong></p>

```typescript
import { createAssertionError } from 'assertion-error-diff'

const error = createAssertionError('Not a truthy value', true, false)

throw error
```

</details>

<details>
  <summary id=errorToString>errorToString :: Error -&gt string</summary>
  <p>Given an <code>Error</code> it will create a string representation. If the <code>Error</code> given<br>is an <code>AssertionError</code> it will create a diff of the expected and actual values.</p>


  <p><strong>Example:</strong></p>

```typescript
import { errorToString, createAsssertionError } from 'assertion-error-diff'

errorToString(new Error('foo')) // 'Error: foo'

errorToString(createAssertionError('foo', 'bar', 'baz'))
// AssertionError: foo
// - expected + actual
//
// bar !== baz
```

</details>

<details>
  <summary id=isAssertionError>isAssertionError :: Error -&gt boolean</summary>
  <p>Given an Error it returns <code>true</code> if that Error is an AssertionError<br><code>false</code> otherwise.</p>


  <p><strong>Example:</strong></p>

```typescript
import { isAssertionError, createAssertionError } from 'assertion-error-diff'

isAssertionError(new Error('foo')) // false
isAssertionError(createAssertionError('foo', 'bar', 'baz')) // true
```

</details>
