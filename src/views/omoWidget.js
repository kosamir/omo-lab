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

/** SAVES CURRENT CONFIGURATION REFACTOR */
const saveConf = (event) => {
  const text = '';// document.getElementById('omoConf').value;
  if ((event.target.type === 'button' || event.target.type === 'image' || event.target.type === 'checkbox')) {
    saveCookie(text);
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
    if (getUserAppliedValues().checked) {
      applyOverides()
    }

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
  applyOmoStyles(event);
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

function applyOmoStylesTotem() {
  alert('applyOmoStylesTotem')
  const check = document.getElementById('applyOverides').checked;
  check ? applyOverides() : removeOverides();
  // saveConf(event);
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
      alert(err);
    });
  /** 
    document.addEventListener('mouseup', (e) => console.log(getSelectedText()));
  
    let powerToggler = widgetOnOffToggler(document.getElementById('ignite'), ['omo-totem-off'], ['omo-totem-on', 'omo-eye-on'])//collorToogler(document.getElementById('ignite'), 'omo-totem-on', 'omo-totem-off');
    document.getElementById('ignite').addEventListener('click', powerToggler.toogle)
  
    var mainToogler = tooglerMain(document.getElementById("parent"),
      'omo-eye-on',
      'omo-eye',
      [document.getElementById("totem"),
      document.getElementById("font"),
  
      document.getElementById("font-type"),
      document.getElementById("font-weight"),
      document.getElementById("font-spacing"),
      document.getElementById("line-spacing"),
      document.getElementById("background"),
      document.getElementById("ignite"),
      document.getElementById('info')
      ],
      {},
      powerToggler
    );
  
    document.getElementById("parent").addEventListener('click', mainToogler.toogle);
  
    var fontSizeToogler = tooglerMain(document.getElementById("font"), 'omo-totem-font-size-choose', 'omo-totem-font-size-on',
      [document.getElementById("font-hand-left"),
      document.getElementById("font-size-up"),
      document.getElementById("font-size-down")
      ]);
  
    // alert(document.getElementById("parent"))
    document.getElementById("font").addEventListener('click', fontSizeToogler.toogle);
  
    var toogleSize = sizeToogler(13, 30, 1, document.getElementById('totem_bsize'));
    document.getElementById('font-size-up').addEventListener('click', toogleSize.up) //applyOmoStylesTotem
    document.getElementById('font-size-down').addEventListener('click', toogleSize.down) //applyOmoStylesTotem
  
    var fontTypeToogler = tooglerMain(document.getElementById("font-type"),
      'omo-totem-font-type-choose',
      'omo-totem-font-type-on',
      [document.getElementById("font-type-hand-left"),
      document.getElementById("font-type-up"),
      document.getElementById("font-type-container"),
      document.getElementById("font-type-down")
      ])
    document.getElementById("font-type").addEventListener('click', fontTypeToogler.toogle);
    var toogleFonts = pictureToogler(document.getElementById('font-type-container'), FONT_CHOOSER, document.getElementById('totem_body_ff'))
    document.getElementById('font-type-up').addEventListener('click', toogleFonts.up)
    document.getElementById('font-type-down').addEventListener('click', toogleFonts.down)
  
    var fontWeightoogler = tooglerMain(document.getElementById("font-weight"),
      'omo-totem-font-weight-on',
      'omo-totem-font-weight',
      [],
      document.getElementById('totem_font_weight')
    )
    document.getElementById("font-weight").addEventListener('click', fontWeightoogler.toogle);
  
    var fontSpacingToogler = tooglerMain(document.getElementById("font-spacing"),
      'omo-totem-font-spacing-choose',
      'omo-totem-font-spacing-on',
      [document.getElementById("font-spacing-hand-left"),
      document.getElementById("font-spacing-up"),
      document.getElementById("font-spacing-container"),
      document.getElementById("font-spacing-down")
      ])
  
    document.getElementById("font-spacing").addEventListener('click', fontSpacingToogler.toogle);
  
    var toogleFontSpacing = pictureToogler(document.getElementById('font-spacing-container'), FONT_SPACING, document.getElementById('totem_bspacing'))
    document.getElementById('font-spacing-up').addEventListener('click', toogleFontSpacing.up)
    document.getElementById('font-spacing-down').addEventListener('click', toogleFontSpacing.down)
  
    var lineSpacingToogler = tooglerMain(document.getElementById("line-spacing"),
      'omo-totem-line-spacing-choose',
      'omo-totem-line-spacing-on',
      [document.getElementById("line-spacing-hand-left"),
      document.getElementById("line-spacing-up"),
      document.getElementById("line-spacing-down")
      ])
  
    document.getElementById("line-spacing").addEventListener('click', lineSpacingToogler.toogle);
  
    var lineSpacingToogler = sizeToogler(1, 3, 0.05, document.getElementById('totem_bheight'));
    document.getElementById('line-spacing-up').addEventListener('click', lineSpacingToogler.up)//applyOmoStylesTotem
    document.getElementById('line-spacing-down').addEventListener('click', lineSpacingToogler.down)//applyOmoStylesTotem
  
  
    var backgroundToogler = tooglerMain(document.getElementById("background"),
      'omo-totem-background-choose',
      'omo-totem-background-on',
      [document.getElementById("background-left"),
      document.getElementById("EFF3EE"),
      document.getElementById("D9D8D8"),
      document.getElementById("231F20"),
      document.getElementById("9FB5DE"),
      document.getElementById("B894C4"),
      document.getElementById("E2B0AF")
      ])
  
    document.getElementById("background").addEventListener('click', backgroundToogler.toogle);
  
    let whiteToggler = collorToogler(document.getElementById("EFF3EE"), 'omo-totem-background-white-on', 'omo-totem-background-white');
    document.getElementById("EFF3EE").addEventListener('click', whiteToggler.toogle)
  
    let greyToggler = collorToogler(document.getElementById("D9D8D8"), 'omo-totem-background-grey-on', 'omo-totem-background-grey');
    document.getElementById("D9D8D8").addEventListener('click', greyToggler.toogle)
  
    let blackToggler = collorToogler(document.getElementById("231F20"), 'omo-totem-background-black-on', 'omo-totem-background-black');
    document.getElementById("231F20").addEventListener('click', blackToggler.toogle)
  
    let blueToggler = collorToogler(document.getElementById("9FB5DE"), 'omo-totem-background-blue-on', 'omo-totem-background-blue');
    document.getElementById("9FB5DE").addEventListener('click', blueToggler.toogle)
  
    let pinkToggler = collorToogler(document.getElementById("B894C4"), 'omo-totem-background-pink-on', 'omo-totem-background-pink');
    document.getElementById("B894C4").addEventListener('click', pinkToggler.toogle)
  
    let orangeToggler = collorToogler(document.getElementById("E2B0AF"), 'omo-totem-background-orange-on', 'omo-totem-background-orange');
    document.getElementById("E2B0AF").addEventListener('click', orangeToggler.toogle)
  
    let infoClick = function (e) {
      console.log('click has happend');
    }
    document.getElementById('info').addEventListener('click', infoClick) **/
};




