// import '@scss/main.scss';
import './polyfills';
import { $, on, getAnimatableEndEvent } from './utilities.js';
import whatInput from 'what-input';
import html from './totemWidget.html';
import config from '../../config';
import './totemWidget.css';
const NO_BACKGROUND_COLOR = -1;
const elements = [];
let body;

class OmoWidget {
  constructor(params) {
    this.widget = $(params.el);
    this.transitionEndEvent = getAnimatableEndEvent('transition');
    this.sectionValues = [];
    this.letters = ['O', 'A', 'B', 'C', 'D', 'E'];
    this.cacheElements();
    /** first init actions */
    this.initActions();
    /** read cookie and ignite bg color that is why we first set event handlers in init actions */
    this.cookie = params.readCookie(this.letters);
    this.openCloseWidget();
    this.openCloseSection();
    this.collectSectionValues();

    this.handlePower();
    // if no cookie in local storage OR if widget is in power off state remove css style from page
    /*HACK ADDED refactor power_of reset functionality*/
    !this.cookie && removeOverides();
  }

  cacheElements() {
    this.toggle = this.widget.querySelector('.OmoWidget-toggle');
    this.bottom = this.widget.querySelector('.OmoWidget-bottom');
    this.menu = this.widget.querySelector('.OmoWidget-menu');
    this.menuItems = this.widget.querySelectorAll('.OmoWidget-menuItem');
    this.triggers = this.widget.querySelectorAll('.OmoWidget-trigger');
    this.triggerBackground = this.widget.querySelector(
      '.OmoWidget-trigger--background',
    );
    this.sections = this.widget.querySelectorAll('.OmoWidget-section');
    this.sectionHolders = this.widget.querySelectorAll(
      '.OmoWidget-sectionHolder',
    );
    this.firstItem = this.menu.querySelector('li:first-child button');
    this.lastItem = this.menu.querySelector('li:last-child a');
    this.preview = this.menu.querySelector('.OmoWidget-preview');
    this.powerButton = this.menu.querySelector('.OmoWidget-trigger--power');
  }

