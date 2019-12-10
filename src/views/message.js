import html from './message.html';
import './message.css';

const OMOLAB_BODY_CLASS = `omolab-w-body-${Date.now()}-${Math.ceil(Math.random() * 1000)}`;

/**HEADER STYLES */
const HEADER_STYLE_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

const transformHeaderStyles = () => HEADER_STYLE_ELEMENTS.map(element => `body.${OMOLAB_BODY_CLASS} ${element}, body.${OMOLAB_BODY_CLASS} ${element} *`)
const setHeaderStyle = (style, headerFontFamily, headerFontSize, headerFontSpacing, headerLineHeight) => style + `{ font-family:${headerFontFamily} !important ; font-size:${headerFontSize ? headerFontSize : 10}px !important; letter-spacing:${headerFontSpacing ? headerFontSpacing : 'normal'} !important; line-height:${headerLineHeight ? headerLineHeight : '1.6'} !important }\n`

/** WIDGET STYLE */
const OMO_WIDGET_ELEMENTS = [
    `body.${OMOLAB_BODY_CLASS} div.omo-widget-container *`
    // ,
    // `body.${OMOLAB_BODY_CLASS} div.omoContainer > *`
    // ,
    // `body.${OMOLAB_BODY_CLASS} div.omoBox *`,
    // `body.${OMOLAB_BODY_CLASS} div.omoClose *`,
    // `body.${OMOLAB_BODY_CLASS} div.omoControl *`
]
const omoWidgetStyle = '{ font-family: Arial !important; font-size:16px !important;  letter-spacing:normal !important; line-height: 1.6 !important; background-color: #7abf43;}\n'
/** SET WIDGET STYLE */
const setOmoWidgetStyle = (omoWidgetElements, omoWidgetStyle) => { return omoWidgetElements.join(',') + ' ' + omoWidgetStyle }

/** SET BODY STYLE */
const BODY_STYLE = [
    `body.${OMOLAB_BODY_CLASS}`,
    // `body.${OMOLAB_BODY_CLASS} > not(.omo-widget-container > *)`,
    `body.${OMOLAB_BODY_CLASS} div > *`,
    

]
const setBodyTextStyle = (_Style, bodyFontFamily, bodyFontSize, bodyFontSpacing, bodyLineHeight) => bodyFontFamily ? _Style.join(',') + `{ font-family:${bodyFontFamily} !important; font-size:${bodyFontSize ? bodyFontSize : 10}px !important; letter-spacing:${bodyFontSpacing ? bodyFontSpacing + 'px' : 'normal'} !important; line-height:${bodyLineHeight ? bodyLineHeight : '1.6'} !important }\n` : '';

/** SET BACGROUND COLOR */
const BACKGROUND_COLOR_ELEMENTS = [
    `body.${OMOLAB_BODY_CLASS}`,
    // `body.${OMOLAB_BODY_CLASS} > not(.omo-widget-container > *)`,
    `body.${OMOLAB_BODY_CLASS} div > *`
]
const setBackGroundColor = (applyToElements, bgColor) => bgColor ? applyToElements.join(',') + `{ background-color: ${bgColor} }\n` : ''

let elements = [];
let body;
var toggler;


function addOmolabClassScopeToBody(doc) {
    const body = doc.querySelector('body');
    if (body && !body.classList.contains(OMOLAB_BODY_CLASS)) {
        body.classList.add(OMOLAB_BODY_CLASS);
    }
}

export function show(text) {
    // convert plain HTML string into DOM elementss
    let temporary = document.createElement('div');
    temporary.innerHTML = html;
    console.log(text);
    // temporary.getElementsByClassName('js-widget-dialog')[0].innerHTML=html

    addOmolabClassScopeToBody(document);
    // append elements to body
    body = document.getElementsByClassName('omo-widget-container')[0];
    var i = 0;
    while (temporary.children.length > 0) {
        let tmp = temporary.children[0]
        elements.push(tmp);
        body.appendChild(tmp);
        // console.log('HTML-->'+tmp.innerHTML + tmp.childElementCount)

    }
    toggler = toogleWidget();

    addEventHandler('headerOptions', 'change', ['INPUT', 'SELECT'], applyOmoStyles);
    addEventHandler('bodyOptions', 'change', ['INPUT', 'SELECT'], applyOmoStyles);
    addEventHandler('omoControl', 'click', ['INPUT'], applyOmoStyles);
    addEventHandler('omoClose', 'click', ['DIV'], toggler.toogle)
    addEventHandler('bgColor', 'click', ['DIV'], clickCollor);

}

