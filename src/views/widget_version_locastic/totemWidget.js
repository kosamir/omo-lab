import config from '../../config';
import './totemWidget.css';
import html from './totemWidget.html';

const NO_BACKGROUND_COLOR = -1;
const elements = [];
let body;

var initOmoWidgetControls = function () {
  // elements

  const widget = document.querySelector('#omo-widget');
  const mainToggle = widget.querySelector('.omo-widget__main-toggle');
  const forms = widget.querySelectorAll('form');
  const optionDisplayToggles = widget.querySelectorAll(
    '.omo-widget__toggle-options',
  );
  const valueInputs = widget.querySelectorAll('.omo-widget__option-value');
  const incrementControlButtons = widget.querySelectorAll('[type="button"]');
  const resetElements = widget.querySelectorAll('.omo-widget__reset');
  const backgroundSettingsForm = widget.querySelector(
    '[data-setting-name="background"] form',
  );
  const backgroundSettingsReset = backgroundSettingsForm.querySelector(
    '.omo-widget__reset',
  );
  const fontTypePreview = widget.querySelector('.omo-widget__type-preview');
  const powerToggle = widget.querySelector('.omo-widget__power-toggle');

  const elementsWithActiveState = widget.querySelectorAll('label, button');

  // functions

  const closeOptions = function () {
    [].slice.call(optionDisplayToggles).forEach(function (optionDisplayToggle) {
      optionDisplayToggle.checked = false;
      optionDisplayToggle.setAttribute('aria-selected', 'false');
    });
  };

  const handlePowerToggle = function (event) {
    if (mainToggle.parentElement.classList.toggle('power-off')) {
      removeOverides();
    } else {
      applyOverides();
    }
    saveCookie(0);
    closeOptions();
  };

  const updateFontFamilyPreview = function (value) {
    const letters = ['O', 'A', 'B', 'C', 'D', 'E'];
    +fontTypePreview.setAttribute('data-selected', letters[value]);
  };

  const handleButtonClick = function (event) {
    let input = event.target.parentElement.querySelector("[type='number'");
    let curVal = parseInt(input.value);
    let isAdd = event.target.classList.contains('omo-widget__add');

    // console.log(input.id + " " + input.value);
    if (
      (isAdd && curVal == input.getAttribute('max')) ||
      (!isAdd && curVal == 0)
    ) {
      return;
    }
    input.value = isAdd ? curVal + 1 : curVal - 1;

    handleValueChange();

    // !! only if font type
    if (input.id === 'totem_body_ff') updateFontFamilyPreview(input.value);
  };

  /** the place where magic happens */
  const handleValueChange = function () {
    let changesActive = 0;
    [].slice.call(forms).forEach(function (form) {
      if (form.checkValidity()) {
        form.classList.add('valid');
        changesActive++;
      } else {
        form.classList.remove('valid');
      }
    });

    !document.getElementById('applyOverides').checked && applyOverides();

    const isBackgroundSelected = () => {
      let background = document
        .getElementById('selectedBackround')
        .getAttribute('data-value');
      return background !== String(NO_BACKGROUND_COLOR);
    };

    isBackgroundSelected() &&
      document.getElementById('background_color').classList.add('valid');
    // IF NO changes active and NO background selected - remove style!
    changesActive === 0 && !isBackgroundSelected() && removeOverides();

    saveCookie(changesActive);

    widget.classList[
      changesActive > 0 || isBackgroundSelected() ? 'add' : 'remove'
    ]('has-changes');

    return changesActive;
  };

  const handleValueKeyboardEvents = function (event) {
    const isDown = event.code == 'ArrowDown';
    const isUp = event.code == 'ArrowUp';
    const isTab = event.code == 'Tab';

    if (isTab) {
      event.preventDefault();
      event.target.parentElement.parentElement.nextElementSibling
        .querySelector("[type='radio']")
        .focus();
      return;
    }

    const addBtn = event.target.parentElement.querySelector('.add');
    const substractBtn = event.target.parentElement.querySelector('.substract');

    updateFontFamilyPreview(event.target.value);

    if (isDown) {
      substractBtn.classList.add('active');
      setTimeout(function () {
        substractBtn.classList.remove('active');
      }, 20);
      if (event.target.value == 1) {
        event.target.value = 0;
        updateFontFamilyPreview(0);
      }
    } else if (isUp) {
      addBtn.classList.add('active');
      setTimeout(function () {
        addBtn.classList.remove('active');
      }, 20);
    }
  };

  const resetValuesToZero = e => {
    if (e.target.id === 'totem_body_ff_reset') {
      updateFontFamilyPreview(0);
      document.getElementById('totem_body_ff').value = 0;
    } else if (e.target.id === 'totem_bsize_reset') {
      document.getElementById('totem_bsize').value = 0;
    } else if (e.target.id === 'totem_font_weight_reset') {
      document.getElementById('totem_font_weight').value = 0;
    } else if (e.target.id === 'totem_bspacing_reset') {
      document.getElementById('totem_bspacing').value = 0;
    } else if (e.target.id === 'totem_bheight_reset') {
      document.getElementById('totem_bheight').value = 0;
    }
  };

  const handleResetClick = function (e) {
    resetValuesToZero(e);
    closeOptions();
    setTimeout(function () {
      handleValueChange(), 1;
    });
  };

  const handleOptionDisplayToggle = function (event) {
    const optionDisplayToggle = event.target;

    if (event.code) {
      const isTab = event.code == 'Tab';
      const isSpace = event.code == 'Space';
      const isEnter = event.code == 'Enter';

      if (
        isTab &&
        optionDisplayToggle.getAttribute('aria-selected') == 'false'
      ) {
        event.preventDefault();
        optionDisplayToggle.parentElement.nextElementSibling
          .querySelector("[type='radio']")
          .focus();
        return;
      }
      // okrenit logiku, dodat kod od dole
      if (!isSpace && !isEnter) {
        return;
      }
    }
    if (optionDisplayToggle.getAttribute('aria-selected') == 'true') {
      optionDisplayToggle.setAttribute('aria-selected', 'false');
      optionDisplayToggle.checked = false;
    } else {
      closeOptions();
      optionDisplayToggle.setAttribute('aria-selected', 'true');
      optionDisplayToggle.checked = true;
    }
  };

  // event listeners

  mainToggle.addEventListener('click', closeOptions);

  powerToggle.addEventListener('click', handlePowerToggle);

  [].slice.call(optionDisplayToggles).forEach(function (radio) {
    radio.addEventListener('click', handleOptionDisplayToggle);
    radio.addEventListener('keydown', handleOptionDisplayToggle);
  });

  [].slice.call(valueInputs).forEach(function (value) {
    value.addEventListener('keydown', handleValueKeyboardEvents);
    value.addEventListener('change', handleValueChange);
  });

  [].slice.call(incrementControlButtons).forEach(function (button) {
    button.addEventListener('click', handleButtonClick);
  });

  [].slice.call(resetElements).forEach(function (reset) {
    reset.addEventListener('click', handleResetClick);
  });

  backgroundSettingsForm.addEventListener('change', function (event) {
    backgroundSettingsForm.parentElement.setAttribute(
      'data-value',
      event.srcElement.value,
    );
    handleValueChange();
  });

  [].slice.call(elementsWithActiveState).forEach(function (element) {
    element.addEventListener('mousedown', function (event) {
      event.target.classList.add('active');
    });
    element.addEventListener('mouseup', function (event) {
      event.target.classList.remove('active');
    });
  });

  backgroundSettingsReset.addEventListener('click', function () {
    backgroundSettingsForm.parentElement.setAttribute(
      'data-value',
      NO_BACKGROUND_COLOR,
    );
  });
  return {
    updateFont: function (value) {
      updateFontFamilyPreview(value);
    },
    getValueChanges: function () {
      return handleValueChange();
    },
  };
};