  openCloseWidget() {
    // Open the widget on the main toggle button click
    on('click', this.toggle, e => {
      let target = e.currentTarget;
      let expanded = target.getAttribute('aria-expanded') === 'true' || false;
      target.setAttribute('aria-expanded', !expanded);

      if (!expanded) {
        this.menu.parentElement.hidden = !this.menu.parentElement.hidden;
      } else {
        this.closeOpenSections();
      }

      setTimeout(() => {
        if (expanded) {
          target.setAttribute('aria-label', 'Open the widget');
          this.menu.classList.remove('is-visible');
        } else {
          this.widget.classList.add('is-open');
          target.setAttribute('aria-label', 'Close the widget');
          if (whatInput.ask() === 'keyboard') {
            this.firstItem.focus(); // Focus the first trigger button in the menu
          }

          const height = this.widget.querySelector('.OmoWidget-menuHolder')
            .offsetHeight;
          let rotate = '';
          let translate =
            'translate(-50%, ' + parseInt(height - 30) + 'px' + ')';

          if (this._getRotationAngle(this.bottom) > 0) {
            rotate = ' rotate(180deg)';
            translate =
              'translate(-50%, ' + parseInt(-height + 30) + 'px' + ')';
          }

          this.bottom.style.transform = translate + rotate;
        }
      }, 100);
    });

    // Add or remove classes when transition ends
    // This controls visibility of the widget
    on(this.transitionEndEvent, this.menu, e => {
      if (
        e.propertyName === 'opacity' &&
        e.target === this.widget.querySelector('.OmoWidget-trigger') &&
        !this.menu.classList.contains('is-visible')
      ) {
        this.widget.classList.remove('is-open');
        this.bottom.removeAttribute('style');
      }

      if (
        e.propertyName === 'transform' &&
        e.target === this.menu &&
        this.widget.classList.contains('is-open')
      ) {
        this.menu.classList.add('is-visible');
      }

      if (
        e.propertyName === 'transform' &&
        e.target === this.menu &&
        !this.widget.classList.contains('is-open')
      ) {
        this.menu.parentElement.hidden = !this.menu.parentElement.hidden;
      }
    });

    // Close the menu when pressing ESC
    // anywhere inside the open menu
    on('keydown', this.menu, e => {
      if (e.keyCode === 27) {
        this.closeOpenSections();
        this.toggle.click();
        this.toggle.focus();
      }
    });

    // Loop focus back to the first item
    // if the user presses TAB (but not with shift) on the last button
    on('keydown', this.lastItem, e => {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        this.firstItem.focus();
      }
    });
  }

  openCloseSection() {
    this.menuItems.forEach(item => {
      const triggers = item.querySelectorAll('.OmoWidget-trigger');
      const sectionHolder = item.querySelector('.OmoWidget-sectionHolder');

      if (triggers.length && sectionHolder) {
        triggers.forEach(trigger => {
          const section = sectionHolder.querySelector('.OmoWidget-section');
          let sectionWidth,
            sectionHeight,
            leftPart = section.nextElementSibling;
          const tooltip = trigger.nextElementSibling;
          const add = section.querySelector('.OmoWidget-action--add');
          const substract = section.querySelector(
            '.OmoWidget-action--substract',
          );
          const lastItem = section.querySelector('li:first-child button');

          on('click', trigger, e => {
            const hasValue = trigger.classList.contains('has-value');

            let target = e.currentTarget;
            let expanded =
              target.getAttribute('aria-expanded') === 'true' || false;
            target.setAttribute('aria-expanded', !expanded);

            if (!expanded) {
              this.closeOpenSections();
              sectionHolder.hidden = !sectionHolder.hidden;

              if (section) {
                sectionWidth = section.offsetWidth;
                sectionHeight = section.offsetHeight;
                leftPart.style.height = sectionHeight + 'px';
              }
            }

            setTimeout(() => {
              if (expanded) {
                section.classList.remove('is-section-visible');
                // remove tooltip hidden to all uncliked menu items
                this.menuItems.forEach(el => {
                  if (target.parentElement !== el) {
                    el.classList.remove('is-tooltip-hidden');
                  }
                });
              } else {
                if (sectionWidth) {
                  leftPart.style.transform =
                    'translateX(-' +
                    parseInt(sectionWidth - 30 - 1) +
                    'px' +
                    ')';
                }
                sectionHolder.classList.add('is-section-open');
                tooltip.style.transform =
                  'translateY(-' + parseInt(sectionHeight) + 'px' + ')';
                item.classList.add('is-tooltip-visible');
                // add tooltip hidden to all unclicked menu items
                this.menuItems.forEach(el => {
                  if (target.parentElement !== el) {
                    el.classList.add('is-tooltip-hidden');
                  }
                });
                this.handleSectionKeyboard({
                  add,
                  substract,
                  hasValue,
                  lastItem,
                });
              }
            }, 100);
          });

          on(this.transitionEndEvent, section, e => {
            if (
              e.propertyName === 'opacity' &&
              e.target === section.querySelector('.OmoWidget-action') &&
              !section.classList.contains('is-section-visible')
            ) {
              leftPart.style.transform = 'translateX(0)';
              sectionHolder.classList.remove('is-section-open');
              item.classList.remove('is-tooltip-visible');
              tooltip.removeAttribute('style');
            }

            if (
              e.propertyName === 'transform' &&
              e.target === section &&
              sectionHolder.classList.contains('is-section-open')
            ) {
              section.classList.add('is-section-visible');
            }

            if (
              e.propertyName === 'transform' &&
              e.target === section &&
              !sectionHolder.classList.contains('is-section-open')
            ) {
              sectionHolder.hidden = !sectionHolder.hidden;
            }
          });

          on('keydown', section, e => {
            if (e.keyCode === 27) {
              this.closeOpenSections();
              e.preventDefault();
              e.stopImmediatePropagation();
            }
          });
        });
      }
    });
  }

  closeOpenSections() {
    this.sectionHolders.forEach(sectionHolder => {
      const trigger =
        sectionHolder.previousElementSibling.previousElementSibling;
      if (sectionHolder.classList.contains('is-section-open')) {
        trigger.click();

        if (whatInput.ask() === 'keyboard') {
          trigger.focus();
        }
      }
    });
  }

  initActions() {
    this.sectionHolders.forEach(sectionHolder => {
      const actions = sectionHolder.querySelectorAll('.OmoWidget-action');
      const input = sectionHolder.querySelector('input');
      const substract = sectionHolder.querySelector(
        '.OmoWidget-action--substract',
      );
      const trigger = sectionHolder.parentElement.querySelector(
        '.OmoWidget-trigger',
      );
      const lastItem = sectionHolder.querySelector('li:last-child button');

      if (actions && input) {
        const max = parseInt(input.getAttribute('max'));

        actions.forEach(action => {
          on('click', action, e => {
            const curVal = parseInt(input.value);
            const classes = e.currentTarget.classList;
            const isAdd = classes.contains('OmoWidget-action--add');
            const isSubstract = classes.contains('OmoWidget-action--substract');
            const isSet = classes.contains('OmoWidget-action--set');
            const isReset = classes.contains('OmoWidget-action--reset');
            const isPreview = e.currentTarget.parentElement.parentElement.querySelector(
              '.OmoWidget-preview',
            );

            let buttonUp =
              input.parentElement.firstElementChild.children[0]
                .firstElementChild;
            let buttonDown =
              input.parentElement.firstElementChild.children[1]
                .firstElementChild;
            if (!isReset) {
              if (isAdd) {
                if (curVal === max) {
                  buttonUp.disabled = true;
                  return;
                } else {
                  buttonUp.disabled = false;
                  buttonDown.disabled = false;
                }
              } else {
                if (curVal === 0 && !isSet) {
                  buttonDown.disabled = true;
                  return;
                } else {
                  buttonDown.disabled = false;
                  buttonUp.disabled = false;
                }
              }

              // if (
              //   (isAdd && curVal === max) ||
              //   (!isAdd && curVal === 0 && !isSet)
              // ) {
              //   return;
              // }

              /*HACK REMOVED refactor power_of reset functionality*/
              // this.widget.classList.remove('reset');

              if (!isSet) {
                input.value = isAdd ? curVal + 1 : curVal - 1;
                input.setAttribute('value', parseInt(input.value));
              } else {
                input.value = parseInt(action.getAttribute('data-value'));
                this.triggerBackground.setAttribute(
                  'data-value',
                  parseInt(action.getAttribute('data-value')),
                );
              }
            } else {
              e.preventDefault();
              input.value = 0;
              input.setAttribute('value', 0);

              // enable button UP all controlls except background collor wich it has NONE!!
              e.currentTarget.id !== 'backgroundReset' &&
                ((buttonDown.disabled = true), (buttonUp.disabled = false));
              /** reset backGroundColor ONLY if clicked on reset color button  */
              e.currentTarget.id === 'backgroundReset' &&
                this.triggerBackground.setAttribute('data-value', -1);
              this.closeOpenSections();
              /* HACK REMOVED refactor power_of reset functionality
              // last reset button clicked set reset class on widget!!! see collectSectionValues method!!!
              let applied = [].slice.call(
                this.widget.querySelectorAll('.OmoWidget-trigger.has-value'),
              );
              let cnt = 0;
              applied.forEach(el => {
                if (
                  !(
                    el.classList.contains('OmoWidget-trigger--power') &&
                    el.classList.contains('has-value')
                  )
                ) {
                  cnt++;
                }
              });
              if (cnt === 1) {
                this.widget.classList.add('reset');
              }*/
            }

            if (isPreview) {
              this.preview.setAttribute(
                'data-selected',
                this.letters[input.value],
              );
            }

            this.collectSectionValues();
          });
        });
      }

      on('keydown', substract, e => {
        if (!e.shiftKey && e.keyCode === 9) {
          e.preventDefault();

          if (!trigger.classList.contains('has-value')) {
            trigger.focus();
          } else {
            lastItem.focus();
          }
        }
      });

      on('keydown', lastItem, e => {
        if (!e.shiftKey && e.keyCode === 9) {
          e.preventDefault();

          if (trigger.classList.contains('has-value')) {
            trigger.focus();
          } else {
            substract.focus();
          }
        }
      });
    });
  }

  collectSectionValues() {
    this.sectionValues = [];
    this.sectionHolders.forEach(sectionHolder => {
      const input = sectionHolder.querySelector('input');
      const trigger =
        sectionHolder.previousElementSibling.previousElementSibling;
      const reset = sectionHolder.querySelector('.OmoWidget-action--reset');

      if (input) {
        const value = parseInt(input.value);
        this.sectionValues.push(value);

        if (value > 0) {
          trigger.classList.add('has-value');
          reset.removeAttribute('disabled');
        } else {
          trigger.classList.remove('has-value');
          reset.setAttribute('disabled', 'disabled');
        }
      }
    });
    /* HACK REMOVED refactor power_of reset functionality
    // remove overides a.k.a css if widget is power-of or in reset state
    if (
      !this.widget.classList.contains('power-off') &&
      !this.widget.classList.contains('reset')
    ) {
      applyOverides();
      saveCookie();
    } else {
      removeOverides();
      removeCookie();
    }
    // saveCookie();*/
    const max = Math.max.apply(Math, this.sectionValues);

    if (max > 0) {
      this.widget.classList.add('has-changes');
      this.powerButton.removeAttribute('disabled');
      this.powerButton.classList.add('has-value');
      /*HACK ADDED refactor power_of reset functionality*/
      applyOverides();
      saveCookie();
    } else {
      this.widget.classList.remove('has-changes');
      this.powerButton.setAttribute('disabled', 'disabled');
      this.powerButton.classList.remove('has-value');
      /*HACK ADDED refactor power_of reset functionality*/
      // remove overides if widget is put to reset state with up/down buttons on some controll
      // last controll puts widget in power-off state
      removeOverides();
      removeCookie();
    }
  }

  getWidgetValues() {
    return this.sectionValues;
  }

  handleSectionKeyboard(data) {
    const input = whatInput.ask();
    const { add, substract, hasValue, lastItem } = data;

    if (input !== 'keyboard') {
      return;
    }

    if (!add && !substract) {
      lastItem.focus();
    } else {
      if (hasValue) {
        substract.focus();
      } else {
        add.focus();
      }
    }
  }

  handlePower() {
    on('click', this.powerButton, () => {
      this.closeOpenSections();
      this.widget.classList.toggle('power-off');
      this.powerButton.classList.toggle('has-value');
      this.widget.classList.contains('power-off')
        ? removeOverides()
        : applyOverides();
      saveCookie();
    });
  }

  _getRotationAngle(target) {
    const obj = window.getComputedStyle(target, null);
    const matrix =
      obj.getPropertyValue('-webkit-transform') ||
      obj.getPropertyValue('-moz-transform') ||
      obj.getPropertyValue('-ms-transform') ||
      obj.getPropertyValue('-o-transform') ||
      obj.getPropertyValue('transform');

    let angle = 0;

    if (matrix !== 'none') {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      const a = values[0];
      const b = values[1];
      angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }

    return angle < 0 ? (angle += 360) : angle;
  }
}

