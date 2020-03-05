/* eslint-disable max-len */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
const IMPORTANT_ELEMENTS_SELECTOR =
  '*:not(img):not(:empty):not([aria-hidden="true"]):not([class*="icon"])';
exports.IMPORTANT_ELEMENTS_SELECTOR = IMPORTANT_ELEMENTS_SELECTOR;

/** GENERATED OMO CLASS BODY */
const OMOLAB_BODY_CLASS = `omolab-w-body-${Date.now()}-${Math.ceil(
  Math.random() * 1000
)}`;
exports.OMOLAB_BODY_CLASS = OMOLAB_BODY_CLASS;

/** COOKIE NAME */
const OMO_WIDGET_COOKIE = "omolab-w-cookie";
exports.OMO_WIDGET_COOKIE = OMO_WIDGET_COOKIE;

const COLOR_BLACK = "#231F20";
const COLOR_WHITE = "#EFF3EE";

var BODY_FONT_FAMILY;
exports.BODY_FONT_FAMILY;
/** HEADER STYLES */
var HEADER_STYLE_ELEMENTS;
exports.HEADER_STYLE_ELEMENTS = HEADER_STYLE_ELEMENTS;

/** CUSTOM_HEADER_STYLES */
var CUSTOM_HEADER_STYLE_ELEMENTS;
exports.CUSTOM_HEADER_STYLE_ELEMENTS = CUSTOM_HEADER_STYLE_ELEMENTS;

const addPixelsToNumber = value => `${value}px`;

const transformHeaderStyles = elements =>
  elements.map(
    element =>
      `body.${OMOLAB_BODY_CLASS} ${element}, body.${OMOLAB_BODY_CLASS} ${element} * `
  );

/**
 * INVERT FONT FACE COLLOR
 * @param {} bgColor
 */
const inverseFontFaceColor = bgColor => {
  console.log("inverseFontFaceColor:" + bgColor);
  let styleBlack = "";

  if (typeof bgColor !== "undefined" && bgColor.trim() === COLOR_BLACK) {
    styleBlack = "color:white !important;";
  }
  // if (typeof bgColor !== "undefined" && bgColor.trim() === COLOR_WHITE) {
  //   styleBlack = "color:black !important;";
  // }
  return styleBlack;
};

const setHeaderStyle = (
  headerStyleElements,
  headerFontFamily,
  headerFontWeight,
  headerFontSize,
  headerFontSpacing,
  headerLineHeight,
  bgColor
) => {
  const headerStyle = `${headerStyleElements}{ 
    font-family:${headerFontFamily} !important; 
    font-size:${
      headerFontSize
        ? addPixelsToNumber(headerFontSize)
        : addPixelsToNumber(this.HEADER_FONT_SIZE)
    } !important; 
    font-weight:${headerFontWeight} !important;
    letter-spacing:${
      headerFontSpacing
        ? addPixelsToNumber(headerFontSpacing)
        : addPixelsToNumber(this.HEADER_FONT_SPACING)
    } !important; 
    line-height:${
      headerLineHeight ? headerLineHeight : this.HEADER_LINE_HEIGHT
    } !important;
    ${inverseFontFaceColor(bgColor)}}\n`;
  return headerStyle;
};

exports.transformHeaderStyles = transformHeaderStyles;
exports.setHeaderStyle = setHeaderStyle;

/** WIDGET STYLE */
var OMO_WIDGET_ELEMENTS;
exports.OMO_WIDGET_ELEMENTS = OMO_WIDGET_ELEMENTS;

const appendBodyToCssSelector = elements =>
  elements.map(element => `body.${OMOLAB_BODY_CLASS} ${element}`);

const omoWidgetStyle = "{ color:black }\n";
exports.omoWidgetStyle = omoWidgetStyle;

/** SET WIDGET STYLE */
const setOmoWidgetStyle = (omoWidgetElements, style) =>
  `${appendBodyToCssSelector(omoWidgetElements).join(",")} ${style}`;
exports.setOmoWidgetStyle = setOmoWidgetStyle;

/** CUSTOM ELEMENTS TO TWEAK CSS DEFINED HERE
 * ( OVERFLOW ETC) */
// var ELEMENTS_TO_TWEAK_STYLE;

const BODY_STYLE_TWEAKS = (body, elementsToTweak) => {
  var arr = [];
  elementsToTweak.forEach(element => {
    arr.push(`body.${body} ${element.element} {${element.style}}`);
  });
  return arr;
};

