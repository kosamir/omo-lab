const IMPORTANT_ELEMENTS_SELECTOR = '*:not(img):not(:empty):not([aria-hidden="true"]):not([class*="icon"])';
exports.IMPORTANT_ELEMENTS_SELECTOR=IMPORTANT_ELEMENTS_SELECTOR;

const OMOLAB_BODY_CLASS = `omolab-w-body-${Date.now()}-${Math.ceil(Math.random() * 1000)}`;
exports.OMOLAB_BODY_CLASS = OMOLAB_BODY_CLASS
const OMO_WIDGET_COOKIE = 'omolab-w-cookie';
exports.OMO_WIDGET_COOKIE = OMO_WIDGET_COOKIE;

const HEADER_LINE_HEIGHT='22.8571'
const HEADER_FONT_SPACING='normal'
const HEADER_FONT_SIZE='16'

const BODY_LINE_HEIGHT='22.8571'
const BODY_FONT_SPACING='normal'
const BODY_FONT_SIZE='16'

/**HEADER STYLES */
const HEADER_STYLE_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
exports.HEADER_STYLE_ELEMENTS =  HEADER_STYLE_ELEMENTS;

/**CUSTOM_HEADER_STYLES */
const CUSTOM_HEADER_STYLE_ELEMENTS = [
    'div.title', 
    'section h2',
    'h1.page-header']  

exports.CUSTOM_HEADER_STYLE_ELEMENTS= CUSTOM_HEADER_STYLE_ELEMENTS;
const addPixels = (value) => value +'px' 

const transformHeaderStyles = (elements) => elements.map(element => `body.${OMOLAB_BODY_CLASS} ${element}, body.${OMOLAB_BODY_CLASS} ${element} * `)
const setHeaderStyle = (style, headerFontFamily, headerFontSize, headerFontSpacing, headerLineHeight) => style + `{ font-family:${headerFontFamily} !important ; font-size:${headerFontSize ? addPixels(headerFontSize) : addPixels(HEADER_FONT_SIZE)} !important; letter-spacing:${headerFontSpacing ? addPixels(headerFontSpacing) : addPixels(HEADER_FONT_SPACING)} !important; line-height:${headerLineHeight ? addPixels(headerLineHeight) : addPixels(HEADER_LINE_HEIGHT) } !important }\n`

exports.transformHeaderStyles= transformHeaderStyles;
exports.setHeaderStyle = setHeaderStyle




/** WIDGET STYLE */
const OMO_WIDGET_ELEMENTS = [
    // `body.${OMOLAB_BODY_CLASS} div.omo-widget-container > .omoContainer > .omoBox > .omoElements > .globalOptions > .bgColor > :not(#noBackground)`,
    // `body.${OMOLAB_BODY_CLASS} div.omo-widget-container *`,
    // `body.${OMOLAB_BODY_CLASS} div.omo-widget-container *`
    // `body.${OMOLAB_BODY_CLASS} > #omo:not(.omo-widget-container > *)`
    // ,
    // `body.${OMOLAB_BODY_CLASS} div.omoContainer > *`
    // ,
    // `body.${OMOLAB_BODY_CLASS} div.omoBox *`,
    // `body.${OMOLAB_BODY_CLASS} div.omoClose *`,
    // `body.${OMOLAB_BODY_CLASS} div.omoControl *`
]
exports.OMO_WIDGET_ELEMENTS = OMO_WIDGET_ELEMENTS

const omoWidgetStyle = '{ font-family: Arial !important; font-size:12px !important;  letter-spacing:normal !important; line-height: 1.6 !important; background-color: #7abf43;}\n'
exports.omoWidgetStyle = omoWidgetStyle

/** SET WIDGET STYLE */
const setOmoWidgetStyle = (omoWidgetElements, omoWidgetStyle) => { return omoWidgetElements.join(',') + ' ' + omoWidgetStyle }

exports.setOmoWidgetStyle=setOmoWidgetStyle

/** SET BODY STYLE */
const BODY_STYLE = [
   
    // `body.${OMOLAB_BODY_CLASS} *` ,
    `body.${OMOLAB_BODY_CLASS} div.body `,
    `body.${OMOLAB_BODY_CLASS} div.field-content `,
    `body.${OMOLAB_BODY_CLASS} section.content-fullwidth-second *`,
    `body.${OMOLAB_BODY_CLASS} div.region-footer-first *`
    // `not:(#omo)`
]
exports.BODY_STYLE= BODY_STYLE;

const setBodyTextStyle = (_Style, bodyFontFamily, bodyFontSize, bodyFontSpacing, bodyLineHeight) => {
    return bodyFontFamily ? _Style.join(',') + `{ font-family:${bodyFontFamily} !important; font-size:${bodyFontSize ? addPixels(bodyFontSize) : addPixels(BODY_FONT_SIZE)} !important; letter-spacing:${bodyFontSpacing ? addPixels(bodyFontSpacing)  : addPixels(BODY_FONT_SPACING)} !important; line-height:${bodyLineHeight ? addPixels(bodyLineHeight) : addPixels(BODY_LINE_HEIGHT)} !important }\n` : '';
}
exports.setBodyTextStyle=setBodyTextStyle

/** SET BACGROUND COLOR */
const BACKGROUND_COLOR_ELEMENTS = [
    `body.${OMOLAB_BODY_CLASS}`,
    `body.${OMOLAB_BODY_CLASS} div.header-top`,
    `body.${OMOLAB_BODY_CLASS} div.header-main`,
    `body.${OMOLAB_BODY_CLASS} div.footer-wrap`,
    `body.${OMOLAB_BODY_CLASS} section#block-block-45`
]
exports.BACKGROUND_COLOR_ELEMENTS=BACKGROUND_COLOR_ELEMENTS;

const setBackGroundColor = (applyToElements, bgColor) => bgColor ? applyToElements.join(',') + `{ background-color: ${bgColor};}\n` : ''
exports.setBackGroundColor=setBackGroundColor
/** 
const BACKGROUND_COLOR_ELEMENTS_IMPORTANT = [
    `body.${OMOLAB_BODY_CLASS} section#block-block-44.block.block-block.poslovnice-bankomati.block-grey-bg.pb-block-grey-bg *`,
    `body.${OMOLAB_BODY_CLASS} section#block-block-44.block.block-block.poslovnice-bankomati.block-grey-bg.pb-block-grey-bg > *`,
]
const setBackGroundColorImportant = (applyToElements, bgColor) => bgColor ? applyToElements.join(',') + `{ background-color: ${bgColor} !important }\n` : ''
*/