function addOmolabClassScopeToBody(doc) {
  const document = doc.querySelector('body');
  if (document && !document.classList.contains(config.OMOLAB_BODY_CLASS)) {
    document.classList.add(config.OMOLAB_BODY_CLASS);
  }
}

const setUserAppliedValues = (data, fn) => {
  const widget = document.querySelector('#omo-widget');
  const mainToggle = widget.querySelector('.omo-widget__main-toggle');
  if (!data.checked) {
    // console.log("widget is on:" + JSON.stringify(data));
    widget.classList['add']('has-changes');
  } else {
    mainToggle.parentElement.classList.toggle('power-off');
  }
  document.getElementById('applyOverides').checked = data.checked;

  document.getElementById('totem_bsize').value = setFontSize(data.bodyFontSize);

  document.getElementById('totem_body_ff').value = setFontFamilyId(
    data.bodyFontFamily,
  )[0].id;

  fn.updateFont(document.getElementById('totem_body_ff').value);

  document.getElementById('totem_font_weight').value = setFontWeightId(
    data.bodyFontWeight,
  )[0].id;
  document.getElementById('totem_bspacing').value = setBodyLetterSpacingId(
    data.bodyFontSpacing,
  )[0].id;
  document.getElementById('totem_bheight').value = setBodyLineHeightId(
    data.bodyLineHeight,
  )[0].id;

  document
    .getElementById('selectedBackround')
    .setAttribute('data-value', getColorValue(data.bgColor)[0].id);
};

