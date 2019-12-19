/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
import config from '../config';
import './omoWidget.css';
import html from './omoWidget.html';

const IMAGE_OPEN = '/img/open.png';
const IMAGE_CLOSE = '/img/close.png';
const IMAGE_SAVE_ACTIVE = '/img/SAVE-ACTIVE-ICON.png';


const elements = [];
let body;
let toggler;
/** COLLOR PICKER REFACTOR */
const COLOR_STACK = [];

const getAppliedCollor = () => (COLOR_STACK.length > 0 ? COLOR_STACK[COLOR_STACK.length - 1].color : 'transparent');
const getAppliedCollorId = () => (COLOR_STACK.length > 0 ? COLOR_STACK[COLOR_STACK.length - 1].id : 'null');

const toogleWidget = () => {
  let open = true;
  const widget = document.getElementsByClassName('omoBox')[0];

  const close = document.getElementsByClassName('omoClose')[0].firstChild;
  return {
    toogle() {
      if (open) {
        widget.setAttribute('style', 'display:none');
        close.src = IMAGE_OPEN;
        open = false;
      } else {
        widget.setAttribute('style', 'display:block');
        close.src = IMAGE_CLOSE;
        open = true;
      }
    },
  };
};

const setUserAppliedValues = (data) => {
  document.getElementById('applyOverides').checked = data.checked;

  document.getElementById('hsize').value = data.headerFontSize;
  document.getElementById('header_ff').value = data.headerFontFamily;
  document.getElementById('hspacing').value = data.headerFontSpacing;
  document.getElementById('hheight').value = data.headerLineHeight;

  document.getElementById('bsize').value = data.bodyFontSize;
  document.getElementById('body_ff').value = data.bodyFontFamily;
  document.getElementById('bspacing').value = data.bodyFontSpacing;
  document.getElementById('bheight').value = data.bodyLineHeight;

  // const backgroundColor = data.bgColor;
  const backgroundColorId = data.bgColorId;
  if (backgroundColorId !== 'null') {
    const selected = document.getElementById(backgroundColorId);
    const color = selected.style.cssText;
    selected.style = `${color}; outline: 2px solid blue;`; // + 'outline: 2px solid blue;';

    COLOR_STACK.push({
      element: selected, // element
      color: color.substring(color.indexOf(':') + 1, color.lastIndexOf(';')), // samo boja
      style: color, // kompletan stil
      id: backgroundColorId, // id iz matrice boja
    });
  }
};
/** get APPLIED VALUES FROM WIDGET */
const getUserAppliedValues = () => {
  const applied = document.getElementById('applyOverides').checked;
  const hFontSize = document.getElementById('hsize').value;
  const hFontFamily = document.getElementById('header_ff').value;
  const hFontSpacing = document.getElementById('hspacing').value;
  const hFontLineHieght = document.getElementById('hheight').value;

  const bFontSize = document.getElementById('bsize').value;
  const bFontFamily = document.getElementById('body_ff').value;
  const bFontSpacing = document.getElementById('bspacing').value;
  const bFontLineHeight = document.getElementById('bheight').value;

  const backgroundColor = getAppliedCollor();
  const backgroundColorId = getAppliedCollorId();

  const data = {
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
    bgColorId: backgroundColorId,
  };
  return data;
};


function addOmolabClassScopeToBody(doc) {
  const document = doc.querySelector('body');
  if (document && !document.classList.contains(config.OMOLAB_BODY_CLASS)) {
    document.classList.add(config.OMOLAB_BODY_CLASS);
  }
}

const saveCookie = (text) => {
  const name = `${config.OMO_WIDGET_COOKIE}_${text}`;
  const value = JSON.stringify(getUserAppliedValues());
  document.cookie = `${name}=${value};`;
  console.log(`saved:${value}`);
};
/** 
const toogleSaveConf = () => {
  const image = document.getElementById('saveConf');
  image.src = IMAGE_SAVE_ACTIVE;
};*/
/** SAVES CURRENT CONFIGURATION REFACTOR */
const saveConf = (event) => {
  const text = '';// document.getElementById('omoConf').value;
  if ((event.target.type === 'button' || event.target.type === 'image' || event.target.type === 'checkbox')) {
    saveCookie(text);
    // toogleSaveConf();
  }
};

/** applys event handler to given element */
const addEventHandler = (element, event, selector, handler) => {
  const omoElements = Array.from(body.getElementsByClassName(element)[0].children);
  omoElements.forEach(el => {
    if (selector.includes(el.nodeName)) {
      el.addEventListener(event, handler);
      // console.log(element + ' ' + element.nodeName + ' ' + event + ' ' + selector);
    }
  });
};


