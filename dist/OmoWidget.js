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
// `body.${OMOLAB_BODY_CLASS} div.omoContainer > *`
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


var BODY_STYLE = ["body.".concat(OMOLAB_BODY_CLASS), // `body.${OMOLAB_BODY_CLASS} > not(.omo-widget-container > *)`,
"body.".concat(OMOLAB_BODY_CLASS, " div > *")];

var setBodyTextStyle = function setBodyTextStyle(_Style, bodyFontFamily, bodyFontSize, bodyFontSpacing, bodyLineHeight) {
  return bodyFontFamily ? _Style.join(',') + "{ font-family:".concat(bodyFontFamily, " !important; font-size:").concat(bodyFontSize ? bodyFontSize : 10, "px !important; letter-spacing:").concat(bodyFontSpacing ? bodyFontSpacing + 'px' : 'normal', " !important; line-height:").concat(bodyLineHeight ? bodyLineHeight : '1.6', " !important }\n") : '';
};
/** SET BACGROUND COLOR */


var BACKGROUND_COLOR_ELEMENTS = ["body.".concat(OMOLAB_BODY_CLASS), // `body.${OMOLAB_BODY_CLASS} > not(.omo-widget-container > *)`,
"body.".concat(OMOLAB_BODY_CLASS, " div > *")];

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
  addEventHandler('headerOptions', 'change', ['INPUT', 'SELECT'], applyOmoStyles);
  addEventHandler('bodyOptions', 'change', ['INPUT', 'SELECT'], applyOmoStyles);
  addEventHandler('omoControl', 'click', ['INPUT'], applyOmoStyles);
  addEventHandler('omoClose', 'click', ['DIV'], toggler.toogle);
  addEventHandler('bgColor', 'click', ['DIV'], clickCollor);
}
/** applys event handler to given element */

var addEventHandler = function addEventHandler(element, event, selector, handler) {
  var omoElements = Array.from(body.getElementsByClassName(element)[0].children);
  omoElements.forEach(function (element) {
    if (selector.includes(element.nodeName)) element.addEventListener(event, handler);
  });
};
/** COLLOR PICKER REFACTOR */


var collorStack = [];

var clickCollor = function clickCollor(event) {
  if (collorStack.length > 0) {
    var obj = collorStack.pop();
    obj.element.style.cssText = obj.style;
  }

  var color = event.target.style.cssText;
  event.target.style = color + '; ' + ' outline: 2px solid blue;';
  collorStack.push({
    element: event.target,
    // element
    color: color.substring(color.indexOf(':') + 1),
    // samo boja
    style: color // kompletan stil

  });
  console.log('click Collor' + event.target.style.cssText);
  applyOmoStyles();
};

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
  var bgCol = collorStack.length > 0 ? collorStack[collorStack.length - 1].color : 'transparent'; // alert(bgCol);

  var headerFontSize = document.getElementById('hsize').value;
  var headerFontFamily = document.getElementById('header_ff').value;
  var headerFontSpacing = document.getElementById('hspacing').value;
  var headerLineHeight = document.getElementById('hheight').value;
  var bodyFontSize = document.getElementById('bsize').value;
  var bodyFontFamily = document.getElementById('body_ff').value;
  var bodyFontSpacing = document.getElementById('bspacing').value; // console.log(bodyFontSpacing);

  var bodyLineHeight = document.getElementById('bheight').value;
  var style = setBackGroundColor(BACKGROUND_COLOR_ELEMENTS, bgCol);
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
  console.log(omo_style_w === style);
  /**  if omolab_style_w stylesheet is applied remove it, otherwise ignore */

  if (omo_style_w === style) children.removeChild(style);
};