function addOmolabClassScopeToBody(doc) {
  const document = doc.querySelector('body');
  if (document && !document.classList.contains(config.OMOLAB_BODY_CLASS)) {
    document.classList.add(config.OMOLAB_BODY_CLASS);
  }
}

const setUserAppliedValues = (data, letters) => {
  const widget = document.querySelector('#OmoWidget');
  const powerButton = document.getElementById('applyOverides');
  // if widget was ON set it on!!
  if (data.checked) {
    widget.classList['add']('has-changes');
  } else {
    widget.classList['add']('power-off');
  }
  document.getElementById('applyOverides').checked = data.checked;

  let fontSize = setFontSize(data.bodyFontSize);
  // document.getElementById('totem_bsize').value = setFontSize(data.bodyFontSize);
  document.getElementById('totem_bsize').setAttribute('value', fontSize);
  let maxFontSize = Number(document.getElementById('totem_bsize').max);
  if (maxFontSize === fontSize) {
    document.getElementById('font-size-up').disabled = true;
    // document.getElementById('font-size-down').disabled = false;
  } else if (0 === fontSize) {
    document.getElementById('font-size-down').disabled = true;
    // document.getElementById('font-size-up').disabled = true;
  }
  let fontFamily = setFontFamilyId(data.bodyFontFamily)[0].id;
  // document.getElementById('totem_body_ff').value = fontFamily;
  document.getElementById('totem_body_ff').setAttribute('value', fontFamily);

  const updateFont = value => {
    const isPreview = document.querySelector('.OmoWidget-preview');
    if (isPreview) {
      isPreview.setAttribute('data-selected', letters[value]);
      if (Number(value) === 0) {
        document.getElementById('font-type-down').disabled = true;
      }
      if (Number(value) === letters.length - 1) {
        document.getElementById('font-type-up').disabled = true;
      }
    }
  };
  updateFont(document.getElementById('totem_body_ff').value);

  let fontWeight = setFontWeightId(data.bodyFontWeight)[0].id;
  // document.getElementById('totem_font_weight').value = fontWeight;
  document
    .getElementById('totem_font_weight')
    .setAttribute('value', fontWeight);
  let maxFontWeight = Number(document.getElementById('totem_font_weight').max);
  if (0 === fontWeight) {
    document.getElementById('font-weight-down').disabled = true;
  } else if (maxFontWeight === fontWeight) {
    document.getElementById('font-weight-up').disabled = true;
  }

  let letterSpacing = setBodyLetterSpacingId(data.bodyFontSpacing)[0].id;
  // document.getElementById('totem_bspacing').value = letterSpacing;
  document
    .getElementById('totem_bspacing')
    .setAttribute('value', letterSpacing);
  let maxLetterSpacing = Number(document.getElementById('totem_bspacing').max);

  if (0 === letterSpacing) {
    document.getElementById('letter-spacing-down').disabled = true;
  }
  if (maxLetterSpacing === letterSpacing) {
    document.getElementById('letter-spacing-up').disabled = true;
  }
  let lineHeight = setBodyLineHeightId(data.bodyLineHeight)[0].id;
  document.getElementById('totem_bheight').value = lineHeight;
  document.getElementById('totem_bheight').setAttribute('value', lineHeight);
  let maxLineHeight = Number(document.getElementById('totem_bheight').max);
  if (0 === lineHeight) {
    document.getElementById('line-height-down').disabled = true;
  }
  if (maxLineHeight === lineHeight) {
    document.getElementById('line-height-up').disabled = true;
  }

  let colorId = getColorValue(data.bgColor)[0].id;
  document
    .getElementById('selectedBackround')
    .setAttribute('data-value', colorId);

  let widgetBackgrounds = [].slice.call(
    document.querySelectorAll('.OmoWidget-action--set'),
  );
  // find element && fake click on selected backgroud, i.e. show reset button!!
  let element = widgetBackgrounds.filter(
    element => Number(element.getAttribute('data-value')) === Number(colorId),
  );
  element[0] && element[0].click();

  return data.checked;
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
];