/** get font default values based on screen resolution */
const setFontSize = val => {
  return (
    Number(val) -
    (isDesktop()
      ? Number(config.DESKTOP_BODY_FONT_SIZE)
      : Number(config.BODY_FONT_SIZE))
  );
};

const FONT_WEIGHT = [
  { id: 1, value: '500', omoType: 'MediumOne' },
  { id: 2, value: '600', omoType: 'BoldOne' },
  { id: 3, value: '800', omoType: 'BlackOne' },
  // ,
  // { id: 4, value: "lighter" }
];

const setFontWeight = val => FONT_WEIGHT.filter(el => el.id === Number(val));
const setFontWeightId = val => FONT_WEIGHT.filter(el => el.value === val);
/**OD TUD  */
let BODY_LETTER_SPACING = [];
const generateBodyLetterSpacing = val => {
  let value = parseFloat(val);
  for (let i = 1; i < 5; i++) {
    value += parseFloat(0.25);
    BODY_LETTER_SPACING.push({ id: i, value: value.toFixed(2) });
  }
};
const setBodyLetterSpacing = val =>
  BODY_LETTER_SPACING.filter(el => el.id === Number(val));
const setBodyLetterSpacingId = val =>
  BODY_LETTER_SPACING.filter(el => el.value === val);

let HEADER_LETTER_SPACING = [];
const generateHeaderLetterSpacing = val => {
  let value = parseFloat(val);
  for (let i = 1; i < 5; i++) {
    value += parseFloat(0.25);
    HEADER_LETTER_SPACING.push({ id: i, value: value.toFixed(2) });
  }
};
const setHeaderLetterSpacing = val =>
  HEADER_LETTER_SPACING.filter(el => el.id === Number(val));
const setHeaderLetterSpacingId = val =>
  HEADER_LETTER_SPACING.filter(el => el.value === val);

let BODY_LINE_HEIGHT = [];
const generateBodyLineHeight = val => {
  let value = parseFloat(val);
  for (let i = 1; i < 5; i++) {
    value += parseFloat(0.2);
    BODY_LINE_HEIGHT.push({ id: i, value: value.toFixed(1) });
  }
};

let HEADER_LINE_HEIGHT = [];
const generateHeaderLineHeight = val => {
  let value = parseFloat(val);
  for (let i = 1; i < 5; i++) {
    value += parseFloat(0.2);
    HEADER_LINE_HEIGHT.push({ id: i, value: value.toFixed(1) });
  }
};

const setBodyLineHeight = val =>
  BODY_LINE_HEIGHT.filter(el => el.id === Number(val));
const setBodyLineHeightId = val =>
  BODY_LINE_HEIGHT.filter(el => el.value === val);

const setHeaderLineHeight = val =>
  HEADER_LINE_HEIGHT.filter(el => el.id === Number(val));
const setHeaderLineHeightId = val =>
  HEADER_LINE_HEIGHT.filter(el => el.value === val);

