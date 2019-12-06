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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_message__ = __webpack_require__(2);


var supportedAPI = ['init', 'message']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
    The main entry of the application
    */

function app(window) {
  console.log('JS-Widget starting'); // set default configurations

  var configurations = {
    someDefaultConfiguration: false
  }; // all methods that were called till now and stored in queue
  // needs to be called now 

  var globalObject = window[window['JS-Widget']];
  var queue = globalObject.q;

  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i][0].toLowerCase() == 'init') {
        configurations = extendObject(configurations, queue[i][1]);
        console.log('JS-Widget started', configurations);
      } else apiHandler(queue[i][0], queue[i][1]);
    }
  } // override temporary (until the app loaded) handler
  // for widget's API calls


  globalObject = apiHandler;
  globalObject.configurations = configurations;
  var root = window.document.children;
  console.log(root);
}
/**
    Method that handles all API calls
    */


function apiHandler(api, params) {
  if (!api) throw Error('API method required');
  api = api.toLowerCase();
  if (supportedAPI.indexOf(api) === -1) throw Error("Method ".concat(api, " is not supported"));
  console.log("Handling API call ".concat(api), params);

  switch (api) {
    // TODO: add API implementation
    case 'message':
      Object(__WEBPACK_IMPORTED_MODULE_1__views_message__["a" /* show */])(params);
      break;

    default:
      console.warn("No handler defined for ".concat(api));
  }
}

function extendObject(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) a[key] = b[key];
  }

  return a;
}

app(window);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ping */
function ping() {
  return 'pong';
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = show;
/* unused harmony export click_me */
/* unused harmony export close */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__message_html__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__message_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__message_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__message_css__);


var OMOLAB_BODY_CLASS = "omolab-w-body-".concat(Date.now(), "-").concat(Math.ceil(Math.random() * 1000));
var headerStyles = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var elements = [];
var body; //TODO vidjeti kako ovo rjesiti div .omo-widget-container .omoContainer:not(.omoBox*,.omoClose)
// const setHeaderStyle = (headerFontFamily, headerFontSize) => headerFontFamily ? `body.${OMOLAB_BODY_CLASS} h1, body.${OMOLAB_BODY_CLASS} h1 *, body h2, body h3, body h4, body h5, body h6 { font-family:${headerFontFamily} !important ; font-size:${headerFontSize ? headerFontSize : 10}px !important}\n` : '';

var setBodyTextStyle = function setBodyTextStyle(bodyFontFamily, bodyFontSize) {
  return bodyFontFamily ? "body.".concat(OMOLAB_BODY_CLASS, ", body.").concat(OMOLAB_BODY_CLASS, " div > * { font-family:").concat(bodyFontFamily, " !important; font-size:").concat(bodyFontSize ? bodyFontSize : 10, "px !important}\n") : '';
};

var widgetStyle = "body.".concat(OMOLAB_BODY_CLASS, " div.omoBox *, body.").concat(OMOLAB_BODY_CLASS, " div.omoClose * { font-family: Arial !important ; font-size:17px !important;  }\n");

var backGroundColor = function backGroundColor(bgColor) {
  return bgColor ? "body.".concat(OMOLAB_BODY_CLASS, ", body.").concat(OMOLAB_BODY_CLASS, " div > * { background-color:").concat(bgColor, " }\n") : '';
};

var setHeaderStyle = function setHeaderStyle() {
  return headerStyles.map(function (element) {
    return "body.".concat(OMOLAB_BODY_CLASS, " ").concat(element, ", body.").concat(OMOLAB_BODY_CLASS, " ").concat(element, " *");
  });
};

var css_headerStyle = function css_headerStyle(style, headerFontFamily, headerFontSize) {
  return style + "{ font-family:".concat(headerFontFamily, " !important ; font-size:").concat(headerFontSize ? headerFontSize : 10, "px !important}\n");
};

var show_w;

function addOmolabClassScopeToBody(doc) {
  var body = doc.querySelector('body');

  if (body && !body.classList.contains(OMOLAB_BODY_CLASS)) {
    body.classList.add(OMOLAB_BODY_CLASS);
  }
}