const TWEAK = () =>
  BODY_STYLE_TWEAKS(OMOLAB_BODY_CLASS, this.ELEMENTS_TO_TWEAK_STYLE)
    .join(",")
    .replace(",", "\n");
exports.TWEAK = TWEAK;

/** SET BODY STYLE */
var BODY_STYLE;
exports.BODY_STYLE = BODY_STYLE;

const getFontName = prop =>
  `OmoType${CURRENT_CONFIG[prop].fontVersion}-${CURRENT_CONFIG[prop].fontWeight}${CURRENT_CONFIG[prop].letterSpacing}`; // eslint-disable-line no-unused-vars

function applyFontFamily(fontName, elementProp) {
  // eslint-disable-line no-unused-vars
  const fontLoaded = document.fonts.check(`12px ${fontName}`);
  if (!fontLoaded) {
    let url = chrome.runtime.getURL(`fonts/woff/${fontName}.woff`);
    let dMediumFour = new FontFace(fontName, `url(${url})`);
    dMediumFour
      .load()
      .then(loadedFont => document.fonts.add(loadedFont))
      .catch(() => {});
  }
  ELEMENTS[elementProp].fontName().style.fontFamily = fontName;
}

/** SET OMO STYLE ON SELECTED  BODY ELEMENTS */
const setBodyTextStyle = (
  bodyElements,
  bodyFontFamily,
  bodyFontWeight,
  bodyFontSize,
  bodyFontSpacing,
  bodyLineHeight,
  bgColor
) => {
  const bodyTextStyle = bodyFontFamily
    ? `${appendBodyToCssSelector(bodyElements).join(",")}{ 
    font-family:${bodyFontFamily} !important; 
    font-size:${
      bodyFontSize
        ? addPixelsToNumber(bodyFontSize)
        : addPixelsToNumber(this.BODY_FONT_SIZE)
    } !important; 
    font-weight:${bodyFontWeight} !important;
    letter-spacing:${
      bodyFontSpacing
        ? addPixelsToNumber(bodyFontSpacing)
        : addPixelsToNumber(this.BODY_FONT_SPACING)
    } !important; 
    line-height:${
      bodyLineHeight ? bodyLineHeight : this.BODY_LINE_HEIGHT
    } !important; 
    ${inverseFontFaceColor(bgColor)}}\n`
    : "";
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
  return bgColor
    ? `${appendBodyToCssSelector(applyToElements).join(
        ","
      )} { background-color: ${bgColor} !important; ${inverseFontFaceColor(
        bgColor
      )}}\n`
    : "";
};
exports.setBackGroundColor = setBackGroundColor;

// eslint-disable-next-line vars-on-top
var fetch = require("node-fetch");
var axios = require("axios");

