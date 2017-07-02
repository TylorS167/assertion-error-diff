const dox = require('dox')
const ts = require('typescript')
const fs = require('fs')
const expand = require('glob-expand')
const { join, dirname } = require('path')
const marked = require('marked')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
})

require('ts-node/register')

const { find, propEq, groupBy, prop, sort, ascend } = require('167')

const PATTERNS = ['*.ts', '!*.test.ts']

const COMPILER_OPTIONS = {
  lib: ['dom', 'es5', 'es2015'],
  declaration: true,
  moduleResolution: 'node',
  noImplicitAny: true,
  noUnusedParameters: true,
  noUnusedLocals: true,
  sourceMap: false,
  strictNullChecks: true,
  target: 'es5',
  module: 'es2015',
}

buildDocumentation(join(__dirname, '../src'))

function buildDocumentation(cwd) {
  console.log(`Generating documentation...`)

  const files = expand({ cwd, filter: 'isFile' }, PATTERNS).map(file => join(cwd, file))

  const results = files.map(parseDocumentation).filter(Boolean)

  const docs = sort(
    ascend(({ name }) => name),
    results.map(result => generateDocumentation(result, false))
  )

  const about = fs.readFileSync(join(cwd, '../.template/README.md')).toString()

  const readme = [about, ...docs.map(prop('docs'))]

  fs.writeFileSync(join(cwd, '../README.md'), readme.join('\n'))
}

function parseDocumentation(path) {
  const source = fs.readFileSync(path).toString()

  const { outputText } = ts.transpileModule(source, { compilerOptions: COMPILER_OPTIONS })

  const [{ tags = [], description: { full }, ignore, codeStart }] = dox.parseComments(outputText, {
    raw: true,
    skipSingleStar: true,
  })

  if (ignore || !tags.length) return null

  return { tags, description: full, codeStart, path }
}

function generateDocumentation({ tags, description, path }, open = false) {
  const { string: name } = find(propEq('type', 'name'), tags)
  const { string: example } = find(propEq('type', 'example'), tags)

  const fnName = name.split('(')[0].trim()

  const docs =
    (open ? `<details open>\n` : `<details>\n`) +
    `  <summary id=${fnName}>${replaceBrackets(name)}</summary>\n` +
    `  ${marked(description)}\n\n` +
    `  <p><strong>Example:</strong></p>\n\n` +
    `\`\`\`typescript\n${example}\n\`\`\`\n\n` +
    `</details>\n`

  return { name, path, docs }
}

function replaceBrackets(str) {
  return str.replace(/</g, '&lt').replace(/>/g, '&gt')
}
