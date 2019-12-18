/* eslint-disable max-len */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
const IMPORTANT_ELEMENTS_SELECTOR = '*:not(img):not(:empty):not([aria-hidden="true"]):not([class*="icon"])';
exports.IMPORTANT_ELEMENTS_SELECTOR = IMPORTANT_ELEMENTS_SELECTOR;

/** GENERATED OMO CLASS BODY */
const OMOLAB_BODY_CLASS = `omolab-w-body-${Date.now()}-${Math.ceil(Math.random() * 1000)}`;
exports.OMOLAB_BODY_CLASS = OMOLAB_BODY_CLASS;

/** COOKIE NAME */
const OMO_WIDGET_COOKIE = 'omolab-w-cookie';
exports.OMO_WIDGET_COOKIE = OMO_WIDGET_COOKIE;

/**
 * DEFAULT HEADER VALUES */
// var HEADER_LINE_HEIGHT;
// var HEADER_FONT_SPACING;
// var HEADER_FONT_SIZE;

/** DEFAULT BODY VALUES */
// var BODY_LINE_HEIGHT;
// var BODY_FONT_SPACING;
// var BODY_FONT_SIZE;

const COLOR_BLACK = 'rgb(0, 0, 0)';
const COLOR_WHITE = 'rgb(255, 255, 255)';

/** HEADER STYLES */

var HEADER_STYLE_ELEMENTS;
exports.HEADER_STYLE_ELEMENTS = HEADER_STYLE_ELEMENTS;

/** CUSTOM_HEADER_STYLES */
var CUSTOM_HEADER_STYLE_ELEMENTS;
exports.CUSTOM_HEADER_STYLE_ELEMENTS = CUSTOM_HEADER_STYLE_ELEMENTS;

const addPixelsToNumber = (value) => `${value}px`;

const transformHeaderStyles = (elements) => elements.map((element) => `body.${OMOLAB_BODY_CLASS} ${element}, body.${OMOLAB_BODY_CLASS} ${element} * `);

/**
 * INVERT FONT FACE COLLOR
 * @param {} bgColor
 */
const inverseFontFaceColor = (bgColor) => {
  let styleBlack = '';
  if (bgColor.trim() === COLOR_BLACK) {
    // console.log('Bgcolor is black');
    styleBlack = 'color:white !important;';
  }
  if (bgColor.trim() === COLOR_WHITE) {
    // console.log('Bgcolor is white');
    styleBlack = 'color:black !important;';
  }
  return styleBlack;
};

const setHeaderStyle = (headerStyleElements, headerFontFamily, headerFontSize, headerFontSpacing, headerLineHeight, bgColor) => {
  const headerStyle = `${headerStyleElements}{ 
    font-family:${headerFontFamily} !important; 
    font-size:${headerFontSize ? addPixelsToNumber(headerFontSize) : addPixelsToNumber(this.HEADER_FONT_SIZE)} !important; 
    letter-spacing:${headerFontSpacing ? addPixelsToNumber(headerFontSpacing) : addPixelsToNumber(this.HEADER_FONT_SPACING)} !important; 
    line-height:${headerLineHeight ? addPixelsToNumber(headerLineHeight) : addPixelsToNumber(this.HEADER_LINE_HEIGHT)} !important;
    ${inverseFontFaceColor(bgColor)}}\n`;
  return headerStyle;
};

exports.transformHeaderStyles = transformHeaderStyles;
exports.setHeaderStyle = setHeaderStyle;


/** WIDGET STYLE */
var OMO_WIDGET_ELEMENTS;
exports.OMO_WIDGET_ELEMENTS = OMO_WIDGET_ELEMENTS;

const appendBodyToCssSelector = (elements) => elements.map((element) => `body.${OMOLAB_BODY_CLASS} ${element}`);

const omoWidgetStyle = '{ color:black }\n';
exports.omoWidgetStyle = omoWidgetStyle;

/** SET WIDGET STYLE */
const setOmoWidgetStyle = (omoWidgetElements, style) => `${appendBodyToCssSelector(omoWidgetElements).join(',')} ${style}`;
exports.setOmoWidgetStyle = setOmoWidgetStyle;