const readConfigurationFromFile = conf => {
  return new Promise((resolve, reject) => {
    axios
      .get(conf)
      .then(response => {
        console.log(response);
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        let text = response.data;
        this.BODY_FONT_FAMILY = text.BODY_FONT_FAMILY || "Roboto";
        this.HEADER_FONT_FAMILY = text.HEADER_FONT_FAMILY || "Roboto";

        this.HEADER_STYLE_ELEMENTS = text.HEADER_STYLE_ELEMENTS;
        this.CUSTOM_HEADER_STYLE_ELEMENTS = text.CUSTOM_HEADER_STYLE_ELEMENTS;
        this.OMO_WIDGET_ELEMENTS = text.OMO_WIDGET_ELEMENTS;
        this.ELEMENTS_TO_TWEAK_STYLE = text.ELEMENTS_TO_TWEAK_STYLE;
        this.BODY_STYLE = text.BODY_STYLE;
        this.BACKGROUND_COLOR_ELEMENTS = text.BACKGROUND_COLOR_ELEMENTS;

        this.HEADER_LINE_HEIGHT = text.HEADER_LINE_HEIGHT || 0;
        this.HEADER_FONT_SPACING = text.HEADER_FONT_SPACING || 20;
        this.HEADER_FONT_SIZE = text.HEADER_FONT_SIZE || 20;
        this.BODY_LINE_HEIGHT = text.BODY_LINE_HEIGHT || 0;
        this.BODY_LINE_HEIGHT_MAX = text.BODY_LINE_HEIGHT_MAX || 40;
        this.BODY_FONT_SPACING = text.BODY_FONT_SPACING || 0;
        this.BODY_FONT_SIZE = text.BODY_FONT_SIZE || 13;
        this.BODY_FONT_SIZE_MAX = text.BODY_FONT_SIZE_MAX || 30;
        this.BODY_FONT_WEIGHT = text.BODY_FONT_WEIGHT || "normal";
        this.DEFAULT_BACKGROUND = text.DEFAULT_BACKGROUND || "transparent";
        /**must have elements for widget to work
         * default body and header SHOULD ALSO BE DEFINED IN CONF FILE, if not
         * some aproximaton values are given above i.e
         *
         */
        if (
          [
            this.HEADER_STYLE_ELEMENTS,
            this.BODY_STYLE,
            this.BACKGROUND_COLOR_ELEMENTS,
            this.OMO_WIDGET_ELEMENTS,
            this.CUSTOM_HEADER_STYLE_ELEMENTS
          ].includes(undefined)
        ) {
          throw Error(
            `HEADER_STYLE_ELEMENTS,CUSTOM_HEADER_STYLE_ELEMENTS, OMO_WIDGET_ELEMENTS,BODY_STYLE, BACKGROUND_COLOR_ELEMENTS are mandatory!!!`
          );
        }
        resolve("FINISHED LOADING STYLESHEET");
      })
      .catch(err => {
        reject(`${err} in file ${conf}`);
      });
    // .then(text => {
    // this.BODY_FONT_FAMILY = text.BODY_FONT_FAMILY || "Roboto";
    // this.HEADER_FONT_FAMILY = text.HEADER_FONT_FAMILY || "Roboto";

    // this.HEADER_STYLE_ELEMENTS = text.HEADER_STYLE_ELEMENTS;
    // this.CUSTOM_HEADER_STYLE_ELEMENTS = text.CUSTOM_HEADER_STYLE_ELEMENTS;
    // this.OMO_WIDGET_ELEMENTS = text.OMO_WIDGET_ELEMENTS;
    // this.ELEMENTS_TO_TWEAK_STYLE = text.ELEMENTS_TO_TWEAK_STYLE;
    // this.BODY_STYLE = text.BODY_STYLE;
    // this.BACKGROUND_COLOR_ELEMENTS = text.BACKGROUND_COLOR_ELEMENTS;

    // this.HEADER_LINE_HEIGHT = text.HEADER_LINE_HEIGHT || 0;
    // this.HEADER_FONT_SPACING = text.HEADER_FONT_SPACING || 20;
    // this.HEADER_FONT_SIZE = text.HEADER_FONT_SIZE || 20;
    // this.BODY_LINE_HEIGHT = text.BODY_LINE_HEIGHT || 0;
    // this.BODY_LINE_HEIGHT_MAX = text.BODY_LINE_HEIGHT_MAX || 40;
    // this.BODY_FONT_SPACING = text.BODY_FONT_SPACING || 0;
    // this.BODY_FONT_SIZE = text.BODY_FONT_SIZE || 13;
    // this.BODY_FONT_SIZE_MAX = text.BODY_FONT_SIZE_MAX || 30;
    // this.BODY_FONT_WEIGHT = text.BODY_FONT_WEIGHT || "normal";
    // this.DEFAULT_BACKGROUND = text.DEFAULT_BACKGROUND || "transparent";
    // /**must have elements for widget to work
    //  * default body and header SHOULD ALSO BE DEFINED IN CONF FILE, if not
    //  * some aproximaton values are given above i.e
    //  *
    //  */
    // if (
    //   [
    //     this.HEADER_STYLE_ELEMENTS,
    //     this.BODY_STYLE,
    //     this.BACKGROUND_COLOR_ELEMENTS,
    //     this.OMO_WIDGET_ELEMENTS,
    //     this.CUSTOM_HEADER_STYLE_ELEMENTS
    //   ].includes(undefined)
    // ) {
    //   throw Error(
    //     `HEADER_STYLE_ELEMENTS,CUSTOM_HEADER_STYLE_ELEMENTS, OMO_WIDGET_ELEMENTS,BODY_STYLE, BACKGROUND_COLOR_ELEMENTS are mandatory!!!`
    //   );
    // }
    // resolve("FINISHED LOADING STYLESHEET");
    // })
    // .catch(err => {
    //   reject(`${err} in file ${conf}`);
    // });
  });
};
exports.readConfigurationFromFile = readConfigurationFromFile;
