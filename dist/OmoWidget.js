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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTE5OTBlM2UzODIyZjgyYzlmYTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzP2IwOTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsic3VwcG9ydGVkQVBJIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyYXRpb25zIiwic29tZURlZmF1bHRDb25maWd1cmF0aW9uIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiYXBpSGFuZGxlciIsInJvb3QiLCJkb2N1bWVudCIsImNoaWxkcmVuIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwic2hvdyIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5IiwicGluZyIsIk9NT0xBQl9CT0RZX0NMQVNTIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiaGVhZGVyU3R5bGVzIiwiZWxlbWVudHMiLCJib2R5Iiwic2V0Qm9keVRleHRTdHlsZSIsImJvZHlGb250RmFtaWx5IiwiYm9keUZvbnRTaXplIiwid2lkZ2V0U3R5bGUiLCJiYWNrR3JvdW5kQ29sb3IiLCJiZ0NvbG9yIiwic2V0SGVhZGVyU3R5bGUiLCJtYXAiLCJlbGVtZW50IiwiY3NzX2hlYWRlclN0eWxlIiwic3R5bGUiLCJoZWFkZXJGb250RmFtaWx5IiwiaGVhZGVyRm9udFNpemUiLCJzaG93X3ciLCJhZGRPbW9sYWJDbGFzc1Njb3BlVG9Cb2R5IiwiZG9jIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYWRkIiwidGV4dCIsInRlbXBvcmFyeSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJodG1sIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInB1c2giLCJhcHBlbmRDaGlsZCIsInNob3dXaWRnZXQiLCJjbG9zZUJ1dHRvbiIsImZpcnN0Q2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwib3BlbiIsIm9tb0VsZW1lbnRzIiwiQXJyYXkiLCJmcm9tIiwiZm9yRWFjaCIsIm5vZGVOYW1lIiwiY2xpY2tfbWUiLCJjaGVjayIsImNoaWxkTm9kZXMiLCJ3aWRnZXQiLCJzZXRBdHRyaWJ1dGUiLCJnZXRHZW5lcmF0ZVN0eWxlIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImhlYWRlclN0eWxlIiwiam9pbiIsImJvZHlTdHlsZSIsImZvcmNlUmVkcmF3IiwibiIsImNyZWF0ZVRleHROb2RlIiwiZGlzcCIsImRpc3BsYXkiLCJzZXRUaW1lb3V0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiZ2V0QXBwbGllZFN0eWxlU2hlZXQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNoaWxkcmVuX2xlbiIsImFwcGx5T3ZlcmlkZXMiLCJjc3MiLCJ0eXBlIiwiaWQiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsInJlbW92ZU92ZXJpZGVzIiwib21vX3N0eWxlIiwib21vX3N0eWxlX3ciLCJldmVudCIsImNoZWNrZWQiLCJ0YXJnZXQiLCJjbG9zZSIsInBvcCIsInJlbW92ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiXSwibWFwcGlu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RTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJPbW9XaWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhMTk5MGUzZTM4MjJmODJjOWZhOCIsImltcG9ydCB7IHBpbmcgfSBmcm9tICcuL3NlcnZpY2VzJ1xuaW1wb3J0IHsgc2hvdyB9IGZyb20gJy4vdmlld3MvbWVzc2FnZSdcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydpbml0JywgJ21lc3NhZ2UnXTsgLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcblxuLyoqXG4gICAgVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gICAgKi9cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICBjb25zb2xlLmxvZygnSlMtV2lkZ2V0IHN0YXJ0aW5nJyk7XG5cbiAgICAvLyBzZXQgZGVmYXVsdCBjb25maWd1cmF0aW9uc1xuICAgIGxldCBjb25maWd1cmF0aW9ucyA9IHtcbiAgICAgICAgc29tZURlZmF1bHRDb25maWd1cmF0aW9uOiBmYWxzZVxuICAgIH07XG5cbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93IFxuICAgIGxldCBnbG9iYWxPYmplY3QgPSB3aW5kb3dbd2luZG93WydKUy1XaWRnZXQnXV07XG4gICAgbGV0IHF1ZXVlID0gZ2xvYmFsT2JqZWN0LnE7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0pTLVdpZGdldCBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIocXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbiAgICB2YXIgcm9vdCA9IHdpbmRvdy5kb2N1bWVudC5jaGlsZHJlbjtcbiAgICBjb25zb2xlLmxvZyhyb290KTtcbn1cblxuLyoqXG4gICAgTWV0aG9kIHRoYXQgaGFuZGxlcyBhbGwgQVBJIGNhbGxzXG4gICAgKi9cbmZ1bmN0aW9uIGFwaUhhbmRsZXIoYXBpLCBwYXJhbXMpIHtcbiAgICBpZiAoIWFwaSkgdGhyb3cgRXJyb3IoJ0FQSSBtZXRob2QgcmVxdWlyZWQnKTtcbiAgICBhcGkgPSBhcGkudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihhcGkpID09PSAtMSkgdGhyb3cgRXJyb3IoYE1ldGhvZCAke2FwaX0gaXMgbm90IHN1cHBvcnRlZGApO1xuXG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG5cbiAgICBzd2l0Y2ggKGFwaSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgQVBJIGltcGxlbWVudGF0aW9uXG4gICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICAgICAgc2hvdyhwYXJhbXMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIGhhbmRsZXIgZGVmaW5lZCBmb3IgJHthcGl9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKVxuICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5hcHAod2luZG93KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiLCJpbXBvcnQgaHRtbCBmcm9tICcuL21lc3NhZ2UuaHRtbCc7XG5pbXBvcnQgJy4vbWVzc2FnZS5jc3MnO1xuXG5jb25zdCBPTU9MQUJfQk9EWV9DTEFTUyA9IGBvbW9sYWItdy1ib2R5LSR7RGF0ZS5ub3coKX0tJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSoxMDAwKX1gO1xuY29uc3QgaGVhZGVyU3R5bGVzID1bJ2gxJywnaDInLCdoMycsJ2g0JywnaDUnLCdoNiddXG5cbmxldCBlbGVtZW50cyA9IFtdO1xubGV0IGJvZHk7XG4vL1RPRE8gdmlkamV0aSBrYWtvIG92byByamVzaXRpIGRpdiAub21vLXdpZGdldC1jb250YWluZXIgLm9tb0NvbnRhaW5lcjpub3QoLm9tb0JveCosLm9tb0Nsb3NlKVxuLy8gY29uc3Qgc2V0SGVhZGVyU3R5bGUgPSAoaGVhZGVyRm9udEZhbWlseSwgaGVhZGVyRm9udFNpemUpID0+IGhlYWRlckZvbnRGYW1pbHkgPyBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBoMSwgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBoMSAqLCBib2R5IGgyLCBib2R5IGgzLCBib2R5IGg0LCBib2R5IGg1LCBib2R5IGg2IHsgZm9udC1mYW1pbHk6JHtoZWFkZXJGb250RmFtaWx5fSAhaW1wb3J0YW50IDsgZm9udC1zaXplOiR7aGVhZGVyRm9udFNpemUgPyBoZWFkZXJGb250U2l6ZSA6IDEwfXB4ICFpbXBvcnRhbnR9XFxuYCA6ICcnO1xuY29uc3Qgc2V0Qm9keVRleHRTdHlsZSA9IChib2R5Rm9udEZhbWlseSwgYm9keUZvbnRTaXplKSA9PiBib2R5Rm9udEZhbWlseSA/IGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9LCBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdiA+ICogeyBmb250LWZhbWlseToke2JvZHlGb250RmFtaWx5fSAhaW1wb3J0YW50OyBmb250LXNpemU6JHtib2R5Rm9udFNpemUgPyBib2R5Rm9udFNpemUgOiAxMH1weCAhaW1wb3J0YW50fVxcbmAgOiAnJztcbmNvbnN0IHdpZGdldFN0eWxlID0gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2Lm9tb0JveCAqLCBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdi5vbW9DbG9zZSAqIHsgZm9udC1mYW1pbHk6IEFyaWFsICFpbXBvcnRhbnQgOyBmb250LXNpemU6MTdweCAhaW1wb3J0YW50OyAgfVxcbmBcbmNvbnN0IGJhY2tHcm91bmRDb2xvciA9IChiZ0NvbG9yKSA9PiBiZ0NvbG9yID8gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30sIGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2ID4gKiB7IGJhY2tncm91bmQtY29sb3I6JHtiZ0NvbG9yfSB9XFxuYCA6ICcnXG5cbmNvbnN0IHNldEhlYWRlclN0eWxlID0gKCkgPT4gaGVhZGVyU3R5bGVzLm1hcChlbGVtZW50ID0+YGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gJHtlbGVtZW50fSwgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSAke2VsZW1lbnR9ICpgKSBcbmNvbnN0IGNzc19oZWFkZXJTdHlsZSA9IChzdHlsZSxoZWFkZXJGb250RmFtaWx5LCBoZWFkZXJGb250U2l6ZSkgPT4gc3R5bGUgKyBgeyBmb250LWZhbWlseToke2hlYWRlckZvbnRGYW1pbHl9ICFpbXBvcnRhbnQgOyBmb250LXNpemU6JHtoZWFkZXJGb250U2l6ZSA/IGhlYWRlckZvbnRTaXplIDogMTB9cHggIWltcG9ydGFudH1cXG5gICAgXG5cbnZhciBzaG93X3c7XG5cblxuZnVuY3Rpb24gYWRkT21vbGFiQ2xhc3NTY29wZVRvQm9keShkb2Mpe1xuICAgIGNvbnN0IGJvZHkgPSBkb2MucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGlmIChib2R5ICYmICFib2R5LmNsYXNzTGlzdC5jb250YWlucyhPTU9MQUJfQk9EWV9DTEFTUykpe1xuICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoT01PTEFCX0JPRFlfQ0xBU1MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3codGV4dCkge1xuICAgIC8vIGNvbnZlcnQgcGxhaW4gSFRNTCBzdHJpbmcgaW50byBET00gZWxlbWVudHNzXG4gICAgbGV0IHRlbXBvcmFyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRlbXBvcmFyeS5pbm5lckhUTUwgPSBodG1sO1xuICAgIGNvbnNvbGUubG9nKHRleHQpO1xuICAgIC8vIHRlbXBvcmFyeS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy13aWRnZXQtZGlhbG9nJylbMF0uaW5uZXJIVE1MPWh0bWxcblxuICAgICBhZGRPbW9sYWJDbGFzc1Njb3BlVG9Cb2R5KGRvY3VtZW50KTtcbiAgICAvLyBhcHBlbmQgZWxlbWVudHMgdG8gYm9keVxuICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW8td2lkZ2V0LWNvbnRhaW5lcicpWzBdO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAodGVtcG9yYXJ5LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZWxlbWVudHMucHVzaCh0ZW1wb3JhcnkuY2hpbGRyZW5bMF0pO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRlbXBvcmFyeS5jaGlsZHJlblswXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRlbXBvcmFyeS5jaGlsZHJlblswXSlcblxuICAgIH1cbiAgICBzaG93X3cgPSBzaG93V2lkZ2V0KCk7XG4gICAgdmFyIGNsb3NlQnV0dG9uID0gYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW9DbG9zZScpWzBdLmZpcnN0Q2hpbGQ7XG4gICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dfdy5vcGVuKTtcbiAgICBcbiAgICB2YXIgb21vRWxlbWVudHMgPSBBcnJheS5mcm9tKGJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vRWxlbWVudHMnKVswXS5jaGlsZHJlbilcbiAgICBvbW9FbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50Lm5vZGVOYW1lKTtcbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcpIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBjbGlja19tZSk7XG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnU0VMRUNUJykgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGNsaWNrX21lKTtcbiAgICAgICAgXG4gICAgfSk7XG4gICAgLy8gY29uc29sZS5sb2coY29sbG9yUGlja2VyLnZhbHVlKTtcblxuICAgIHZhciBjaGVjayA9IGJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vQ29udHJvbCcpWzBdLmNoaWxkTm9kZXNbMV1cbiAgICBjb25zb2xlLmxvZyhjaGVjayk7XG4gICAgLy8gY29uc29sZS5sb2coY29sbG9yUGlja2VyLmlubmVySFRNTCk7XG4gICAgY2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2xpY2tfbWUpO1xuXG59XG5cblxuXG5cbmZ1bmN0aW9uIHNob3dXaWRnZXQoKXtcbiAgIGxldCBvcGVuID0gdHJ1ZTtcbiAgIHZhciB3aWRnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW9Cb3gnKVswXTtcbiAgIHJldHVybiB7XG4gICAgICAgb3BlbjpmdW5jdGlvbigpe1xuICAgICAgICAgICBpZihvcGVuKXtcbiAgICAgICAgICAgIC8vICAgIGFsZXJ0KFwiY2xvc2luZyB3aWRnZXRcIik7XG4gICAgICAgICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsJ2Rpc3BsYXk6bm9uZScpXG4gICAgICAgICAgICAgICBvcGVuPWZhbHNlO1xuICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vICAgIGFsZXJ0KFwic2hvd2luZyB3aWRnZXRcIilcbiAgICAgICAgICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnZGlzcGxheTpibG9jaycpXG4gICAgICAgICAgICAgICBvcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgfVxuICAgICAgIH1cbiAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGdldEdlbmVyYXRlU3R5bGUoKSB7XG4gICAgdmFyIGJnQ29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmdDb2xvcicpLnZhbHVlXG4gICAgdmFyIGhlYWRlckZvbnRTaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hzaXplJykudmFsdWU7XG4gICAgdmFyIGhlYWRlckZvbnRGYW1pbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyX2ZmJykudmFsdWVcbiAgICB2YXIgYm9keUZvbnRTaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JzaXplJykudmFsdWU7XG4gICAgdmFyIGJvZHlGb250RmFtaWx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHlfZmYnKS52YWx1ZVxuXG4gICAgdmFyIHN0eWxlID0gYmFja0dyb3VuZENvbG9yKGJnQ29sb3IpXG4gICAgdmFyIGhlYWRlclN0eWxlID0gY3NzX2hlYWRlclN0eWxlKHNldEhlYWRlclN0eWxlKCkuam9pbignLCcpLGhlYWRlckZvbnRGYW1pbHksaGVhZGVyRm9udFNpemUpO1xuICAgIHZhciBib2R5U3R5bGUgPSBzZXRCb2R5VGV4dFN0eWxlKGJvZHlGb250RmFtaWx5LCBib2R5Rm9udFNpemUpO1xuICAgIGNvbnNvbGUubG9nKGhlYWRlclN0eWxlKTtcbiAgICBzdHlsZSArPSBoZWFkZXJTdHlsZTtcbiAgICBcbiAgICBzdHlsZSArPSB3aWRnZXRTdHlsZTtcbiAgICBzdHlsZSArPSBib2R5U3R5bGU7XG4gICAgcmV0dXJuIHN0eWxlO1xufVxuXG52YXIgZm9yY2VSZWRyYXcgPSBmdW5jdGlvbihlbGVtZW50KXtcblxuICAgIGlmICghZWxlbWVudCkgeyByZXR1cm47IH1cblxuICAgIHZhciBuID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKTtcbiAgICB2YXIgZGlzcCA9IGVsZW1lbnQuc3R5bGUuZGlzcGxheTsgIC8vIGRvbid0IHdvcnJ5IGFib3V0IHByZXZpb3VzIGRpc3BsYXkgc3R5bGVcblxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQobik7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwO1xuICAgICAgICBuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobik7XG4gICAgfSwwKTsgLy8geW91IGNhbiBwbGF5IHdpdGggdGhpcyB0aW1lb3V0IHRvIG1ha2UgaXQgYXMgc2hvcnQgYXMgcG9zc2libGVcbn1cblxuZnVuY3Rpb24gZ2V0QXBwbGllZFN0eWxlU2hlZXQoKXtcbiAgICB2YXIgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gICAgdmFyIGNoaWxkcmVuX2xlbiA9IGNoaWxkcmVuLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdHlsZScpLmxlbmd0aFxuICAgIHZhciBzdHlsZSA9IGNoaWxkcmVuLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdHlsZScpW2NoaWxkcmVuX2xlbi0xXTtcbiAgICByZXR1cm4gc3R5bGU7XG59XG5cblxuZnVuY3Rpb24gYXBwbHlPdmVyaWRlcygpIHtcblxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb21vbGFiX3N0eWxlX3cnKSkge1xuICAgICAgICAvLyB2YXIgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gICAgICAgIHZhciBzdHlsZSA9IGdldEFwcGxpZWRTdHlsZVNoZWV0KCk7Ly9jaGlsZHJlbi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3R5bGUnKVsxXTtcbiAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gZ2V0R2VuZXJhdGVTdHlsZSgpO1xuICAgICAgICBmb3JjZVJlZHJhdyhzdHlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIGNzcy50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgY3NzLmlkID0gJ29tb2xhYl9zdHlsZV93J1xuXG4gICAgICAgIHZhciBzdHlsZSA9IGdldEdlbmVyYXRlU3R5bGUoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coc3R5bGUpO1xuXG4gICAgICAgIGlmIChjc3Muc3R5bGVTaGVldClcbiAgICAgICAgICAgIGNzcy5zdHlsZVNoZWV0LmNzc1RleHQgPSBzdHlsZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjc3MuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3R5bGUpKTtcblxuICAgICAgICAvKiBBcHBlbmQgc3R5bGUgdG8gdGhlIHRhZyBuYW1lICovXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChjc3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImFwcGx5IG92ZXJpZGVzXFxuXCIgKyBzdHlsZSk7XG4gICAgfVxuICAgIFxuXG59XG5cbmZ1bmN0aW9uIHJlbW92ZU92ZXJpZGVzKCkge1xuICAgIHZhciBvbW9fc3R5bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb21vbGFiX3N0eWxlJyk7XG4gICAgdmFyIG9tb19zdHlsZV93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29tb2xhYl9zdHlsZV93Jyk7XG4gICAgdmFyIGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuICAgIC8vIHZhciBjaGlsZHJlbl9sZW4gPSBjaGlsZHJlbi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3R5bGUnKS5sZW5ndGhcbiAgICB2YXIgc3R5bGUgPSBnZXRBcHBsaWVkU3R5bGVTaGVldCgpXG4gICAgY2hpbGRyZW4ucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrX21lKGV2ZW50KSB7XG4gICBcbiAgICB2YXIgY2hlY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwbHlPdmVyaWRlcycpLmNoZWNrZWQ7XG4gICAgY2hlY2sgPyBhcHBseU92ZXJpZGVzKCkgOiByZW1vdmVPdmVyaWRlcygpXG4gICAgY29uc29sZS5sb2coY2hlY2sgKyAnICcgKyBldmVudC50YXJnZXQpO1xuXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIHdoaWxlIChlbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVsZW1lbnRzLnBvcCgpLnJlbW92ZSgpO1xuICAgIH1cbiAgICBib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2UpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9tZXNzYWdlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcIjwhLS0gPGRpdiBjbGFzcz1cXFwianMtd2lkZ2V0LW92ZXJsYXlcXFwiPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImpzLXdpZGdldC1kaWFsb2dcXFwiPjwvZGl2PiAtLT5cXG4gICAgPGRpdiBjbGFzcz1cXFwib21vQ29udGFpbmVyXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm9tb0Nsb3NlXFxcIiBzdHlsZT1cXFwiZmxvYXQ6cmlnaHQ7XFxcIj48ZGl2Plg8L2Rpdj48L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm9tb0JveFxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm9tb0VsZW1lbnRzXFxcIj5cXG4gICAgICAgICAgICA8bGFiZWw+QmFja2dyb3VuZCBjb2xsb3IgPC9sYWJlbD48aW5wdXQgdHlwZT1cXFwiY29sb3JcXFwiIGlkPVxcXCJiZ0NvbG9yXFxcIiBuYW1lPVxcXCJoZWFkXFxcIiB2YWx1ZT1cXFwiI2U2NjQ2NVxcXCI+XFxuICAgICAgICAgICAgPGxhYmVsPkhlYWRlcjwvbGFiZWw+IFxcbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XFxcImhlYWRlcl9mZlxcXCI+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkdlb3JnaWFcXFwiPkdlb3JnaWE8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQXJpYWxcXFwiPkFyaWFsPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlJvYm90b1xcXCI+Um9ib3RvPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkNvdXJpZXJcXFwiPkNvdXJpZXI8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQ29taWMgU2FucyBNU1xcXCI+Q29taWMgU2FucyBNUzwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBpZD1cXFwiaHNpemVcXFwiIG1pbj1cXFwiMTBcXFwiIG1heD1cXFwiMzVcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD5Cb2R5PC9sYWJlbD5cXG4gICAgICAgICAgICA8c2VsZWN0IGlkPVxcXCJib2R5X2ZmXFxcIj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiR2VvcmdpYVxcXCI+R2VvcmdpYTwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJBcmlhbFxcXCI+QXJpYWw8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiUm9ib3RvXFxcIj5Sb2JvdG88L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQ291cmllclxcXCI+Q291cmllcjwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJDb21pYyBTYW5zIE1TXFxcIj5Db21pYyBTYW5zIE1TPC9vcHRpb24+XFxuICAgICAgICAgICAgICA8L3NlbGVjdD5cXG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGlkPVxcXCJic2l6ZVxcXCIgbWluPVxcXCIxMFxcXCIgbWF4PVxcXCIzNVxcXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvbW9Db250cm9sXFxcIj5cXG4gICAgICAgICAgICBJZ25pdGU6PGlucHV0IHR5cGU9XFxcImNoZWNrYm94XFxcIiBpZD1cXFwiYXBwbHlPdmVyaWRlc1xcXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgXFxuICAgICAgXFxuICAgICAgPC9kaXY+XFxuXFxuXFxuICAgIFxcblxcblxcblxcblwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXdzL21lc3NhZ2UuaHRtbFxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXNzYWdlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXNzYWdlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXNzYWdlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlld3MvbWVzc2FnZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuc29tZWNsYXNze1xcbiAgICBmb250LWZhbWlseTogXFxcIkFyaWFsXFxcIjtcXG4gICAgZm9udC1zaXplOjggXFxufVxcblxcbi5qcy13aWRnZXQtb3ZlcmxheXtcXG4gICAgei1pbmRleDogMTAwMDE7IFxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogMHB4O1xcbiAgICBib3R0b206IDBweDtcXG4gICAgbGVmdDogMHB4O1xcbiAgICByaWdodDogMHB4O1xcbiAgICBvcGFjaXR5OiAwLjg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDQwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6ICMzMzM7XFxufVxcbi5qcy13aWRnZXQtZGlhbG9ne1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHotaW5kZXg6IDEwMDAyO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRvcDogMCU7XFxuICAgIG1hcmdpbjogMCAwIDAgLTEyMHB4O1xcbiAgICB3aWR0aDogYXV0bztcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMzMzNcXG59XFxuLm9tb0Nsb3Nle1xcbiAgICBmb250LWZhbWlseTogXFxcIkFyaWFsXFxcIjtcXG4gICAgZm9udC1zaXplOjE3cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbiAgICBcXG59XFxuLm9tb0NvbnRhaW5lcntcXG4gXFxuICBiYWNrZ3JvdW5kOiByZ2IoMTUwLCAyNiwgMjYpO1xcbiAgei1pbmRleDogMTAwMDI7IFxcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzMzMyA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogYXV0bztcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuIFxcblxcbn1cXG4ub21vQm94IHtcXG4gICAgcG9zaXRpb246IGluaGVyaXQ7XFxuICAgIHotaW5kZXg6IDEwMDAyOyBcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgbGVmdDogMTAlO1xcbiAgICB0b3A6IDEwJTtcXG4gICAgLyogb3ZlcmZsb3cteTogc2Nyb2xsOyAqL1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIG1hcmdpbjogMCAwIDUgNXB4O1xcbiAgICB3aWR0aDogYXV0bztcXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMzMzIDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJBcmlhbFxcXCI7XFxuICAgIGZvbnQtc2l6ZToxN3B4O1xcbiAgICBcXG4gICAgXFxuICAgIFxcbn1cXG4ub21vQm94IC5idXR0b24ge1xcbiAgICBmb250LWZhbWlseTogXFxcIkZvbnQgQXdlc29tZSA1IEZyZWVcXFwiO1xcblxcdGZvbnQtc3R5bGU6IG5vcm1hbDtcXG5cXHRmb250LXdlaWdodDogNDAwO1xcblxcdGZvbnQtZGlzcGxheTogYXV0bztcXG59XCIsIFwiXCJdKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zcmMvdmlld3MvbWVzc2FnZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCJ7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IG1vZHVsZXNbX2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIihcIi5jb25jYXQoaXRlbVsyXSwgXCIpIGFuZCAoXCIpLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIilcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcblxuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCkuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==