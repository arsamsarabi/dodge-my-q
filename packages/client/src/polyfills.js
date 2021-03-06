import Promise from 'promise-polyfill'
import 'es6-symbol/polyfill'
import includes from 'array-includes'

// To add to window
if (!window.Promise) {
  window.Promise = Promise
}
require('array.prototype.find').shim()

/** ****************START OF OBJECT ASSIGN POLY FILL***********************/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

if (typeof Object.assign !== 'function') {
  Object.assign = function(target, varArgs) { // .length of function is 2
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object')
    }

    const to = Object(target)

    for (let index = 1; index < arguments.length; index++) {
      const nextSource = arguments[index]

      if (nextSource != null) { // Skip over if undefined or null
        for (const nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey]
          }
        }
      }
    }
    return to
  };
}
/** ****************END OF OBJECT ASSIGN POLY FILL***********************/

includes.shim()