const setFontWeight = val => FONT_WEIGHT.filter(el => el.id === Number(val));
const setFontWeightId = val => FONT_WEIGHT.filter(el => el.value === val);
/**OD TUD  */
let BODY_LETTER_SPACING = [];
const generateBodyLetterSpacing = val => {
  let value = parseFloat(val);
  for (let i = 1; i <= 5; i++) {
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
  for (let i = 1; i <= 5; i++) {
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
  for (let i = 1; i <= 5; i++) {
    value += parseFloat(0.2);
    BODY_LINE_HEIGHT.push({ id: i, value: value.toFixed(1) });
  }
};

let HEADER_LINE_HEIGHT = [];
const generateHeaderLineHeight = val => {
  let value = parseFloat(val);
  for (let i = 1; i <= 5; i++) {
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

const OMO_TYPE = 'OmoType';
const BODY_FONT_CHOOSER = [
  { id: 1, style: 'OmoTypeB', value: `${OMO_TYPE}B-` },
  { id: 2, style: 'OmoTypeD', value: `${OMO_TYPE}D-` },
  { id: 3, style: 'OmoType_Serif_Std', value: `OmoType_Serif_Std` },
  { id: 4, style: 'OTCartaSExt', value: `OTCartaSExt` },
  { id: 5, style: 'OTCartaSmono', value: `OTCartaSmono` },
];

const HEADER_FONT_CHOOSER = [
  { id: 1, style: 'OmoTypeB', value: `${OMO_TYPE}B-` },
  { id: 2, style: 'OmoTypeD', value: `${OMO_TYPE}D-` },
  { id: 3, style: 'OmoType_Serif_Std', value: `OmoType_Serif_Std` },
  { id: 4, style: 'OTCartaSExt', value: `OTCartaSExt` },
  { id: 5, style: 'OTCartaSmono', value: `OTCartaSmono` },
];
const setHeaderFontFamily = val =>
  HEADER_FONT_CHOOSER.filter(el => el.id === Number(val));
const setHeaderFontFontFamilyId = val =>
  HEADER_FONT_CHOOSER.filter(el => el.value === val);

const setFontFamily = val =>
  BODY_FONT_CHOOSER.filter(el => el.id === Number(val));
const setFontFamilyId = val => BODY_FONT_CHOOSER.filter(el => el.value === val);

const COLOR_MAP = [
  { id: 1, background: '#edd1b0' },
  { id: 2, background: '#eddd6e' },
  { id: 3, background: '#f8fd89' },
  { id: 4, background: '#eff4ef' },
  { id: 5, background: '#b0ded5' },
  { id: 6, background: '#000' },
];
const getColor = val => COLOR_MAP.filter(el => el.id === Number(val));
const getColorValue = val => COLOR_MAP.filter(el => el.background === val);

/** get APPLIED VALUES FROM WIDGET to generate style */
const getUserAppliedValues = () => {
  const applied = document
    .getElementById('OmoWidget')
    .classList.contains('power-off')
    ? false
    : true;

  // for desktop and mobile different configuration values.
  let bSize = isDesktop()
    ? config.DESKTOP_BODY_FONT_SIZE
    : config.BODY_FONT_SIZE;
  const bFontSize =
    Number(document.getElementById('totem_bsize').value) + Number(bSize); //Number(config.BODY_FONT_SIZE);

  // hack no header font size control.. value of body size is added to predefined configuration value
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

  // ako je odabrao bez boje ili boja nije odabrana napravi bez boje
  let style =
    values.bgColor === 'transparent'
      ? ''
      : config.setBackGroundColor(
          config.BACKGROUND_COLOR_ELEMENTS,
          values.bgColor,
        );

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
  /** 
  const widgetStyle = config.setOmoWidgetStyle(
    config.OMO_WIDGET_ELEMENTS,
    config.omoWidgetStyle,
  );
  style += widgetStyle;
*/
  const tweaks = config.TWEAK();
  style += tweaks;
  // console.log(style);
  return style;
}

/** SAVE VALUE TO COOKIE/LOCAL STORAGE */
const saveCookie = valueChanges => {
  const name = `${config.OMO_WIDGET_COOKIE}_`;
  let data = getUserAppliedValues();
  const value = JSON.stringify(data);
  localStorage.setItem(`${name}`, value);
};
const removeCookie = () => {
  const name = `${config.OMO_WIDGET_COOKIE}_`;
  localStorage.removeItem(`${name}`);
};

/** READ VALUE FROM SAVED COOKIE/LOCAL_STORAGE */
const readCookie = letters => {
  let data = localStorage.getItem(`${config.OMO_WIDGET_COOKIE}_`);
  if (data === null) {
    console.log(
      "can't fetch from local storage, please clear browser histroy!",
    );
    document.getElementById('font-size-down').disabled = true;
    document.getElementById('font-type-down').disabled = true;
    document.getElementById('font-weight-down').disabled = true;
    document.getElementById('letter-spacing-down').disabled = true;
    document.getElementById('line-height-down').disabled = true;
    return false;
  }

  return setUserAppliedValues(JSON.parse(data), letters);
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

  addOmolabClassScopeToBody(document);
  // append elements to body
  body = document.getElementsByClassName('omo-widget-container')[0];
  while (temporary.children.length > 0) {
    const tmp = temporary.children[0];
    elements.push(tmp);
    body.appendChild(tmp);
  }

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
      // console.log(BODY_LINE_HEIGHT);
      // console.log(HEADER_LINE_HEIGHT);
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
      // console.log(BODY_LETTER_SPACING);
      // console.log(HEADER_LETTER_SPACING);
      COLOR_MAP.push({
        id: -1,
        value: config.DEFAULT_BACKGROUND,
      });
      var color = document.getElementById('selectedBackround');
      color.setAttribute('data-value', getColor(NO_BACKGROUND_COLOR)[0].id);
      var handle = new OmoWidget({
        el: '#OmoWidget',
        readCookie: readCookie,
      });
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
};
