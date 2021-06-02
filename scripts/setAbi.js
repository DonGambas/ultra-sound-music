const fs = require('fs')
const contractAbi  = require('../contracts');
const jsString = `export default ${JSON.stringify(contractAbi)}`;

fs.writeFile('./client/src/lib/usmAbi.js', jsString, {flag: 'w+'}, err => {
  if (err) {
    console.error(err)
    return
  }
})