/** DO TUD */
/*
const LETTER_SPACING = [
  { id: 1, value: 1.25 },
  { id: 2, value: 1.5 },
  { id: 3, value: 1.75 },
  { id: 4, value: 2 },
];

const setLetterSpacing = val =>
  LETTER_SPACING.filter(el => el.id === Number(val));
const setsetLetterSpacingId = val =>
  LETTER_SPACING.filter(el => el.value === val);

const LINE_HEIGHT = [
  { id: 1, value: 1.8 },
  { id: 2, value: 2.0 },
  { id: 3, value: 2.2 },
  { id: 4, value: 2.4 },
];
const setLineHeight = val => LINE_HEIGHT.filter(el => el.id === Number(val));
const setLineHeightId = val => LINE_HEIGHT.filter(el => el.value === val);
*/
const OMO_TYPE = 'OmoType';
const BODY_FONT_CHOOSER = [
  { id: 1, style: 'OmoTypeA', value: `${OMO_TYPE}A-` },
  { id: 2, style: 'OmoTypeB', value: `${OMO_TYPE}B-` },
  { id: 3, style: 'OmoTypeC', value: `${OMO_TYPE}C-` },
  { id: 4, style: 'OmoTypeD', value: `${OMO_TYPE}D-` },
  { id: 5, style: 'OmoTypeE', value: `${OMO_TYPE}E-` },
];

const HEADER_FONT_CHOOSER = [
  { id: 1, style: 'OmoTypeA', value: `${OMO_TYPE}A-` },
  { id: 2, style: 'OmoTypeB', value: `${OMO_TYPE}B-` },
  { id: 3, style: 'OmoTypeC', value: `${OMO_TYPE}C-` },
  { id: 4, style: 'OmoTypeD', value: `${OMO_TYPE}D-` },
  { id: 5, style: 'OmoTypeE', value: `${OMO_TYPE}E-` },
];
const setHeaderFontFamily = val =>
  HEADER_FONT_CHOOSER.filter(el => el.id === Number(val));
const setHeaderFontFontFamilyId = val =>
  HEADER_FONT_CHOOSER.filter(el => el.value === val);

const setFontFamily = val =>
  BODY_FONT_CHOOSER.filter(el => el.id === Number(val));
const setFontFamilyId = val => BODY_FONT_CHOOSER.filter(el => el.value === val);

const COLOR_MAP = [
  { id: 0, background: '#EFF3EE' },
  { id: 1, background: '#D9D8D8' },
  { id: 2, background: '#231F20' },
  { id: 3, background: '#9FB5DE' },
  { id: 4, background: '#B894C4' },
  { id: 5, background: '#E2B0AF' },
];
const getColor = val => COLOR_MAP.filter(el => el.id === Number(val));
const getColorValue = val => COLOR_MAP.filter(el => el.background === val);

/** get APPLIED VALUES FROM WIDGET to generate style */
const getUserAppliedValues = () => {
  const applied = document.getElementById('applyOverides').checked;
  let bSize = isDesktop()
    ? config.DESKTOP_BODY_FONT_SIZE
    : config.BODY_FONT_SIZE;
  const bFontSize =
    Number(document.getElementById('totem_bsize').value) + Number(bSize); //Number(config.BODY_FONT_SIZE);

  const hSize = isDesktop()
    ? config.DESKTOP_HEADER_FONT_SIZE
    : config.HEADER_FONT_SIZE;
  const hFontSize =
    Number(document.getElementById('totem_bsize').value) + Number(hSize); //Number(config.HEADER_FONT_SIZE);

  const bFontFamily = setFontFamily(
    document.getElementById('totem_body_ff').value,
  );
  const hFontFamily = setHeaderFontFamily(
    document.getElementById('totem_body_ff').value,
  );

  const bFontWeigth = setFontWeight(
    document.getElementById('totem_font_weight').value,
  );
  const bFontSpacing = setBodyLetterSpacing(
    document.getElementById('totem_bspacing').value,
  );
  const bFontLineHeight = setBodyLineHeight(
    document.getElementById('totem_bheight').value,
  );
  const hFontSpacing = setHeaderLetterSpacing(
    document.getElementById('totem_bspacing').value,
  );
  const hFontLineHeight = setHeaderLineHeight(
    document.getElementById('totem_bheight').value,
  );

  var fileldSetColor = document.getElementById('selectedBackround');
  let color = fileldSetColor.getAttribute('data-value');
  const backgroundColor = getColor(color);

  const data = {
    checked: applied,
    bodyFontSize: bFontSize,
    headerFontSize: hFontSize,
    headerFontSpacing: hFontSpacing[0].value,
    headerLineHeight: hFontLineHeight[0].value,
    bodyFontFamily: bFontFamily[0].value,
    headerFontFamily: hFontFamily[0].value,
    bodyFontWeight: bFontWeigth[0].value,
    bodyFontSpacing: bFontSpacing[0].value,
    bodyLineHeight: bFontLineHeight[0].value,
    bgColor: backgroundColor[0].background,
  };
  return data;
};

