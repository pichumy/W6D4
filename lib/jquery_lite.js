/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n    constructor(htmlelements){\n      this.elements = htmlelements;\n    }\n    html (string){\n      if(string === undefined){\n        return this.elements[0].innerHTML;\n      }else{\n        this.elements.map((el)=>{\n          el.innerHTML = string;\n        });  \n      }\n    }\n    empty(){\n      this.elements.map(el => el.innerHTML = \"\");\n    }\n    append(input){\n      if(input instanceof Array){\n        this.elements.map(el => {\n          input.map(input_el => {\n            el.innerHTML = el.innerHTML + input_el.outerHTML;\n          });\n        });\n      }else if(input.constructor === String){\n        this.elements.map(el => {\n          el.innerHTML = el.innerHTML + input; \n        });\n      }else if (input instanceof HTMLElement){\n        this.elements.map(el => {\n          el.innerHTML = el.innerHTML + input.outerHTML;\n        });\n      }\n    }\n    \n    attr(...args){\n      if (args.length > 1){\n        let text = args[0];\n        this.elements[0].attributes[text] = args[1];\n        return args[1]; // do the setter thing\n      }else if (args.length === 1){\n        let text = args[0];\n        return this.elements[0].attributes[text];\n        // do the getter thing. this should be a hash, but we'll do that later TO:DO\n      }\n    }\n    \n    addClass(className){\n      this.elements.map(element => {\n        element.classList.add(className);\n      }); \n    }\n    \n    removeClass(className){\n      this.elements.map(element => {\n        element.classList.remove(className);\n      }); \n    }\n    \n    children() {\n      let array = [];\n      // TODO: from array so we can use concat \n      this.elements.map( el => { array.push(el.children); });\n      const allChildren = new DOMNodeCollection(array);\n      return allChildren;\n    }\n    \n    parent(){\n      let array = [];\n      this.elements.map(el => { array.push(el.parentElement);});\n      return new DOMNodeCollection(array);\n    }\n    \n    find(className){\n      let array = [];\n      this.elements.map(el => {\n        let things = el.querySelectorAll(className);\n        let thingArray = Array.from(things);\n        array = array.concat(thingArray);\n      });\n      return new DOMNodeCollection(array);\n    }\n    \n    remove(){\n      this.elements.map(el => el.remove());\n    }\n    \n    on(type, callback) {\n      this.elements.forEach( el => {\n        // el.eventCallback = callback;\n        el.addEventListener(type, callback);\n      });\n    }\n    \n    off(type) {\n      this.elements.forEach( el => {\n        el.removeEventListener(type, el.eventCallback);\n      });\n    }\n}\n\nmodule.exports = DOMNodeCollection;\n// \n// array = $l('.test-div')\n// domnode = $l(array[0])\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./lib/dom_node_collection.js\");\n\nfunction $l (arg) {\n  let funcs = [];\n  \n  if (arg instanceof HTMLElement){\n    let domnode = new DOMNodeCollection([arg]);\n    return domnode;\n  } else if (arg instanceof Function) {\n    if (document.readyState === \"complete\" || document.readyState === \"loaded\") {\n      arg();\n    } else {\n      funcs.push(arg);\n    }\n  } else {\n    const elements = document.querySelectorAll(arg);\n    let array = Array.from(elements);\n    return array; \n  } \n  document.addEventListener(\"DOMContentLoaded\", () => {\n    funcs.map( el => el());\n  });\n\n}\n\n$l.extend = function(...params){\n  let object = {}; \n  params.map(el => {\n    let keys = Object.keys(el); \n    keys.map(key => {\n      object[key] = el[key];\n    });\n  });\n  return object; \n};\n\n$l.ajax = function(options){\n  const xhr = new XMLHttpRequest();\n  const type = options.type || \"GET\";\n  xhr.open(type, options.url);\n  \n  xhr.onload = options.success(xhr.response);\n  xhr.onerror = options.error(xhr.response);\n  // type \n  // url \n  // success \n  // error\n  \n  xhr.send(options.data);\n  return new Promise(xhr.onload, xhr.onerror);\n};\n\nwindow.$l = $l;\n\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });