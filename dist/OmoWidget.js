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
  }, 0); // you can play with this timeout to make it as short as possible
};

function getAppliedStyleSheet() {
  var children = document.getElementsByTagName("head")[0];
  var children_len = children.getElementsByTagName('style').length;
  var style = children.getElementsByTagName('style')[children_len - 1];
  return style;
}

function applyOverides() {
  if (document.getElementById('omolab_style_w')) {
    // var children = document.getElementsByTagName("head")[0];
    var style = getAppliedStyleSheet(); //children.getElementsByTagName('style')[1];

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
  var children = document.getElementsByTagName("head")[0]; // var children_len = children.getElementsByTagName('style').length

  var style = getAppliedStyleSheet();
  children.removeChild(style);
}

function click_me(event) {
  var check = document.getElementById('applyOverides').checked;
  check ? applyOverides() : removeOverides();
  console.log(check + ' ' + event.target);
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
exports.push([module.i, ".someclass{\n    font-family: \"Arial\";\n    font-size:8 \n}\n\n.js-widget-overlay{\n    z-index: 10001; \n    position: fixed;\n    top: 0px;\n    bottom: 0px;\n    left: 0px;\n    right: 0px;\n    opacity: 0.8;\n    width: 100%;\n    height: 40;\n    background-color:transparent;\n    border: #333;\n}\n.js-widget-dialog{\n    position: fixed;\n    z-index: 10002;\n    background: #fff;\n    left: 50%;\n    top: 0%;\n    margin: 0 0 0 -120px;\n    width: auto;\n    height: auto;\n    padding: 10px 20px;\n    border: solid 1px #333\n}\n.omoClose{\n    font-family: \"Arial\";\n    font-size:17px;\n    cursor: pointer;\n    background-color: red;\n    width: auto;\n    \n}\n.omoContainer{\n \n  background: rgb(150, 26, 26);\n  z-index: 10002; \n  border: solid 1px #333 ;\n  width: 100%;\n  height: auto;\n  top: 0;\n  left: 0;\n \n\n}\n.omoBox {\n    position: inherit;\n    z-index: 10002; \n    background: #fff;\n    left: 10%;\n    top: 10%;\n    /* overflow-y: scroll; */\n    height: auto;\n    margin: 0 0 5 5px;\n    width: auto;\n    padding: 10px 20px;\n    border: solid 1px #333 ;\n    font-family: \"Arial\";\n    font-size:17px;\n    \n    \n    \n}\n.omoBox .button {\n    font-family: \"Font Awesome 5 Free\";\n\tfont-style: normal;\n\tfont-weight: 400;\n\tfont-display: auto;\n}", ""]);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzQ3YmI0YTZhM2FmNzQyZmQxYzYiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzP2IwOTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsic3VwcG9ydGVkQVBJIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyYXRpb25zIiwic29tZURlZmF1bHRDb25maWd1cmF0aW9uIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiYXBpSGFuZGxlciIsInJvb3QiLCJkb2N1bWVudCIsImNoaWxkcmVuIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwic2hvdyIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5IiwicGluZyIsIk9NT0xBQl9CT0RZX0NMQVNTIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiaGVhZGVyU3R5bGVzIiwiZWxlbWVudHMiLCJib2R5Iiwic2V0Qm9keVRleHRTdHlsZSIsImJvZHlGb250RmFtaWx5IiwiYm9keUZvbnRTaXplIiwid2lkZ2V0U3R5bGUiLCJiYWNrR3JvdW5kQ29sb3IiLCJiZ0NvbG9yIiwic2V0SGVhZGVyU3R5bGUiLCJtYXAiLCJlbGVtZW50IiwiY3NzX2hlYWRlclN0eWxlIiwic3R5bGUiLCJoZWFkZXJGb250RmFtaWx5IiwiaGVhZGVyRm9udFNpemUiLCJzaG93X3ciLCJhZGRPbW9sYWJDbGFzc1Njb3BlVG9Cb2R5IiwiZG9jIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYWRkIiwidGV4dCIsInRlbXBvcmFyeSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJodG1sIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInB1c2giLCJhcHBlbmRDaGlsZCIsInNob3dXaWRnZXQiLCJjbG9zZUJ1dHRvbiIsImZpcnN0Q2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwib3BlbiIsIm9tb0VsZW1lbnRzIiwiQXJyYXkiLCJmcm9tIiwiZm9yRWFjaCIsIm5vZGVOYW1lIiwiY2xpY2tfbWUiLCJjaGVjayIsImNoaWxkTm9kZXMiLCJ3aWRnZXQiLCJzZXRBdHRyaWJ1dGUiLCJnZXRHZW5lcmF0ZVN0eWxlIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImhlYWRlclN0eWxlIiwiam9pbiIsImJvZHlTdHlsZSIsImZvcmNlUmVkcmF3IiwibiIsImNyZWF0ZVRleHROb2RlIiwiZGlzcCIsImRpc3BsYXkiLCJzZXRUaW1lb3V0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiZ2V0QXBwbGllZFN0eWxlU2hlZXQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNoaWxkcmVuX2xlbiIsImFwcGx5T3ZlcmlkZXMiLCJjc3MiLCJ0eXBlIiwiaWQiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsInJlbW92ZU92ZXJpZGVzIiwib21vX3N0eWxlIiwib21vX3N0eWxlX3ciLCJldmVudCIsImNoZWNrZWQiLCJ0YXJnZXQiLCJjbG9zZSIsInBvcCIsInJlbW92ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiXSwibWFwcGlu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QUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzVXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EiLCJmaWxlIjoiT21vV2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzQ3YmI0YTZhM2FmNzQyZmQxYzYiLCJpbXBvcnQgeyBwaW5nIH0gZnJvbSAnLi9zZXJ2aWNlcydcbmltcG9ydCB7IHNob3cgfSBmcm9tICcuL3ZpZXdzL21lc3NhZ2UnXG5cbmNvbnN0IHN1cHBvcnRlZEFQSSA9IFsnaW5pdCcsICdtZXNzYWdlJ107IC8vIGVubGlzdCBhbGwgbWV0aG9kcyBzdXBwb3J0ZWQgYnkgQVBJIChlLmcuIGBtdygnZXZlbnQnLCAndXNlci1sb2dpbicpO2ApXG5cbi8qKlxuICAgIFRoZSBtYWluIGVudHJ5IG9mIHRoZSBhcHBsaWNhdGlvblxuICAgICovXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgY29uc29sZS5sb2coJ0pTLVdpZGdldCBzdGFydGluZycpO1xuXG4gICAgLy8gc2V0IGRlZmF1bHQgY29uZmlndXJhdGlvbnNcbiAgICBsZXQgY29uZmlndXJhdGlvbnMgPSB7XG4gICAgICAgIHNvbWVEZWZhdWx0Q29uZmlndXJhdGlvbjogZmFsc2VcbiAgICB9O1xuXG4gICAgLy8gYWxsIG1ldGhvZHMgdGhhdCB3ZXJlIGNhbGxlZCB0aWxsIG5vdyBhbmQgc3RvcmVkIGluIHF1ZXVlXG4gICAgLy8gbmVlZHMgdG8gYmUgY2FsbGVkIG5vdyBcbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snSlMtV2lkZ2V0J11dO1xuICAgIGxldCBxdWV1ZSA9IGdsb2JhbE9iamVjdC5xO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdKUy1XaWRnZXQgc3RhcnRlZCcsIGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBhcGlIYW5kbGVyKHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBvdmVycmlkZSB0ZW1wb3JhcnkgKHVudGlsIHRoZSBhcHAgbG9hZGVkKSBoYW5kbGVyXG4gICAgLy8gZm9yIHdpZGdldCdzIEFQSSBjYWxsc1xuICAgIGdsb2JhbE9iamVjdCA9IGFwaUhhbmRsZXI7XG4gICAgZ2xvYmFsT2JqZWN0LmNvbmZpZ3VyYXRpb25zID0gY29uZmlndXJhdGlvbnM7XG4gICAgdmFyIHJvb3QgPSB3aW5kb3cuZG9jdW1lbnQuY2hpbGRyZW47XG4gICAgY29uc29sZS5sb2cocm9vdCk7XG59XG5cbi8qKlxuICAgIE1ldGhvZCB0aGF0IGhhbmRsZXMgYWxsIEFQSSBjYWxsc1xuICAgICovXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGFwaSwgcGFyYW1zKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YoYXBpKSA9PT0gLTEpIHRocm93IEVycm9yKGBNZXRob2QgJHthcGl9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcblxuICAgIGNvbnNvbGUubG9nKGBIYW5kbGluZyBBUEkgY2FsbCAke2FwaX1gLCBwYXJhbXMpO1xuXG4gICAgc3dpdGNoIChhcGkpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuICAgICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgICAgIHNob3cocGFyYW1zKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBoYW5kbGVyIGRlZmluZWQgZm9yICR7YXBpfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuYXBwKHdpbmRvdyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIiwiaW1wb3J0IGh0bWwgZnJvbSAnLi9tZXNzYWdlLmh0bWwnO1xuaW1wb3J0ICcuL21lc3NhZ2UuY3NzJztcblxuY29uc3QgT01PTEFCX0JPRFlfQ0xBU1MgPSBgb21vbGFiLXctYm9keS0ke0RhdGUubm93KCl9LSR7TWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTAwMCl9YDtcbmNvbnN0IGhlYWRlclN0eWxlcyA9WydoMScsJ2gyJywnaDMnLCdoNCcsJ2g1JywnaDYnXVxuXG5sZXQgZWxlbWVudHMgPSBbXTtcbmxldCBib2R5O1xuLy9UT0RPIHZpZGpldGkga2FrbyBvdm8gcmplc2l0aSBkaXYgLm9tby13aWRnZXQtY29udGFpbmVyIC5vbW9Db250YWluZXI6bm90KC5vbW9Cb3gqLC5vbW9DbG9zZSlcbi8vIGNvbnN0IHNldEhlYWRlclN0eWxlID0gKGhlYWRlckZvbnRGYW1pbHksIGhlYWRlckZvbnRTaXplKSA9PiBoZWFkZXJGb250RmFtaWx5ID8gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gaDEsIGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gaDEgKiwgYm9keSBoMiwgYm9keSBoMywgYm9keSBoNCwgYm9keSBoNSwgYm9keSBoNiB7IGZvbnQtZmFtaWx5OiR7aGVhZGVyRm9udEZhbWlseX0gIWltcG9ydGFudCA7IGZvbnQtc2l6ZToke2hlYWRlckZvbnRTaXplID8gaGVhZGVyRm9udFNpemUgOiAxMH1weCAhaW1wb3J0YW50fVxcbmAgOiAnJztcbmNvbnN0IHNldEJvZHlUZXh0U3R5bGUgPSAoYm9keUZvbnRGYW1pbHksIGJvZHlGb250U2l6ZSkgPT4gYm9keUZvbnRGYW1pbHkgPyBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSwgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBkaXYgPiAqIHsgZm9udC1mYW1pbHk6JHtib2R5Rm9udEZhbWlseX0gIWltcG9ydGFudDsgZm9udC1zaXplOiR7Ym9keUZvbnRTaXplID8gYm9keUZvbnRTaXplIDogMTB9cHggIWltcG9ydGFudH1cXG5gIDogJyc7XG5jb25zdCB3aWRnZXRTdHlsZSA9IGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdi5vbW9Cb3ggKiwgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBkaXYub21vQ2xvc2UgKiB7IGZvbnQtZmFtaWx5OiBBcmlhbCAhaW1wb3J0YW50IDsgZm9udC1zaXplOjE3cHggIWltcG9ydGFudDsgIH1cXG5gXG5jb25zdCBiYWNrR3JvdW5kQ29sb3IgPSAoYmdDb2xvcikgPT4gYmdDb2xvciA/IGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9LCBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdiA+ICogeyBiYWNrZ3JvdW5kLWNvbG9yOiR7YmdDb2xvcn0gfVxcbmAgOiAnJ1xuXG5jb25zdCBzZXRIZWFkZXJTdHlsZSA9ICgpID0+IGhlYWRlclN0eWxlcy5tYXAoZWxlbWVudCA9PmBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9ICR7ZWxlbWVudH0sIGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gJHtlbGVtZW50fSAqYCkgXG5jb25zdCBjc3NfaGVhZGVyU3R5bGUgPSAoc3R5bGUsaGVhZGVyRm9udEZhbWlseSwgaGVhZGVyRm9udFNpemUpID0+IHN0eWxlICsgYHsgZm9udC1mYW1pbHk6JHtoZWFkZXJGb250RmFtaWx5fSAhaW1wb3J0YW50IDsgZm9udC1zaXplOiR7aGVhZGVyRm9udFNpemUgPyBoZWFkZXJGb250U2l6ZSA6IDEwfXB4ICFpbXBvcnRhbnR9XFxuYCAgIFxuXG52YXIgc2hvd193O1xuXG5cbmZ1bmN0aW9uIGFkZE9tb2xhYkNsYXNzU2NvcGVUb0JvZHkoZG9jKXtcbiAgICBjb25zdCBib2R5ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBpZiAoYm9keSAmJiAhYm9keS5jbGFzc0xpc3QuY29udGFpbnMoT01PTEFCX0JPRFlfQ0xBU1MpKXtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKE9NT0xBQl9CT0RZX0NMQVNTKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93KHRleHQpIHtcbiAgICAvLyBjb252ZXJ0IHBsYWluIEhUTUwgc3RyaW5nIGludG8gRE9NIGVsZW1lbnRzc1xuICAgIGxldCB0ZW1wb3JhcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZW1wb3JhcnkuaW5uZXJIVE1MID0gaHRtbDtcbiAgICBjb25zb2xlLmxvZyh0ZXh0KTtcbiAgICAvLyB0ZW1wb3JhcnkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtd2lkZ2V0LWRpYWxvZycpWzBdLmlubmVySFRNTD1odG1sXG5cbiAgICAgYWRkT21vbGFiQ2xhc3NTY29wZVRvQm9keShkb2N1bWVudCk7XG4gICAgLy8gYXBwZW5kIGVsZW1lbnRzIHRvIGJvZHlcbiAgICBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vLXdpZGdldC1jb250YWluZXInKVswXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKHRlbXBvcmFyeS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVsZW1lbnRzLnB1c2godGVtcG9yYXJ5LmNoaWxkcmVuWzBdKTtcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh0ZW1wb3JhcnkuY2hpbGRyZW5bMF0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZW1wb3JhcnkuY2hpbGRyZW5bMF0pXG5cbiAgICB9XG4gICAgc2hvd193ID0gc2hvd1dpZGdldCgpO1xuICAgIHZhciBjbG9zZUJ1dHRvbiA9IGJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vQ2xvc2UnKVswXS5maXJzdENoaWxkO1xuICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93X3cub3Blbik7XG4gICAgXG4gICAgdmFyIG9tb0VsZW1lbnRzID0gQXJyYXkuZnJvbShib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29tb0VsZW1lbnRzJylbMF0uY2hpbGRyZW4pXG4gICAgb21vRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZWxlbWVudC5ub2RlTmFtZSk7XG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnKSBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgY2xpY2tfbWUpO1xuICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ1NFTEVDVCcpIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBjbGlja19tZSk7XG4gICAgICAgIFxuICAgIH0pO1xuICAgIC8vIGNvbnNvbGUubG9nKGNvbGxvclBpY2tlci52YWx1ZSk7XG5cbiAgICB2YXIgY2hlY2sgPSBib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29tb0NvbnRyb2wnKVswXS5jaGlsZE5vZGVzWzFdXG4gICAgY29uc29sZS5sb2coY2hlY2spO1xuICAgIC8vIGNvbnNvbGUubG9nKGNvbGxvclBpY2tlci5pbm5lckhUTUwpO1xuICAgIGNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNsaWNrX21lKTtcblxufVxuXG5cblxuXG5mdW5jdGlvbiBzaG93V2lkZ2V0KCl7XG4gICBsZXQgb3BlbiA9IHRydWU7XG4gICB2YXIgd2lkZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vQm94JylbMF07XG4gICByZXR1cm4ge1xuICAgICAgIG9wZW46ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgaWYob3Blbil7XG4gICAgICAgICAgICAvLyAgICBhbGVydChcImNsb3Npbmcgd2lkZ2V0XCIpO1xuICAgICAgICAgICAgICAgd2lkZ2V0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCdkaXNwbGF5Om5vbmUnKVxuICAgICAgICAgICAgICAgb3Blbj1mYWxzZTtcbiAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyAgICBhbGVydChcInNob3dpbmcgd2lkZ2V0XCIpXG4gICAgICAgICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsJ2Rpc3BsYXk6YmxvY2snKVxuICAgICAgICAgICAgICAgb3BlbiA9IHRydWU7XG4gICAgICAgICAgIH1cbiAgICAgICB9XG4gICB9XG59XG5cblxuXG5mdW5jdGlvbiBnZXRHZW5lcmF0ZVN0eWxlKCkge1xuICAgIHZhciBiZ0NvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JnQ29sb3InKS52YWx1ZVxuICAgIHZhciBoZWFkZXJGb250U2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoc2l6ZScpLnZhbHVlO1xuICAgIHZhciBoZWFkZXJGb250RmFtaWx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcl9mZicpLnZhbHVlXG4gICAgdmFyIGJvZHlGb250U2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdic2l6ZScpLnZhbHVlO1xuICAgIHZhciBib2R5Rm9udEZhbWlseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5X2ZmJykudmFsdWVcblxuICAgIHZhciBzdHlsZSA9IGJhY2tHcm91bmRDb2xvcihiZ0NvbG9yKVxuICAgIHZhciBoZWFkZXJTdHlsZSA9IGNzc19oZWFkZXJTdHlsZShzZXRIZWFkZXJTdHlsZSgpLmpvaW4oJywnKSxoZWFkZXJGb250RmFtaWx5LGhlYWRlckZvbnRTaXplKTtcbiAgICB2YXIgYm9keVN0eWxlID0gc2V0Qm9keVRleHRTdHlsZShib2R5Rm9udEZhbWlseSwgYm9keUZvbnRTaXplKTtcbiAgICBjb25zb2xlLmxvZyhoZWFkZXJTdHlsZSk7XG4gICAgc3R5bGUgKz0gaGVhZGVyU3R5bGU7XG4gICAgXG4gICAgc3R5bGUgKz0gd2lkZ2V0U3R5bGU7XG4gICAgc3R5bGUgKz0gYm9keVN0eWxlO1xuICAgIHJldHVybiBzdHlsZTtcbn1cblxudmFyIGZvcmNlUmVkcmF3ID0gZnVuY3Rpb24oZWxlbWVudCl7XG5cbiAgICBpZiAoIWVsZW1lbnQpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgbiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJyk7XG4gICAgdmFyIGRpc3AgPSBlbGVtZW50LnN0eWxlLmRpc3BsYXk7ICAvLyBkb24ndCB3b3JyeSBhYm91dCBwcmV2aW91cyBkaXNwbGF5IHN0eWxlXG5cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKG4pO1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcDtcbiAgICAgICAgbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pO1xuICAgIH0sMCk7IC8vIHlvdSBjYW4gcGxheSB3aXRoIHRoaXMgdGltZW91dCB0byBtYWtlIGl0IGFzIHNob3J0IGFzIHBvc3NpYmxlXG59XG5cbmZ1bmN0aW9uIGdldEFwcGxpZWRTdHlsZVNoZWV0KCl7XG4gICAgdmFyIGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuICAgIHZhciBjaGlsZHJlbl9sZW4gPSBjaGlsZHJlbi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3R5bGUnKS5sZW5ndGhcbiAgICB2YXIgc3R5bGUgPSBjaGlsZHJlbi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3R5bGUnKVtjaGlsZHJlbl9sZW4tMV07XG4gICAgcmV0dXJuIHN0eWxlO1xufVxuXG5cbmZ1bmN0aW9uIGFwcGx5T3ZlcmlkZXMoKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29tb2xhYl9zdHlsZV93JykpIHtcbiAgICAgICAgLy8gdmFyIGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuICAgICAgICB2YXIgc3R5bGUgPSBnZXRBcHBsaWVkU3R5bGVTaGVldCgpOy8vY2hpbGRyZW4uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0eWxlJylbMV07XG4gICAgICAgIHN0eWxlLmlubmVySFRNTCA9IGdldEdlbmVyYXRlU3R5bGUoKTtcbiAgICAgICAgZm9yY2VSZWRyYXcoc3R5bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBjc3MudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgIGNzcy5pZCA9ICdvbW9sYWJfc3R5bGVfdydcblxuICAgICAgICB2YXIgc3R5bGUgPSBnZXRHZW5lcmF0ZVN0eWxlKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHN0eWxlKTtcblxuICAgICAgICBpZiAoY3NzLnN0eWxlU2hlZXQpXG4gICAgICAgICAgICBjc3Muc3R5bGVTaGVldC5jc3NUZXh0ID0gc3R5bGVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY3NzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0eWxlKSk7XG5cbiAgICAgICAgLyogQXBwZW5kIHN0eWxlIHRvIHRoZSB0YWcgbmFtZSAqL1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoY3NzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJhcHBseSBvdmVyaWRlc1xcblwiICsgc3R5bGUpO1xuICAgIH1cbiAgICBcblxufVxuXG5mdW5jdGlvbiByZW1vdmVPdmVyaWRlcygpIHtcbiAgICB2YXIgb21vX3N0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29tb2xhYl9zdHlsZScpO1xuICAgIHZhciBvbW9fc3R5bGVfdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvbW9sYWJfc3R5bGVfdycpO1xuICAgIHZhciBjaGlsZHJlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiAgICAvLyB2YXIgY2hpbGRyZW5fbGVuID0gY2hpbGRyZW4uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0eWxlJykubGVuZ3RoXG4gICAgdmFyIHN0eWxlID0gZ2V0QXBwbGllZFN0eWxlU2hlZXQoKVxuICAgIGNoaWxkcmVuLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGlja19tZShldmVudCkge1xuICAgXG4gICAgdmFyIGNoZWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcGx5T3ZlcmlkZXMnKS5jaGVja2VkO1xuICAgIGNoZWNrID8gYXBwbHlPdmVyaWRlcygpIDogcmVtb3ZlT3ZlcmlkZXMoKVxuICAgIGNvbnNvbGUubG9nKGNoZWNrICsgJyAnICsgZXZlbnQudGFyZ2V0KTtcblxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICB3aGlsZSAoZWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBlbGVtZW50cy5wb3AoKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvbWVzc2FnZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCI8IS0tIDxkaXYgY2xhc3M9XFxcImpzLXdpZGdldC1vdmVybGF5XFxcIj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJqcy13aWRnZXQtZGlhbG9nXFxcIj48L2Rpdj4gLS0+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm9tb0NvbnRhaW5lclxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvbW9DbG9zZVxcXCIgc3R5bGU9XFxcImZsb2F0OnJpZ2h0O1xcXCI+PGRpdj5YPC9kaXY+PC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvbW9Cb3hcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvbW9FbGVtZW50c1xcXCI+XFxuICAgICAgICAgICAgPGxhYmVsPkJhY2tncm91bmQgY29sbG9yIDwvbGFiZWw+PGlucHV0IHR5cGU9XFxcImNvbG9yXFxcIiBpZD1cXFwiYmdDb2xvclxcXCIgbmFtZT1cXFwiaGVhZFxcXCIgdmFsdWU9XFxcIiNlNjY0NjVcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD5IZWFkZXI8L2xhYmVsPiBcXG4gICAgICAgICAgICA8c2VsZWN0IGlkPVxcXCJoZWFkZXJfZmZcXFwiPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJHZW9yZ2lhXFxcIj5HZW9yZ2lhPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkFyaWFsXFxcIj5BcmlhbDwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJSb2JvdG9cXFwiPlJvYm90bzwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJDb3VyaWVyXFxcIj5Db3VyaWVyPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkNvbWljIFNhbnMgTVNcXFwiPkNvbWljIFNhbnMgTVM8L29wdGlvbj5cXG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgaWQ9XFxcImhzaXplXFxcIiBtaW49XFxcIjEwXFxcIiBtYXg9XFxcIjM1XFxcIj5cXG4gICAgICAgICAgICA8bGFiZWw+Qm9keTwvbGFiZWw+XFxuICAgICAgICAgICAgPHNlbGVjdCBpZD1cXFwiYm9keV9mZlxcXCI+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkdlb3JnaWFcXFwiPkdlb3JnaWE8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQXJpYWxcXFwiPkFyaWFsPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlJvYm90b1xcXCI+Um9ib3RvPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkNvdXJpZXJcXFwiPkNvdXJpZXI8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQ29taWMgU2FucyBNU1xcXCI+Q29taWMgU2FucyBNUzwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBpZD1cXFwiYnNpemVcXFwiIG1pbj1cXFwiMTBcXFwiIG1heD1cXFwiMzVcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwib21vQ29udHJvbFxcXCI+XFxuICAgICAgICAgICAgSWduaXRlOjxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCIgaWQ9XFxcImFwcGx5T3ZlcmlkZXNcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIFxcbiAgICAgIFxcbiAgICAgIDwvZGl2PlxcblxcblxcbiAgICBcXG5cXG5cXG5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy92aWV3cy9tZXNzYWdlLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVzc2FnZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVzc2FnZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVzc2FnZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnNvbWVjbGFzc3tcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJBcmlhbFxcXCI7XFxuICAgIGZvbnQtc2l6ZTo4IFxcbn1cXG5cXG4uanMtd2lkZ2V0LW92ZXJsYXl7XFxuICAgIHotaW5kZXg6IDEwMDAxOyBcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDBweDtcXG4gICAgYm90dG9tOiAwcHg7XFxuICAgIGxlZnQ6IDBweDtcXG4gICAgcmlnaHQ6IDBweDtcXG4gICAgb3BhY2l0eTogMC44O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiA0MDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiAjMzMzO1xcbn1cXG4uanMtd2lkZ2V0LWRpYWxvZ3tcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB6LWluZGV4OiAxMDAwMjtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0b3A6IDAlO1xcbiAgICBtYXJnaW46IDAgMCAwIC0xMjBweDtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMzMzXFxufVxcbi5vbW9DbG9zZXtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJBcmlhbFxcXCI7XFxuICAgIGZvbnQtc2l6ZToxN3B4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIFxcbn1cXG4ub21vQ29udGFpbmVye1xcbiBcXG4gIGJhY2tncm91bmQ6IHJnYigxNTAsIDI2LCAyNik7XFxuICB6LWluZGV4OiAxMDAwMjsgXFxuICBib3JkZXI6IHNvbGlkIDFweCAjMzMzIDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gXFxuXFxufVxcbi5vbW9Cb3gge1xcbiAgICBwb3NpdGlvbjogaW5oZXJpdDtcXG4gICAgei1pbmRleDogMTAwMDI7IFxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBsZWZ0OiAxMCU7XFxuICAgIHRvcDogMTAlO1xcbiAgICAvKiBvdmVyZmxvdy15OiBzY3JvbGw7ICovXFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgbWFyZ2luOiAwIDAgNSA1cHg7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMzMzMgO1xcbiAgICBmb250LWZhbWlseTogXFxcIkFyaWFsXFxcIjtcXG4gICAgZm9udC1zaXplOjE3cHg7XFxuICAgIFxcbiAgICBcXG4gICAgXFxufVxcbi5vbW9Cb3ggLmJ1dHRvbiB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiRm9udCBBd2Vzb21lIDUgRnJlZVxcXCI7XFxuXFx0Zm9udC1zdHlsZTogbm9ybWFsO1xcblxcdGZvbnQtd2VpZ2h0OiA0MDA7XFxuXFx0Zm9udC1kaXNwbGF5OiBhdXRvO1xcbn1cIiwgXCJcIl0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NyYy92aWV3cy9tZXNzYWdlLmNzc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIntcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gbW9kdWxlc1tfaV07IC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcbiAgICAgIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG4gICAgICAvLyB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG4gICAgICAvLyBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cbiAgICAgIGlmIChpdGVtWzBdID09IG51bGwgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiKFwiLmNvbmNhdChpdGVtWzJdLCBcIikgYW5kIChcIikuY29uY2F0KG1lZGlhUXVlcnksIFwiKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290KS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9