function generateOmoStyle() {
  const values = getUserAppliedValues();
  console.log('height:' + window.screen.availHeight);

  console.log('width:' + window.screen.availWidth);
  // ako je odabrao bez boje ili boja nije odabrana napravi bez boje
  let style =
    values.bgColor === 'transparent'
      ? ''
      : config.setBackGroundColor(
          config.BACKGROUND_COLOR_ELEMENTS,
          values.bgColor,
        );

  // style += config.IMPORTANT_ELEMENTS_SELECTOR;
  // style += setBackGroundColorImportant(
  //   BACKGROUND_COLOR_ELEMENTS_IMPORTANT,
  //   bgCol
  // );

  // const isOmoTypeTurnedOn = () => {
  //   return (
  //     document.getElementById("totem_font_weight").value !== "0" &&
  //     document.getElementById("totem_body_ff").value !== "0"
  //   );
  // };

  const headerStyle = config.setHeaderStyle(
    config.transformHeaderStyles(config.HEADER_STYLE_ELEMENTS).join(','),
    values.headerFontFamily,
    values.bodyFontWeight,
    values.headerFontSize,
    // values.bodyFontSpacing,
    // values.bodyLineHeight,
    values.headerFontSpacing,
    values.headerLineHeight,
    values.bgColor,
  );
  style += headerStyle;
  /* 
  const customHeaderStyle = config.setHeaderStyle(
    config.transformHeaderStyles(config.CUSTOM_HEADER_STYLE_ELEMENTS).join(","),
    values.headerFontFamily,
    values.headerFontSize,
    values.headerFontSpacing,
    values.headerLineHeight,
    values.bgColor
  );
  style += customHeaderStyle;
  */

  const bodyStyle = config.setBodyTextStyle(
    config.BODY_STYLE,
    values.bodyFontFamily,
    values.bodyFontWeight,
    values.bodyFontSize,
    values.bodyFontSpacing,
    values.bodyLineHeight,
    values.bgColor,
  );
  style += bodyStyle;

  const widgetStyle = config.setOmoWidgetStyle(
    config.OMO_WIDGET_ELEMENTS,
    config.omoWidgetStyle,
  );
  style += widgetStyle;

  const tweaks = config.TWEAK();
  // console.log(tweaks);
  style += tweaks;
  console.log(style);

  return style;
}

/** SAVE VALUE TO COOKIE/LOCAL STORAGE */
const saveCookie = valueChanges => {
  const name = `${config.OMO_WIDGET_COOKIE}_`;
  let data = getUserAppliedValues();
  const value = JSON.stringify(data);
  localStorage.setItem(`${name}`, value);
  // console.log(`saved:${value}`);
};

/** READ VALUE FROM SAVED COOKIE/LOCAL_STORAGE */
const readCookie = fn => {
  let data = localStorage.getItem(`${config.OMO_WIDGET_COOKIE}_`);
  if (data === null) {
    console.log(
      "can't fetch from local storage, please clear browser histroy!",
    );
    return;
  }

  setUserAppliedValues(JSON.parse(data), fn);
  const widget = document.querySelector('#omo-widget');
  /** power on widget */
  fn.getValueChanges();
};

