//////////////////////////////////////////////////////////////////////////////////////////////
// Loader file for app 
console.log('==== App loading started ==== ', (new Date()).toString());

// Load App js and required dependencies
const appjs = require('./app/js/app.js');

// Require app yaml for google app engine
const appYaml = require('./app.yaml');

console.log('==== App loading done ==== ', (new Date()).toString());