/** 
const COLOR_MAP = [
  { id: 'EFF3EE', on: false, css_open: 'omo-totem-background-white-on', css_close: 'omo-totem-background-white' },
  { id: 'D9D8D8', on: false, css_open: 'omo-totem-background-grey-on', css_close: 'omo-totem-background-grey' },
  { id: '231F20', on: false, css_open: 'omo-totem-background-black-on', css_close: 'omo-totem-background-black' },
  { id: '9FB5DE', on: false, css_open: 'omo-totem-background-blue-on', css_close: 'omo-totem-background-blue' },
  { id: 'B894C4', on: false, css_open: 'omo-totem-background-pink-on', css_close: 'omo-totem-background-pink' },
  { id: 'E2B0AF', on: false, css_open: 'omo-totem-background-orange-on', css_close: 'omo-totem-background-orange' }
]

const FONT_CHOOSER = [
  { id: "fontEmpty", style: "fontEmpty", value: 'fontEmpty' },
  { id: "dLightOne", style: "dLigtOne", value: 'dLigtOne' },
  { id: "dRegularTwo", style: "dRegularTwo", value: 'dRegularTwo' },
  { id: "dBookOne", style: "dBookOne", value: 'dBookOne' },
  { id: "dBlackTwo", style: "dBlackTwo", value: 'dBlackTwo' },

]

const FONT_SPACING = [
  { id: "fontSpacingEmpty", style: "fontSpacingEmpty", value: '1' },
  { id: 'fontSpacingOne', style: 'fontSpacingOne', value: '1' },
  { id: 'fontSpacingTwo', style: 'fontSpacingTwo', value: '2' },
  { id: 'fontSpacingThree', style: 'fontSpacingThree', value: '3' },
  { id: 'fontSpacingFour', style: 'fontSpacingFour', value: '4' }

]

const sizeToogler = (_start, _end, _step, _el) => {
  let start = _start;
  let end = _end;
  let step = _step;
  let current = start;
  let element = _el;
  return {
    up: () => {
      current = current < end ? current += step : current;
      element.value = parseFloat(current).toFixed(2);
    },
    down: () => {
      current = current > start ? current -= step : current
      element.value = parseFloat(current).toFixed(2);
    },
    get: () => element.value
  }

}

const pictureToogler = (el, choose, _hidden) => {
  let num_of_fonts = 0;
  let element = el;
  const chooser = choose
  let hidden = _hidden;
  return {
    up: () => {
      num_of_fonts = num_of_fonts >= chooser.length ? 1 : num_of_fonts += 1
      let value = chooser[Math.abs(num_of_fonts) % chooser.length];
      element.setAttribute('class', value.style);
      hidden.value = value.value;

    },
    down: () => {
      num_of_fonts = num_of_fonts <= 0 ? chooser.length - 1 : num_of_fonts -= 1
      let value = chooser[Math.abs(num_of_fonts) % chooser.length];
      element.setAttribute('class', value.style);
      hidden.value = value.value;

    },
    get: () => hidden.value //chooser[Math.abs(num_of_fonts)]
  }
}

const widgetOnOffToggler = (el, css_close, css_open) => {
  let is_open = false;
  let element = el;
  return {
    toogle: () => {
      if (is_open) {
        is_open = false;
        element.setAttribute('class', css_close)
        document.getElementById('parent').setAttribute('class', 'omo-eye')
      } else {
        is_open = true;
        element.setAttribute('class', css_open[0])
        document.getElementById('parent').setAttribute('class', 'omo-eye-on')
      }
    },
    isOpen: () => is_open
  }
}

const collorToogler = (element, css_open, css_close) => {
  let is_selected = false;
  return {
    toogle() {
      if (is_selected) {
        is_selected = false;
        element.setAttribute('class', css_close)
      } else {
        is_selected = true;
        element.setAttribute('class', css_open)
        COLOR_MAP.forEach(el => {
          if (el.id !== element.id) {
            document.getElementById(el.id).setAttribute('class', el.css_close)
          }
        })
        document.getElementById('selectedBackground').value = element.id;
      }
    }
  }
}

// TODO funkcija koja mjenja ikone velicina proreda, tip fonta 

// tu pocinje totem
const tooglerMain = (element, parent_open_style, parent_close_style, child_elements, el_hidden, powerToogler) => {
  let is_open = false;
  let parent = element;
  let parent_open_css = parent_open_style;
  let parent_close_css = parent_close_style;
  let child = child_elements;
  let toogler = powerToogler;
  let hidden = el_hidden;
  return {
    toogle() {
      if (is_open) {
        TOTEM_ELEMENTS_MAP.forEach(el => {
          if (el.id !== parent.id) {
            let main = document.getElementById(el.id);
            console.log(main.getAttribute('class'));
            if (main.getAttribute('class') === el.choose) {
              main.click.apply(main);
              main.setAttribute('class', el.off)
            }
          }
        })
        if (typeof toogler != 'undefined') console.log(toogler.isOpen());
        if (typeof hidden != 'undefined') { hidden.value = 'normal' }
        parent.setAttribute('class', (typeof toogler != 'undefined') && toogler.isOpen() ? parent_open_style : parent_close_style);
        if (child && child.length > 0) child.forEach(el => el.setAttribute('style', 'display:none'))
        is_open = false;
      } else {
        TOTEM_ELEMENTS_MAP.forEach(el => {
          if (el.id !== parent.id) {
            let main = document.getElementById(el.id);
            console.log(main.getAttribute('class'));
            if (main.getAttribute('class') === el.choose) {
              main.click.apply(main);
              main.setAttribute('class', el.off)
            }
          }
        })
        console.log(toogler);
        if (typeof toogler != 'undefined') console.log(toogler.isOpen());
        if (typeof hidden != 'undefined') { hidden.value = 'bold' }
        parent.setAttribute('class', (typeof toogler != 'undefined') && !toogler.isOpen() ? parent_close_style : parent_open_style);
        if (child && child.length > 0) child.forEach(el => el.setAttribute('style', 'display:block'))
        is_open = true;

      }
    }
  }
}

const TOTEM_ELEMENTS_MAP = [
  {
    id: 'font',
    off: 'omo-totem-font-size',
    on: 'omo-totem-font-size-on',
    choose: 'omo-totem-font-size-choose',
    children: [
      { id: 'font-hand-left' },
      { id: 'font-size-up' },
      { id: 'font-size-down' }
    ]
  },
  {
    id: 'font-type',
    off: 'omo-totem-font-type',
    on: 'omo-totem-font-type-on',
    choose: 'omo-totem-font-type-choose',
    children: [
      { id: 'font-type-hand-left' },
      { id: 'font-type-up' },
      { id: 'font-type-container' },
      { id: 'font-type-down' }
    ]
  },
  {
    id: 'font-weight',
    children: []
  },
  {
    id: 'font-spacing',
    off: 'omo-totem-font-spacing',
    on: 'omo-totem-font-spacing-on',
    choose: 'omo-totem-font-spacing-choose',
    children: [
      { id: 'font-spacing-hand-left' },
      { id: 'font-spacing-up' },
      { id: 'font-spacing-container' },
      { id: 'font-spacing-down' }
    ]
  },
  {
    id: 'line-spacing',
    off: 'omo-totem-line-spacing',
    on: 'omo-totem-line-spacing-on',
    choose: 'omo-totem-line-spacing-choose',
    children: [
      { id: 'line-spacing-hand-left' },
      { id: 'line-spacing-up' },
      { id: 'line-spacing-container' },
      { id: 'line-spacing-down' }
    ]
  },
  {
    id: 'background',
    off: 'omo-totem-background',
    on: 'omo-totem-background-on',
    choose: 'omo-totem-background-choose',
    children: [
      { id: 'background-left' },
      { id: 'EFF3EE' },
      { id: 'D9D8D8' },
      { id: '231F20' },
      { id: '9FB5DE' },
      { id: 'B894C4' },
      { id: 'E2B0AF' },
    ]
  },
  {
    id: 'ignite',
    children: []
  },
  {
    id: 'info',
    children: []
  }

]

/** tu zavrsava totem */

function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
  return '';
}
export default show;