/** CUSTOM ELEMENTS TO TWEAK CSS DEFINED HERE
 * ( OVERFLOW ETC) */
// var ELEMENTS_TO_TWEAK_STYLE;

const BODY_STYLE_TWEAKS = (body, elementsToTweak) => {
  var arr = [];
  elementsToTweak.forEach((element) => {
    arr.push(`body.${body} ${element.element} {${element.style}}`);
  });
  return arr;
};

const TWEAK = () => BODY_STYLE_TWEAKS(OMOLAB_BODY_CLASS, this.ELEMENTS_TO_TWEAK_STYLE).join(',').replace(',', '\n');
exports.TWEAK = TWEAK;

/** SET BODY STYLE */
var BODY_STYLE;
exports.BODY_STYLE = BODY_STYLE;

/** SET OMO STYLE ON SELECTED  BODY ELEMENTS */
const setBodyTextStyle = (bodyElements, bodyFontFamily, bodyFontSize, bodyFontSpacing, bodyLineHeight, bgColor) => {
  const bodyTextStyle = bodyFontFamily ? `${appendBodyToCssSelector(bodyElements).join(',')}{ 
    font-family:${bodyFontFamily} !important; 
    font-size:${bodyFontSize ? addPixelsToNumber(bodyFontSize) : addPixelsToNumber(this.BODY_FONT_SIZE)} !important; 
    letter-spacing:${bodyFontSpacing ? addPixelsToNumber(bodyFontSpacing) : addPixelsToNumber(this.BODY_FONT_SPACING)} !important; 
    line-height:${bodyLineHeight ? addPixelsToNumber(bodyLineHeight) : addPixelsToNumber(this.BODY_LINE_HEIGHT)} !important; 
    ${inverseFontFaceColor(bgColor)}}\n` : '';
  return bodyTextStyle;
};
exports.setBodyTextStyle = setBodyTextStyle;

/** SET BACKGROUND COLOR
 *
 * DEFINE ELEMENTS FOR BACKGROUND CHANGE COLLOR HERE
 */
var BACKGROUND_COLOR_ELEMENTS;
exports.BACKGROUND_COLOR_ELEMENTS = BACKGROUND_COLOR_ELEMENTS;

const setBackGroundColor = (applyToElements, bgColor) => {
  return bgColor ? `${appendBodyToCssSelector(applyToElements).join(',')} { background-color: ${bgColor} !important; ${inverseFontFaceColor(bgColor)}}\n` : '';
};
exports.setBackGroundColor = setBackGroundColor;


// eslint-disable-next-line vars-on-top
var fetch = require('node-fetch');

const readConfigurationFromFile = (conf) => {
  return new Promise((resolve, reject) => {
    fetch(conf)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((text) => {
        // console.log(text.BACKGROUND_COLOR_ELEMENTS);
        this.HEADER_STYLE_ELEMENTS = text.HEADER_STYLE_ELEMENTS;
        this.CUSTOM_HEADER_STYLE_ELEMENTS = text.CUSTOM_HEADER_STYLE_ELEMENTS;
        this.OMO_WIDGET_ELEMENTS = text.OMO_WIDGET_ELEMENTS;
        this.ELEMENTS_TO_TWEAK_STYLE = text.ELEMENTS_TO_TWEAK_STYLE;
        this.BODY_STYLE = text.BODY_STYLE;
        this.BACKGROUND_COLOR_ELEMENTS = text.BACKGROUND_COLOR_ELEMENTS;
        this.HEADER_LINE_HEIGHT = text.HEADER_LINE_HEIGHT;
        this.HEADER_FONT_SPACING = text.HEADER_FONT_SPACING;
        this.HEADER_FONT_SIZE = text.HEADER_FONT_SIZE;
        this.BODY_LINE_HEIGHT = text.BODY_LINE_HEIGHT;
        this.BODY_FONT_SPACING = text.BODY_FONT_SPACING;
        this.BODY_FONT_SIZE = text.BODY_FONT_SIZE;
        resolve('FINISHED LOADING STYLESHEET');
      })
      .catch((err) => {
        reject(`${err} in file ${conf}`);
      });
  });
};
exports.readConfigurationFromFile = readConfigurationFromFile;
