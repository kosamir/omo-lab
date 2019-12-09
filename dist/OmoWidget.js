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
/* unused harmony export applyOmoStyles */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__message_html__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__message_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__message_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__message_css__);


var OMOLAB_BODY_CLASS = "omolab-w-body-".concat(Date.now(), "-").concat(Math.ceil(Math.random() * 1000));
/**HEADER STYLES */

var HEADER_STYLE_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

var transformHeaderStyles = function transformHeaderStyles() {
  return HEADER_STYLE_ELEMENTS.map(function (element) {
    return "body.".concat(OMOLAB_BODY_CLASS, " ").concat(element, ", body.").concat(OMOLAB_BODY_CLASS, " ").concat(element, " *");
  });
};

var setHeaderStyle = function setHeaderStyle(style, headerFontFamily, headerFontSize, headerFontSpacing, headerLineHeight) {
  return style + "{ font-family:".concat(headerFontFamily, " !important ; font-size:").concat(headerFontSize ? headerFontSize : 10, "px !important; letter-spacing:").concat(headerFontSpacing ? headerFontSpacing : 'normal', " !important; line-height:").concat(headerLineHeight ? headerLineHeight : '1.6', " !important }\n");
};
/** WIDGET STYLE */


var OMO_WIDGET_ELEMENTS = ["body.".concat(OMOLAB_BODY_CLASS, " div.omo-widget-container *") // ,
// `body.${OMOLAB_BODY_CLASS} div.omoContainer *`
// ,
// `body.${OMOLAB_BODY_CLASS} div.omoBox *`,
// `body.${OMOLAB_BODY_CLASS} div.omoClose *`,
// `body.${OMOLAB_BODY_CLASS} div.omoControl *`
];
var omoWidgetStyle = '{ font-family: Arial !important; font-size:16px !important;  letter-spacing:normal !important; line-height: 1.6 !important; background-color: #7abf43;}\n';
/** SET WIDGET STYLE */

var setOmoWidgetStyle = function setOmoWidgetStyle(omoWidgetElements, omoWidgetStyle) {
  return omoWidgetElements.join(',') + ' ' + omoWidgetStyle;
};
/** SET BODY STYLE */


var BODY_STYLE = ["body.".concat(OMOLAB_BODY_CLASS), "body.".concat(OMOLAB_BODY_CLASS, " div > *")];

var setBodyTextStyle = function setBodyTextStyle(_Style, bodyFontFamily, bodyFontSize, bodyFontSpacing, bodyLineHeight) {
  return bodyFontFamily ? _Style.join(',') + "{ font-family:".concat(bodyFontFamily, " !important; font-size:").concat(bodyFontSize ? bodyFontSize : 10, "px !important; letter-spacing:").concat(bodyFontSpacing ? bodyFontSpacing + 'px' : 'normal', " !important; line-height:").concat(bodyLineHeight ? bodyLineHeight : '1.6', " !important }\n") : '';
};
/** SET BACGROUND COLOR */


var BACKGROUND_COLOR_ELEMENTS = ["body.".concat(OMOLAB_BODY_CLASS), "body.".concat(OMOLAB_BODY_CLASS, " div > *")];

var setBackGroundColor = function setBackGroundColor(applyToElements, bgColor) {
  return bgColor ? applyToElements.join(',') + "{ background-color: ".concat(bgColor, " }\n") : '';
};

var elements = [];
var body;
var toggler;

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
    var tmp = temporary.children[0];
    elements.push(tmp);
    body.appendChild(tmp); // console.log('HTML-->'+tmp.innerHTML + tmp.childElementCount)
  }

  toggler = toogleWidget();
  var closeButton = body.getElementsByClassName('omoClose')[0];
  closeButton.addEventListener("click", toggler.toogle);
  var omoElements = Array.from(body.getElementsByClassName('omoElements')[0].children);
  omoElements.forEach(function (element) {
    console.log(element.nodeName);
    if (element.nodeName === 'INPUT') element.addEventListener("change", applyOmoStyles);
    if (element.nodeName === 'SELECT') element.addEventListener("change", applyOmoStyles);
  });
  var check = body.getElementsByClassName('omoControl')[0].childNodes[1];
  var c = document.getElementById('applyOverides');
  console.log(check === c);
  c.addEventListener('change', applyOmoStyles);
}

var toogleWidget = function toogleWidget() {
  var open = true;
  var widget = document.getElementsByClassName('omoBox')[0];
  var close = document.getElementsByClassName('omoClose')[0].firstChild;
  return {
    toogle: function toogle() {
      if (open) {
        widget.setAttribute('style', 'display:none');
        close.textContent = 'open';
        open = false;
      } else {
        widget.setAttribute('style', 'display:block');
        close.textContent = 'close';
        open = true;
      }
    }
  };
};

function generateOmoStyle() {
  var bgColor = document.getElementById('bgColor').value;
  var headerFontSize = document.getElementById('hsize').value;
  var headerFontFamily = document.getElementById('header_ff').value;
  var headerFontSpacing = document.getElementById('hspacing').value;
  var headerLineHeight = document.getElementById('hheight').value;
  var bodyFontSize = document.getElementById('bsize').value;
  var bodyFontFamily = document.getElementById('body_ff').value;
  var bodyFontSpacing = document.getElementById('bspacing').value;
  console.log(bodyFontSpacing);
  var bodyLineHeight = document.getElementById('bheight').value;
  var style = ''; //setBackGroundColor(BACKGROUND_COLOR_ELEMENTS, bgColor)

  var headerStyle = setHeaderStyle(transformHeaderStyles().join(','), headerFontFamily, headerFontSize, headerFontSpacing, headerLineHeight);
  style += headerStyle;
  var bodyStyle = setBodyTextStyle(BODY_STYLE, bodyFontFamily, bodyFontSize, bodyFontSpacing, bodyLineHeight);
  style += bodyStyle;
  var widgetStyle = setOmoWidgetStyle(OMO_WIDGET_ELEMENTS, omoWidgetStyle);
  style += widgetStyle;
  return style;
}
/** hack TODO!! */


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

function getLastAppliedStyleSheet() {
  var children = document.getElementsByTagName("head")[0];
  var children_len = children.getElementsByTagName('style').length;
  var style = children.getElementsByTagName('style')[children_len - 1];
  return style;
}

var applyOverides = function applyOverides() {
  if (document.getElementById('omolab_style_w')) {
    var style = getLastAppliedStyleSheet();
    style.innerHTML = generateOmoStyle();
    forceRedraw(style);
    return;
  }

  var css = document.createElement('style');
  css.type = 'text/css';
  css.id = 'omolab_style_w';
  var style = generateOmoStyle();
  if (css.styleSheet) css.styleSheet.cssText = style;else css.appendChild(document.createTextNode(style));
  /* Append style to the tag name */

  document.getElementsByTagName("head")[0].appendChild(css);
  console.log("apply overides\n" + style);
};

var removeOverides = function removeOverides() {
  var omo_style_w = document.getElementById('omolab_style_w');
  var children = document.getElementsByTagName("head")[0];
  var style = getLastAppliedStyleSheet();
  console.log(omo_style_w === style); // if stylesheet is applied remove it, otherwise ignore

  if (omo_style_w === style) children.removeChild(style);
};

