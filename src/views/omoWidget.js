import html from './omoWidget.html';
import './omoWidget.css';
import config from '../config'

let elements = [];
let body;
var toggler;

/** READ VALUE FROM SAVED COOKIE */
const readCookie = () => {

    var cookie = document.cookie.split(';').filter(el => {
        return el.startsWith(' ' + config.OMO_WIDGET_COOKIE)
    })
    console.log(cookie);
    if (cookie) {
        let data = cookie[0].split("=")[1];
        console.log(data);
        setUserAppliedValues(JSON.parse(data))
        applyOmoStyles();
    }
}
/** SAVES CURRENT CONFIGURATION REFACTOR */
const saveConf = (event) => {
    let text = ''//document.getElementById('omoConf').value;
    if ((event.target.type === 'button' || event.target.type === 'image')) {
        // alert('spremaj u kolacic')
        let name = config.OMO_WIDGET_COOKIE + '_' + text;
        alert("'" + name + "'");
        let value = JSON.stringify(getUserAppliedValues());
        console.log(value);
        document.cookie = name + '=' + JSON.stringify(getUserAppliedValues()) + ';'
        toogleSaveConf()
        // appendOptionValue(text);
    }

}

const toogleSaveConf = () => { 
    let image = document.getElementById('saveConf');
    image.src = "/img/SAVE-ACTIVE-ICON.png"

}

const appendOptionValue = (text) => {
    let option = document.getElementById('savedConf');
    let opt = document.createElement('option');
    opt.value = text;
    opt.text = text
    option.appendChild(opt);
}

function addOmolabClassScopeToBody(doc) {
    const body = doc.querySelector('body');
    if (body && !body.classList.contains(config.OMOLAB_BODY_CLASS)) {
        body.classList.add(config.OMOLAB_BODY_CLASS);
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
    addEventHandler('omoClose', 'click', ['IMG'], toggler.toogle)
    addEventHandler('bgColor', 'click', ['DIV'], clickCollor);
    addEventHandler('omoSave', 'click', ['INPUT'], saveConf);

    readCookie();


}





/** applys event handler to given element */
const addEventHandler = (element, event, selector, handler) => {
    let omoElements = Array.from(body.getElementsByClassName(element)[0].children)
    omoElements.forEach(element => {
        if (selector.includes(element.nodeName)) {
            element.addEventListener(event, handler);
            console.log(element + ' ' + element.nodeName + ' ' + event + ' ' + selector);
        }


    });
}



/** COLLOR PICKER REFACTOR */
const collorStack = [];

const clickCollor = (event) => {
    if (collorStack.length > 0) {
        let obj = collorStack.pop();
        obj.element.style.cssText = obj.style
    }
    let color = event.target.style.cssText;
    event.target.style = color + ';' + 'outline: 2px solid blue;'

    collorStack.push({
        element: event.target,                          // element
        color: color.substring(color.indexOf(':') + 1, color.lastIndexOf(';')),  // samo boja
        style: color,                                    // kompletan stil
        id: event.target.id                              // id iz matrice boja
    })

    console.log('click Collor' + event.target.style.cssText)
    applyOmoStyles();
}

const getAppliedCollor = () => collorStack.length > 0 ? collorStack[collorStack.length - 1].color : 'transparent'
const getAppliedCollorId = () => collorStack.length > 0 ? collorStack[collorStack.length - 1].id : 'null'


const toogleWidget = () => {
    let open = true
    const widget = document.getElementsByClassName('omoBox')[0];

    let close = document.getElementsByClassName('omoClose')[0].firstChild;
    return {
        toogle: function () {
            if (open) {
                widget.setAttribute('style', 'display:none')
                close.src="/img/open.png"
                open = false;
            } else {
                widget.setAttribute('style', 'display:block')
                close.src="/img/close.png"
                open = true;
            }
        }
    }
}

const setUserAppliedValues = (data) => {

    document.getElementById('applyOverides').checked = data.checked;

    document.getElementById('hsize').value = data.headerFontSize;
    document.getElementById('header_ff').value = data.headerFontFamily;
    document.getElementById('hspacing').value = data.headerFontSpacing
    document.getElementById('hheight').value = data.headerLineHeight

    document.getElementById('bsize').value = data.bodyFontSize
    document.getElementById('body_ff').value = data.bodyFontFamily;
    document.getElementById('bspacing').value = data.bodyFontSpacing
    document.getElementById('bheight').value = data.bodyLineHeight

    let backgroundColor = data.bgColor
    let backgroundColorId = data.bgColorId;
    if (backgroundColorId !== 'null') {
        let selected = document.getElementById(backgroundColorId);
        let color = selected.style.cssText;
        selected.style = color + ';' + 'outline: 2px solid blue;'

        collorStack.push({
            element: selected,                          // element
            color: color.substring(color.indexOf(':') + 1, color.lastIndexOf(';')),  // samo boja
            style: color,                                    // kompletan stil
            id: backgroundColorId                              // id iz matrice boja
        })
    }



}
/** get APPLIED VALUES FROM WIDGET */
const getUserAppliedValues = () => {
    let applied = document.getElementById('applyOverides').checked;
    let hFontSize = document.getElementById('hsize').value;
    let hFontFamily = document.getElementById('header_ff').value
    let hFontSpacing = document.getElementById('hspacing').value
    let hFontLineHieght = document.getElementById('hheight').value

    let bFontSize = document.getElementById('bsize').value;
    let bFontFamily = document.getElementById('body_ff').value
    let bFontSpacing = document.getElementById('bspacing').value
    let bFontLineHeight = document.getElementById('bheight').value

    let backgroundColor = getAppliedCollor();
    let backgroundColorId = getAppliedCollorId();

    var data = {
        checked: applied,
        headerFontSize: hFontSize,
        headerFontFamily: hFontFamily,
        headerFontSpacing: hFontSpacing,
        headerLineHeight: hFontLineHieght,
        bodyFontSize: bFontSize,
        bodyFontFamily: bFontFamily,
        bodyFontSpacing: bFontSpacing,
        bodyLineHeight: bFontLineHeight,
        bgColor: backgroundColor,
        bgColorId: backgroundColorId
    }
    return data;
}


function generateOmoStyle() {
    let values = getUserAppliedValues()
    // ako je odabrao bez boje ili boja nije odabrana napravi bez boje
    let style = values.bgColor == 'transparent' ? '' : config.setBackGroundColor(config.BACKGROUND_COLOR_ELEMENTS, values.bgColor)

    style+=config.IMPORTANT_ELEMENTS_SELECTOR;
    // style += setBackGroundColorImportant(BACKGROUND_COLOR_ELEMENTS_IMPORTANT,bgCol)
    let headerStyle = config.setHeaderStyle(config.transformHeaderStyles(config.HEADER_STYLE_ELEMENTS).join(','), values.headerFontFamily, values.headerFontSize, values.headerFontSpacing, values.headerLineHeight);
    style += headerStyle;

    let customHeaderStyle = config.setHeaderStyle(config.transformHeaderStyles(config.CUSTOM_HEADER_STYLE_ELEMENTS).join(','), values.headerFontFamily, values.headerFontSize, values.headerFontSpacing, values.headerLineHeight)
    style += customHeaderStyle;
    let bodyStyle = config.setBodyTextStyle(config.BODY_STYLE, values.bodyFontFamily, values.bodyFontSize, values.bodyFontSpacing, values.bodyLineHeight);
    style += bodyStyle;
    let widgetStyle = config.setOmoWidgetStyle(config.OMO_WIDGET_ELEMENTS, config.omoWidgetStyle);
    style += widgetStyle

    console.log(style);
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