function show(text) {
  // convert plain HTML string into DOM elementss
  var temporary = document.createElement('div');
  temporary.innerHTML = __WEBPACK_IMPORTED_MODULE_0__message_html___default.a;
  console.log(text); // temporary.getElementsByClassName('js-widget-dialog')[0].innerHTML=html

  addOmolabClassScopeToBody(document); // append elements to body

  body = document.getElementsByClassName('omo-widget-container')[0];
  var i = 0;

  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
    console.log(temporary.children[0]);
  }

  show_w = showWidget();
  var closeButton = body.getElementsByClassName('omoClose')[0].firstChild;
  closeButton.addEventListener("click", show_w.open);
  var omoElements = Array.from(body.getElementsByClassName('omoElements')[0].children);
  omoElements.forEach(function (element) {
    console.log(element.nodeName);
    if (element.nodeName === 'INPUT') element.addEventListener("change", click_me);
    if (element.nodeName === 'SELECT') element.addEventListener("change", click_me);
  }); // console.log(collorPicker.value);

  var check = body.getElementsByClassName('omoControl')[0].childNodes[1];
  console.log(check); // console.log(collorPicker.innerHTML);

  check.addEventListener('change', click_me);
}

function showWidget() {
  var _open = true;
  var widget = document.getElementsByClassName('omoBox')[0];
  return {
    open: function open() {
      if (_open) {
        //    alert("closing widget");
        widget.setAttribute('style', 'display:none');
        _open = false;
      } else {
        //    alert("showing widget")
        widget.setAttribute('style', 'display:block');
        _open = true;
      }
    }
  };
}

function getGenerateStyle() {
  var bgColor = document.getElementById('bgColor').value;
  var headerFontSize = document.getElementById('hsize').value;
  var headerFontFamily = document.getElementById('header_ff').value;
  var bodyFontSize = document.getElementById('bsize').value;
  var bodyFontFamily = document.getElementById('body_ff').value;
  var style = backGroundColor(bgColor);
  var headerStyle = css_headerStyle(setHeaderStyle().join(','), headerFontFamily, headerFontSize);
  var bodyStyle = setBodyTextStyle(bodyFontFamily, bodyFontSize);
  console.log(headerStyle);
  style += headerStyle;
  style += widgetStyle;
  style += bodyStyle;
  return style;
}

var forceRedraw = function forceRedraw(element) {
  if (!element) {
    return;
  }

  var n = document.createTextNode(' ');
  var disp = element.style.display; // don't worry about previous display style

  element.appendChild(n);
  element.style.display = 'none';
  setTimeout(function () {
    element.style.display = disp;
    n.parentNode.removeChild(n);
  }, 20); // you can play with this timeout to make it as short as possible
};

function applyOverides() {
  if (document.getElementById('omolab_style_w')) {
    var children = document.getElementsByTagName("head")[0];
    var style = children.getElementsByTagName('style')[1];
    style.innerHTML = getGenerateStyle();
    forceRedraw(style);
  } else {
    var css = document.createElement('style');
    css.type = 'text/css';
    css.id = 'omolab_style_w';
    var style = getGenerateStyle(); // console.log(style);

    if (css.styleSheet) css.styleSheet.cssText = style;else css.appendChild(document.createTextNode(style));
    /* Append style to the tag name */

    document.getElementsByTagName("head")[0].appendChild(css);
    console.log("apply overides\n" + style);
  }
}

function removeOverides() {
  var omo_style = document.getElementById('omolab_style');
  var omo_style_w = document.getElementById('omolab_style_w');
  var children = document.getElementsByTagName("head")[0];
  var style = children.getElementsByTagName('style')[1];
  children.removeChild(style);
}

