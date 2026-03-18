const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const buildId = crypto.randomBytes(8).toString('hex')
const template = fs.readFileSync(
  path.join(__dirname, '..', 'sw.template.js'),
  'utf8'
)
const output = template.replace('__BUILD_ID__', buildId)

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sw.js'), output)
console.log(`Generated sw.js with CACHE_NAME: kotla-${buildId}`)