function applyOmoStyles(event) {
  var check = document.getElementById('applyOverides').checked;
  check ? applyOverides() : removeOverides();
  console.log(check + ' ' + event.target);
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"js-widget-overlay\">\n</div>\n<div class=\"js-widget-dialog\"></div> -->\n\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <div class=\"omoContainer\">\n      <div class=\"omoClose\" id=\"omoClose\"><div>close</div></div>\n        <div class=\"omoBox\">\n          <div class=\"omoElements\">\n            <label>Background collor </label><input type=\"color\" id=\"bgColor\" name=\"head\" value=\"#e66465\">\n            <label><strong>Header</strong></label> \n            <select id=\"header_ff\">\n                <option value=\"Georgia\">Georgia</option>\n                <option value=\"Arial\">Arial</option>\n                <option value=\"Roboto\">Roboto</option>\n                <option value=\"Courier\">Courier</option>\n                <option value=\"Comic Sans MS\">Comic Sans MS</option>\n              </select>\n              <label>font size</label><input type=\"number\" id=\"hsize\" min=\"10\" max=\"35\">\n              <label>font spacing</label><input type=\"number\" id=\"hspacing\" min=\"-1\" max=\"5\" step=\"0.5\">\n              <label>line height</label><input type=\"number\" id=\"hheight\" min=\"1.6\" max=\"2\" step=\"0.1\">\n            <label><strong>Body</strong></label>\n            <select id=\"body_ff\">\n                <option value=\"Georgia\">Georgia</option>\n                <option value=\"Arial\">Arial</option>\n                <option value=\"Roboto\">Roboto</option>\n                <option value=\"Courier\">Courier</option>\n                <option value=\"Comic Sans MS\">Comic Sans MS</option>\n              </select>\n              <input type=\"number\" id=\"bsize\" min=\"10\" max=\"35\">\n              <label>font spacing</label><input type=\"number\" id=\"bspacing\" min=\"-1\" max=\"5\" step=\"0.5\">\n              <label>line height</label><input type=\"number\" id=\"bheight\" min=\"1.6\" max=\"2\" step=\"0.1\">\n          </div>\n          <div class=\"omoControl\">\n            Ignite:<input type=\"checkbox\" id=\"applyOverides\">\n          </div>\n        </div>\n      \n      \n      </div>\n\n\n    \n\n\n\n";

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
exports.push([module.i, ".someclass{\n    font-family: \"Arial\";\n    font-size:8 \n}\n\n.js-widget-overlay{\n    z-index: 10001; \n    position: fixed;\n    top: 0px;\n    bottom: 0px;\n    left: 0px;\n    right: 0px;\n    opacity: 0.8;\n    width: 100%;\n    height: 40;\n    background-color:transparent;\n    border: #333;\n}\n.js-widget-dialog{\n    position: fixed;\n    z-index: 10002;\n    background: #fff;\n    left: 50%;\n    top: 0%;\n    margin: 0 0 0 -120px;\n    width: auto;\n    height: auto;\n    padding: 10px 20px;\n    border: solid 1px #333\n}\n\n.omo-widget-container > *{\n    position: fixed;\n    display: inline-block;\n    width: 100%;\n    z-index: 1002;\n    overflow: auto;\n    height: auto;\n    font-family: \"Arial\";\n    font-size:16px;\n    background-color:#7abf43;\n    border: solid 1px #333\n}\n.omoClose{\n    z-index: 1003;\n    font-family: \"Arial\";\n    font-size:17px;\n    cursor: pointer;\n    background-color: red;\n    float: right;\n    \n}\n\n\n\n@media only screen and (max-width: 640px) {\n    \n    .omo-widget-container{\n        width: 640px;\n    }\n    .omoClose {\n        background-color: lightblue;\n        cursor: pointer;\n        float: inherit;\n      }\n  }", ""]);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTkxM2Q3YzcxYmU5NWI5ZjgzNmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzP2IwOTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsic3VwcG9ydGVkQVBJIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyYXRpb25zIiwic29tZURlZmF1bHRDb25maWd1cmF0aW9uIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiYXBpSGFuZGxlciIsInJvb3QiLCJkb2N1bWVudCIsImNoaWxkcmVuIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwic2hvdyIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5IiwicGluZyIsIk9NT0xBQl9CT0RZX0NMQVNTIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiSEVBREVSX1NUWUxFX0VMRU1FTlRTIiwidHJhbnNmb3JtSGVhZGVyU3R5bGVzIiwibWFwIiwiZWxlbWVudCIsInNldEhlYWRlclN0eWxlIiwic3R5bGUiLCJoZWFkZXJGb250RmFtaWx5IiwiaGVhZGVyRm9udFNpemUiLCJoZWFkZXJGb250U3BhY2luZyIsImhlYWRlckxpbmVIZWlnaHQiLCJPTU9fV0lER0VUX0VMRU1FTlRTIiwib21vV2lkZ2V0U3R5bGUiLCJzZXRPbW9XaWRnZXRTdHlsZSIsIm9tb1dpZGdldEVsZW1lbnRzIiwiam9pbiIsIkJPRFlfU1RZTEUiLCJzZXRCb2R5VGV4dFN0eWxlIiwiX1N0eWxlIiwiYm9keUZvbnRGYW1pbHkiLCJib2R5Rm9udFNpemUiLCJib2R5Rm9udFNwYWNpbmciLCJib2R5TGluZUhlaWdodCIsIkJBQ0tHUk9VTkRfQ09MT1JfRUxFTUVOVFMiLCJzZXRCYWNrR3JvdW5kQ29sb3IiLCJhcHBseVRvRWxlbWVudHMiLCJiZ0NvbG9yIiwiZWxlbWVudHMiLCJib2R5IiwidG9nZ2xlciIsImFkZE9tb2xhYkNsYXNzU2NvcGVUb0JvZHkiLCJkb2MiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJhZGQiLCJ0ZXh0IiwidGVtcG9yYXJ5IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImh0bWwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidG1wIiwicHVzaCIsImFwcGVuZENoaWxkIiwidG9vZ2xlV2lkZ2V0IiwiY2xvc2VCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwidG9vZ2xlIiwib21vRWxlbWVudHMiLCJBcnJheSIsImZyb20iLCJmb3JFYWNoIiwibm9kZU5hbWUiLCJhcHBseU9tb1N0eWxlcyIsImNoZWNrIiwiY2hpbGROb2RlcyIsImMiLCJnZXRFbGVtZW50QnlJZCIsIm9wZW4iLCJ3aWRnZXQiLCJjbG9zZSIsImZpcnN0Q2hpbGQiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImdlbmVyYXRlT21vU3R5bGUiLCJ2YWx1ZSIsImhlYWRlclN0eWxlIiwiYm9keVN0eWxlIiwid2lkZ2V0U3R5bGUiLCJmb3JjZVJlZHJhdyIsIm4iLCJjcmVhdGVUZXh0Tm9kZSIsImRpc3AiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImdldExhc3RBcHBsaWVkU3R5bGVTaGVldCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2hpbGRyZW5fbGVuIiwiYXBwbHlPdmVyaWRlcyIsImNzcyIsInR5cGUiLCJpZCIsInN0eWxlU2hlZXQiLCJjc3NUZXh0IiwicmVtb3ZlT3ZlcmlkZXMiLCJvbW9fc3R5bGVfdyIsImV2ZW50IiwiY2hlY2tlZCIsInRhcmdldCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUEsSUFBTUEsWUFBWSxHQUFHLENBQUMsTUFBRCxFQUFTLFNBQVQsQ0FBckIsQyxDQUEwQzs7QUFFMUM7Ozs7QUFHQSxTQUFTQyxHQUFULENBQWFDLE1BQWIsRUFBcUI7QUFDakJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaLEVBRGlCLENBR2pCOztBQUNBLE1BQUlDLGNBQWMsR0FBRztBQUNqQkMsNEJBQXdCLEVBQUU7QUFEVCxHQUFyQixDQUppQixDQVFqQjtBQUNBOztBQUNBLE1BQUlDLFlBQVksR0FBR0wsTUFBTSxDQUFDQSxNQUFNLENBQUMsV0FBRCxDQUFQLENBQXpCO0FBQ0EsTUFBSU0sS0FBSyxHQUFHRCxZQUFZLENBQUNFLENBQXpCOztBQUNBLE1BQUlELEtBQUosRUFBVztBQUNQLFNBQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsS0FBSyxDQUFDRyxNQUExQixFQUFrQ0QsQ0FBQyxFQUFuQyxFQUF1QztBQUNuQyxVQUFJRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsRUFBWUUsV0FBWixNQUE2QixNQUFqQyxFQUF5QztBQUNyQ1Asc0JBQWMsR0FBR1EsWUFBWSxDQUFDUixjQUFELEVBQWlCRyxLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBakIsQ0FBN0I7QUFDQVAsZUFBTyxDQUFDQyxHQUFSLENBQVksbUJBQVosRUFBaUNDLGNBQWpDO0FBQ0gsT0FIRCxNQUtJUyxVQUFVLENBQUNOLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUFELEVBQWNGLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUFkLENBQVY7QUFDUDtBQUNKLEdBckJnQixDQXVCakI7QUFDQTs7O0FBQ0FILGNBQVksR0FBR08sVUFBZjtBQUNBUCxjQUFZLENBQUNGLGNBQWIsR0FBOEJBLGNBQTlCO0FBQ0EsTUFBSVUsSUFBSSxHQUFHYixNQUFNLENBQUNjLFFBQVAsQ0FBZ0JDLFFBQTNCO0FBQ0FkLFNBQU8sQ0FBQ0MsR0FBUixDQUFZVyxJQUFaO0FBQ0g7QUFFRDs7Ozs7QUFHQSxTQUFTRCxVQUFULENBQW9CSSxHQUFwQixFQUF5QkMsTUFBekIsRUFBaUM7QUFDN0IsTUFBSSxDQUFDRCxHQUFMLEVBQVUsTUFBTUUsS0FBSyxDQUFDLHFCQUFELENBQVg7QUFDVkYsS0FBRyxHQUFHQSxHQUFHLENBQUNOLFdBQUosRUFBTjtBQUVBLE1BQUlaLFlBQVksQ0FBQ3FCLE9BQWIsQ0FBcUJILEdBQXJCLE1BQThCLENBQUMsQ0FBbkMsRUFBc0MsTUFBTUUsS0FBSyxrQkFBV0YsR0FBWCx1QkFBWDtBQUV0Q2YsU0FBTyxDQUFDQyxHQUFSLDZCQUFpQ2MsR0FBakMsR0FBd0NDLE1BQXhDOztBQUVBLFVBQVFELEdBQVI7QUFDSTtBQUNBLFNBQUssU0FBTDtBQUNJSSwwRUFBSSxDQUFDSCxNQUFELENBQUo7QUFDQTs7QUFDSjtBQUNJaEIsYUFBTyxDQUFDb0IsSUFBUixrQ0FBdUNMLEdBQXZDO0FBTlI7QUFRSDs7QUFFRCxTQUFTTCxZQUFULENBQXNCVyxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEI7QUFDeEIsT0FBSyxJQUFJQyxHQUFULElBQWdCRCxDQUFoQjtBQUNJLFFBQUlBLENBQUMsQ0FBQ0UsY0FBRixDQUFpQkQsR0FBakIsQ0FBSixFQUNJRixDQUFDLENBQUNFLEdBQUQsQ0FBRCxHQUFTRCxDQUFDLENBQUNDLEdBQUQsQ0FBVjtBQUZSOztBQUdBLFNBQU9GLENBQVA7QUFDSDs7QUFFRHZCLEdBQUcsQ0FBQ0MsTUFBRCxDQUFILEM7Ozs7Ozs7QUNsRUE7QUFBTyxTQUFTMEIsSUFBVCxHQUFnQjtBQUNuQixTQUFPLE1BQVA7QUFDSCxDOzs7Ozs7O0FDSEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBLElBQU1DLGlCQUFpQiwyQkFBb0JDLElBQUksQ0FBQ0MsR0FBTCxFQUFwQixjQUFrQ0MsSUFBSSxDQUFDQyxJQUFMLENBQVVELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixJQUExQixDQUFsQyxDQUF2QjtBQUVBOztBQUNBLElBQU1DLHFCQUFxQixHQUFHLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLENBQTlCOztBQUVBLElBQU1DLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0I7QUFBQSxTQUFNRCxxQkFBcUIsQ0FBQ0UsR0FBdEIsQ0FBMEIsVUFBQUMsT0FBTztBQUFBLDBCQUFZVCxpQkFBWixjQUFpQ1MsT0FBakMsb0JBQWtEVCxpQkFBbEQsY0FBdUVTLE9BQXZFO0FBQUEsR0FBakMsQ0FBTjtBQUFBLENBQTlCOztBQUNBLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsS0FBRCxFQUFRQyxnQkFBUixFQUEwQkMsY0FBMUIsRUFBMENDLGlCQUExQyxFQUE2REMsZ0JBQTdEO0FBQUEsU0FBa0ZKLEtBQUssMkJBQW9CQyxnQkFBcEIscUNBQStEQyxjQUFjLEdBQUdBLGNBQUgsR0FBb0IsRUFBakcsMkNBQW9JQyxpQkFBaUIsR0FBR0EsaUJBQUgsR0FBc0IsUUFBM0ssc0NBQStNQyxnQkFBZ0IsR0FBR0EsZ0JBQUgsR0FBc0IsS0FBclAsb0JBQXZGO0FBQUEsQ0FBdkI7QUFFQTs7O0FBQ0EsSUFBTUMsbUJBQW1CLEdBQUcsZ0JBQ2hCaEIsaUJBRGdCLGlDQUV4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQd0IsQ0FBNUI7QUFTQSxJQUFNaUIsY0FBYyxHQUFHLDJKQUF2QjtBQUNBOztBQUNBLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsaUJBQUQsRUFBb0JGLGNBQXBCLEVBQXVDO0FBQUUsU0FBT0UsaUJBQWlCLENBQUNDLElBQWxCLENBQXVCLEdBQXZCLElBQThCLEdBQTlCLEdBQW9DSCxjQUEzQztBQUEyRCxDQUE5SDtBQUVBOzs7QUFDQSxJQUFNSSxVQUFVLEdBQUcsZ0JBQ1ByQixpQkFETyxrQkFFUEEsaUJBRk8sY0FBbkI7O0FBSUEsSUFBTXNCLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsTUFBRCxFQUFTQyxjQUFULEVBQXlCQyxZQUF6QixFQUF1Q0MsZUFBdkMsRUFBd0RDLGNBQXhEO0FBQUEsU0FBMkVILGNBQWMsR0FBR0QsTUFBTSxDQUFDSCxJQUFQLENBQVksR0FBWiw0QkFBb0NJLGNBQXBDLG9DQUE0RUMsWUFBWSxHQUFHQSxZQUFILEdBQWtCLEVBQTFHLDJDQUE2SUMsZUFBZSxHQUFHQSxlQUFlLEdBQUMsSUFBbkIsR0FBMkIsUUFBdkwsc0NBQTJOQyxjQUFjLEdBQUdBLGNBQUgsR0FBb0IsS0FBN1Asb0JBQUgsR0FBeVIsRUFBbFg7QUFBQSxDQUF6QjtBQUVBOzs7QUFDQSxJQUFNQyx5QkFBeUIsR0FBRyxnQkFDdEI1QixpQkFEc0Isa0JBRXRCQSxpQkFGc0IsY0FBbEM7O0FBSUEsSUFBTTZCLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQ0MsZUFBRCxFQUFrQkMsT0FBbEI7QUFBQSxTQUE4QkEsT0FBTyxHQUFHRCxlQUFlLENBQUNWLElBQWhCLENBQXFCLEdBQXJCLGtDQUFtRFcsT0FBbkQsU0FBSCxHQUFzRSxFQUEzRztBQUFBLENBQTNCOztBQUVBLElBQUlDLFFBQVEsR0FBRyxFQUFmO0FBQ0EsSUFBSUMsSUFBSjtBQUNBLElBQUlDLE9BQUo7O0FBR0EsU0FBU0MseUJBQVQsQ0FBbUNDLEdBQW5DLEVBQXdDO0FBQ3BDLE1BQU1ILElBQUksR0FBR0csR0FBRyxDQUFDQyxhQUFKLENBQWtCLE1BQWxCLENBQWI7O0FBQ0EsTUFBSUosSUFBSSxJQUFJLENBQUNBLElBQUksQ0FBQ0ssU0FBTCxDQUFlQyxRQUFmLENBQXdCdkMsaUJBQXhCLENBQWIsRUFBeUQ7QUFDckRpQyxRQUFJLENBQUNLLFNBQUwsQ0FBZUUsR0FBZixDQUFtQnhDLGlCQUFuQjtBQUNIO0FBQ0o7O0FBRU0sU0FBU1AsSUFBVCxDQUFjZ0QsSUFBZCxFQUFvQjtBQUN2QjtBQUNBLE1BQUlDLFNBQVMsR0FBR3ZELFFBQVEsQ0FBQ3dELGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQUQsV0FBUyxDQUFDRSxTQUFWLEdBQXNCQyxxREFBdEI7QUFDQXZFLFNBQU8sQ0FBQ0MsR0FBUixDQUFZa0UsSUFBWixFQUp1QixDQUt2Qjs7QUFFQU4sMkJBQXlCLENBQUNoRCxRQUFELENBQXpCLENBUHVCLENBUXZCOztBQUNBOEMsTUFBSSxHQUFHOUMsUUFBUSxDQUFDMkQsc0JBQVQsQ0FBZ0Msc0JBQWhDLEVBQXdELENBQXhELENBQVA7QUFDQSxNQUFJakUsQ0FBQyxHQUFHLENBQVI7O0FBQ0EsU0FBTzZELFNBQVMsQ0FBQ3RELFFBQVYsQ0FBbUJOLE1BQW5CLEdBQTRCLENBQW5DLEVBQXNDO0FBQ2xDLFFBQUlpRSxHQUFHLEdBQUdMLFNBQVMsQ0FBQ3RELFFBQVYsQ0FBbUIsQ0FBbkIsQ0FBVjtBQUNBNEMsWUFBUSxDQUFDZ0IsSUFBVCxDQUFjRCxHQUFkO0FBQ0FkLFFBQUksQ0FBQ2dCLFdBQUwsQ0FBaUJGLEdBQWpCLEVBSGtDLENBSWxDO0FBRUg7O0FBQ0RiLFNBQU8sR0FBR2dCLFlBQVksRUFBdEI7QUFDQSxNQUFJQyxXQUFXLEdBQUdsQixJQUFJLENBQUNhLHNCQUFMLENBQTRCLFVBQTVCLEVBQXdDLENBQXhDLENBQWxCO0FBQ0FLLGFBQVcsQ0FBQ0MsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0NsQixPQUFPLENBQUNtQixNQUE5QztBQUVBLE1BQUlDLFdBQVcsR0FBR0MsS0FBSyxDQUFDQyxJQUFOLENBQVd2QixJQUFJLENBQUNhLHNCQUFMLENBQTRCLGFBQTVCLEVBQTJDLENBQTNDLEVBQThDMUQsUUFBekQsQ0FBbEI7QUFDQWtFLGFBQVcsQ0FBQ0csT0FBWixDQUFvQixVQUFBaEQsT0FBTyxFQUFJO0FBQzNCbkMsV0FBTyxDQUFDQyxHQUFSLENBQVlrQyxPQUFPLENBQUNpRCxRQUFwQjtBQUNBLFFBQUlqRCxPQUFPLENBQUNpRCxRQUFSLEtBQXFCLE9BQXpCLEVBQWtDakQsT0FBTyxDQUFDMkMsZ0JBQVIsQ0FBeUIsUUFBekIsRUFBbUNPLGNBQW5DO0FBQ2xDLFFBQUlsRCxPQUFPLENBQUNpRCxRQUFSLEtBQXFCLFFBQXpCLEVBQW1DakQsT0FBTyxDQUFDMkMsZ0JBQVIsQ0FBeUIsUUFBekIsRUFBbUNPLGNBQW5DO0FBRXRDLEdBTEQ7QUFNQSxNQUFJQyxLQUFLLEdBQUczQixJQUFJLENBQUNhLHNCQUFMLENBQTRCLFlBQTVCLEVBQTBDLENBQTFDLEVBQTZDZSxVQUE3QyxDQUF3RCxDQUF4RCxDQUFaO0FBQ0EsTUFBSUMsQ0FBQyxHQUFHM0UsUUFBUSxDQUFDNEUsY0FBVCxDQUF3QixlQUF4QixDQUFSO0FBQ0F6RixTQUFPLENBQUNDLEdBQVIsQ0FBWXFGLEtBQUssS0FBS0UsQ0FBdEI7QUFDQUEsR0FBQyxDQUFDVixnQkFBRixDQUFtQixRQUFuQixFQUE2Qk8sY0FBN0I7QUFFSDs7QUFFRCxJQUFNVCxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ3ZCLE1BQUljLElBQUksR0FBRyxJQUFYO0FBQ0EsTUFBSUMsTUFBTSxHQUFHOUUsUUFBUSxDQUFDMkQsc0JBQVQsQ0FBZ0MsUUFBaEMsRUFBMEMsQ0FBMUMsQ0FBYjtBQUNBLE1BQUlvQixLQUFLLEdBQUcvRSxRQUFRLENBQUMyRCxzQkFBVCxDQUFnQyxVQUFoQyxFQUE0QyxDQUE1QyxFQUErQ3FCLFVBQTNEO0FBQ0EsU0FBTztBQUNIZCxVQUFNLEVBQUUsa0JBQVk7QUFDaEIsVUFBSVcsSUFBSixFQUFVO0FBQ05DLGNBQU0sQ0FBQ0csWUFBUCxDQUFvQixPQUFwQixFQUE2QixjQUE3QjtBQUNBRixhQUFLLENBQUNHLFdBQU4sR0FBb0IsTUFBcEI7QUFDQUwsWUFBSSxHQUFHLEtBQVA7QUFDSCxPQUpELE1BSU87QUFDSEMsY0FBTSxDQUFDRyxZQUFQLENBQW9CLE9BQXBCLEVBQTZCLGVBQTdCO0FBQ0FGLGFBQUssQ0FBQ0csV0FBTixHQUFvQixPQUFwQjtBQUNBTCxZQUFJLEdBQUcsSUFBUDtBQUNIO0FBQ0o7QUFYRSxHQUFQO0FBYUgsQ0FqQkQ7O0FBbUJBLFNBQVNNLGdCQUFULEdBQTRCO0FBQ3hCLE1BQUl2QyxPQUFPLEdBQUc1QyxRQUFRLENBQUM0RSxjQUFULENBQXdCLFNBQXhCLEVBQW1DUSxLQUFqRDtBQUNBLE1BQUkxRCxjQUFjLEdBQUcxQixRQUFRLENBQUM0RSxjQUFULENBQXdCLE9BQXhCLEVBQWlDUSxLQUF0RDtBQUNBLE1BQUkzRCxnQkFBZ0IsR0FBR3pCLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNRLEtBQTVEO0FBQ0EsTUFBSXpELGlCQUFpQixHQUFHM0IsUUFBUSxDQUFDNEUsY0FBVCxDQUF3QixVQUF4QixFQUFvQ1EsS0FBNUQ7QUFDQSxNQUFJeEQsZ0JBQWdCLEdBQUc1QixRQUFRLENBQUM0RSxjQUFULENBQXdCLFNBQXhCLEVBQW1DUSxLQUExRDtBQUVBLE1BQUk5QyxZQUFZLEdBQUd0QyxRQUFRLENBQUM0RSxjQUFULENBQXdCLE9BQXhCLEVBQWlDUSxLQUFwRDtBQUNBLE1BQUkvQyxjQUFjLEdBQUdyQyxRQUFRLENBQUM0RSxjQUFULENBQXdCLFNBQXhCLEVBQW1DUSxLQUF4RDtBQUNBLE1BQUk3QyxlQUFlLEdBQUd2QyxRQUFRLENBQUM0RSxjQUFULENBQXdCLFVBQXhCLEVBQW9DUSxLQUExRDtBQUNBakcsU0FBTyxDQUFDQyxHQUFSLENBQVltRCxlQUFaO0FBQ0EsTUFBSUMsY0FBYyxHQUFHeEMsUUFBUSxDQUFDNEUsY0FBVCxDQUF3QixTQUF4QixFQUFtQ1EsS0FBeEQ7QUFFQSxNQUFJNUQsS0FBSyxHQUFHLEVBQVosQ0Fid0IsQ0FhVDs7QUFDZixNQUFJNkQsV0FBVyxHQUFHOUQsY0FBYyxDQUFDSCxxQkFBcUIsR0FBR2EsSUFBeEIsQ0FBNkIsR0FBN0IsQ0FBRCxFQUFvQ1IsZ0JBQXBDLEVBQXNEQyxjQUF0RCxFQUFxRUMsaUJBQXJFLEVBQXVGQyxnQkFBdkYsQ0FBaEM7QUFDQUosT0FBSyxJQUFJNkQsV0FBVDtBQUNBLE1BQUlDLFNBQVMsR0FBR25ELGdCQUFnQixDQUFDRCxVQUFELEVBQWFHLGNBQWIsRUFBNkJDLFlBQTdCLEVBQTBDQyxlQUExQyxFQUEwREMsY0FBMUQsQ0FBaEM7QUFDQWhCLE9BQUssSUFBSThELFNBQVQ7QUFDQSxNQUFJQyxXQUFXLEdBQUd4RCxpQkFBaUIsQ0FBQ0YsbUJBQUQsRUFBc0JDLGNBQXRCLENBQW5DO0FBQ0FOLE9BQUssSUFBSStELFdBQVQ7QUFFQSxTQUFPL0QsS0FBUDtBQUNIO0FBRUQ7OztBQUNBLElBQUlnRSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFVbEUsT0FBVixFQUFtQjtBQUVqQyxNQUFJLENBQUNBLE9BQUwsRUFBYztBQUFFO0FBQVM7O0FBRXpCLE1BQUltRSxDQUFDLEdBQUd6RixRQUFRLENBQUMwRixjQUFULENBQXdCLEdBQXhCLENBQVI7QUFDQSxNQUFJQyxJQUFJLEdBQUdyRSxPQUFPLENBQUNFLEtBQVIsQ0FBY29FLE9BQXpCLENBTGlDLENBS0U7O0FBRW5DdEUsU0FBTyxDQUFDd0MsV0FBUixDQUFvQjJCLENBQXBCO0FBQ0FuRSxTQUFPLENBQUNFLEtBQVIsQ0FBY29FLE9BQWQsR0FBd0IsTUFBeEI7QUFFQUMsWUFBVSxDQUFDLFlBQVk7QUFDbkJ2RSxXQUFPLENBQUNFLEtBQVIsQ0FBY29FLE9BQWQsR0FBd0JELElBQXhCO0FBQ0FGLEtBQUMsQ0FBQ0ssVUFBRixDQUFhQyxXQUFiLENBQXlCTixDQUF6QjtBQUNILEdBSFMsRUFHUCxDQUhPLENBQVYsQ0FWaUMsQ0FhMUI7QUFDVixDQWREOztBQWdCQSxTQUFTTyx3QkFBVCxHQUFvQztBQUNoQyxNQUFJL0YsUUFBUSxHQUFHRCxRQUFRLENBQUNpRyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUFmO0FBQ0EsTUFBSUMsWUFBWSxHQUFHakcsUUFBUSxDQUFDZ0csb0JBQVQsQ0FBOEIsT0FBOUIsRUFBdUN0RyxNQUExRDtBQUNBLE1BQUk2QixLQUFLLEdBQUd2QixRQUFRLENBQUNnRyxvQkFBVCxDQUE4QixPQUE5QixFQUF1Q0MsWUFBWSxHQUFHLENBQXRELENBQVo7QUFDQSxTQUFPMUUsS0FBUDtBQUNIOztBQUdELElBQU0yRSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07QUFDeEIsTUFBSW5HLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQUosRUFBK0M7QUFDM0MsUUFBSXBELEtBQUssR0FBR3dFLHdCQUF3QixFQUFwQztBQUNBeEUsU0FBSyxDQUFDaUMsU0FBTixHQUFrQjBCLGdCQUFnQixFQUFsQztBQUNBSyxlQUFXLENBQUNoRSxLQUFELENBQVg7QUFDQTtBQUNIOztBQUNELE1BQUk0RSxHQUFHLEdBQUdwRyxRQUFRLENBQUN3RCxhQUFULENBQXVCLE9BQXZCLENBQVY7QUFDQTRDLEtBQUcsQ0FBQ0MsSUFBSixHQUFXLFVBQVg7QUFDQUQsS0FBRyxDQUFDRSxFQUFKLEdBQVMsZ0JBQVQ7QUFFQSxNQUFJOUUsS0FBSyxHQUFHMkQsZ0JBQWdCLEVBQTVCO0FBQ0EsTUFBSWlCLEdBQUcsQ0FBQ0csVUFBUixFQUNJSCxHQUFHLENBQUNHLFVBQUosQ0FBZUMsT0FBZixHQUF5QmhGLEtBQXpCLENBREosS0FHSTRFLEdBQUcsQ0FBQ3RDLFdBQUosQ0FBZ0I5RCxRQUFRLENBQUMwRixjQUFULENBQXdCbEUsS0FBeEIsQ0FBaEI7QUFFSjs7QUFDQXhCLFVBQVEsQ0FBQ2lHLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDbkMsV0FBekMsQ0FBcURzQyxHQUFyRDtBQUNBakgsU0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQXFCb0MsS0FBakM7QUFDSCxDQXBCRDs7QUF3QkEsSUFBTWlGLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBTTtBQUN6QixNQUFJQyxXQUFXLEdBQUcxRyxRQUFRLENBQUM0RSxjQUFULENBQXdCLGdCQUF4QixDQUFsQjtBQUNBLE1BQUkzRSxRQUFRLEdBQUdELFFBQVEsQ0FBQ2lHLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQWY7QUFDQSxNQUFJekUsS0FBSyxHQUFHd0Usd0JBQXdCLEVBQXBDO0FBQ0E3RyxTQUFPLENBQUNDLEdBQVIsQ0FBWXNILFdBQVcsS0FBS2xGLEtBQTVCLEVBSnlCLENBS3pCOztBQUNBLE1BQUlrRixXQUFXLEtBQUtsRixLQUFwQixFQUNJdkIsUUFBUSxDQUFDOEYsV0FBVCxDQUFxQnZFLEtBQXJCO0FBQ1AsQ0FSRDs7QUFXTyxTQUFTZ0QsY0FBVCxDQUF3Qm1DLEtBQXhCLEVBQStCO0FBRWxDLE1BQUlsQyxLQUFLLEdBQUd6RSxRQUFRLENBQUM0RSxjQUFULENBQXdCLGVBQXhCLEVBQXlDZ0MsT0FBckQ7QUFDQW5DLE9BQUssR0FBRzBCLGFBQWEsRUFBaEIsR0FBcUJNLGNBQWMsRUFBeEM7QUFDQXRILFNBQU8sQ0FBQ0MsR0FBUixDQUFZcUYsS0FBSyxHQUFHLEdBQVIsR0FBY2tDLEtBQUssQ0FBQ0UsTUFBaEM7QUFFSCxDOzs7Ozs7QUNwTUQsNm1FOzs7Ozs7QUNBQTs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxDQUEyRDtBQUNqRiw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBOztBQUVBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLENBQW1EO0FBQ3hFO0FBQ0E7QUFDQSxHQUFHLEtBQVU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7O0FDekJBLDJCQUEyQixtQkFBTyxDQUFDLENBQW1EO0FBQ3RGO0FBQ0EsY0FBYyxRQUFTLGNBQWMsNkJBQTZCLHFCQUFxQix1QkFBdUIscUJBQXFCLHVCQUF1QixlQUFlLGtCQUFrQixnQkFBZ0IsaUJBQWlCLG1CQUFtQixrQkFBa0IsaUJBQWlCLG1DQUFtQyxtQkFBbUIsR0FBRyxvQkFBb0Isc0JBQXNCLHFCQUFxQix1QkFBdUIsZ0JBQWdCLGNBQWMsMkJBQTJCLGtCQUFrQixtQkFBbUIseUJBQXlCLCtCQUErQiw4QkFBOEIsc0JBQXNCLDRCQUE0QixrQkFBa0Isb0JBQW9CLHFCQUFxQixtQkFBbUIsNkJBQTZCLHFCQUFxQiwrQkFBK0IsK0JBQStCLFlBQVksb0JBQW9CLDZCQUE2QixxQkFBcUIsc0JBQXNCLDRCQUE0QixtQkFBbUIsU0FBUyxtREFBbUQsa0NBQWtDLHVCQUF1QixPQUFPLGlCQUFpQixzQ0FBc0MsMEJBQTBCLHlCQUF5QixTQUFTLEtBQUs7Ozs7Ozs7O0FDRm5zQzs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLHFCQUFxQjtBQUNoRTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCOztBQUU5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxjQUFjO0FBQ25FO0FBQ0EsQzs7Ozs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsQ0FBUTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBLG1CQUFtQiwyQkFBMkI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsMkJBQTJCO0FBQzVDO0FBQ0E7O0FBRUEsUUFBUSx1QkFBdUI7QUFDL0I7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7QUFFZCxrREFBa0Qsc0JBQXNCO0FBQ3hFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJPbW9XaWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlOTEzZDdjNzFiZTk1YjlmODM2ZCIsImltcG9ydCB7IHBpbmcgfSBmcm9tICcuL3NlcnZpY2VzJ1xuaW1wb3J0IHsgc2hvdyB9IGZyb20gJy4vdmlld3MvbWVzc2FnZSdcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydpbml0JywgJ21lc3NhZ2UnXTsgLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcblxuLyoqXG4gICAgVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gICAgKi9cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICBjb25zb2xlLmxvZygnSlMtV2lkZ2V0IHN0YXJ0aW5nJyk7XG5cbiAgICAvLyBzZXQgZGVmYXVsdCBjb25maWd1cmF0aW9uc1xuICAgIGxldCBjb25maWd1cmF0aW9ucyA9IHtcbiAgICAgICAgc29tZURlZmF1bHRDb25maWd1cmF0aW9uOiBmYWxzZVxuICAgIH07XG5cbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93IFxuICAgIGxldCBnbG9iYWxPYmplY3QgPSB3aW5kb3dbd2luZG93WydKUy1XaWRnZXQnXV07XG4gICAgbGV0IHF1ZXVlID0gZ2xvYmFsT2JqZWN0LnE7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0pTLVdpZGdldCBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIocXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbiAgICB2YXIgcm9vdCA9IHdpbmRvdy5kb2N1bWVudC5jaGlsZHJlbjtcbiAgICBjb25zb2xlLmxvZyhyb290KTtcbn1cblxuLyoqXG4gICAgTWV0aG9kIHRoYXQgaGFuZGxlcyBhbGwgQVBJIGNhbGxzXG4gICAgKi9cbmZ1bmN0aW9uIGFwaUhhbmRsZXIoYXBpLCBwYXJhbXMpIHtcbiAgICBpZiAoIWFwaSkgdGhyb3cgRXJyb3IoJ0FQSSBtZXRob2QgcmVxdWlyZWQnKTtcbiAgICBhcGkgPSBhcGkudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihhcGkpID09PSAtMSkgdGhyb3cgRXJyb3IoYE1ldGhvZCAke2FwaX0gaXMgbm90IHN1cHBvcnRlZGApO1xuXG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG5cbiAgICBzd2l0Y2ggKGFwaSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgQVBJIGltcGxlbWVudGF0aW9uXG4gICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICAgICAgc2hvdyhwYXJhbXMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIGhhbmRsZXIgZGVmaW5lZCBmb3IgJHthcGl9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKVxuICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5hcHAod2luZG93KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiLCJpbXBvcnQgaHRtbCBmcm9tICcuL21lc3NhZ2UuaHRtbCc7XG5pbXBvcnQgJy4vbWVzc2FnZS5jc3MnO1xuXG5jb25zdCBPTU9MQUJfQk9EWV9DTEFTUyA9IGBvbW9sYWItdy1ib2R5LSR7RGF0ZS5ub3coKX0tJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwMDApfWA7XG5cbi8qKkhFQURFUiBTVFlMRVMgKi9cbmNvbnN0IEhFQURFUl9TVFlMRV9FTEVNRU5UUyA9IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnXVxuXG5jb25zdCB0cmFuc2Zvcm1IZWFkZXJTdHlsZXMgPSAoKSA9PiBIRUFERVJfU1RZTEVfRUxFTUVOVFMubWFwKGVsZW1lbnQgPT4gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gJHtlbGVtZW50fSwgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSAke2VsZW1lbnR9ICpgKVxuY29uc3Qgc2V0SGVhZGVyU3R5bGUgPSAoc3R5bGUsIGhlYWRlckZvbnRGYW1pbHksIGhlYWRlckZvbnRTaXplLCBoZWFkZXJGb250U3BhY2luZywgaGVhZGVyTGluZUhlaWdodCkgPT4gc3R5bGUgKyBgeyBmb250LWZhbWlseToke2hlYWRlckZvbnRGYW1pbHl9ICFpbXBvcnRhbnQgOyBmb250LXNpemU6JHtoZWFkZXJGb250U2l6ZSA/IGhlYWRlckZvbnRTaXplIDogMTB9cHggIWltcG9ydGFudDsgbGV0dGVyLXNwYWNpbmc6JHtoZWFkZXJGb250U3BhY2luZyA/IGhlYWRlckZvbnRTcGFjaW5nOiAnbm9ybWFsJ30gIWltcG9ydGFudDsgbGluZS1oZWlnaHQ6JHtoZWFkZXJMaW5lSGVpZ2h0ID8gaGVhZGVyTGluZUhlaWdodCA6ICcxLjYnfSAhaW1wb3J0YW50IH1cXG5gXG5cbi8qKiBXSURHRVQgU1RZTEUgKi9cbmNvbnN0IE9NT19XSURHRVRfRUxFTUVOVFMgPSBbXG4gICAgYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2Lm9tby13aWRnZXQtY29udGFpbmVyICpgXG4gICAgLy8gLFxuICAgIC8vIGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdi5vbW9Db250YWluZXIgKmBcbiAgICAvLyAsXG4gICAgLy8gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2Lm9tb0JveCAqYCxcbiAgICAvLyBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBkaXYub21vQ2xvc2UgKmAsXG4gICAgLy8gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2Lm9tb0NvbnRyb2wgKmBcbl1cbmNvbnN0IG9tb1dpZGdldFN0eWxlID0gJ3sgZm9udC1mYW1pbHk6IEFyaWFsICFpbXBvcnRhbnQ7IGZvbnQtc2l6ZToxNnB4ICFpbXBvcnRhbnQ7ICBsZXR0ZXItc3BhY2luZzpub3JtYWwgIWltcG9ydGFudDsgbGluZS1oZWlnaHQ6IDEuNiAhaW1wb3J0YW50OyBiYWNrZ3JvdW5kLWNvbG9yOiAjN2FiZjQzO31cXG4nXG4vKiogU0VUIFdJREdFVCBTVFlMRSAqL1xuY29uc3Qgc2V0T21vV2lkZ2V0U3R5bGUgPSAob21vV2lkZ2V0RWxlbWVudHMsIG9tb1dpZGdldFN0eWxlKSA9PiB7IHJldHVybiBvbW9XaWRnZXRFbGVtZW50cy5qb2luKCcsJykgKyAnICcgKyBvbW9XaWRnZXRTdHlsZSB9XG5cbi8qKiBTRVQgQk9EWSBTVFlMRSAqL1xuY29uc3QgQk9EWV9TVFlMRSA9IFtcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfWAsXG4gICAgYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2ID4gKmBcbl1cbmNvbnN0IHNldEJvZHlUZXh0U3R5bGUgPSAoX1N0eWxlLCBib2R5Rm9udEZhbWlseSwgYm9keUZvbnRTaXplLCBib2R5Rm9udFNwYWNpbmcsIGJvZHlMaW5lSGVpZ2h0KSA9PiBib2R5Rm9udEZhbWlseSA/IF9TdHlsZS5qb2luKCcsJykgKyBgeyBmb250LWZhbWlseToke2JvZHlGb250RmFtaWx5fSAhaW1wb3J0YW50OyBmb250LXNpemU6JHtib2R5Rm9udFNpemUgPyBib2R5Rm9udFNpemUgOiAxMH1weCAhaW1wb3J0YW50OyBsZXR0ZXItc3BhY2luZzoke2JvZHlGb250U3BhY2luZyA/IGJvZHlGb250U3BhY2luZysncHgnICA6ICdub3JtYWwnfSAhaW1wb3J0YW50OyBsaW5lLWhlaWdodDoke2JvZHlMaW5lSGVpZ2h0ID8gYm9keUxpbmVIZWlnaHQgOiAnMS42J30gIWltcG9ydGFudCB9XFxuYCA6ICcnO1xuXG4vKiogU0VUIEJBQ0dST1VORCBDT0xPUiAqL1xuY29uc3QgQkFDS0dST1VORF9DT0xPUl9FTEVNRU5UUyA9IFtcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfWAsXG4gICAgYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2ID4gKmBcbl1cbmNvbnN0IHNldEJhY2tHcm91bmRDb2xvciA9IChhcHBseVRvRWxlbWVudHMsIGJnQ29sb3IpID0+IGJnQ29sb3IgPyBhcHBseVRvRWxlbWVudHMuam9pbignLCcpICsgYHsgYmFja2dyb3VuZC1jb2xvcjogJHtiZ0NvbG9yfSB9XFxuYCA6ICcnXG5cbmxldCBlbGVtZW50cyA9IFtdO1xubGV0IGJvZHk7XG52YXIgdG9nZ2xlcjtcblxuXG5mdW5jdGlvbiBhZGRPbW9sYWJDbGFzc1Njb3BlVG9Cb2R5KGRvYykge1xuICAgIGNvbnN0IGJvZHkgPSBkb2MucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGlmIChib2R5ICYmICFib2R5LmNsYXNzTGlzdC5jb250YWlucyhPTU9MQUJfQk9EWV9DTEFTUykpIHtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKE9NT0xBQl9CT0RZX0NMQVNTKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93KHRleHQpIHtcbiAgICAvLyBjb252ZXJ0IHBsYWluIEhUTUwgc3RyaW5nIGludG8gRE9NIGVsZW1lbnRzc1xuICAgIGxldCB0ZW1wb3JhcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZW1wb3JhcnkuaW5uZXJIVE1MID0gaHRtbDtcbiAgICBjb25zb2xlLmxvZyh0ZXh0KTtcbiAgICAvLyB0ZW1wb3JhcnkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtd2lkZ2V0LWRpYWxvZycpWzBdLmlubmVySFRNTD1odG1sXG5cbiAgICBhZGRPbW9sYWJDbGFzc1Njb3BlVG9Cb2R5KGRvY3VtZW50KTtcbiAgICAvLyBhcHBlbmQgZWxlbWVudHMgdG8gYm9keVxuICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW8td2lkZ2V0LWNvbnRhaW5lcicpWzBdO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAodGVtcG9yYXJ5LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHRtcCA9IHRlbXBvcmFyeS5jaGlsZHJlblswXVxuICAgICAgICBlbGVtZW50cy5wdXNoKHRtcCk7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodG1wKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0hUTUwtLT4nK3RtcC5pbm5lckhUTUwgKyB0bXAuY2hpbGRFbGVtZW50Q291bnQpXG5cbiAgICB9XG4gICAgdG9nZ2xlciA9IHRvb2dsZVdpZGdldCgpO1xuICAgIHZhciBjbG9zZUJ1dHRvbiA9IGJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vQ2xvc2UnKVswXVxuICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVyLnRvb2dsZSk7XG5cbiAgICB2YXIgb21vRWxlbWVudHMgPSBBcnJheS5mcm9tKGJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vRWxlbWVudHMnKVswXS5jaGlsZHJlbilcbiAgICBvbW9FbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50Lm5vZGVOYW1lKTtcbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcpIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBhcHBseU9tb1N0eWxlcyk7XG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnU0VMRUNUJykgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGFwcGx5T21vU3R5bGVzKTtcblxuICAgIH0pO1xuICAgIHZhciBjaGVjayA9IGJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vQ29udHJvbCcpWzBdLmNoaWxkTm9kZXNbMV1cbiAgICB2YXIgYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBseU92ZXJpZGVzJylcbiAgICBjb25zb2xlLmxvZyhjaGVjayA9PT0gYyk7XG4gICAgYy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhcHBseU9tb1N0eWxlcyk7XG5cbn1cblxuY29uc3QgdG9vZ2xlV2lkZ2V0ID0gKCkgPT4ge1xuICAgIGxldCBvcGVuID0gdHJ1ZVxuICAgIHZhciB3aWRnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW9Cb3gnKVswXTtcbiAgICB2YXIgY2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW9DbG9zZScpWzBdLmZpcnN0Q2hpbGQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9vZ2xlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6bm9uZScpXG4gICAgICAgICAgICAgICAgY2xvc2UudGV4dENvbnRlbnQgPSAnb3BlbidcbiAgICAgICAgICAgICAgICBvcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6YmxvY2snKVxuICAgICAgICAgICAgICAgIGNsb3NlLnRleHRDb250ZW50ID0gJ2Nsb3NlJ1xuICAgICAgICAgICAgICAgIG9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZU9tb1N0eWxlKCkge1xuICAgIHZhciBiZ0NvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JnQ29sb3InKS52YWx1ZVxuICAgIHZhciBoZWFkZXJGb250U2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoc2l6ZScpLnZhbHVlO1xuICAgIHZhciBoZWFkZXJGb250RmFtaWx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcl9mZicpLnZhbHVlXG4gICAgdmFyIGhlYWRlckZvbnRTcGFjaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hzcGFjaW5nJykudmFsdWVcbiAgICB2YXIgaGVhZGVyTGluZUhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaGVpZ2h0JykudmFsdWVcblxuICAgIHZhciBib2R5Rm9udFNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnNpemUnKS52YWx1ZTtcbiAgICB2YXIgYm9keUZvbnRGYW1pbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keV9mZicpLnZhbHVlXG4gICAgdmFyIGJvZHlGb250U3BhY2luZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdic3BhY2luZycpLnZhbHVlXG4gICAgY29uc29sZS5sb2coYm9keUZvbnRTcGFjaW5nKTtcbiAgICB2YXIgYm9keUxpbmVIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmhlaWdodCcpLnZhbHVlXG5cbiAgICB2YXIgc3R5bGUgPSAnJzsvL3NldEJhY2tHcm91bmRDb2xvcihCQUNLR1JPVU5EX0NPTE9SX0VMRU1FTlRTLCBiZ0NvbG9yKVxuICAgIHZhciBoZWFkZXJTdHlsZSA9IHNldEhlYWRlclN0eWxlKHRyYW5zZm9ybUhlYWRlclN0eWxlcygpLmpvaW4oJywnKSwgaGVhZGVyRm9udEZhbWlseSwgaGVhZGVyRm9udFNpemUsaGVhZGVyRm9udFNwYWNpbmcsaGVhZGVyTGluZUhlaWdodCk7XG4gICAgc3R5bGUgKz0gaGVhZGVyU3R5bGU7XG4gICAgdmFyIGJvZHlTdHlsZSA9IHNldEJvZHlUZXh0U3R5bGUoQk9EWV9TVFlMRSwgYm9keUZvbnRGYW1pbHksIGJvZHlGb250U2l6ZSxib2R5Rm9udFNwYWNpbmcsYm9keUxpbmVIZWlnaHQpO1xuICAgIHN0eWxlICs9IGJvZHlTdHlsZTtcbiAgICB2YXIgd2lkZ2V0U3R5bGUgPSBzZXRPbW9XaWRnZXRTdHlsZShPTU9fV0lER0VUX0VMRU1FTlRTLCBvbW9XaWRnZXRTdHlsZSk7XG4gICAgc3R5bGUgKz0gd2lkZ2V0U3R5bGVcblxuICAgIHJldHVybiBzdHlsZTtcbn1cblxuLyoqIGhhY2sgVE9ETyEhICovXG52YXIgZm9yY2VSZWRyYXcgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgaWYgKCFlbGVtZW50KSB7IHJldHVybjsgfVxuXG4gICAgdmFyIG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcpO1xuICAgIHZhciBkaXNwID0gZWxlbWVudC5zdHlsZS5kaXNwbGF5OyAgLy8gZG9uJ3Qgd29ycnkgYWJvdXQgcHJldmlvdXMgZGlzcGxheSBzdHlsZVxuXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChuKTtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcDtcbiAgICAgICAgbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pO1xuICAgIH0sIDApOyAvLyB5b3UgY2FuIHBsYXkgd2l0aCB0aGlzIHRpbWVvdXQgdG8gbWFrZSBpdCBhcyBzaG9ydCBhcyBwb3NzaWJsZVxufVxuXG5mdW5jdGlvbiBnZXRMYXN0QXBwbGllZFN0eWxlU2hlZXQoKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuICAgIHZhciBjaGlsZHJlbl9sZW4gPSBjaGlsZHJlbi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3R5bGUnKS5sZW5ndGhcbiAgICB2YXIgc3R5bGUgPSBjaGlsZHJlbi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3R5bGUnKVtjaGlsZHJlbl9sZW4gLSAxXTtcbiAgICByZXR1cm4gc3R5bGU7XG59XG5cblxuY29uc3QgYXBwbHlPdmVyaWRlcyA9ICgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29tb2xhYl9zdHlsZV93JykpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gZ2V0TGFzdEFwcGxpZWRTdHlsZVNoZWV0KCk7XG4gICAgICAgIHN0eWxlLmlubmVySFRNTCA9IGdlbmVyYXRlT21vU3R5bGUoKTtcbiAgICAgICAgZm9yY2VSZWRyYXcoc3R5bGUpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGNzcy50eXBlID0gJ3RleHQvY3NzJztcbiAgICBjc3MuaWQgPSAnb21vbGFiX3N0eWxlX3cnXG5cbiAgICB2YXIgc3R5bGUgPSBnZW5lcmF0ZU9tb1N0eWxlKCk7XG4gICAgaWYgKGNzcy5zdHlsZVNoZWV0KVxuICAgICAgICBjc3Muc3R5bGVTaGVldC5jc3NUZXh0ID0gc3R5bGVcbiAgICBlbHNlXG4gICAgICAgIGNzcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHlsZSkpO1xuXG4gICAgLyogQXBwZW5kIHN0eWxlIHRvIHRoZSB0YWcgbmFtZSAqL1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChjc3MpO1xuICAgIGNvbnNvbGUubG9nKFwiYXBwbHkgb3ZlcmlkZXNcXG5cIiArIHN0eWxlKTtcbn1cblxuXG5cbmNvbnN0IHJlbW92ZU92ZXJpZGVzID0gKCkgPT4ge1xuICAgIHZhciBvbW9fc3R5bGVfdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvbW9sYWJfc3R5bGVfdycpO1xuICAgIHZhciBjaGlsZHJlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiAgICB2YXIgc3R5bGUgPSBnZXRMYXN0QXBwbGllZFN0eWxlU2hlZXQoKVxuICAgIGNvbnNvbGUubG9nKG9tb19zdHlsZV93ID09PSBzdHlsZSk7XG4gICAgLy8gaWYgc3R5bGVzaGVldCBpcyBhcHBsaWVkIHJlbW92ZSBpdCwgb3RoZXJ3aXNlIGlnbm9yZVxuICAgIGlmIChvbW9fc3R5bGVfdyA9PT0gc3R5bGUpXG4gICAgICAgIGNoaWxkcmVuLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlPbW9TdHlsZXMoZXZlbnQpIHtcblxuICAgIHZhciBjaGVjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBseU92ZXJpZGVzJykuY2hlY2tlZDtcbiAgICBjaGVjayA/IGFwcGx5T3ZlcmlkZXMoKSA6IHJlbW92ZU92ZXJpZGVzKClcbiAgICBjb25zb2xlLmxvZyhjaGVjayArICcgJyArIGV2ZW50LnRhcmdldCk7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9tZXNzYWdlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcIjwhLS0gPGRpdiBjbGFzcz1cXFwianMtd2lkZ2V0LW92ZXJsYXlcXFwiPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImpzLXdpZGdldC1kaWFsb2dcXFwiPjwvZGl2PiAtLT5cXG5cXG48bWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJvbW9Db250YWluZXJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm9tb0Nsb3NlXFxcIiBpZD1cXFwib21vQ2xvc2VcXFwiPjxkaXY+Y2xvc2U8L2Rpdj48L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm9tb0JveFxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm9tb0VsZW1lbnRzXFxcIj5cXG4gICAgICAgICAgICA8bGFiZWw+QmFja2dyb3VuZCBjb2xsb3IgPC9sYWJlbD48aW5wdXQgdHlwZT1cXFwiY29sb3JcXFwiIGlkPVxcXCJiZ0NvbG9yXFxcIiBuYW1lPVxcXCJoZWFkXFxcIiB2YWx1ZT1cXFwiI2U2NjQ2NVxcXCI+XFxuICAgICAgICAgICAgPGxhYmVsPjxzdHJvbmc+SGVhZGVyPC9zdHJvbmc+PC9sYWJlbD4gXFxuICAgICAgICAgICAgPHNlbGVjdCBpZD1cXFwiaGVhZGVyX2ZmXFxcIj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiR2VvcmdpYVxcXCI+R2VvcmdpYTwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJBcmlhbFxcXCI+QXJpYWw8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiUm9ib3RvXFxcIj5Sb2JvdG88L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQ291cmllclxcXCI+Q291cmllcjwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJDb21pYyBTYW5zIE1TXFxcIj5Db21pYyBTYW5zIE1TPC9vcHRpb24+XFxuICAgICAgICAgICAgICA8L3NlbGVjdD5cXG4gICAgICAgICAgICAgIDxsYWJlbD5mb250IHNpemU8L2xhYmVsPjxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGlkPVxcXCJoc2l6ZVxcXCIgbWluPVxcXCIxMFxcXCIgbWF4PVxcXCIzNVxcXCI+XFxuICAgICAgICAgICAgICA8bGFiZWw+Zm9udCBzcGFjaW5nPC9sYWJlbD48aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBpZD1cXFwiaHNwYWNpbmdcXFwiIG1pbj1cXFwiLTFcXFwiIG1heD1cXFwiNVxcXCIgc3RlcD1cXFwiMC41XFxcIj5cXG4gICAgICAgICAgICAgIDxsYWJlbD5saW5lIGhlaWdodDwvbGFiZWw+PGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgaWQ9XFxcImhoZWlnaHRcXFwiIG1pbj1cXFwiMS42XFxcIiBtYXg9XFxcIjJcXFwiIHN0ZXA9XFxcIjAuMVxcXCI+XFxuICAgICAgICAgICAgPGxhYmVsPjxzdHJvbmc+Qm9keTwvc3Ryb25nPjwvbGFiZWw+XFxuICAgICAgICAgICAgPHNlbGVjdCBpZD1cXFwiYm9keV9mZlxcXCI+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkdlb3JnaWFcXFwiPkdlb3JnaWE8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQXJpYWxcXFwiPkFyaWFsPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlJvYm90b1xcXCI+Um9ib3RvPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkNvdXJpZXJcXFwiPkNvdXJpZXI8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQ29taWMgU2FucyBNU1xcXCI+Q29taWMgU2FucyBNUzwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBpZD1cXFwiYnNpemVcXFwiIG1pbj1cXFwiMTBcXFwiIG1heD1cXFwiMzVcXFwiPlxcbiAgICAgICAgICAgICAgPGxhYmVsPmZvbnQgc3BhY2luZzwvbGFiZWw+PGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgaWQ9XFxcImJzcGFjaW5nXFxcIiBtaW49XFxcIi0xXFxcIiBtYXg9XFxcIjVcXFwiIHN0ZXA9XFxcIjAuNVxcXCI+XFxuICAgICAgICAgICAgICA8bGFiZWw+bGluZSBoZWlnaHQ8L2xhYmVsPjxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGlkPVxcXCJiaGVpZ2h0XFxcIiBtaW49XFxcIjEuNlxcXCIgbWF4PVxcXCIyXFxcIiBzdGVwPVxcXCIwLjFcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwib21vQ29udHJvbFxcXCI+XFxuICAgICAgICAgICAgSWduaXRlOjxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCIgaWQ9XFxcImFwcGx5T3ZlcmlkZXNcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIFxcbiAgICAgIFxcbiAgICAgIDwvZGl2PlxcblxcblxcbiAgICBcXG5cXG5cXG5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy92aWV3cy9tZXNzYWdlLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVzc2FnZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVzc2FnZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVzc2FnZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnNvbWVjbGFzc3tcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJBcmlhbFxcXCI7XFxuICAgIGZvbnQtc2l6ZTo4IFxcbn1cXG5cXG4uanMtd2lkZ2V0LW92ZXJsYXl7XFxuICAgIHotaW5kZXg6IDEwMDAxOyBcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDBweDtcXG4gICAgYm90dG9tOiAwcHg7XFxuICAgIGxlZnQ6IDBweDtcXG4gICAgcmlnaHQ6IDBweDtcXG4gICAgb3BhY2l0eTogMC44O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiA0MDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiAjMzMzO1xcbn1cXG4uanMtd2lkZ2V0LWRpYWxvZ3tcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB6LWluZGV4OiAxMDAwMjtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0b3A6IDAlO1xcbiAgICBtYXJnaW46IDAgMCAwIC0xMjBweDtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMzMzXFxufVxcblxcbi5vbW8td2lkZ2V0LWNvbnRhaW5lciA+ICp7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgei1pbmRleDogMTAwMjtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJBcmlhbFxcXCI7XFxuICAgIGZvbnQtc2l6ZToxNnB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiM3YWJmNDM7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMzMzNcXG59XFxuLm9tb0Nsb3Nle1xcbiAgICB6LWluZGV4OiAxMDAzO1xcbiAgICBmb250LWZhbWlseTogXFxcIkFyaWFsXFxcIjtcXG4gICAgZm9udC1zaXplOjE3cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbiAgICBmbG9hdDogcmlnaHQ7XFxuICAgIFxcbn1cXG5cXG5cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XFxuICAgIFxcbiAgICAub21vLXdpZGdldC1jb250YWluZXJ7XFxuICAgICAgICB3aWR0aDogNjQwcHg7XFxuICAgIH1cXG4gICAgLm9tb0Nsb3NlIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIGZsb2F0OiBpbmhlcml0O1xcbiAgICAgIH1cXG4gIH1cIiwgXCJcIl0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NyYy92aWV3cy9tZXNzYWdlLmNzc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIntcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gbW9kdWxlc1tfaV07IC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcbiAgICAgIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG4gICAgICAvLyB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG4gICAgICAvLyBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cbiAgICAgIGlmIChpdGVtWzBdID09IG51bGwgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiKFwiLmNvbmNhdChpdGVtWzJdLCBcIikgYW5kIChcIikuY29uY2F0KG1lZGlhUXVlcnksIFwiKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290KS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9