function applyOmoStyles(event) {
  // alert('click');
  // console.log(check + ' ' + event.target);
  var check = document.getElementById('applyOverides').checked;
  check ? applyOverides() : removeOverides(); // console.log(check + ' ' + event.target);
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"js-widget-overlay\">\n</div>\n<div class=\"js-widget-dialog\"></div> -->\n\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <div class=\"omoContainer\">\n      <div class=\"omoClose\" id=\"omoClose\"><div>close</div></div>\n        <div class=\"omoBox\">\n          <div class=\"omoElements\">\n              <div id=\"globalOptions\" class=\"globalOptions\">\n                 <div id=\"bgColor\" class=\"bgColor\">\n                 <label>Background</label>\n\n                          <div class=\"col\" style=\"background-color: #FFFFFF;\"></div>\n                          <div class=\"col\" style=\"background-color: #F1F5ED;\"></div>\n                          <div class=\"col\" style=\"background-color: #000000;\"></div>\n                          <div class=\"col\" style=\"background-color: #9FB5DE;\"></div>\n                          <div class=\"col\" style=\"background-color: #B0DED5;\"></div>\n                          <div class=\"col\" style=\"background-color: #B1D89A;\"></div>\n                          <div class=\"col\" style=\"background-color: #FAF293;\"></div>\n                          <div class=\"col\" style=\"background-color: #FEDE75;\"></div>\n                          <div class=\"col\" style=\"background-color: #B894C4;\"></div>\n                          <div class=\"col\" style=\"background-color: #FBD4B5;\"></div>\n                          <div class=\"col\" style=\"background-color: #E2B0AF;\"></div>\n                          <div class=\"col\" style=\"background-color: #D9D8D8;\"></div>\n                          <div class=\"col\" id=\"noBackground\" style=\"background-color: transparent;\">\n                          </div>\n                  </div>\n              </div>\n            <!-- <label>Background collor </label><input type=\"color\" id=\"bgColor\" name=\"head\" value=\"#e66465\"> -->\n            <div class=\"headerOptions\">\n            <label><strong>Header</strong></label> \n            <select id=\"header_ff\">\n                <option value=\"Georgia\">Georgia</option>\n                <option value=\"Arial\">Arial</option>\n                <option value=\"Roboto\">Roboto</option>\n                <option value=\"Courier\">Courier</option>\n                <option value=\"Comic Sans MS\">Comic Sans MS</option>\n                <option value=\"dLightOne\">dLightOne</option>\n              </select>\n              <label>font size</label><input type=\"number\" id=\"hsize\" min=\"10\" max=\"35\">\n              <label>font spacing</label><input type=\"number\" id=\"hspacing\" min=\"-1\" max=\"5\" step=\"0.5\">\n              <label>line height</label><input type=\"number\" id=\"hheight\" min=\"1.6\" max=\"2\" step=\"0.1\">\n            </div>\n            <div class=\"bodyOptions\">\n            <label><strong>Body&nbsp;&nbsp;&nbsp;</strong></label>\n            <select id=\"body_ff\">\n                <option value=\"Georgia\">Georgia</option>\n                <option value=\"Arial\">Arial</option>\n                <option value=\"Roboto\">Roboto</option>\n                <option value=\"Courier\">Courier</option>\n                <option value=\"Comic Sans MS\">Comic Sans MS</option>\n                <option value=\"dLightOne\">dLightOne</option>\n              </select>\n              <label>font size</label><input type=\"number\" id=\"bsize\" min=\"10\" max=\"35\">\n              <label>font spacing</label><input type=\"number\" id=\"bspacing\" min=\"-1\" max=\"5\" step=\"0.5\">\n              <label>line height</label><input type=\"number\" id=\"bheight\" min=\"1.6\" max=\"2\" step=\"0.1\">\n            </div>\n          </div>\n          <div class=\"omoControl\">\n            Ignite:<input type=\"checkbox\" id=\"applyOverides\">\n          </div>\n        </div>\n      \n      \n      </div>\n\n\n    \n\n\n\n";

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
exports.push([module.i, "\n\n.someclass{\n    font-family: \"Arial\";\n    font-size:8 \n}\n\n.js-widget-overlay{\n    z-index: 10001; \n    position: fixed;\n    top: 0px;\n    bottom: 0px;\n    left: 0px;\n    right: 0px;\n    opacity: 0.8;\n    width: 100%;\n    height: 40;\n    background-color:transparent;\n    border: #333;\n}\n.js-widget-dialog{\n    position: fixed;\n    z-index: 10002;\n    background: #fff;\n    left: 50%;\n    top: 0%;\n    margin: 0 0 0 -120px;\n    width: auto;\n    height: auto;\n    padding: 10px 20px;\n    border: solid 1px #333\n}\n\n.omo-widget-container > *{\n    position: fixed;\n    display: inline-block;\n    width: 100%;\n    z-index: 1002;\n    overflow: auto;\n    height: auto;\n    font-family: \"Arial\";\n    font-size:16px;\n    background-color:#7abf43;\n    border: solid 1px #333\n}\n.globalOptions{\n    border: dotted 1px rgb(51, 51, 51);\n   \n     \n}\n.bgColor{\n    width: 100%;\n}\n.col {\n    display: inline-flex;\n    box-shadow: 0px 0px 0px 1px #D1D5D3 inset;\n    /* height: 29px; */\n    width: 40px;\n    height: 30px;\n    cursor: pointer;\n    border: solid 1px rgb(51, 51, 51);\n}\n/* .bgColor{\n    border: solid 2px rgb(51, 51, 51);\n} */\n.headerOptions{\n    border: solid 1px rgb(206, 209, 21) \n}\n.bodyOptions{\n    border: solid 1px rgb(192, 14, 14) \n}\n.omoClose{\n    z-index: 1002;\n    font-family: \"Arial\";\n    font-size:17px;\n    cursor: pointer;\n    background-color: red;\n    border: solid 1px #333;\n    float: right;\n    \n}\n\n\n\n@media only screen and (max-width: 640px) {\n    \n    .omo-widget-container{\n        width: 640px;\n    }\n    .omoClose {\n        background-color: lightblue;\n        cursor: pointer;\n        float: inherit;\n      }\n  }", ""]);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTYxYWU2MDlkNTIyMTY2OTZmYzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzP2IwOTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsic3VwcG9ydGVkQVBJIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyYXRpb25zIiwic29tZURlZmF1bHRDb25maWd1cmF0aW9uIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiYXBpSGFuZGxlciIsInJvb3QiLCJkb2N1bWVudCIsImNoaWxkcmVuIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwic2hvdyIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5IiwicGluZyIsIk9NT0xBQl9CT0RZX0NMQVNTIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiSEVBREVSX1NUWUxFX0VMRU1FTlRTIiwidHJhbnNmb3JtSGVhZGVyU3R5bGVzIiwibWFwIiwiZWxlbWVudCIsInNldEhlYWRlclN0eWxlIiwic3R5bGUiLCJoZWFkZXJGb250RmFtaWx5IiwiaGVhZGVyRm9udFNpemUiLCJoZWFkZXJGb250U3BhY2luZyIsImhlYWRlckxpbmVIZWlnaHQiLCJPTU9fV0lER0VUX0VMRU1FTlRTIiwib21vV2lkZ2V0U3R5bGUiLCJzZXRPbW9XaWRnZXRTdHlsZSIsIm9tb1dpZGdldEVsZW1lbnRzIiwiam9pbiIsIkJPRFlfU1RZTEUiLCJzZXRCb2R5VGV4dFN0eWxlIiwiX1N0eWxlIiwiYm9keUZvbnRGYW1pbHkiLCJib2R5Rm9udFNpemUiLCJib2R5Rm9udFNwYWNpbmciLCJib2R5TGluZUhlaWdodCIsIkJBQ0tHUk9VTkRfQ09MT1JfRUxFTUVOVFMiLCJzZXRCYWNrR3JvdW5kQ29sb3IiLCJhcHBseVRvRWxlbWVudHMiLCJiZ0NvbG9yIiwiZWxlbWVudHMiLCJib2R5IiwidG9nZ2xlciIsImFkZE9tb2xhYkNsYXNzU2NvcGVUb0JvZHkiLCJkb2MiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJhZGQiLCJ0ZXh0IiwidGVtcG9yYXJ5IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImh0bWwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidG1wIiwicHVzaCIsImFwcGVuZENoaWxkIiwidG9vZ2xlV2lkZ2V0IiwiYWRkRXZlbnRIYW5kbGVyIiwiYXBwbHlPbW9TdHlsZXMiLCJ0b29nbGUiLCJjbGlja0NvbGxvciIsImV2ZW50Iiwic2VsZWN0b3IiLCJoYW5kbGVyIiwib21vRWxlbWVudHMiLCJBcnJheSIsImZyb20iLCJmb3JFYWNoIiwiaW5jbHVkZXMiLCJub2RlTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb2xsb3JTdGFjayIsIm9iaiIsInBvcCIsImNzc1RleHQiLCJjb2xvciIsInRhcmdldCIsInN1YnN0cmluZyIsIm9wZW4iLCJ3aWRnZXQiLCJjbG9zZSIsImZpcnN0Q2hpbGQiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImdlbmVyYXRlT21vU3R5bGUiLCJiZ0NvbCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJoZWFkZXJTdHlsZSIsImJvZHlTdHlsZSIsIndpZGdldFN0eWxlIiwiZm9yY2VSZWRyYXciLCJuIiwiY3JlYXRlVGV4dE5vZGUiLCJkaXNwIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJnZXRMYXN0QXBwbGllZFN0eWxlU2hlZXQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNoaWxkcmVuX2xlbiIsImFwcGx5T3ZlcmlkZXMiLCJjc3MiLCJ0eXBlIiwiaWQiLCJzdHlsZVNoZWV0IiwicmVtb3ZlT3ZlcmlkZXMiLCJvbW9fc3R5bGVfdyIsImNoZWNrIiwiY2hlY2tlZCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUEsSUFBTUEsWUFBWSxHQUFHLENBQUMsTUFBRCxFQUFTLFNBQVQsQ0FBckIsQyxDQUEwQzs7QUFFMUM7Ozs7QUFHQSxTQUFTQyxHQUFULENBQWFDLE1BQWIsRUFBcUI7QUFDakJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaLEVBRGlCLENBR2pCOztBQUNBLE1BQUlDLGNBQWMsR0FBRztBQUNqQkMsNEJBQXdCLEVBQUU7QUFEVCxHQUFyQixDQUppQixDQVFqQjtBQUNBOztBQUNBLE1BQUlDLFlB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QUFFRjtBQUNBO0FBQ0EiLCJmaWxlIjoiT21vV2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTYxYWU2MDlkNTIyMTY2OTZmYzQiLCJpbXBvcnQgeyBwaW5nIH0gZnJvbSAnLi9zZXJ2aWNlcydcbmltcG9ydCB7IHNob3cgfSBmcm9tICcuL3ZpZXdzL21lc3NhZ2UnXG5cbmNvbnN0IHN1cHBvcnRlZEFQSSA9IFsnaW5pdCcsICdtZXNzYWdlJ107IC8vIGVubGlzdCBhbGwgbWV0aG9kcyBzdXBwb3J0ZWQgYnkgQVBJIChlLmcuIGBtdygnZXZlbnQnLCAndXNlci1sb2dpbicpO2ApXG5cbi8qKlxuICAgIFRoZSBtYWluIGVudHJ5IG9mIHRoZSBhcHBsaWNhdGlvblxuICAgICovXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgY29uc29sZS5sb2coJ0pTLVdpZGdldCBzdGFydGluZycpO1xuXG4gICAgLy8gc2V0IGRlZmF1bHQgY29uZmlndXJhdGlvbnNcbiAgICBsZXQgY29uZmlndXJhdGlvbnMgPSB7XG4gICAgICAgIHNvbWVEZWZhdWx0Q29uZmlndXJhdGlvbjogZmFsc2VcbiAgICB9O1xuXG4gICAgLy8gYWxsIG1ldGhvZHMgdGhhdCB3ZXJlIGNhbGxlZCB0aWxsIG5vdyBhbmQgc3RvcmVkIGluIHF1ZXVlXG4gICAgLy8gbmVlZHMgdG8gYmUgY2FsbGVkIG5vdyBcbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snSlMtV2lkZ2V0J11dO1xuICAgIGxldCBxdWV1ZSA9IGdsb2JhbE9iamVjdC5xO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdKUy1XaWRnZXQgc3RhcnRlZCcsIGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBhcGlIYW5kbGVyKHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBvdmVycmlkZSB0ZW1wb3JhcnkgKHVudGlsIHRoZSBhcHAgbG9hZGVkKSBoYW5kbGVyXG4gICAgLy8gZm9yIHdpZGdldCdzIEFQSSBjYWxsc1xuICAgIGdsb2JhbE9iamVjdCA9IGFwaUhhbmRsZXI7XG4gICAgZ2xvYmFsT2JqZWN0LmNvbmZpZ3VyYXRpb25zID0gY29uZmlndXJhdGlvbnM7XG4gICAgdmFyIHJvb3QgPSB3aW5kb3cuZG9jdW1lbnQuY2hpbGRyZW47XG4gICAgY29uc29sZS5sb2cocm9vdCk7XG59XG5cbi8qKlxuICAgIE1ldGhvZCB0aGF0IGhhbmRsZXMgYWxsIEFQSSBjYWxsc1xuICAgICovXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGFwaSwgcGFyYW1zKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YoYXBpKSA9PT0gLTEpIHRocm93IEVycm9yKGBNZXRob2QgJHthcGl9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcblxuICAgIGNvbnNvbGUubG9nKGBIYW5kbGluZyBBUEkgY2FsbCAke2FwaX1gLCBwYXJhbXMpO1xuXG4gICAgc3dpdGNoIChhcGkpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuICAgICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgICAgIHNob3cocGFyYW1zKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBoYW5kbGVyIGRlZmluZWQgZm9yICR7YXBpfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuYXBwKHdpbmRvdyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIiwiaW1wb3J0IGh0bWwgZnJvbSAnLi9tZXNzYWdlLmh0bWwnO1xuaW1wb3J0ICcuL21lc3NhZ2UuY3NzJztcblxuY29uc3QgT01PTEFCX0JPRFlfQ0xBU1MgPSBgb21vbGFiLXctYm9keS0ke0RhdGUubm93KCl9LSR7TWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMDAwKX1gO1xuXG4vKipIRUFERVIgU1RZTEVTICovXG5jb25zdCBIRUFERVJfU1RZTEVfRUxFTUVOVFMgPSBbJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2J11cblxuY29uc3QgdHJhbnNmb3JtSGVhZGVyU3R5bGVzID0gKCkgPT4gSEVBREVSX1NUWUxFX0VMRU1FTlRTLm1hcChlbGVtZW50ID0+IGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9ICR7ZWxlbWVudH0sIGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gJHtlbGVtZW50fSAqYClcbmNvbnN0IHNldEhlYWRlclN0eWxlID0gKHN0eWxlLCBoZWFkZXJGb250RmFtaWx5LCBoZWFkZXJGb250U2l6ZSwgaGVhZGVyRm9udFNwYWNpbmcsIGhlYWRlckxpbmVIZWlnaHQpID0+IHN0eWxlICsgYHsgZm9udC1mYW1pbHk6JHtoZWFkZXJGb250RmFtaWx5fSAhaW1wb3J0YW50IDsgZm9udC1zaXplOiR7aGVhZGVyRm9udFNpemUgPyBoZWFkZXJGb250U2l6ZSA6IDEwfXB4ICFpbXBvcnRhbnQ7IGxldHRlci1zcGFjaW5nOiR7aGVhZGVyRm9udFNwYWNpbmcgPyBoZWFkZXJGb250U3BhY2luZyA6ICdub3JtYWwnfSAhaW1wb3J0YW50OyBsaW5lLWhlaWdodDoke2hlYWRlckxpbmVIZWlnaHQgPyBoZWFkZXJMaW5lSGVpZ2h0IDogJzEuNid9ICFpbXBvcnRhbnQgfVxcbmBcblxuLyoqIFdJREdFVCBTVFlMRSAqL1xuY29uc3QgT01PX1dJREdFVF9FTEVNRU5UUyA9IFtcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBkaXYub21vLXdpZGdldC1jb250YWluZXIgKmBcbiAgICAvLyAsXG4gICAgLy8gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2Lm9tb0NvbnRhaW5lciA+ICpgXG4gICAgLy8gLFxuICAgIC8vIGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdi5vbW9Cb3ggKmAsXG4gICAgLy8gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2Lm9tb0Nsb3NlICpgLFxuICAgIC8vIGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdi5vbW9Db250cm9sICpgXG5dXG5jb25zdCBvbW9XaWRnZXRTdHlsZSA9ICd7IGZvbnQtZmFtaWx5OiBBcmlhbCAhaW1wb3J0YW50OyBmb250LXNpemU6MTZweCAhaW1wb3J0YW50OyAgbGV0dGVyLXNwYWNpbmc6bm9ybWFsICFpbXBvcnRhbnQ7IGxpbmUtaGVpZ2h0OiAxLjYgIWltcG9ydGFudDsgYmFja2dyb3VuZC1jb2xvcjogIzdhYmY0Mzt9XFxuJ1xuLyoqIFNFVCBXSURHRVQgU1RZTEUgKi9cbmNvbnN0IHNldE9tb1dpZGdldFN0eWxlID0gKG9tb1dpZGdldEVsZW1lbnRzLCBvbW9XaWRnZXRTdHlsZSkgPT4geyByZXR1cm4gb21vV2lkZ2V0RWxlbWVudHMuam9pbignLCcpICsgJyAnICsgb21vV2lkZ2V0U3R5bGUgfVxuXG4vKiogU0VUIEJPRFkgU1RZTEUgKi9cbmNvbnN0IEJPRFlfU1RZTEUgPSBbXG4gICAgYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU31gLFxuICAgIC8vIGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9ID4gbm90KC5vbW8td2lkZ2V0LWNvbnRhaW5lciA+ICopYCxcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBkaXYgPiAqYCxcbiAgICBcblxuXVxuY29uc3Qgc2V0Qm9keVRleHRTdHlsZSA9IChfU3R5bGUsIGJvZHlGb250RmFtaWx5LCBib2R5Rm9udFNpemUsIGJvZHlGb250U3BhY2luZywgYm9keUxpbmVIZWlnaHQpID0+IGJvZHlGb250RmFtaWx5ID8gX1N0eWxlLmpvaW4oJywnKSArIGB7IGZvbnQtZmFtaWx5OiR7Ym9keUZvbnRGYW1pbHl9ICFpbXBvcnRhbnQ7IGZvbnQtc2l6ZToke2JvZHlGb250U2l6ZSA/IGJvZHlGb250U2l6ZSA6IDEwfXB4ICFpbXBvcnRhbnQ7IGxldHRlci1zcGFjaW5nOiR7Ym9keUZvbnRTcGFjaW5nID8gYm9keUZvbnRTcGFjaW5nICsgJ3B4JyA6ICdub3JtYWwnfSAhaW1wb3J0YW50OyBsaW5lLWhlaWdodDoke2JvZHlMaW5lSGVpZ2h0ID8gYm9keUxpbmVIZWlnaHQgOiAnMS42J30gIWltcG9ydGFudCB9XFxuYCA6ICcnO1xuXG4vKiogU0VUIEJBQ0dST1VORCBDT0xPUiAqL1xuY29uc3QgQkFDS0dST1VORF9DT0xPUl9FTEVNRU5UUyA9IFtcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfWAsXG4gICAgLy8gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gPiBub3QoLm9tby13aWRnZXQtY29udGFpbmVyID4gKilgLFxuICAgIGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdiA+ICpgXG5dXG5jb25zdCBzZXRCYWNrR3JvdW5kQ29sb3IgPSAoYXBwbHlUb0VsZW1lbnRzLCBiZ0NvbG9yKSA9PiBiZ0NvbG9yID8gYXBwbHlUb0VsZW1lbnRzLmpvaW4oJywnKSArIGB7IGJhY2tncm91bmQtY29sb3I6ICR7YmdDb2xvcn0gfVxcbmAgOiAnJ1xuXG5sZXQgZWxlbWVudHMgPSBbXTtcbmxldCBib2R5O1xudmFyIHRvZ2dsZXI7XG5cblxuZnVuY3Rpb24gYWRkT21vbGFiQ2xhc3NTY29wZVRvQm9keShkb2MpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBpZiAoYm9keSAmJiAhYm9keS5jbGFzc0xpc3QuY29udGFpbnMoT01PTEFCX0JPRFlfQ0xBU1MpKSB7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZChPTU9MQUJfQk9EWV9DTEFTUyk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvdyh0ZXh0KSB7XG4gICAgLy8gY29udmVydCBwbGFpbiBIVE1MIHN0cmluZyBpbnRvIERPTSBlbGVtZW50c3NcbiAgICBsZXQgdGVtcG9yYXJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGVtcG9yYXJ5LmlubmVySFRNTCA9IGh0bWw7XG4gICAgY29uc29sZS5sb2codGV4dCk7XG4gICAgLy8gdGVtcG9yYXJ5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pzLXdpZGdldC1kaWFsb2cnKVswXS5pbm5lckhUTUw9aHRtbFxuXG4gICAgYWRkT21vbGFiQ2xhc3NTY29wZVRvQm9keShkb2N1bWVudCk7XG4gICAgLy8gYXBwZW5kIGVsZW1lbnRzIHRvIGJvZHlcbiAgICBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vLXdpZGdldC1jb250YWluZXInKVswXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKHRlbXBvcmFyeS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCB0bXAgPSB0ZW1wb3JhcnkuY2hpbGRyZW5bMF1cbiAgICAgICAgZWxlbWVudHMucHVzaCh0bXApO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRtcCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdIVE1MLS0+Jyt0bXAuaW5uZXJIVE1MICsgdG1wLmNoaWxkRWxlbWVudENvdW50KVxuXG4gICAgfVxuICAgIHRvZ2dsZXIgPSB0b29nbGVXaWRnZXQoKTtcblxuICAgIGFkZEV2ZW50SGFuZGxlcignaGVhZGVyT3B0aW9ucycsICdjaGFuZ2UnLCBbJ0lOUFVUJywgJ1NFTEVDVCddLCBhcHBseU9tb1N0eWxlcyk7XG4gICAgYWRkRXZlbnRIYW5kbGVyKCdib2R5T3B0aW9ucycsICdjaGFuZ2UnLCBbJ0lOUFVUJywgJ1NFTEVDVCddLCBhcHBseU9tb1N0eWxlcyk7XG4gICAgYWRkRXZlbnRIYW5kbGVyKCdvbW9Db250cm9sJywgJ2NsaWNrJywgWydJTlBVVCddLCBhcHBseU9tb1N0eWxlcyk7XG4gICAgYWRkRXZlbnRIYW5kbGVyKCdvbW9DbG9zZScsICdjbGljaycsIFsnRElWJ10sIHRvZ2dsZXIudG9vZ2xlKVxuICAgIGFkZEV2ZW50SGFuZGxlcignYmdDb2xvcicsICdjbGljaycsIFsnRElWJ10sIGNsaWNrQ29sbG9yKTtcblxufVxuXG4vKiogYXBwbHlzIGV2ZW50IGhhbmRsZXIgdG8gZ2l2ZW4gZWxlbWVudCAqL1xuY29uc3QgYWRkRXZlbnRIYW5kbGVyID0gKGVsZW1lbnQsIGV2ZW50LCBzZWxlY3RvciwgaGFuZGxlcikgPT4ge1xuICAgIHZhciBvbW9FbGVtZW50cyA9IEFycmF5LmZyb20oYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGVsZW1lbnQpWzBdLmNoaWxkcmVuKVxuICAgIG9tb0VsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChzZWxlY3Rvci5pbmNsdWRlcyhlbGVtZW50Lm5vZGVOYW1lKSkgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcblxuICAgIH0pO1xufVxuXG5cbi8qKiBDT0xMT1IgUElDS0VSIFJFRkFDVE9SICovXG5jb25zdCBjb2xsb3JTdGFjayA9IFtdO1xuXG5jb25zdCBjbGlja0NvbGxvciA9IChldmVudCkgPT4ge1xuICAgIGlmIChjb2xsb3JTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBvYmogPSBjb2xsb3JTdGFjay5wb3AoKTtcbiAgICAgICAgb2JqLmVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IG9iai5zdHlsZVxuICAgIH1cbiAgICBsZXQgY29sb3IgPSBldmVudC50YXJnZXQuc3R5bGUuY3NzVGV4dDtcbiAgICBldmVudC50YXJnZXQuc3R5bGUgPSBjb2xvciArICc7ICcgKyAnIG91dGxpbmU6IDJweCBzb2xpZCBibHVlOydcbiAgICBjb2xsb3JTdGFjay5wdXNoKHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudFxuICAgICAgICBjb2xvcjogY29sb3Iuc3Vic3RyaW5nKGNvbG9yLmluZGV4T2YoJzonKSsxKSwgICAvLyBzYW1vIGJvamFcbiAgICAgICAgc3R5bGU6IGNvbG9yICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga29tcGxldGFuIHN0aWxcbiAgICB9KVxuXG4gICAgY29uc29sZS5sb2coJ2NsaWNrIENvbGxvcicgKyBldmVudC50YXJnZXQuc3R5bGUuY3NzVGV4dClcbiAgICBhcHBseU9tb1N0eWxlcygpO1xufVxuXG5cblxuY29uc3QgdG9vZ2xlV2lkZ2V0ID0gKCkgPT4ge1xuICAgIGxldCBvcGVuID0gdHJ1ZVxuICAgIHZhciB3aWRnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW9Cb3gnKVswXTtcbiAgICB2YXIgY2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW9DbG9zZScpWzBdLmZpcnN0Q2hpbGQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9vZ2xlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6bm9uZScpXG4gICAgICAgICAgICAgICAgY2xvc2UudGV4dENvbnRlbnQgPSAnb3BlbidcbiAgICAgICAgICAgICAgICBvcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6YmxvY2snKVxuICAgICAgICAgICAgICAgIGNsb3NlLnRleHRDb250ZW50ID0gJ2Nsb3NlJ1xuICAgICAgICAgICAgICAgIG9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZU9tb1N0eWxlKCkge1xuICAgIHZhciBiZ0NvbCA9IGNvbGxvclN0YWNrLmxlbmd0aCA+IDAgPyBjb2xsb3JTdGFja1tjb2xsb3JTdGFjay5sZW5ndGgtMV0uY29sb3IgOiAndHJhbnNwYXJlbnQnXG4gICAgLy8gYWxlcnQoYmdDb2wpO1xuICAgIHZhciBoZWFkZXJGb250U2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoc2l6ZScpLnZhbHVlO1xuICAgIHZhciBoZWFkZXJGb250RmFtaWx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcl9mZicpLnZhbHVlXG4gICAgdmFyIGhlYWRlckZvbnRTcGFjaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hzcGFjaW5nJykudmFsdWVcbiAgICB2YXIgaGVhZGVyTGluZUhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaGVpZ2h0JykudmFsdWVcblxuICAgIHZhciBib2R5Rm9udFNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnNpemUnKS52YWx1ZTtcbiAgICB2YXIgYm9keUZvbnRGYW1pbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keV9mZicpLnZhbHVlXG4gICAgdmFyIGJvZHlGb250U3BhY2luZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdic3BhY2luZycpLnZhbHVlXG4gICAgLy8gY29uc29sZS5sb2coYm9keUZvbnRTcGFjaW5nKTtcbiAgICB2YXIgYm9keUxpbmVIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmhlaWdodCcpLnZhbHVlXG5cblxuICAgIHZhciBzdHlsZSA9IHNldEJhY2tHcm91bmRDb2xvcihCQUNLR1JPVU5EX0NPTE9SX0VMRU1FTlRTLCBiZ0NvbClcbiAgICB2YXIgaGVhZGVyU3R5bGUgPSBzZXRIZWFkZXJTdHlsZSh0cmFuc2Zvcm1IZWFkZXJTdHlsZXMoKS5qb2luKCcsJyksIGhlYWRlckZvbnRGYW1pbHksIGhlYWRlckZvbnRTaXplLCBoZWFkZXJGb250U3BhY2luZywgaGVhZGVyTGluZUhlaWdodCk7XG4gICAgc3R5bGUgKz0gaGVhZGVyU3R5bGU7XG4gICAgdmFyIGJvZHlTdHlsZSA9IHNldEJvZHlUZXh0U3R5bGUoQk9EWV9TVFlMRSwgYm9keUZvbnRGYW1pbHksIGJvZHlGb250U2l6ZSwgYm9keUZvbnRTcGFjaW5nLCBib2R5TGluZUhlaWdodCk7XG4gICAgc3R5bGUgKz0gYm9keVN0eWxlO1xuICAgIHZhciB3aWRnZXRTdHlsZSA9IHNldE9tb1dpZGdldFN0eWxlKE9NT19XSURHRVRfRUxFTUVOVFMsIG9tb1dpZGdldFN0eWxlKTtcbiAgICBzdHlsZSArPSB3aWRnZXRTdHlsZVxuXG4gICAgcmV0dXJuIHN0eWxlO1xufVxuXG4vKiogaGFjayBUT0RPISEgKi9cbnZhciBmb3JjZVJlZHJhdyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbiAgICBpZiAoIWVsZW1lbnQpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgbiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJyk7XG4gICAgdmFyIGRpc3AgPSBlbGVtZW50LnN0eWxlLmRpc3BsYXk7ICAvLyBkb24ndCB3b3JyeSBhYm91dCBwcmV2aW91cyBkaXNwbGF5IHN0eWxlXG5cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKG4pO1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwO1xuICAgICAgICBuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobik7XG4gICAgfSwgMCk7IC8vIHlvdSBjYW4gcGxheSB3aXRoIHRoaXMgdGltZW91dCB0byBtYWtlIGl0IGFzIHNob3J0IGFzIHBvc3NpYmxlXG59XG5cbmZ1bmN0aW9uIGdldExhc3RBcHBsaWVkU3R5bGVTaGVldCgpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gICAgdmFyIGNoaWxkcmVuX2xlbiA9IGNoaWxkcmVuLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdHlsZScpLmxlbmd0aFxuICAgIHZhciBzdHlsZSA9IGNoaWxkcmVuLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdHlsZScpW2NoaWxkcmVuX2xlbiAtIDFdO1xuICAgIHJldHVybiBzdHlsZTtcbn1cblxuXG5jb25zdCBhcHBseU92ZXJpZGVzID0gKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb21vbGFiX3N0eWxlX3cnKSkge1xuICAgICAgICB2YXIgc3R5bGUgPSBnZXRMYXN0QXBwbGllZFN0eWxlU2hlZXQoKTtcbiAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gZ2VuZXJhdGVPbW9TdHlsZSgpO1xuICAgICAgICBmb3JjZVJlZHJhdyhzdHlsZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgY3NzLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGNzcy5pZCA9ICdvbW9sYWJfc3R5bGVfdydcblxuICAgIHZhciBzdHlsZSA9IGdlbmVyYXRlT21vU3R5bGUoKTtcbiAgICBpZiAoY3NzLnN0eWxlU2hlZXQpXG4gICAgICAgIGNzcy5zdHlsZVNoZWV0LmNzc1RleHQgPSBzdHlsZVxuICAgIGVsc2VcbiAgICAgICAgY3NzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0eWxlKSk7XG5cbiAgICAvKiBBcHBlbmQgc3R5bGUgdG8gdGhlIHRhZyBuYW1lICovXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGNzcyk7XG4gICAgY29uc29sZS5sb2coXCJhcHBseSBvdmVyaWRlc1xcblwiICsgc3R5bGUpO1xufVxuXG5cblxuY29uc3QgcmVtb3ZlT3ZlcmlkZXMgPSAoKSA9PiB7XG4gICAgdmFyIG9tb19zdHlsZV93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29tb2xhYl9zdHlsZV93Jyk7XG4gICAgdmFyIGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuICAgIHZhciBzdHlsZSA9IGdldExhc3RBcHBsaWVkU3R5bGVTaGVldCgpXG4gICAgY29uc29sZS5sb2cob21vX3N0eWxlX3cgPT09IHN0eWxlKTtcbiAgICAvKiogIGlmIG9tb2xhYl9zdHlsZV93IHN0eWxlc2hlZXQgaXMgYXBwbGllZCByZW1vdmUgaXQsIG90aGVyd2lzZSBpZ25vcmUgKi9cbiAgICBpZiAob21vX3N0eWxlX3cgPT09IHN0eWxlKVxuICAgICAgICBjaGlsZHJlbi5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG5cblxuZnVuY3Rpb24gYXBwbHlPbW9TdHlsZXMoZXZlbnQpIHtcblxuICAgIC8vIGFsZXJ0KCdjbGljaycpO1xuICAgIC8vIGNvbnNvbGUubG9nKGNoZWNrICsgJyAnICsgZXZlbnQudGFyZ2V0KTtcbiAgICB2YXIgY2hlY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwbHlPdmVyaWRlcycpLmNoZWNrZWQ7XG4gICAgY2hlY2sgPyBhcHBseU92ZXJpZGVzKCkgOiByZW1vdmVPdmVyaWRlcygpXG4gICAgLy8gY29uc29sZS5sb2coY2hlY2sgKyAnICcgKyBldmVudC50YXJnZXQpO1xuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9tZXNzYWdlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcIjwhLS0gPGRpdiBjbGFzcz1cXFwianMtd2lkZ2V0LW92ZXJsYXlcXFwiPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImpzLXdpZGdldC1kaWFsb2dcXFwiPjwvZGl2PiAtLT5cXG5cXG48bWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJvbW9Db250YWluZXJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm9tb0Nsb3NlXFxcIiBpZD1cXFwib21vQ2xvc2VcXFwiPjxkaXY+Y2xvc2U8L2Rpdj48L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm9tb0JveFxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm9tb0VsZW1lbnRzXFxcIj5cXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XFxcImdsb2JhbE9wdGlvbnNcXFwiIGNsYXNzPVxcXCJnbG9iYWxPcHRpb25zXFxcIj5cXG4gICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcImJnQ29sb3JcXFwiIGNsYXNzPVxcXCJiZ0NvbG9yXFxcIj5cXG4gICAgICAgICAgICAgICAgIDxsYWJlbD5CYWNrZ3JvdW5kPC9sYWJlbD5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICNGMUY1RUQ7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICM5RkI1REU7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICNCMERFRDU7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICNCMUQ4OUE7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICNGQUYyOTM7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICNGRURFNzU7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICNCODk0QzQ7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICNGQkQ0QjU7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICNFMkIwQUY7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6ICNEOUQ4RDg7XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbFxcXCIgaWQ9XFxcIm5vQmFja2dyb3VuZFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwhLS0gPGxhYmVsPkJhY2tncm91bmQgY29sbG9yIDwvbGFiZWw+PGlucHV0IHR5cGU9XFxcImNvbG9yXFxcIiBpZD1cXFwiYmdDb2xvclxcXCIgbmFtZT1cXFwiaGVhZFxcXCIgdmFsdWU9XFxcIiNlNjY0NjVcXFwiPiAtLT5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJoZWFkZXJPcHRpb25zXFxcIj5cXG4gICAgICAgICAgICA8bGFiZWw+PHN0cm9uZz5IZWFkZXI8L3N0cm9uZz48L2xhYmVsPiBcXG4gICAgICAgICAgICA8c2VsZWN0IGlkPVxcXCJoZWFkZXJfZmZcXFwiPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJHZW9yZ2lhXFxcIj5HZW9yZ2lhPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkFyaWFsXFxcIj5BcmlhbDwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJSb2JvdG9cXFwiPlJvYm90bzwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJDb3VyaWVyXFxcIj5Db3VyaWVyPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkNvbWljIFNhbnMgTVNcXFwiPkNvbWljIFNhbnMgTVM8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiZExpZ2h0T25lXFxcIj5kTGlnaHRPbmU8L29wdGlvbj5cXG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxcbiAgICAgICAgICAgICAgPGxhYmVsPmZvbnQgc2l6ZTwvbGFiZWw+PGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgaWQ9XFxcImhzaXplXFxcIiBtaW49XFxcIjEwXFxcIiBtYXg9XFxcIjM1XFxcIj5cXG4gICAgICAgICAgICAgIDxsYWJlbD5mb250IHNwYWNpbmc8L2xhYmVsPjxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGlkPVxcXCJoc3BhY2luZ1xcXCIgbWluPVxcXCItMVxcXCIgbWF4PVxcXCI1XFxcIiBzdGVwPVxcXCIwLjVcXFwiPlxcbiAgICAgICAgICAgICAgPGxhYmVsPmxpbmUgaGVpZ2h0PC9sYWJlbD48aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBpZD1cXFwiaGhlaWdodFxcXCIgbWluPVxcXCIxLjZcXFwiIG1heD1cXFwiMlxcXCIgc3RlcD1cXFwiMC4xXFxcIj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2R5T3B0aW9uc1xcXCI+XFxuICAgICAgICAgICAgPGxhYmVsPjxzdHJvbmc+Qm9keSZuYnNwOyZuYnNwOyZuYnNwOzwvc3Ryb25nPjwvbGFiZWw+XFxuICAgICAgICAgICAgPHNlbGVjdCBpZD1cXFwiYm9keV9mZlxcXCI+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkdlb3JnaWFcXFwiPkdlb3JnaWE8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQXJpYWxcXFwiPkFyaWFsPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlJvYm90b1xcXCI+Um9ib3RvPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkNvdXJpZXJcXFwiPkNvdXJpZXI8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQ29taWMgU2FucyBNU1xcXCI+Q29taWMgU2FucyBNUzwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJkTGlnaHRPbmVcXFwiPmRMaWdodE9uZTwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICAgICAgICA8bGFiZWw+Zm9udCBzaXplPC9sYWJlbD48aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBpZD1cXFwiYnNpemVcXFwiIG1pbj1cXFwiMTBcXFwiIG1heD1cXFwiMzVcXFwiPlxcbiAgICAgICAgICAgICAgPGxhYmVsPmZvbnQgc3BhY2luZzwvbGFiZWw+PGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgaWQ9XFxcImJzcGFjaW5nXFxcIiBtaW49XFxcIi0xXFxcIiBtYXg9XFxcIjVcXFwiIHN0ZXA9XFxcIjAuNVxcXCI+XFxuICAgICAgICAgICAgICA8bGFiZWw+bGluZSBoZWlnaHQ8L2xhYmVsPjxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGlkPVxcXCJiaGVpZ2h0XFxcIiBtaW49XFxcIjEuNlxcXCIgbWF4PVxcXCIyXFxcIiBzdGVwPVxcXCIwLjFcXFwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwib21vQ29udHJvbFxcXCI+XFxuICAgICAgICAgICAgSWduaXRlOjxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCIgaWQ9XFxcImFwcGx5T3ZlcmlkZXNcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIFxcbiAgICAgIFxcbiAgICAgIDwvZGl2PlxcblxcblxcbiAgICBcXG5cXG5cXG5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy92aWV3cy9tZXNzYWdlLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVzc2FnZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVzc2FnZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVzc2FnZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuLnNvbWVjbGFzc3tcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJBcmlhbFxcXCI7XFxuICAgIGZvbnQtc2l6ZTo4IFxcbn1cXG5cXG4uanMtd2lkZ2V0LW92ZXJsYXl7XFxuICAgIHotaW5kZXg6IDEwMDAxOyBcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDBweDtcXG4gICAgYm90dG9tOiAwcHg7XFxuICAgIGxlZnQ6IDBweDtcXG4gICAgcmlnaHQ6IDBweDtcXG4gICAgb3BhY2l0eTogMC44O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiA0MDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiAjMzMzO1xcbn1cXG4uanMtd2lkZ2V0LWRpYWxvZ3tcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB6LWluZGV4OiAxMDAwMjtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0b3A6IDAlO1xcbiAgICBtYXJnaW46IDAgMCAwIC0xMjBweDtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMzMzXFxufVxcblxcbi5vbW8td2lkZ2V0LWNvbnRhaW5lciA+ICp7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgei1pbmRleDogMTAwMjtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJBcmlhbFxcXCI7XFxuICAgIGZvbnQtc2l6ZToxNnB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiM3YWJmNDM7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMzMzNcXG59XFxuLmdsb2JhbE9wdGlvbnN7XFxuICAgIGJvcmRlcjogZG90dGVkIDFweCByZ2IoNTEsIDUxLCA1MSk7XFxuICAgXFxuICAgICBcXG59XFxuLmJnQ29sb3J7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cXG4uY29sIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggMHB4IDFweCAjRDFENUQzIGluc2V0O1xcbiAgICAvKiBoZWlnaHQ6IDI5cHg7ICovXFxuICAgIHdpZHRoOiA0MHB4O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG4vKiAuYmdDb2xvcntcXG4gICAgYm9yZGVyOiBzb2xpZCAycHggcmdiKDUxLCA1MSwgNTEpO1xcbn0gKi9cXG4uaGVhZGVyT3B0aW9uc3tcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmdiKDIwNiwgMjA5LCAyMSkgXFxufVxcbi5ib2R5T3B0aW9uc3tcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmdiKDE5MiwgMTQsIDE0KSBcXG59XFxuLm9tb0Nsb3Nle1xcbiAgICB6LWluZGV4OiAxMDAyO1xcbiAgICBmb250LWZhbWlseTogXFxcIkFyaWFsXFxcIjtcXG4gICAgZm9udC1zaXplOjE3cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMzMzO1xcbiAgICBmbG9hdDogcmlnaHQ7XFxuICAgIFxcbn1cXG5cXG5cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XFxuICAgIFxcbiAgICAub21vLXdpZGdldC1jb250YWluZXJ7XFxuICAgICAgICB3aWR0aDogNjQwcHg7XFxuICAgIH1cXG4gICAgLm9tb0Nsb3NlIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIGZsb2F0OiBpbmhlcml0O1xcbiAgICAgIH1cXG4gIH1cIiwgXCJcIl0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NyYy92aWV3cy9tZXNzYWdlLmNzc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIntcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gbW9kdWxlc1tfaV07IC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcbiAgICAgIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG4gICAgICAvLyB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG4gICAgICAvLyBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cbiAgICAgIGlmIChpdGVtWzBdID09IG51bGwgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiKFwiLmNvbmNhdChpdGVtWzJdLCBcIikgYW5kIChcIikuY29uY2F0KG1lZGlhUXVlcnksIFwiKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290KS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9