function getLastAppliedStyleSheet() {
  const children = document.getElementsByTagName('head')[0];
  const len = children.getElementsByTagName('style').length;
  const style = children.getElementsByTagName('style')[len - 1];
  return style;
}

const applyOverides = () => {
  const omoStyle = document.getElementById(config.OMOLAB_STYLE_ID);
  let style = getLastAppliedStyleSheet();
  if (omoStyle) {
    style.innerHTML = generateOmoStyle();
    // forceRedraw(style);
    return;
  }
  const css = document.createElement('style');
  css.type = 'text/css';
  css.id = config.OMOLAB_STYLE_ID;
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
  const appliedStyle = document.getElementById(config.OMOLAB_STYLE_ID);
  const children = document.getElementsByTagName('head')[0];
  const style = getLastAppliedStyleSheet();
  /**  if omolab_style_w stylesheet is applied remove it, otherwise ignore */
  if (appliedStyle === style) {
    children.removeChild(style);
  }
};

const isDesktop = () => {
  return 768 < window.screen.availWidth;
};

export const showWidget = (text, configurations) => {
  // convert plain HTML string into DOM elementss
  const temporary = document.createElement('div');
  temporary.innerHTML = html;
  // console.log(configurations);

  addOmolabClassScopeToBody(document);
  // append elements to body
  body = document.getElementsByClassName('omo-widget-container')[0];
  while (temporary.children.length > 0) {
    const tmp = temporary.children[0];
    elements.push(tmp);
    body.appendChild(tmp);
  }
  var handle = initOmoWidgetControls();

  config
    .readConfigurationFromFile(configurations.config)
    .then(message => {
      // push default configuration values from config_xxxx.json
      HEADER_FONT_CHOOSER.push({ id: 0, value: config.HEADER_FONT_FAMILY });
      BODY_FONT_CHOOSER.push({ id: 0, value: config.BODY_FONT_FAMILY });

      generateBodyLineHeight(
        isDesktop() ? config.DESKTOP_BODY_LINE_HEIGHT : config.BODY_LINE_HEIGHT,
      );
      BODY_LINE_HEIGHT.push({
        id: 0,
        value: isDesktop()
          ? config.DESKTOP_BODY_LINE_HEIGHT
          : config.BODY_LINE_HEIGHT,
      });
      generateHeaderLineHeight(
        isDesktop()
          ? config.DESKTOP_HEADER_LINE_HEIGHT
          : config.HEADER_LINE_HEIGHT,
      );
      HEADER_LINE_HEIGHT.push({
        id: 0,
        value: isDesktop()
          ? config.DESKTOP_HEADER_LINE_HEIGHT
          : config.HEADER_LINE_HEIGHT,
      });
      console.log(BODY_LINE_HEIGHT);
      console.log(HEADER_LINE_HEIGHT);
      FONT_WEIGHT.push({ id: 0, value: config.BODY_FONT_WEIGHT });
      generateBodyLetterSpacing(
        isDesktop()
          ? config.DESKTOP_BODY_FONT_SPACING
          : config.BODY_FONT_SPACING,
      );
      BODY_LETTER_SPACING.push({
        id: 0,
        value: isDesktop()
          ? config.DESKTOP_BODY_FONT_SPACING
          : config.BODY_FONT_SPACING,
      });

      generateHeaderLetterSpacing(
        isDesktop()
          ? config.DESKTOP_HEADER_FONT_SPACING
          : config.HEADER_FONT_SPACING,
      );
      HEADER_LETTER_SPACING.push({
        id: 0,
        value: isDesktop()
          ? config.DESKTOP_HEADER_FONT_SPACING
          : config.HEADER_FONT_SPACING,
      });
      console.log(BODY_LETTER_SPACING);
      console.log(HEADER_LETTER_SPACING);
      COLOR_MAP.push({
        id: -1,
        value: config.DEFAULT_BACKGROUND,
      });
      var color = document.getElementById('selectedBackround');
      color.setAttribute('data-value', getColor(NO_BACKGROUND_COLOR)[0].id);
      readCookie(handle);
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
};