function generateOmoStyle() {
  const values = getUserAppliedValues();
  // ako je odabrao bez boje ili boja nije odabrana napravi bez boje
  let style = values.bgColor === 'transparent' ? '' : config.setBackGroundColor(config.BACKGROUND_COLOR_ELEMENTS, values.bgColor);

  style += config.IMPORTANT_ELEMENTS_SELECTOR;
  // style += setBackGroundColorImportant(BACKGROUND_COLOR_ELEMENTS_IMPORTANT,bgCol)
  const headerStyle = config.setHeaderStyle(config.transformHeaderStyles(config.HEADER_STYLE_ELEMENTS).join(','), values.headerFontFamily, values.headerFontSize, values.headerFontSpacing, values.headerLineHeight, values.bgColor);
  style += headerStyle;

  const customHeaderStyle = config.setHeaderStyle(config.transformHeaderStyles(config.CUSTOM_HEADER_STYLE_ELEMENTS).join(','), values.headerFontFamily, values.headerFontSize, values.headerFontSpacing, values.headerLineHeight, values.bgColor);
  style += customHeaderStyle;

  const bodyStyle = config.setBodyTextStyle(config.BODY_STYLE, values.bodyFontFamily, values.bodyFontSize, values.bodyFontSpacing, values.bodyLineHeight, values.bgColor);
  style += bodyStyle;

  const widgetStyle = config.setOmoWidgetStyle(config.OMO_WIDGET_ELEMENTS, config.omoWidgetStyle);
  style += widgetStyle;

  const tweaks = config.TWEAK();
  console.log(tweaks);
  style += tweaks;

  console.log(style);

  return style;

}

/** READ VALUE FROM SAVED COOKIE */
const readCookie = () => {
  const cookie = document.cookie.split(';').filter((el) => el.startsWith(` ${config.OMO_WIDGET_COOKIE}`));
  if (cookie.length > 0) {
    const data = cookie[0].split('=')[1];

    setUserAppliedValues(JSON.parse(data));
    applyOmoStyles();
  }
};


/** COLLOR PICKER REFACTOR */

const colorToogler = (event) => {
  if (COLOR_STACK.length > 0) {
    const obj = COLOR_STACK.pop();
    obj.element.style.cssText = obj.style;
  }
  const color = event.target.style.cssText;
  event.target.style = `${color}; outline: 2px solid blue;`;

  COLOR_STACK.push({
    element: event.target, // element
    color: color.substring(color.indexOf(':') + 1, color.lastIndexOf(';')), // samo boja
    style: color, // kompletan stil
    id: event.target.id, // id iz matrice boja
  });

  console.log(`click Collor${event.target.style.cssText}${getAppliedCollor()}`);
  applyOmoStyles();
};


/** hack TODO!! */
const forceRedraw = (element) => {
  if (!element) { return; }

  const n = document.createTextNode(' ');
  const disp = element.style.display;
  element.appendChild(n);
  element.style.display = 'none';

  setTimeout(() => {
    element.style.display = disp;
    n.parentNode.removeChild(n);
  }, 0);
};

function getLastAppliedStyleSheet() {
  const children = document.getElementsByTagName('head')[0];
  const len = children.getElementsByTagName('style').length;
  const style = children.getElementsByTagName('style')[len - 1];
  return style;
}


const applyOverides = () => {
  const omoStyle = document.getElementById('omolab_style_w');
  let style = getLastAppliedStyleSheet();
  if (omoStyle) {
    style.innerHTML = generateOmoStyle();
    forceRedraw(style);
    return;
  }
  const css = document.createElement('style');
  css.type = 'text/css';
  css.id = 'omolab_style_w';
  style = generateOmoStyle();
  if (css.styleSheet) {
    css.styleSheet.cssText = style;
  } else {
    css.appendChild(document.createTextNode(style));
  }

  /* Append style to the tag name */
  document.getElementsByTagName('head')[0].appendChild(css);

};


const removeOverides = () => {
  const appliedStyle = document.getElementById('omolab_style_w');
  const children = document.getElementsByTagName('head')[0];
  const style = getLastAppliedStyleSheet();
  console.log(appliedStyle === style);
  /**  if omolab_style_w stylesheet is applied remove it, otherwise ignore */
  if (appliedStyle === style) {
    children.removeChild(style);
  }
};

function applyOmoStyles(event) {
  const check = document.getElementById('applyOverides').checked;
  check ? applyOverides() : removeOverides();
  saveConf(event);
}


const show = (text, configurations) => {
  // convert plain HTML string into DOM elementss
  const temporary = document.createElement('div');
  temporary.innerHTML = html;
  console.log(text);
  console.log(configurations);

  addOmolabClassScopeToBody(document);
  // append elements to body
  body = document.getElementsByClassName('omo-widget-container')[0];
  while (temporary.children.length > 0) {
    const tmp = temporary.children[0];
    elements.push(tmp);
    body.appendChild(tmp);
    // console.log('HTML-->'+tmp.innerHTML + tmp.childElementCount)
  }
  toggler = toogleWidget();
  toggler.toogle();
  addEventHandler('headerOptions', 'change', ['INPUT', 'SELECT'], applyOmoStyles);
  addEventHandler('bodyOptions', 'change', ['INPUT', 'SELECT'], applyOmoStyles);
  addEventHandler('switch', 'click', ['INPUT'], applyOmoStyles);
  addEventHandler('omoClose', 'click', ['IMG'], toggler.toogle);
  addEventHandler('bgColor', 'click', ['DIV'], colorToogler);
  addEventHandler('omoSave', 'click', ['INPUT'], saveConf);

  config.readConfigurationFromFile(configurations.config)
    .then((message) => {
      console.log(message);
      document.getElementById('hsize').value = config.HEADER_FONT_SIZE;
      document.getElementById('hspacing').value = config.HEADER_FONT_SPACING;
      document.getElementById('hheight').value = config.HEADER_LINE_HEIGHT;

      document.getElementById('bsize').value = config.BODY_FONT_SIZE;
      document.getElementById('bspacing').value = config.BODY_FONT_SPACING;
      document.getElementById('bheight').value = config.BODY_LINE_HEIGHT;
      readCookie();
    }).catch((err) => {
      console.log(err);
    });
};
export default show;