function click_me(event) {
  var check = document.getElementById('applyOverides').checked;
  check ? applyOverides() : removeOverides();
}
function close() {
  while (elements.length > 0) {
    elements.pop().remove();
  }

  body.removeEventListener('click', close);
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"js-widget-overlay\">\n</div>\n<div class=\"js-widget-dialog\"></div> -->\n    <div class=\"omoContainer\">\n        <div class=\"omoClose\" style=\"float:right;\"><div>X</div></div>\n        <div class=\"omoBox\">\n          <div class=\"omoElements\">\n            <label>Background collor </label><input type=\"color\" id=\"bgColor\" name=\"head\" value=\"#e66465\">\n            <label>Header</label> \n            <select id=\"header_ff\">\n                <option value=\"Georgia\">Georgia</option>\n                <option value=\"Arial\">Arial</option>\n                <option value=\"Roboto\">Roboto</option>\n                <option value=\"Courier\">Courier</option>\n                <option value=\"Comic Sans MS\">Comic Sans MS</option>\n              </select>\n              <input type=\"number\" id=\"hsize\" min=\"10\" max=\"35\">\n            <label>Body</label>\n            <select id=\"body_ff\">\n                <option value=\"Georgia\">Georgia</option>\n                <option value=\"Arial\">Arial</option>\n                <option value=\"Roboto\">Roboto</option>\n                <option value=\"Courier\">Courier</option>\n                <option value=\"Comic Sans MS\">Comic Sans MS</option>\n              </select>\n              <input type=\"number\" id=\"bsize\" min=\"10\" max=\"35\">\n          </div>\n          <div class=\"omoControl\">\n            Ignite:<input type=\"checkbox\" id=\"applyOverides\">\n          </div>\n        </div>\n      \n      \n      </div>\n\n\n    \n\n\n\n";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/dist/cjs.js!./message.css", function() {
			var newContent = require("!!../../node_modules/css-loader/dist/cjs.js!./message.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// Module
exports.push([module.i, ".someclass{\n    font-family: \"Arial\";\n    font-size:8 \n}\n\n.js-widget-overlay{\n    z-index: 10001; \n    position: fixed;\n    top: 0px;\n    bottom: 0px;\n    left: 0px;\n    right: 0px;\n    opacity: 0.8;\n    width: 100%;\n    height: 40;\n    background-color:transparent;\n    border: #333;\n}\n.js-widget-dialog{\n    position: fixed;\n    z-index: 10002;\n    background: #fff;\n    left: 50%;\n    top: 0%;\n    margin: 0 0 0 -120px;\n    width: auto;\n    height: auto;\n    padding: 10px 20px;\n    border: solid 1px #333\n}\n.omoClose{\n    font-family: \"Arial\";\n    font-size:17px;\n    cursor: pointer;\n    background-color: red;\n    \n}\n.omoContainer{\n \n  background: rgb(150, 26, 26);\n  z-index: 10002; \n  border: solid 1px #333 ;\n  width: 100%;\n  height: auto;\n  top: 0;\n  left: 0;\n \n\n}\n.omoBox {\n    position: inherit;\n    z-index: 10002; \n    background: #fff;\n    left: 10%;\n    top: 10%;\n    /* overflow-y: scroll; */\n    height: auto;\n    margin: 0 0 5 5px;\n    width: auto;\n    padding: 10px 20px;\n    border: solid 1px #333 ;\n    font-family: \"Arial\";\n    font-size:17px;\n    \n    \n    \n}\n.omoBox .button {\n    font-family: \"Font Awesome 5 Free\";\n\tfont-style: normal;\n\tfont-weight: 400;\n\tfont-display: auto;\n}", ""]);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2RjMTM3M2RjOWM1YWRiYmVjYTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzP2IwOTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsic3VwcG9ydGVkQVBJIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyYXRpb25zIiwic29tZURlZmF1bHRDb25maWd1cmF0aW9uIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiYXBpSGFuZGxlciIsInJvb3QiLCJkb2N1bWVudCIsImNoaWxkcmVuIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwic2hvdyIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5IiwicGluZyIsIk9NT0xBQl9CT0RZX0NMQVNTIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiaGVhZGVyU3R5bGVzIiwiZWxlbWVudHMiLCJib2R5Iiwic2V0Qm9keVRleHRTdHlsZSIsImJvZHlGb250RmFtaWx5IiwiYm9keUZvbnRTaXplIiwid2lkZ2V0U3R5bGUiLCJiYWNrR3JvdW5kQ29sb3IiLCJiZ0NvbG9yIiwic2V0SGVhZGVyU3R5bGUiLCJtYXAiLCJlbGVtZW50IiwiY3NzX2hlYWRlclN0eWxlIiwic3R5bGUiLCJoZWFkZXJGb250RmFtaWx5IiwiaGVhZGVyRm9udFNpemUiLCJzaG93X3ciLCJhZGRPbW9sYWJDbGFzc1Njb3BlVG9Cb2R5IiwiZG9jIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYWRkIiwidGV4dCIsInRlbXBvcmFyeSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJodG1sIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInB1c2giLCJhcHBlbmRDaGlsZCIsInNob3dXaWRnZXQiLCJjbG9zZUJ1dHRvbiIsImZpcnN0Q2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwib3BlbiIsIm9tb0VsZW1lbnRzIiwiQXJyYXkiLCJmcm9tIiwiZm9yRWFjaCIsIm5vZGVOYW1lIiwiY2xpY2tfbWUiLCJjaGVjayIsImNoaWxkTm9kZXMiLCJ3aWRnZXQiLCJzZXRBdHRyaWJ1dGUiLCJnZXRHZW5lcmF0ZVN0eWxlIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImhlYWRlclN0eWxlIiwiam9pbiIsImJvZHlTdHlsZSIsImZvcmNlUmVkcmF3IiwibiIsImNyZWF0ZVRleHROb2RlIiwiZGlzcCIsImRpc3BsYXkiLCJzZXRUaW1lb3V0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiYXBwbHlPdmVyaWRlcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY3NzIiwidHlwZSIsImlkIiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJyZW1vdmVPdmVyaWRlcyIsIm9tb19zdHlsZSIsIm9tb19zdHlsZV93IiwiZXZlbnQiLCJjaGVja2VkIiwiY2xvc2UiLCJwb3AiLCJyZW1vdmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJPbW9XaWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZGMxMzczZGM5YzVhZGJiZWNhNiIsImltcG9ydCB7IHBpbmcgfSBmcm9tICcuL3NlcnZpY2VzJ1xuaW1wb3J0IHsgc2hvdyB9IGZyb20gJy4vdmlld3MvbWVzc2FnZSdcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydpbml0JywgJ21lc3NhZ2UnXTsgLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcblxuLyoqXG4gICAgVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gICAgKi9cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICBjb25zb2xlLmxvZygnSlMtV2lkZ2V0IHN0YXJ0aW5nJyk7XG5cbiAgICAvLyBzZXQgZGVmYXVsdCBjb25maWd1cmF0aW9uc1xuICAgIGxldCBjb25maWd1cmF0aW9ucyA9IHtcbiAgICAgICAgc29tZURlZmF1bHRDb25maWd1cmF0aW9uOiBmYWxzZVxuICAgIH07XG5cbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93IFxuICAgIGxldCBnbG9iYWxPYmplY3QgPSB3aW5kb3dbd2luZG93WydKUy1XaWRnZXQnXV07XG4gICAgbGV0IHF1ZXVlID0gZ2xvYmFsT2JqZWN0LnE7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0pTLVdpZGdldCBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIocXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbiAgICB2YXIgcm9vdCA9IHdpbmRvdy5kb2N1bWVudC5jaGlsZHJlbjtcbiAgICBjb25zb2xlLmxvZyhyb290KTtcbn1cblxuLyoqXG4gICAgTWV0aG9kIHRoYXQgaGFuZGxlcyBhbGwgQVBJIGNhbGxzXG4gICAgKi9cbmZ1bmN0aW9uIGFwaUhhbmRsZXIoYXBpLCBwYXJhbXMpIHtcbiAgICBpZiAoIWFwaSkgdGhyb3cgRXJyb3IoJ0FQSSBtZXRob2QgcmVxdWlyZWQnKTtcbiAgICBhcGkgPSBhcGkudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihhcGkpID09PSAtMSkgdGhyb3cgRXJyb3IoYE1ldGhvZCAke2FwaX0gaXMgbm90IHN1cHBvcnRlZGApO1xuXG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG5cbiAgICBzd2l0Y2ggKGFwaSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgQVBJIGltcGxlbWVudGF0aW9uXG4gICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICAgICAgc2hvdyhwYXJhbXMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIGhhbmRsZXIgZGVmaW5lZCBmb3IgJHthcGl9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKVxuICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5hcHAod2luZG93KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiLCJpbXBvcnQgaHRtbCBmcm9tICcuL21lc3NhZ2UuaHRtbCc7XG5pbXBvcnQgJy4vbWVzc2FnZS5jc3MnO1xuXG5jb25zdCBPTU9MQUJfQk9EWV9DTEFTUyA9IGBvbW9sYWItdy1ib2R5LSR7RGF0ZS5ub3coKX0tJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSoxMDAwKX1gO1xuY29uc3QgaGVhZGVyU3R5bGVzID1bJ2gxJywnaDInLCdoMycsJ2g0JywnaDUnLCdoNiddXG5cbmxldCBlbGVtZW50cyA9IFtdO1xubGV0IGJvZHk7XG4vL1RPRE8gdmlkamV0aSBrYWtvIG92byByamVzaXRpIGRpdiAub21vLXdpZGdldC1jb250YWluZXIgLm9tb0NvbnRhaW5lcjpub3QoLm9tb0JveCosLm9tb0Nsb3NlKVxuLy8gY29uc3Qgc2V0SGVhZGVyU3R5bGUgPSAoaGVhZGVyRm9udEZhbWlseSwgaGVhZGVyRm9udFNpemUpID0+IGhlYWRlckZvbnRGYW1pbHkgPyBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBoMSwgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBoMSAqLCBib2R5IGgyLCBib2R5IGgzLCBib2R5IGg0LCBib2R5IGg1LCBib2R5IGg2IHsgZm9udC1mYW1pbHk6JHtoZWFkZXJGb250RmFtaWx5fSAhaW1wb3J0YW50IDsgZm9udC1zaXplOiR7aGVhZGVyRm9udFNpemUgPyBoZWFkZXJGb250U2l6ZSA6IDEwfXB4ICFpbXBvcnRhbnR9XFxuYCA6ICcnO1xuY29uc3Qgc2V0Qm9keVRleHRTdHlsZSA9IChib2R5Rm9udEZhbWlseSwgYm9keUZvbnRTaXplKSA9PiBib2R5Rm9udEZhbWlseSA/IGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9LCBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdiA+ICogeyBmb250LWZhbWlseToke2JvZHlGb250RmFtaWx5fSAhaW1wb3J0YW50OyBmb250LXNpemU6JHtib2R5Rm9udFNpemUgPyBib2R5Rm9udFNpemUgOiAxMH1weCAhaW1wb3J0YW50fVxcbmAgOiAnJztcbmNvbnN0IHdpZGdldFN0eWxlID0gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2Lm9tb0JveCAqLCBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdi5vbW9DbG9zZSAqIHsgZm9udC1mYW1pbHk6IEFyaWFsICFpbXBvcnRhbnQgOyBmb250LXNpemU6MTdweCAhaW1wb3J0YW50OyAgfVxcbmBcbmNvbnN0IGJhY2tHcm91bmRDb2xvciA9IChiZ0NvbG9yKSA9PiBiZ0NvbG9yID8gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30sIGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2ID4gKiB7IGJhY2tncm91bmQtY29sb3I6JHtiZ0NvbG9yfSB9XFxuYCA6ICcnXG5cbmNvbnN0IHNldEhlYWRlclN0eWxlID0gKCkgPT4gaGVhZGVyU3R5bGVzLm1hcChlbGVtZW50ID0+YGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gJHtlbGVtZW50fSwgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSAke2VsZW1lbnR9ICpgKSBcbmNvbnN0IGNzc19oZWFkZXJTdHlsZSA9IChzdHlsZSxoZWFkZXJGb250RmFtaWx5LCBoZWFkZXJGb250U2l6ZSkgPT4gc3R5bGUgKyBgeyBmb250LWZhbWlseToke2hlYWRlckZvbnRGYW1pbHl9ICFpbXBvcnRhbnQgOyBmb250LXNpemU6JHtoZWFkZXJGb250U2l6ZSA/IGhlYWRlckZvbnRTaXplIDogMTB9cHggIWltcG9ydGFudH1cXG5gICAgXG5cbnZhciBzaG93X3c7XG5cblxuZnVuY3Rpb24gYWRkT21vbGFiQ2xhc3NTY29wZVRvQm9keShkb2Mpe1xuICAgIGNvbnN0IGJvZHkgPSBkb2MucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGlmIChib2R5ICYmICFib2R5LmNsYXNzTGlzdC5jb250YWlucyhPTU9MQUJfQk9EWV9DTEFTUykpe1xuICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoT01PTEFCX0JPRFlfQ0xBU1MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3codGV4dCkge1xuICAgIC8vIGNvbnZlcnQgcGxhaW4gSFRNTCBzdHJpbmcgaW50byBET00gZWxlbWVudHNzXG4gICAgbGV0IHRlbXBvcmFyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRlbXBvcmFyeS5pbm5lckhUTUwgPSBodG1sO1xuICAgIGNvbnNvbGUubG9nKHRleHQpO1xuICAgIC8vIHRlbXBvcmFyeS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy13aWRnZXQtZGlhbG9nJylbMF0uaW5uZXJIVE1MPWh0bWxcblxuICAgICBhZGRPbW9sYWJDbGFzc1Njb3BlVG9Cb2R5KGRvY3VtZW50KTtcbiAgICAvLyBhcHBlbmQgZWxlbWVudHMgdG8gYm9keVxuICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW8td2lkZ2V0LWNvbnRhaW5lcicpWzBdO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAodGVtcG9yYXJ5LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZWxlbWVudHMucHVzaCh0ZW1wb3JhcnkuY2hpbGRyZW5bMF0pO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRlbXBvcmFyeS5jaGlsZHJlblswXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRlbXBvcmFyeS5jaGlsZHJlblswXSlcblxuICAgIH1cbiAgICBzaG93X3cgPSBzaG93V2lkZ2V0KCk7XG4gICAgdmFyIGNsb3NlQnV0dG9uID0gYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW9DbG9zZScpWzBdLmZpcnN0Q2hpbGQ7XG4gICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dfdy5vcGVuKTtcbiAgICBcbiAgICB2YXIgb21vRWxlbWVudHMgPSBBcnJheS5mcm9tKGJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vRWxlbWVudHMnKVswXS5jaGlsZHJlbilcbiAgICBvbW9FbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50Lm5vZGVOYW1lKTtcbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcpIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBjbGlja19tZSk7XG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnU0VMRUNUJykgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGNsaWNrX21lKTtcbiAgICAgICAgXG4gICAgfSk7XG4gICAgLy8gY29uc29sZS5sb2coY29sbG9yUGlja2VyLnZhbHVlKTtcblxuICAgIHZhciBjaGVjayA9IGJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vQ29udHJvbCcpWzBdLmNoaWxkTm9kZXNbMV1cbiAgICBjb25zb2xlLmxvZyhjaGVjayk7XG4gICAgLy8gY29uc29sZS5sb2coY29sbG9yUGlja2VyLmlubmVySFRNTCk7XG4gICAgY2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2xpY2tfbWUpO1xuXG59XG5cblxuXG5cbmZ1bmN0aW9uIHNob3dXaWRnZXQoKXtcbiAgIGxldCBvcGVuID0gdHJ1ZTtcbiAgIHZhciB3aWRnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW9Cb3gnKVswXTtcbiAgIHJldHVybiB7XG4gICAgICAgb3BlbjpmdW5jdGlvbigpe1xuICAgICAgICAgICBpZihvcGVuKXtcbiAgICAgICAgICAgIC8vICAgIGFsZXJ0KFwiY2xvc2luZyB3aWRnZXRcIik7XG4gICAgICAgICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsJ2Rpc3BsYXk6bm9uZScpXG4gICAgICAgICAgICAgICBvcGVuPWZhbHNlO1xuICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vICAgIGFsZXJ0KFwic2hvd2luZyB3aWRnZXRcIilcbiAgICAgICAgICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnZGlzcGxheTpibG9jaycpXG4gICAgICAgICAgICAgICBvcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgfVxuICAgICAgIH1cbiAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGdldEdlbmVyYXRlU3R5bGUoKSB7XG4gICAgdmFyIGJnQ29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmdDb2xvcicpLnZhbHVlXG4gICAgdmFyIGhlYWRlckZvbnRTaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hzaXplJykudmFsdWU7XG4gICAgdmFyIGhlYWRlckZvbnRGYW1pbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyX2ZmJykudmFsdWVcbiAgICB2YXIgYm9keUZvbnRTaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JzaXplJykudmFsdWU7XG4gICAgdmFyIGJvZHlGb250RmFtaWx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHlfZmYnKS52YWx1ZVxuXG4gICAgdmFyIHN0eWxlID0gYmFja0dyb3VuZENvbG9yKGJnQ29sb3IpXG4gICAgdmFyIGhlYWRlclN0eWxlID0gY3NzX2hlYWRlclN0eWxlKHNldEhlYWRlclN0eWxlKCkuam9pbignLCcpLGhlYWRlckZvbnRGYW1pbHksaGVhZGVyRm9udFNpemUpO1xuICAgIHZhciBib2R5U3R5bGUgPSBzZXRCb2R5VGV4dFN0eWxlKGJvZHlGb250RmFtaWx5LCBib2R5Rm9udFNpemUpO1xuICAgIGNvbnNvbGUubG9nKGhlYWRlclN0eWxlKTtcbiAgICBzdHlsZSArPSBoZWFkZXJTdHlsZTtcbiAgICBcbiAgICBzdHlsZSArPSB3aWRnZXRTdHlsZTtcbiAgICBzdHlsZSArPSBib2R5U3R5bGU7XG4gICAgcmV0dXJuIHN0eWxlO1xufVxuXG52YXIgZm9yY2VSZWRyYXcgPSBmdW5jdGlvbihlbGVtZW50KXtcblxuICAgIGlmICghZWxlbWVudCkgeyByZXR1cm47IH1cblxuICAgIHZhciBuID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKTtcbiAgICB2YXIgZGlzcCA9IGVsZW1lbnQuc3R5bGUuZGlzcGxheTsgIC8vIGRvbid0IHdvcnJ5IGFib3V0IHByZXZpb3VzIGRpc3BsYXkgc3R5bGVcblxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQobik7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwO1xuICAgICAgICBuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobik7XG4gICAgfSwyMCk7IC8vIHlvdSBjYW4gcGxheSB3aXRoIHRoaXMgdGltZW91dCB0byBtYWtlIGl0IGFzIHNob3J0IGFzIHBvc3NpYmxlXG59XG5cblxuZnVuY3Rpb24gYXBwbHlPdmVyaWRlcygpIHtcblxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb21vbGFiX3N0eWxlX3cnKSkge1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gICAgICAgIHZhciBzdHlsZSA9IGNoaWxkcmVuLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdHlsZScpWzFdO1xuICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBnZXRHZW5lcmF0ZVN0eWxlKCk7XG4gICAgICAgIGZvcmNlUmVkcmF3KHN0eWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgY3NzLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICBjc3MuaWQgPSAnb21vbGFiX3N0eWxlX3cnXG5cbiAgICAgICAgdmFyIHN0eWxlID0gZ2V0R2VuZXJhdGVTdHlsZSgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzdHlsZSk7XG5cbiAgICAgICAgaWYgKGNzcy5zdHlsZVNoZWV0KVxuICAgICAgICAgICAgY3NzLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHN0eWxlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNzcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHlsZSkpO1xuXG4gICAgICAgIC8qIEFwcGVuZCBzdHlsZSB0byB0aGUgdGFnIG5hbWUgKi9cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGNzcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbHkgb3ZlcmlkZXNcXG5cIiArIHN0eWxlKTtcbiAgICB9XG4gICAgXG5cbn1cblxuZnVuY3Rpb24gcmVtb3ZlT3ZlcmlkZXMoKSB7XG4gICAgdmFyIG9tb19zdHlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvbW9sYWJfc3R5bGUnKTtcbiAgICB2YXIgb21vX3N0eWxlX3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb21vbGFiX3N0eWxlX3cnKTtcbiAgICB2YXIgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gICAgdmFyIHN0eWxlID0gY2hpbGRyZW4uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0eWxlJylbMV07XG4gICAgY2hpbGRyZW4ucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrX21lKGV2ZW50KSB7XG4gICAgdmFyIGNoZWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcGx5T3ZlcmlkZXMnKS5jaGVja2VkO1xuICAgIGNoZWNrID8gYXBwbHlPdmVyaWRlcygpIDogcmVtb3ZlT3ZlcmlkZXMoKVxuXG5cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgd2hpbGUgKGVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZWxlbWVudHMucG9wKCkucmVtb3ZlKCk7XG4gICAgfVxuICAgIGJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL21lc3NhZ2UuanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPCEtLSA8ZGl2IGNsYXNzPVxcXCJqcy13aWRnZXQtb3ZlcmxheVxcXCI+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwianMtd2lkZ2V0LWRpYWxvZ1xcXCI+PC9kaXY+IC0tPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJvbW9Db250YWluZXJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwib21vQ2xvc2VcXFwiIHN0eWxlPVxcXCJmbG9hdDpyaWdodDtcXFwiPjxkaXY+WDwvZGl2PjwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwib21vQm94XFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwib21vRWxlbWVudHNcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD5CYWNrZ3JvdW5kIGNvbGxvciA8L2xhYmVsPjxpbnB1dCB0eXBlPVxcXCJjb2xvclxcXCIgaWQ9XFxcImJnQ29sb3JcXFwiIG5hbWU9XFxcImhlYWRcXFwiIHZhbHVlPVxcXCIjZTY2NDY1XFxcIj5cXG4gICAgICAgICAgICA8bGFiZWw+SGVhZGVyPC9sYWJlbD4gXFxuICAgICAgICAgICAgPHNlbGVjdCBpZD1cXFwiaGVhZGVyX2ZmXFxcIj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiR2VvcmdpYVxcXCI+R2VvcmdpYTwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJBcmlhbFxcXCI+QXJpYWw8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiUm9ib3RvXFxcIj5Sb2JvdG88L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQ291cmllclxcXCI+Q291cmllcjwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJDb21pYyBTYW5zIE1TXFxcIj5Db21pYyBTYW5zIE1TPC9vcHRpb24+XFxuICAgICAgICAgICAgICA8L3NlbGVjdD5cXG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGlkPVxcXCJoc2l6ZVxcXCIgbWluPVxcXCIxMFxcXCIgbWF4PVxcXCIzNVxcXCI+XFxuICAgICAgICAgICAgPGxhYmVsPkJvZHk8L2xhYmVsPlxcbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XFxcImJvZHlfZmZcXFwiPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJHZW9yZ2lhXFxcIj5HZW9yZ2lhPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkFyaWFsXFxcIj5BcmlhbDwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJSb2JvdG9cXFwiPlJvYm90bzwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJDb3VyaWVyXFxcIj5Db3VyaWVyPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkNvbWljIFNhbnMgTVNcXFwiPkNvbWljIFNhbnMgTVM8L29wdGlvbj5cXG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgaWQ9XFxcImJzaXplXFxcIiBtaW49XFxcIjEwXFxcIiBtYXg9XFxcIjM1XFxcIj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm9tb0NvbnRyb2xcXFwiPlxcbiAgICAgICAgICAgIElnbml0ZTo8aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiIGlkPVxcXCJhcHBseU92ZXJpZGVzXFxcIj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICBcXG4gICAgICBcXG4gICAgICA8L2Rpdj5cXG5cXG5cXG4gICAgXFxuXFxuXFxuXFxuXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlld3MvbWVzc2FnZS5odG1sXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21lc3NhZ2UuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21lc3NhZ2UuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21lc3NhZ2UuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy92aWV3cy9tZXNzYWdlLmNzc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5zb21lY2xhc3N7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiQXJpYWxcXFwiO1xcbiAgICBmb250LXNpemU6OCBcXG59XFxuXFxuLmpzLXdpZGdldC1vdmVybGF5e1xcbiAgICB6LWluZGV4OiAxMDAwMTsgXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiAwcHg7XFxuICAgIGJvdHRvbTogMHB4O1xcbiAgICBsZWZ0OiAwcHg7XFxuICAgIHJpZ2h0OiAwcHg7XFxuICAgIG9wYWNpdHk6IDAuODtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogNDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlcjogIzMzMztcXG59XFxuLmpzLXdpZGdldC1kaWFsb2d7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgei1pbmRleDogMTAwMDI7XFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdG9wOiAwJTtcXG4gICAgbWFyZ2luOiAwIDAgMCAtMTIwcHg7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzMzM1xcbn1cXG4ub21vQ2xvc2V7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiQXJpYWxcXFwiO1xcbiAgICBmb250LXNpemU6MTdweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICAgIFxcbn1cXG4ub21vQ29udGFpbmVye1xcbiBcXG4gIGJhY2tncm91bmQ6IHJnYigxNTAsIDI2LCAyNik7XFxuICB6LWluZGV4OiAxMDAwMjsgXFxuICBib3JkZXI6IHNvbGlkIDFweCAjMzMzIDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gXFxuXFxufVxcbi5vbW9Cb3gge1xcbiAgICBwb3NpdGlvbjogaW5oZXJpdDtcXG4gICAgei1pbmRleDogMTAwMDI7IFxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBsZWZ0OiAxMCU7XFxuICAgIHRvcDogMTAlO1xcbiAgICAvKiBvdmVyZmxvdy15OiBzY3JvbGw7ICovXFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgbWFyZ2luOiAwIDAgNSA1cHg7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMzMzMgO1xcbiAgICBmb250LWZhbWlseTogXFxcIkFyaWFsXFxcIjtcXG4gICAgZm9udC1zaXplOjE3cHg7XFxuICAgIFxcbiAgICBcXG4gICAgXFxufVxcbi5vbW9Cb3ggLmJ1dHRvbiB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiRm9udCBBd2Vzb21lIDUgRnJlZVxcXCI7XFxuXFx0Zm9udC1zdHlsZTogbm9ybWFsO1xcblxcdGZvbnQtd2VpZ2h0OiA0MDA7XFxuXFx0Zm9udC1kaXNwbGF5OiBhdXRvO1xcbn1cIiwgXCJcIl0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NyYy92aWV3cy9tZXNzYWdlLmNzc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIntcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gbW9kdWxlc1tfaV07IC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcbiAgICAgIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG4gICAgICAvLyB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG4gICAgICAvLyBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cbiAgICAgIGlmIChpdGVtWzBdID09IG51bGwgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiKFwiLmNvbmNhdChpdGVtWzJdLCBcIikgYW5kIChcIikuY29uY2F0KG1lZGlhUXVlcnksIFwiKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290KS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9