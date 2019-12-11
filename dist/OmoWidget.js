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

var HEADER_STYLE_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div.title', 'section#block-superfish-4', 'section#block-superfish-6'];

var transformHeaderStyles = function transformHeaderStyles() {
  return HEADER_STYLE_ELEMENTS.map(function (element) {
    return "body.".concat(OMOLAB_BODY_CLASS, " ").concat(element, ", body.").concat(OMOLAB_BODY_CLASS, " ").concat(element, " * ");
  });
};

var setHeaderStyle = function setHeaderStyle(style, headerFontFamily, headerFontSize, headerFontSpacing, headerLineHeight) {
  return style + "{ font-family:".concat(headerFontFamily, " !important ; font-size:").concat(headerFontSize ? headerFontSize : 10, "px !important; letter-spacing:").concat(headerFontSpacing ? headerFontSpacing + 'px' : 'normal', " !important; line-height:").concat(headerLineHeight ? headerLineHeight : '1.6', " !important }\n");
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


var BACKGROUND_COLOR_ELEMENTS = ["body.".concat(OMOLAB_BODY_CLASS), "body.".concat(OMOLAB_BODY_CLASS, " div.header-top"), "body.".concat(OMOLAB_BODY_CLASS, " div.header-main"), "body.".concat(OMOLAB_BODY_CLASS, " div.footer-wrap"), "body.".concat(OMOLAB_BODY_CLASS, " section#block-block-45")];

var setBackGroundColor = function setBackGroundColor(applyToElements, bgColor) {
  return bgColor ? applyToElements.join(',') + "{ background-color: ".concat(bgColor, " }\n") : '';
};
/** 
const BACKGROUND_COLOR_ELEMENTS_IMPORTANT = [
    `body.${OMOLAB_BODY_CLASS} section#block-block-44.block.block-block.poslovnice-bankomati.block-grey-bg.pb-block-grey-bg *`,
    `body.${OMOLAB_BODY_CLASS} section#block-block-44.block.block-block.poslovnice-bankomati.block-grey-bg.pb-block-grey-bg > *`,
]
const setBackGroundColorImportant = (applyToElements, bgColor) => bgColor ? applyToElements.join(',') + `{ background-color: ${bgColor} !important }\n` : ''
*/


var elements = [];
var body;
var toggler;

var setCookie = function setCookie() {
  var obj = {
    hFontsize: 11,
    hFontFamily: 'Arial',
    hFontSpacing: '1.5',
    hFontLineHieght: '2',
    bFontSize: 12,
    bFontFamily: 'Courier',
    bFontSpacing: '2',
    bFontLineHeight: '2'
  };
  document.cookie = 'testCookie' + "=" + JSON.stringify(obj);
};

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
  setCookie();
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
  var style = setBackGroundColor(BACKGROUND_COLOR_ELEMENTS, bgCol); // style += setBackGroundColorImportant(BACKGROUND_COLOR_ELEMENTS_IMPORTANT,bgCol)

  var headerStyle = setHeaderStyle(transformHeaderStyles().join(','), headerFontFamily, headerFontSize, headerFontSpacing, headerLineHeight);
  style += headerStyle;
  var bodyStyle = setBodyTextStyle(BODY_STYLE, bodyFontFamily, bodyFontSize, bodyFontSpacing, bodyLineHeight);
  style += bodyStyle;
  var widgetStyle = setOmoWidgetStyle(OMO_WIDGET_ELEMENTS, omoWidgetStyle);
  style += widgetStyle;
  console.log(style);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDQxZGJjNDQwMzZiN2YwNzc4ZjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9tZXNzYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzP2IwOTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsic3VwcG9ydGVkQVBJIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyYXRpb25zIiwic29tZURlZmF1bHRDb25maWd1cmF0aW9uIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiYXBpSGFuZGxlciIsInJvb3QiLCJkb2N1bWVudCIsImNoaWxkcmVuIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwic2hvdyIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5IiwicGluZyIsIk9NT0xBQl9CT0RZX0NMQVNTIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiSEVBREVSX1NUWUxFX0VMRU1FTlRTIiwidHJhbnNmb3JtSGVhZGVyU3R5bGVzIiwibWFwIiwiZWxlbWVudCIsInNldEhlYWRlclN0eWxlIiwic3R5bGUiLCJoZWFkZXJGb250RmFtaWx5IiwiaGVhZGVyRm9udFNpemUiLCJoZWFkZXJGb250U3BhY2luZyIsImhlYWRlckxpbmVIZWlnaHQiLCJPTU9fV0lER0VUX0VMRU1FTlRTIiwib21vV2lkZ2V0U3R5bGUiLCJzZXRPbW9XaWRnZXRTdHlsZSIsIm9tb1dpZGdldEVsZW1lbnRzIiwiam9pbiIsIkJPRFlfU1RZTEUiLCJzZXRCb2R5VGV4dFN0eWxlIiwiX1N0eWxlIiwiYm9keUZvbnRGYW1pbHkiLCJib2R5Rm9udFNpemUiLCJib2R5Rm9udFNwYWNpbmciLCJib2R5TGluZUhlaWdodCIsIkJBQ0tHUk9VTkRfQ09MT1JfRUxFTUVOVFMiLCJzZXRCYWNrR3JvdW5kQ29sb3IiLCJhcHBseVRvRWxlbWVudHMiLCJiZ0NvbG9yIiwiZWxlbWVudHMiLCJib2R5IiwidG9nZ2xlciIsInNldENvb2tpZSIsIm9iaiIsImhGb250c2l6ZSIsImhGb250RmFtaWx5IiwiaEZvbnRTcGFjaW5nIiwiaEZvbnRMaW5lSGllZ2h0IiwiYkZvbnRTaXplIiwiYkZvbnRGYW1pbHkiLCJiRm9udFNwYWNpbmciLCJiRm9udExpbmVIZWlnaHQiLCJjb29raWUiLCJKU09OIiwic3RyaW5naWZ5IiwiYWRkT21vbGFiQ2xhc3NTY29wZVRvQm9keSIsImRvYyIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImFkZCIsInRleHQiLCJ0ZW1wb3JhcnkiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiaHRtbCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0bXAiLCJwdXNoIiwiYXBwZW5kQ2hpbGQiLCJ0b29nbGVXaWRnZXQiLCJhZGRFdmVudEhhbmRsZXIiLCJhcHBseU9tb1N0eWxlcyIsInRvb2dsZSIsImNsaWNrQ29sbG9yIiwiZXZlbnQiLCJzZWxlY3RvciIsImhhbmRsZXIiLCJvbW9FbGVtZW50cyIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJpbmNsdWRlcyIsIm5vZGVOYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbGxvclN0YWNrIiwicG9wIiwiY3NzVGV4dCIsImNvbG9yIiwidGFyZ2V0Iiwic3Vic3RyaW5nIiwib3BlbiIsIndpZGdldCIsImNsb3NlIiwiZmlyc3RDaGlsZCIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiZ2VuZXJhdGVPbW9TdHlsZSIsImJnQ29sIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImhlYWRlclN0eWxlIiwiYm9keVN0eWxlIiwid2lkZ2V0U3R5bGUiLCJmb3JjZVJlZHJhdyIsIm4iLCJjcmVhdGVUZXh0Tm9kZSIsImRpc3AiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImdldExhc3RBcHBsaWVkU3R5bGVTaGVldCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2hpbGRyZW5fbGVuIiwiYXBwbHlPdmVyaWRlcyIsImNzcyIsInR5cGUiLCJpZCIsInN0eWxlU2hlZXQiLCJyZW1vdmVPdmVyaWRlcyIsIm9tb19zdHlsZV93IiwiY2hlY2siLCJjaGVja2VkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxJQUFNQSxZQUFZLEdBQUcsQ0FBQyxNQUFELEVBQVMsU0FBVCxDQUFyQixDLENBQTBDOztBQUUxQzs7OztBQUdB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBIiwiZmlsZSI6Ik9tb1dpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA0MWRiYzQ0MDM2YjdmMDc3OGYxIiwiaW1wb3J0IHsgcGluZyB9IGZyb20gJy4vc2VydmljZXMnXG5pbXBvcnQgeyBzaG93IH0gZnJvbSAnLi92aWV3cy9tZXNzYWdlJ1xuXG5jb25zdCBzdXBwb3J0ZWRBUEkgPSBbJ2luaXQnLCAnbWVzc2FnZSddOyAvLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuXG4vKipcbiAgICBUaGUgbWFpbiBlbnRyeSBvZiB0aGUgYXBwbGljYXRpb25cbiAgICAqL1xuZnVuY3Rpb24gYXBwKHdpbmRvdykge1xuICAgIGNvbnNvbGUubG9nKCdKUy1XaWRnZXQgc3RhcnRpbmcnKTtcblxuICAgIC8vIHNldCBkZWZhdWx0IGNvbmZpZ3VyYXRpb25zXG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBzb21lRGVmYXVsdENvbmZpZ3VyYXRpb246IGZhbHNlXG4gICAgfTtcblxuICAgIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNhbGxlZCBub3cgXG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ0pTLVdpZGdldCddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2luaXQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSlMtV2lkZ2V0IHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgIHZhciByb290ID0gd2luZG93LmRvY3VtZW50LmNoaWxkcmVuO1xuICAgIGNvbnNvbGUubG9nKHJvb3QpO1xufVxuXG4vKipcbiAgICBNZXRob2QgdGhhdCBoYW5kbGVzIGFsbCBBUEkgY2FsbHNcbiAgICAqL1xuZnVuY3Rpb24gYXBpSGFuZGxlcihhcGksIHBhcmFtcykge1xuICAgIGlmICghYXBpKSB0aHJvdyBFcnJvcignQVBJIG1ldGhvZCByZXF1aXJlZCcpO1xuICAgIGFwaSA9IGFwaS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKGFwaSkgPT09IC0xKSB0aHJvdyBFcnJvcihgTWV0aG9kICR7YXBpfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG5cbiAgICBjb25zb2xlLmxvZyhgSGFuZGxpbmcgQVBJIGNhbGwgJHthcGl9YCwgcGFyYW1zKTtcblxuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBBUEkgaW1wbGVtZW50YXRpb25cbiAgICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgICAgICBzaG93KHBhcmFtcyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgcmV0dXJuIGE7XG59XG5cbmFwcCh3aW5kb3cpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiXG5leHBvcnQgZnVuY3Rpb24gcGluZygpIHtcbiAgICByZXR1cm4gJ3BvbmcnO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy5qcyIsImltcG9ydCBodG1sIGZyb20gJy4vbWVzc2FnZS5odG1sJztcbmltcG9ydCAnLi9tZXNzYWdlLmNzcyc7XG5cbmNvbnN0IE9NT0xBQl9CT0RZX0NMQVNTID0gYG9tb2xhYi13LWJvZHktJHtEYXRlLm5vdygpfS0ke01hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTAwMCl9YDsgXG5cbi8qKkhFQURFUiBTVFlMRVMgKi9cbmNvbnN0IEhFQURFUl9TVFlMRV9FTEVNRU5UUyA9IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnZGl2LnRpdGxlJywgJ3NlY3Rpb24jYmxvY2stc3VwZXJmaXNoLTQnLCAnc2VjdGlvbiNibG9jay1zdXBlcmZpc2gtNiddXG5cbmNvbnN0IHRyYW5zZm9ybUhlYWRlclN0eWxlcyA9ICgpID0+IEhFQURFUl9TVFlMRV9FTEVNRU5UUy5tYXAoZWxlbWVudCA9PiBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSAke2VsZW1lbnR9LCBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9ICR7ZWxlbWVudH0gKiBgKVxuY29uc3Qgc2V0SGVhZGVyU3R5bGUgPSAoc3R5bGUsIGhlYWRlckZvbnRGYW1pbHksIGhlYWRlckZvbnRTaXplLCBoZWFkZXJGb250U3BhY2luZywgaGVhZGVyTGluZUhlaWdodCkgPT4gc3R5bGUgKyBgeyBmb250LWZhbWlseToke2hlYWRlckZvbnRGYW1pbHl9ICFpbXBvcnRhbnQgOyBmb250LXNpemU6JHtoZWFkZXJGb250U2l6ZSA/IGhlYWRlckZvbnRTaXplIDogMTB9cHggIWltcG9ydGFudDsgbGV0dGVyLXNwYWNpbmc6JHtoZWFkZXJGb250U3BhY2luZyA/IGhlYWRlckZvbnRTcGFjaW5nICsgJ3B4JyA6ICdub3JtYWwnfSAhaW1wb3J0YW50OyBsaW5lLWhlaWdodDoke2hlYWRlckxpbmVIZWlnaHQgPyBoZWFkZXJMaW5lSGVpZ2h0IDogJzEuNid9ICFpbXBvcnRhbnQgfVxcbmBcblxuLyoqIFdJREdFVCBTVFlMRSAqL1xuY29uc3QgT01PX1dJREdFVF9FTEVNRU5UUyA9IFtcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBkaXYub21vLXdpZGdldC1jb250YWluZXIgKmBcbiAgICAvLyAsXG4gICAgLy8gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2Lm9tb0NvbnRhaW5lciA+ICpgXG4gICAgLy8gLFxuICAgIC8vIGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdi5vbW9Cb3ggKmAsXG4gICAgLy8gYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2Lm9tb0Nsb3NlICpgLFxuICAgIC8vIGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IGRpdi5vbW9Db250cm9sICpgXG5dXG5jb25zdCBvbW9XaWRnZXRTdHlsZSA9ICd7IGZvbnQtZmFtaWx5OiBBcmlhbCAhaW1wb3J0YW50OyBmb250LXNpemU6MTZweCAhaW1wb3J0YW50OyAgbGV0dGVyLXNwYWNpbmc6bm9ybWFsICFpbXBvcnRhbnQ7IGxpbmUtaGVpZ2h0OiAxLjYgIWltcG9ydGFudDsgYmFja2dyb3VuZC1jb2xvcjogIzdhYmY0Mzt9XFxuJ1xuLyoqIFNFVCBXSURHRVQgU1RZTEUgKi9cbmNvbnN0IHNldE9tb1dpZGdldFN0eWxlID0gKG9tb1dpZGdldEVsZW1lbnRzLCBvbW9XaWRnZXRTdHlsZSkgPT4geyByZXR1cm4gb21vV2lkZ2V0RWxlbWVudHMuam9pbignLCcpICsgJyAnICsgb21vV2lkZ2V0U3R5bGUgfVxuXG4vKiogU0VUIEJPRFkgU1RZTEUgKi9cbmNvbnN0IEJPRFlfU1RZTEUgPSBbXG4gICAgYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU31gLFxuICAgIC8vIGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9ID4gbm90KC5vbW8td2lkZ2V0LWNvbnRhaW5lciA+ICopYCxcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBkaXYgPiAqYFxuXG5dXG5jb25zdCBzZXRCb2R5VGV4dFN0eWxlID0gKF9TdHlsZSwgYm9keUZvbnRGYW1pbHksIGJvZHlGb250U2l6ZSwgYm9keUZvbnRTcGFjaW5nLCBib2R5TGluZUhlaWdodCkgPT4gYm9keUZvbnRGYW1pbHkgPyBfU3R5bGUuam9pbignLCcpICsgYHsgZm9udC1mYW1pbHk6JHtib2R5Rm9udEZhbWlseX0gIWltcG9ydGFudDsgZm9udC1zaXplOiR7Ym9keUZvbnRTaXplID8gYm9keUZvbnRTaXplIDogMTB9cHggIWltcG9ydGFudDsgbGV0dGVyLXNwYWNpbmc6JHtib2R5Rm9udFNwYWNpbmcgPyBib2R5Rm9udFNwYWNpbmcgKyAncHgnIDogJ25vcm1hbCd9ICFpbXBvcnRhbnQ7IGxpbmUtaGVpZ2h0OiR7Ym9keUxpbmVIZWlnaHQgPyBib2R5TGluZUhlaWdodCA6ICcxLjYnfSAhaW1wb3J0YW50IH1cXG5gIDogJyc7XG5cbi8qKiBTRVQgQkFDR1JPVU5EIENPTE9SICovXG5jb25zdCBCQUNLR1JPVU5EX0NPTE9SX0VMRU1FTlRTID0gW1xuICAgIGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9YCxcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBkaXYuaGVhZGVyLXRvcGAsXG4gICAgYGJvZHkuJHtPTU9MQUJfQk9EWV9DTEFTU30gZGl2LmhlYWRlci1tYWluYCxcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBkaXYuZm9vdGVyLXdyYXBgXG4gICAgLFxuICAgIGBib2R5LiR7T01PTEFCX0JPRFlfQ0xBU1N9IHNlY3Rpb24jYmxvY2stYmxvY2stNDVgXG5cbl1cbmNvbnN0IHNldEJhY2tHcm91bmRDb2xvciA9IChhcHBseVRvRWxlbWVudHMsIGJnQ29sb3IpID0+IGJnQ29sb3IgPyBhcHBseVRvRWxlbWVudHMuam9pbignLCcpICsgYHsgYmFja2dyb3VuZC1jb2xvcjogJHtiZ0NvbG9yfSB9XFxuYCA6ICcnXG4vKiogXG5jb25zdCBCQUNLR1JPVU5EX0NPTE9SX0VMRU1FTlRTX0lNUE9SVEFOVCA9IFtcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBzZWN0aW9uI2Jsb2NrLWJsb2NrLTQ0LmJsb2NrLmJsb2NrLWJsb2NrLnBvc2xvdm5pY2UtYmFua29tYXRpLmJsb2NrLWdyZXktYmcucGItYmxvY2stZ3JleS1iZyAqYCxcbiAgICBgYm9keS4ke09NT0xBQl9CT0RZX0NMQVNTfSBzZWN0aW9uI2Jsb2NrLWJsb2NrLTQ0LmJsb2NrLmJsb2NrLWJsb2NrLnBvc2xvdm5pY2UtYmFua29tYXRpLmJsb2NrLWdyZXktYmcucGItYmxvY2stZ3JleS1iZyA+ICpgLFxuXVxuY29uc3Qgc2V0QmFja0dyb3VuZENvbG9ySW1wb3J0YW50ID0gKGFwcGx5VG9FbGVtZW50cywgYmdDb2xvcikgPT4gYmdDb2xvciA/IGFwcGx5VG9FbGVtZW50cy5qb2luKCcsJykgKyBgeyBiYWNrZ3JvdW5kLWNvbG9yOiAke2JnQ29sb3J9ICFpbXBvcnRhbnQgfVxcbmAgOiAnJ1xuKi9cbmxldCBlbGVtZW50cyA9IFtdO1xubGV0IGJvZHk7XG52YXIgdG9nZ2xlcjtcblxuXG5jb25zdCBzZXRDb29raWUgPSAoKSA9PiB7XG4gICAgdmFyIG9iaiA9IHtcblxuICAgICAgICBoRm9udHNpemU6IDExLFxuICAgICAgICBoRm9udEZhbWlseTogJ0FyaWFsJyxcbiAgICAgICAgaEZvbnRTcGFjaW5nOiAnMS41JyxcbiAgICAgICAgaEZvbnRMaW5lSGllZ2h0OiAnMicsXG4gICAgICAgIGJGb250U2l6ZTogMTIsXG4gICAgICAgIGJGb250RmFtaWx5OiAnQ291cmllcicsXG4gICAgICAgIGJGb250U3BhY2luZzogJzInLFxuICAgICAgICBiRm9udExpbmVIZWlnaHQ6ICcyJ1xuICAgIH1cblxuICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Q29va2llJyArIFwiPVwiICsgSlNPTi5zdHJpbmdpZnkob2JqKTtcblxufVxuXG5mdW5jdGlvbiBhZGRPbW9sYWJDbGFzc1Njb3BlVG9Cb2R5KGRvYykge1xuICAgIGNvbnN0IGJvZHkgPSBkb2MucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGlmIChib2R5ICYmICFib2R5LmNsYXNzTGlzdC5jb250YWlucyhPTU9MQUJfQk9EWV9DTEFTUykpIHtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKE9NT0xBQl9CT0RZX0NMQVNTKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93KHRleHQpIHtcbiAgICAvLyBjb252ZXJ0IHBsYWluIEhUTUwgc3RyaW5nIGludG8gRE9NIGVsZW1lbnRzc1xuICAgIGxldCB0ZW1wb3JhcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZW1wb3JhcnkuaW5uZXJIVE1MID0gaHRtbDtcbiAgICBjb25zb2xlLmxvZyh0ZXh0KTtcbiAgICAvLyB0ZW1wb3JhcnkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtd2lkZ2V0LWRpYWxvZycpWzBdLmlubmVySFRNTD1odG1sXG5cbiAgICBhZGRPbW9sYWJDbGFzc1Njb3BlVG9Cb2R5KGRvY3VtZW50KTtcbiAgICAvLyBhcHBlbmQgZWxlbWVudHMgdG8gYm9keVxuICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvbW8td2lkZ2V0LWNvbnRhaW5lcicpWzBdO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAodGVtcG9yYXJ5LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHRtcCA9IHRlbXBvcmFyeS5jaGlsZHJlblswXVxuICAgICAgICBlbGVtZW50cy5wdXNoKHRtcCk7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodG1wKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0hUTUwtLT4nK3RtcC5pbm5lckhUTUwgKyB0bXAuY2hpbGRFbGVtZW50Q291bnQpXG5cbiAgICB9XG4gICAgdG9nZ2xlciA9IHRvb2dsZVdpZGdldCgpO1xuXG4gICAgYWRkRXZlbnRIYW5kbGVyKCdoZWFkZXJPcHRpb25zJywgJ2NoYW5nZScsIFsnSU5QVVQnLCAnU0VMRUNUJ10sIGFwcGx5T21vU3R5bGVzKTtcbiAgICBhZGRFdmVudEhhbmRsZXIoJ2JvZHlPcHRpb25zJywgJ2NoYW5nZScsIFsnSU5QVVQnLCAnU0VMRUNUJ10sIGFwcGx5T21vU3R5bGVzKTtcbiAgICBhZGRFdmVudEhhbmRsZXIoJ29tb0NvbnRyb2wnLCAnY2xpY2snLCBbJ0lOUFVUJ10sIGFwcGx5T21vU3R5bGVzKTtcbiAgICBhZGRFdmVudEhhbmRsZXIoJ29tb0Nsb3NlJywgJ2NsaWNrJywgWydESVYnXSwgdG9nZ2xlci50b29nbGUpXG4gICAgYWRkRXZlbnRIYW5kbGVyKCdiZ0NvbG9yJywgJ2NsaWNrJywgWydESVYnXSwgY2xpY2tDb2xsb3IpO1xuICAgIHNldENvb2tpZSgpO1xuXG59XG5cbi8qKiBhcHBseXMgZXZlbnQgaGFuZGxlciB0byBnaXZlbiBlbGVtZW50ICovXG5jb25zdCBhZGRFdmVudEhhbmRsZXIgPSAoZWxlbWVudCwgZXZlbnQsIHNlbGVjdG9yLCBoYW5kbGVyKSA9PiB7XG4gICAgdmFyIG9tb0VsZW1lbnRzID0gQXJyYXkuZnJvbShib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZWxlbWVudClbMF0uY2hpbGRyZW4pXG4gICAgb21vRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdG9yLmluY2x1ZGVzKGVsZW1lbnQubm9kZU5hbWUpKSBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpO1xuXG4gICAgfSk7XG59XG5cblxuLyoqIENPTExPUiBQSUNLRVIgUkVGQUNUT1IgKi9cbmNvbnN0IGNvbGxvclN0YWNrID0gW107XG5cbmNvbnN0IGNsaWNrQ29sbG9yID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGNvbGxvclN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIG9iaiA9IGNvbGxvclN0YWNrLnBvcCgpO1xuICAgICAgICBvYmouZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gb2JqLnN0eWxlXG4gICAgfVxuICAgIGxldCBjb2xvciA9IGV2ZW50LnRhcmdldC5zdHlsZS5jc3NUZXh0O1xuICAgIGV2ZW50LnRhcmdldC5zdHlsZSA9IGNvbG9yICsgJzsgJyArICcgb3V0bGluZTogMnB4IHNvbGlkIGJsdWU7J1xuICAgIGNvbGxvclN0YWNrLnB1c2goe1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXQsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbGVtZW50XG4gICAgICAgIGNvbG9yOiBjb2xvci5zdWJzdHJpbmcoY29sb3IuaW5kZXhPZignOicpICsgMSksICAgLy8gc2FtbyBib2phXG4gICAgICAgIHN0eWxlOiBjb2xvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtvbXBsZXRhbiBzdGlsXG4gICAgfSlcblxuICAgIGNvbnNvbGUubG9nKCdjbGljayBDb2xsb3InICsgZXZlbnQudGFyZ2V0LnN0eWxlLmNzc1RleHQpXG4gICAgYXBwbHlPbW9TdHlsZXMoKTtcbn1cblxuXG5cbmNvbnN0IHRvb2dsZVdpZGdldCA9ICgpID0+IHtcbiAgICBsZXQgb3BlbiA9IHRydWVcbiAgICB2YXIgd2lkZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vQm94JylbMF07XG4gICAgdmFyIGNsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb21vQ2xvc2UnKVswXS5maXJzdENoaWxkO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvb2dsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmUnKVxuICAgICAgICAgICAgICAgIGNsb3NlLnRleHRDb250ZW50ID0gJ29wZW4nXG4gICAgICAgICAgICAgICAgb3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OmJsb2NrJylcbiAgICAgICAgICAgICAgICBjbG9zZS50ZXh0Q29udGVudCA9ICdjbG9zZSdcbiAgICAgICAgICAgICAgICBvcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVPbW9TdHlsZSgpIHtcbiAgICB2YXIgYmdDb2wgPSBjb2xsb3JTdGFjay5sZW5ndGggPiAwID8gY29sbG9yU3RhY2tbY29sbG9yU3RhY2subGVuZ3RoIC0gMV0uY29sb3IgOiAndHJhbnNwYXJlbnQnXG4gICAgLy8gYWxlcnQoYmdDb2wpO1xuICAgIHZhciBoZWFkZXJGb250U2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoc2l6ZScpLnZhbHVlO1xuICAgIHZhciBoZWFkZXJGb250RmFtaWx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcl9mZicpLnZhbHVlXG4gICAgdmFyIGhlYWRlckZvbnRTcGFjaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hzcGFjaW5nJykudmFsdWVcbiAgICB2YXIgaGVhZGVyTGluZUhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaGVpZ2h0JykudmFsdWVcblxuICAgIHZhciBib2R5Rm9udFNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnNpemUnKS52YWx1ZTtcbiAgICB2YXIgYm9keUZvbnRGYW1pbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keV9mZicpLnZhbHVlXG4gICAgdmFyIGJvZHlGb250U3BhY2luZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdic3BhY2luZycpLnZhbHVlXG4gICAgLy8gY29uc29sZS5sb2coYm9keUZvbnRTcGFjaW5nKTtcbiAgICB2YXIgYm9keUxpbmVIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmhlaWdodCcpLnZhbHVlXG5cblxuICAgIHZhciBzdHlsZSA9IHNldEJhY2tHcm91bmRDb2xvcihCQUNLR1JPVU5EX0NPTE9SX0VMRU1FTlRTLCBiZ0NvbClcbiAgICAvLyBzdHlsZSArPSBzZXRCYWNrR3JvdW5kQ29sb3JJbXBvcnRhbnQoQkFDS0dST1VORF9DT0xPUl9FTEVNRU5UU19JTVBPUlRBTlQsYmdDb2wpXG4gICAgdmFyIGhlYWRlclN0eWxlID0gc2V0SGVhZGVyU3R5bGUodHJhbnNmb3JtSGVhZGVyU3R5bGVzKCkuam9pbignLCcpLCBoZWFkZXJGb250RmFtaWx5LCBoZWFkZXJGb250U2l6ZSwgaGVhZGVyRm9udFNwYWNpbmcsIGhlYWRlckxpbmVIZWlnaHQpO1xuICAgIHN0eWxlICs9IGhlYWRlclN0eWxlO1xuICAgIHZhciBib2R5U3R5bGUgPSBzZXRCb2R5VGV4dFN0eWxlKEJPRFlfU1RZTEUsIGJvZHlGb250RmFtaWx5LCBib2R5Rm9udFNpemUsIGJvZHlGb250U3BhY2luZywgYm9keUxpbmVIZWlnaHQpO1xuICAgIHN0eWxlICs9IGJvZHlTdHlsZTtcbiAgICB2YXIgd2lkZ2V0U3R5bGUgPSBzZXRPbW9XaWRnZXRTdHlsZShPTU9fV0lER0VUX0VMRU1FTlRTLCBvbW9XaWRnZXRTdHlsZSk7XG4gICAgc3R5bGUgKz0gd2lkZ2V0U3R5bGVcblxuICAgIGNvbnNvbGUubG9nKHN0eWxlKTtcbiAgICByZXR1cm4gc3R5bGU7XG59XG5cbi8qKiBoYWNrIFRPRE8hISAqL1xudmFyIGZvcmNlUmVkcmF3ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuICAgIGlmICghZWxlbWVudCkgeyByZXR1cm47IH1cblxuICAgIHZhciBuID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKTtcbiAgICB2YXIgZGlzcCA9IGVsZW1lbnQuc3R5bGUuZGlzcGxheTsgIC8vIGRvbid0IHdvcnJ5IGFib3V0IHByZXZpb3VzIGRpc3BsYXkgc3R5bGVcblxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQobik7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3A7XG4gICAgICAgIG4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuKTtcbiAgICB9LCAwKTsgLy8geW91IGNhbiBwbGF5IHdpdGggdGhpcyB0aW1lb3V0IHRvIG1ha2UgaXQgYXMgc2hvcnQgYXMgcG9zc2libGVcbn1cblxuZnVuY3Rpb24gZ2V0TGFzdEFwcGxpZWRTdHlsZVNoZWV0KCkge1xuICAgIHZhciBjaGlsZHJlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiAgICB2YXIgY2hpbGRyZW5fbGVuID0gY2hpbGRyZW4uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0eWxlJykubGVuZ3RoXG4gICAgdmFyIHN0eWxlID0gY2hpbGRyZW4uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0eWxlJylbY2hpbGRyZW5fbGVuIC0gMV07XG4gICAgcmV0dXJuIHN0eWxlO1xufVxuXG5cbmNvbnN0IGFwcGx5T3ZlcmlkZXMgPSAoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvbW9sYWJfc3R5bGVfdycpKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGdldExhc3RBcHBsaWVkU3R5bGVTaGVldCgpO1xuICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBnZW5lcmF0ZU9tb1N0eWxlKCk7XG4gICAgICAgIGZvcmNlUmVkcmF3KHN0eWxlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBjc3MudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgY3NzLmlkID0gJ29tb2xhYl9zdHlsZV93J1xuXG4gICAgdmFyIHN0eWxlID0gZ2VuZXJhdGVPbW9TdHlsZSgpO1xuICAgIGlmIChjc3Muc3R5bGVTaGVldClcbiAgICAgICAgY3NzLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHN0eWxlXG4gICAgZWxzZVxuICAgICAgICBjc3MuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3R5bGUpKTtcblxuICAgIC8qIEFwcGVuZCBzdHlsZSB0byB0aGUgdGFnIG5hbWUgKi9cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoY3NzKTtcbiAgICBcbn1cblxuXG5cbmNvbnN0IHJlbW92ZU92ZXJpZGVzID0gKCkgPT4ge1xuICAgIHZhciBvbW9fc3R5bGVfdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvbW9sYWJfc3R5bGVfdycpO1xuICAgIHZhciBjaGlsZHJlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiAgICB2YXIgc3R5bGUgPSBnZXRMYXN0QXBwbGllZFN0eWxlU2hlZXQoKVxuICAgIGNvbnNvbGUubG9nKG9tb19zdHlsZV93ID09PSBzdHlsZSk7XG4gICAgLyoqICBpZiBvbW9sYWJfc3R5bGVfdyBzdHlsZXNoZWV0IGlzIGFwcGxpZWQgcmVtb3ZlIGl0LCBvdGhlcndpc2UgaWdub3JlICovXG4gICAgaWYgKG9tb19zdHlsZV93ID09PSBzdHlsZSlcbiAgICAgICAgY2hpbGRyZW4ucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuXG5cbmZ1bmN0aW9uIGFwcGx5T21vU3R5bGVzKGV2ZW50KSB7XG4gICAgLy8gYWxlcnQoJ2NsaWNrJyk7XG4gICAgLy8gY29uc29sZS5sb2coY2hlY2sgKyAnICcgKyBldmVudC50YXJnZXQpO1xuICAgIHZhciBjaGVjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBseU92ZXJpZGVzJykuY2hlY2tlZDtcbiAgICBjaGVjayA/IGFwcGx5T3ZlcmlkZXMoKSA6IHJlbW92ZU92ZXJpZGVzKClcbiAgICAvLyBjb25zb2xlLmxvZyhjaGVjayArICcgJyArIGV2ZW50LnRhcmdldCk7XG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL21lc3NhZ2UuanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPCEtLSA8ZGl2IGNsYXNzPVxcXCJqcy13aWRnZXQtb3ZlcmxheVxcXCI+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwianMtd2lkZ2V0LWRpYWxvZ1xcXCI+PC9kaXY+IC0tPlxcblxcbjxtZXRhIG5hbWU9XFxcInZpZXdwb3J0XFxcIiBjb250ZW50PVxcXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm9tb0NvbnRhaW5lclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwib21vQ2xvc2VcXFwiIGlkPVxcXCJvbW9DbG9zZVxcXCI+PGRpdj5jbG9zZTwvZGl2PjwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwib21vQm94XFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwib21vRWxlbWVudHNcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBpZD1cXFwiZ2xvYmFsT3B0aW9uc1xcXCIgY2xhc3M9XFxcImdsb2JhbE9wdGlvbnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgPGRpdiBpZD1cXFwiYmdDb2xvclxcXCIgY2xhc3M9XFxcImJnQ29sb3JcXFwiPlxcbiAgICAgICAgICAgICAgICAgPGxhYmVsPkJhY2tncm91bmQ8L2xhYmVsPlxcblxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogI0YxRjVFRDtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogIzlGQjVERTtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogI0IwREVENTtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogI0IxRDg5QTtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogI0ZBRjI5MztcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogI0ZFREU3NTtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogI0I4OTRDNDtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogI0ZCRDRCNTtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogI0UyQjBBRjtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogI0Q5RDhEODtcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sXFxcIiBpZD1cXFwibm9CYWNrZ3JvdW5kXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPCEtLSA8bGFiZWw+QmFja2dyb3VuZCBjb2xsb3IgPC9sYWJlbD48aW5wdXQgdHlwZT1cXFwiY29sb3JcXFwiIGlkPVxcXCJiZ0NvbG9yXFxcIiBuYW1lPVxcXCJoZWFkXFxcIiB2YWx1ZT1cXFwiI2U2NjQ2NVxcXCI+IC0tPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImhlYWRlck9wdGlvbnNcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD48c3Ryb25nPkhlYWRlcjwvc3Ryb25nPjwvbGFiZWw+IFxcbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XFxcImhlYWRlcl9mZlxcXCI+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkdlb3JnaWFcXFwiPkdlb3JnaWE8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQXJpYWxcXFwiPkFyaWFsPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlJvYm90b1xcXCI+Um9ib3RvPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkNvdXJpZXJcXFwiPkNvdXJpZXI8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQ29taWMgU2FucyBNU1xcXCI+Q29taWMgU2FucyBNUzwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJkTGlnaHRPbmVcXFwiPmRMaWdodE9uZTwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICAgICAgICA8bGFiZWw+Zm9udCBzaXplPC9sYWJlbD48aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBpZD1cXFwiaHNpemVcXFwiIG1pbj1cXFwiMTBcXFwiIG1heD1cXFwiMzVcXFwiPlxcbiAgICAgICAgICAgICAgPGxhYmVsPmZvbnQgc3BhY2luZzwvbGFiZWw+PGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgaWQ9XFxcImhzcGFjaW5nXFxcIiBtaW49XFxcIi0xXFxcIiBtYXg9XFxcIjVcXFwiIHN0ZXA9XFxcIjAuNVxcXCI+XFxuICAgICAgICAgICAgICA8bGFiZWw+bGluZSBoZWlnaHQ8L2xhYmVsPjxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGlkPVxcXCJoaGVpZ2h0XFxcIiBtaW49XFxcIjEuNlxcXCIgbWF4PVxcXCIyXFxcIiBzdGVwPVxcXCIwLjFcXFwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJvZHlPcHRpb25zXFxcIj5cXG4gICAgICAgICAgICA8bGFiZWw+PHN0cm9uZz5Cb2R5Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9zdHJvbmc+PC9sYWJlbD5cXG4gICAgICAgICAgICA8c2VsZWN0IGlkPVxcXCJib2R5X2ZmXFxcIj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiR2VvcmdpYVxcXCI+R2VvcmdpYTwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJBcmlhbFxcXCI+QXJpYWw8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiUm9ib3RvXFxcIj5Sb2JvdG88L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiQ291cmllclxcXCI+Q291cmllcjwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJDb21pYyBTYW5zIE1TXFxcIj5Db21pYyBTYW5zIE1TPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcImRMaWdodE9uZVxcXCI+ZExpZ2h0T25lPC9vcHRpb24+XFxuICAgICAgICAgICAgICA8L3NlbGVjdD5cXG4gICAgICAgICAgICAgIDxsYWJlbD5mb250IHNpemU8L2xhYmVsPjxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGlkPVxcXCJic2l6ZVxcXCIgbWluPVxcXCIxMFxcXCIgbWF4PVxcXCIzNVxcXCI+XFxuICAgICAgICAgICAgICA8bGFiZWw+Zm9udCBzcGFjaW5nPC9sYWJlbD48aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBpZD1cXFwiYnNwYWNpbmdcXFwiIG1pbj1cXFwiLTFcXFwiIG1heD1cXFwiNVxcXCIgc3RlcD1cXFwiMC41XFxcIj5cXG4gICAgICAgICAgICAgIDxsYWJlbD5saW5lIGhlaWdodDwvbGFiZWw+PGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgaWQ9XFxcImJoZWlnaHRcXFwiIG1pbj1cXFwiMS42XFxcIiBtYXg9XFxcIjJcXFwiIHN0ZXA9XFxcIjAuMVxcXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvbW9Db250cm9sXFxcIj5cXG4gICAgICAgICAgICBJZ25pdGU6PGlucHV0IHR5cGU9XFxcImNoZWNrYm94XFxcIiBpZD1cXFwiYXBwbHlPdmVyaWRlc1xcXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgXFxuICAgICAgXFxuICAgICAgPC9kaXY+XFxuXFxuXFxuICAgIFxcblxcblxcblxcblwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXdzL21lc3NhZ2UuaHRtbFxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXNzYWdlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXNzYWdlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXNzYWdlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlld3MvbWVzc2FnZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG4uc29tZWNsYXNze1xcbiAgICBmb250LWZhbWlseTogXFxcIkFyaWFsXFxcIjtcXG4gICAgZm9udC1zaXplOjggXFxufVxcblxcbi5qcy13aWRnZXQtb3ZlcmxheXtcXG4gICAgei1pbmRleDogMTAwMDE7IFxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogMHB4O1xcbiAgICBib3R0b206IDBweDtcXG4gICAgbGVmdDogMHB4O1xcbiAgICByaWdodDogMHB4O1xcbiAgICBvcGFjaXR5OiAwLjg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDQwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6ICMzMzM7XFxufVxcbi5qcy13aWRnZXQtZGlhbG9ne1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHotaW5kZXg6IDEwMDAyO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRvcDogMCU7XFxuICAgIG1hcmdpbjogMCAwIDAgLTEyMHB4O1xcbiAgICB3aWR0aDogYXV0bztcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMzMzNcXG59XFxuXFxuLm9tby13aWRnZXQtY29udGFpbmVyID4gKntcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB6LWluZGV4OiAxMDAyO1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBmb250LWZhbWlseTogXFxcIkFyaWFsXFxcIjtcXG4gICAgZm9udC1zaXplOjE2cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IzdhYmY0MztcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzMzM1xcbn1cXG4uZ2xvYmFsT3B0aW9uc3tcXG4gICAgYm9yZGVyOiBkb3R0ZWQgMXB4IHJnYig1MSwgNTEsIDUxKTtcXG4gICBcXG4gICAgIFxcbn1cXG4uYmdDb2xvcntcXG4gICAgd2lkdGg6IDEwMCU7XFxufVxcbi5jb2wge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCAwcHggMXB4ICNEMUQ1RDMgaW5zZXQ7XFxuICAgIC8qIGhlaWdodDogMjlweDsgKi9cXG4gICAgd2lkdGg6IDQwcHg7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCByZ2IoNTEsIDUxLCA1MSk7XFxufVxcbi8qIC5iZ0NvbG9ye1xcbiAgICBib3JkZXI6IHNvbGlkIDJweCByZ2IoNTEsIDUxLCA1MSk7XFxufSAqL1xcbi5oZWFkZXJPcHRpb25ze1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCByZ2IoMjA2LCAyMDksIDIxKSBcXG59XFxuLmJvZHlPcHRpb25ze1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCByZ2IoMTkyLCAxNCwgMTQpIFxcbn1cXG4ub21vQ2xvc2V7XFxuICAgIHotaW5kZXg6IDEwMDI7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiQXJpYWxcXFwiO1xcbiAgICBmb250LXNpemU6MTdweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMzMzM7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gICAgXFxufVxcblxcblxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjQwcHgpIHtcXG4gICAgXFxuICAgIC5vbW8td2lkZ2V0LWNvbnRhaW5lcntcXG4gICAgICAgIHdpZHRoOiA2NDBweDtcXG4gICAgfVxcbiAgICAub21vQ2xvc2Uge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgZmxvYXQ6IGluaGVyaXQ7XFxuICAgICAgfVxcbiAgfVwiLCBcIlwiXSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3JjL3ZpZXdzL21lc3NhZ2UuY3NzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwie1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW19pXTsgLy8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuICAgICAgLy8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcbiAgICAgIC8vIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cbiAgICAgIC8vIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblxuICAgICAgaWYgKGl0ZW1bMF0gPT0gbnVsbCB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBpZiAobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2UgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCIoXCIuY29uY2F0KGl0ZW1bMl0sIFwiKSBhbmQgKFwiKS5jb25jYXQobWVkaWFRdWVyeSwgXCIpXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG5cbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gIHJldHVybiBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=