/** applys event handler to given element */
const addEventHandler = (element, event, selector, handler) => {
    var omoElements = Array.from(body.getElementsByClassName(element)[0].children)
    omoElements.forEach(element => {
        if (selector.includes(element.nodeName)) element.addEventListener(event, handler);

    });
}


/** COLLOR PICKER REFACTOR */
const collorStack = [];

const clickCollor = (event) => {
    if (collorStack.length > 0) {
        var obj = collorStack.pop();
        obj.element.style.cssText = obj.style
    }
    let color = event.target.style.cssText;
    event.target.style = color + '; ' + ' outline: 2px solid blue;'
    collorStack.push({
        element: event.target,                          // element
        color: color.substring(color.indexOf(':')+1),   // samo boja
        style: color                                    // kompletan stil
    })

    console.log('click Collor' + event.target.style.cssText)
    applyOmoStyles();
}



const toogleWidget = () => {
    let open = true
    var widget = document.getElementsByClassName('omoBox')[0];
    var close = document.getElementsByClassName('omoClose')[0].firstChild;
    return {
        toogle: function () {
            if (open) {
                widget.setAttribute('style', 'display:none')
                close.textContent = 'open'
                open = false;
            } else {
                widget.setAttribute('style', 'display:block')
                close.textContent = 'close'
                open = true;
            }
        }
    }
}

function generateOmoStyle() {
    var bgCol = collorStack.length > 0 ? collorStack[collorStack.length-1].color : 'transparent'
    // alert(bgCol);
    var headerFontSize = document.getElementById('hsize').value;
    var headerFontFamily = document.getElementById('header_ff').value
    var headerFontSpacing = document.getElementById('hspacing').value
    var headerLineHeight = document.getElementById('hheight').value

    var bodyFontSize = document.getElementById('bsize').value;
    var bodyFontFamily = document.getElementById('body_ff').value
    var bodyFontSpacing = document.getElementById('bspacing').value
    // console.log(bodyFontSpacing);
    var bodyLineHeight = document.getElementById('bheight').value


    var style = setBackGroundColor(BACKGROUND_COLOR_ELEMENTS, bgCol)
    var headerStyle = setHeaderStyle(transformHeaderStyles().join(','), headerFontFamily, headerFontSize, headerFontSpacing, headerLineHeight);
    style += headerStyle;
    var bodyStyle = setBodyTextStyle(BODY_STYLE, bodyFontFamily, bodyFontSize, bodyFontSpacing, bodyLineHeight);
    style += bodyStyle;
    var widgetStyle = setOmoWidgetStyle(OMO_WIDGET_ELEMENTS, omoWidgetStyle);
    style += widgetStyle

    return style;
}

/** hack TODO!! */
var forceRedraw = function (element) {

    if (!element) { return; }

    var n = document.createTextNode(' ');
    var disp = element.style.display;  // don't worry about previous display style

    element.appendChild(n);
    element.style.display = 'none';

    setTimeout(function () {
        element.style.display = disp;
        n.parentNode.removeChild(n);
    }, 0); // you can play with this timeout to make it as short as possible
}

function getLastAppliedStyleSheet() {
    var children = document.getElementsByTagName("head")[0];
    var children_len = children.getElementsByTagName('style').length
    var style = children.getElementsByTagName('style')[children_len - 1];
    return style;
}


const applyOverides = () => {
    if (document.getElementById('omolab_style_w')) {
        var style = getLastAppliedStyleSheet();
        style.innerHTML = generateOmoStyle();
        forceRedraw(style);
        return;
    }
    var css = document.createElement('style');
    css.type = 'text/css';
    css.id = 'omolab_style_w'

    var style = generateOmoStyle();
    if (css.styleSheet)
        css.styleSheet.cssText = style
    else
        css.appendChild(document.createTextNode(style));

    /* Append style to the tag name */
    document.getElementsByTagName("head")[0].appendChild(css);
    console.log("apply overides\n" + style);
}



const removeOverides = () => {
    var omo_style_w = document.getElementById('omolab_style_w');
    var children = document.getElementsByTagName("head")[0];
    var style = getLastAppliedStyleSheet()
    console.log(omo_style_w === style);
    /**  if omolab_style_w stylesheet is applied remove it, otherwise ignore */
    if (omo_style_w === style)
        children.removeChild(style);
}


function applyOmoStyles(event) {

    // alert('click');
    // console.log(check + ' ' + event.target);
    var check = document.getElementById('applyOverides').checked;
    check ? applyOverides() : removeOverides()
    // console.log(check + ' ' + event.target);


}
