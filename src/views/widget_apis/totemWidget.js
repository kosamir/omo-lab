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
      /**
       *  amirkos 7.9.2020
       *  on some pages when all controls are enabled last controll causes page to refresh.
       *  i belive this is because i have tryied to use programaticaly click event before control is shown!!
       *  this is the solution i belive:
       *  set background color if exist, can't do it sooner case widget is initaly hidden!!
          see comment in <see>@setUserAppliedValues</see>
       */
      // alert(e.target.id);
      if (e.target.id === 'selectedBackround') {
        let colorId = document.getElementById('selectedBackround');

        if (colorId !== '-1') {
          document
            .getElementById('backgroundReset')
            .removeAttribute('disabled');
          document
            .getElementById('selectedBackround')
            .classList['add']('has-value');
        }
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
            }, 0);
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

              buttonDown.disabled = true;
              buttonUp.disabled = false;
              /** reset backGroundColor ONLY if clicked on reset color button  */
              e.currentTarget.id === 'backgroundReset' &&
                this.triggerBackground.setAttribute('data-value', -1);
              this.closeOpenSections();
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

    this.widget.classList.contains('power-off')
      ? removeOverides()
      : applyOverides();
    saveCookie();
    const max = Math.max.apply(Math, this.sectionValues);

    if (max > 0) {
      this.widget.classList.add('has-changes');
      this.powerButton.removeAttribute('disabled');
      this.powerButton.classList.add('has-value');
    } else {
      this.widget.classList.remove('has-changes');
      this.powerButton.setAttribute('disabled', 'disabled');
      this.powerButton.classList.remove('has-value');
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
/**
 *
 * @param {data from local storage} data
 * @param {letters array for displaying font face in widget font family control} letters
 */
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
  document.getElementById('totem_bsize').setAttribute('value', fontSize);
  let maxFontSize = Number(document.getElementById('totem_bsize').max);
  if (maxFontSize === fontSize) {
    document.getElementById('font-size-up').disabled = true;
  } else if (0 === fontSize) {
    document.getElementById('font-size-down').disabled = true;
  }
  let fontFamily = setFontFamilyId(data.bodyFontFamily)[0].id;
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

  /*HACK 
  THIS sometimes used TO reload page whole page where widget is implemented
  .. i belive it has something to do with document loading causing 
  on click to be fired before element is shown!!!
  -see fix in <see> OmoWidget class --> openCloseWidget()--> on(transitionEndEvent) 

  let widgetBackgrounds = [].slice.call(
    document.querySelectorAll('.OmoWidget-action--set'),
  );
  // find element && fake click on selected backgroud, i.e. show reset button!!
  let element = widgetBackgrounds.filter(
    element => Number(element.getAttribute('data-value')) === Number(colorId),
  );
    element[0] && element[0].click();
  */
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
const OMO_FONT_WEIGHT_STYLE = 'omo-FontWeight';
const FONT_WEIGHT = [
  {
    id: 1,
    value: '500',
    omoType: 'MediumOne',
    fontWeightValue: 'omo-FontWeight-1',
  },
  {
    id: 2,
    value: '600',
    omoType: 'BoldOne',
    fontWeightValue: 'omo-FontWeight-2',
  },
  {
    id: 3,
    value: '800',
    omoType: 'BlackOne',
    fontWeightValue: 'omo-FontWeight-3',
  },
];

const setFontWeight = val => FONT_WEIGHT.filter(el => el.id === Number(val));
const setFontWeightId = val => FONT_WEIGHT.filter(el => el.value === val);
/**OD TUD  */
const OMO_BODY_LETTER_SPACING_STYLE = 'omo-BodyFontSpacing';
let BODY_LETTER_SPACING = [];
const generateBodyLetterSpacing = val => {
  let value = parseFloat(val);
  for (let i = 1; i <= 5; i++) {
    value += parseFloat(0.25);
    BODY_LETTER_SPACING.push({
      id: i,
      value: value.toFixed(2),
      bFontSpacingValue: `omo-BodyFontSpacing-${i}`,
    });
  }
};
const setBodyLetterSpacing = val =>
  BODY_LETTER_SPACING.filter(el => el.id === Number(val));
const setBodyLetterSpacingId = val =>
  BODY_LETTER_SPACING.filter(el => el.value === val);

let HEADER_LETTER_SPACING = [];
const OMO_HEADER_LETTER_SPACING_STYLE = 'omo-HeaderFontSpacing';
const generateHeaderLetterSpacing = val => {
  let value = parseFloat(val);
  for (let i = 1; i <= 5; i++) {
    value += parseFloat(0.25);
    HEADER_LETTER_SPACING.push({
      id: i,
      value: value.toFixed(2),
      hFontSpacingValue: `omo-HeaderFontSpacing-${i}`,
    });
  }
};
const setHeaderLetterSpacing = val =>
  HEADER_LETTER_SPACING.filter(el => el.id === Number(val));
const setHeaderLetterSpacingId = val =>
  HEADER_LETTER_SPACING.filter(el => el.value === val);

let BODY_LINE_HEIGHT = [];

const OMO_BODY_LINE_HEIGHT_STYLE = 'omo-BodyLineHeight';
const generateBodyLineHeight = val => {
  let value = parseFloat(val);
  for (let i = 1; i <= 5; i++) {
    value += parseFloat(0.2);
    BODY_LINE_HEIGHT.push({
      id: i,
      value: value.toFixed(1),
      bLineHeightValue: `omo-BodyLineHeight-${i}`,
    });
  }
};

let HEADER_LINE_HEIGHT = [];
const OMO_HEADER_LINE_HEIGHT_STYLE = 'omo-HeaderLineHeight';
const generateHeaderLineHeight = val => {
  let value = parseFloat(val);
  for (let i = 1; i <= 5; i++) {
    value += parseFloat(0.2);
    HEADER_LINE_HEIGHT.push({
      id: i,
      value: value.toFixed(1),
      hLineHeightValue: `omo-HeaderLineHeight-${i}`,
    });
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
const OMO_BODY_FONT_STYLE = 'omo-BodyFontType';
const BODY_FONT_CHOOSER = [
  {
    id: 1,
    style: 'OmoTypeB',
    value: `${OMO_TYPE}B-`,
    fontValue: 'omo-BodyFontType-1',
  },
  {
    id: 2,
    style: 'OmoTypeD',
    value: `${OMO_TYPE}D-`,
    fontValue: 'omo-BodyFontType-2',
  },
  {
    id: 3,
    style: 'OmoType_Serif_Std',
    value: `OmoType_Serif_Std`,
    fontValue: 'omo-BodyFontType-3',
  },
  {
    id: 4,
    style: 'OTCartaSExt',
    value: `OTCartaSExt`,
    fontValue: 'omo-BodyFontType-4',
  },
  {
    id: 5,
    style: 'OTCartaSmono',
    value: `OTCartaSmono`,
    fontValue: 'omo-BodyFontType-5',
  },
];
const OMO_HEADER_FONT_STYLE = 'omo-HeaderFontType';
const HEADER_FONT_CHOOSER = [
  {
    id: 1,
    style: 'OmoTypeB',
    value: `${OMO_TYPE}B-`,
    fontValue: 'omo-HeaderFontType-1',
  },
  {
    id: 2,
    style: 'OmoTypeD',
    value: `${OMO_TYPE}D-`,
    fontValue: 'omo-HeaderFontType-2',
  },
  {
    id: 3,
    style: 'OmoType_Serif_Std',
    value: `OmoType_Serif_Std`,
    fontValue: 'omo-HeaderFontType-3',
  },
  {
    id: 4,
    style: 'OTCartaSExt',
    value: `OTCartaSExt`,
    fontValue: 'omo-HeaderFontType-4',
  },
  {
    id: 5,
    style: 'OTCartaSmono',
    value: `OTCartaSmono`,
    fontValue: 'omo-HeaderFontType-5',
  },
];
const setHeaderFontFamily = val =>
  HEADER_FONT_CHOOSER.filter(el => el.id === Number(val));
const setHeaderFontFontFamilyId = val =>
  HEADER_FONT_CHOOSER.filter(el => el.value === val);

const setFontFamily = val =>
  BODY_FONT_CHOOSER.filter(el => el.id === Number(val));
const setFontFamilyId = val => BODY_FONT_CHOOSER.filter(el => el.value === val);

const OMO_BACKGROUND_STYLE = 'omo-BackGround';
const OMO_BODY_FONT_SIZE_STYLE = 'omo-BodyFontSize';
const OMO_HEADER_FONT_SIZE_STYLE = 'omo-HeaderFontSize';
const COLOR_MAP = [
  { id: 1, background: '#edd1b0', backgroundValue: 'omo-BackGroundColor-1' },
  { id: 2, background: '#eddd6e', backgroundValue: 'omo-BackGroundColor-2' },
  { id: 3, background: '#f8fd89', backgroundValue: 'omo-BackGroundColor-3' },
  { id: 4, background: '#eff4ef', backgroundValue: 'omo-BackGroundColor-4' },
  { id: 5, background: '#b0ded5', backgroundValue: 'omo-BackGroundColor-5' },
  { id: 6, background: '#000', backgroundValue: 'omo-BackGroundColor-6' },
];
const getColor = val => COLOR_MAP.filter(el => el.id === Number(val));
const getColorValue = val => COLOR_MAP.filter(el => el.background === val);

/**
 * // amirkos 29.07.2020 --> 4APIS APPEND SELECTORS TO BODY
 * @param {*} bFontSize
 * @param {*} hFontSize
 * @param {*} bFontFamily
 * @param {*} hFontFamily
 * @param {*} bFontWeigth
 * @param {*} bFontSpacing
 * @param {*} hFontSpacing
 * @param {*} bFontLineHeight
 * @param {*} hFontLineHeight
 * @param {*} backgroundColor
 * @param {*} applied
 */
const appendClassesToBody = (
  bFontSize,
  hFontSize,
  bFontFamily,
  hFontFamily,
  bFontWeigth,
  bFontSpacing,
  hFontSpacing,
  bFontLineHeight,
  hFontLineHeight,
  backgroundColor,
  applied,
) => {
  let currentClassList = [].slice.call(document.body.classList);
  let bodyStyleClassList = document.body.classList;
  /** VALUES FROM CONFIGURATION */
  const headerFontSizeConfig = isDesktop()
    ? config.DESKTOP_HEADER_FONT_SIZE
    : config.HEADER_FONT_SIZE;
  const bodyFontSizeConfig = isDesktop()
    ? config.DESKTOP_BODY_FONT_SIZE
    : config.BODY_FONT_SIZE;
  const headerLineHeightConfig = isDesktop()
    ? config.DESKTOP_HEADER_LINE_HEIGHT
    : config.HEADER_LINE_HEIGHT;
  const bodyLineHeightConfig = isDesktop()
    ? config.DESKTOP_BODY_LINE_HEIGHT
    : config.BODY_LINE_HEIGHT;
  const headerFontSpacingConfig = isDesktop()
    ? config.DESKTOP_HEADER_FONT_SPACING
    : config.HEADER_FONT_SPACING;
  const bodyFontSpacingsConfig = isDesktop()
    ? config.DESKTOP_BODY_FONT_SPACING
    : config.BODY_FONT_SPACING;
  //if power-on
  if (applied) {
    currentClassList.forEach(el => {
      /** BODY FONT FAMILY */
      if (el.startsWith(OMO_BODY_FONT_STYLE)) {
        bFontFamily[0].fontValue
          ? bodyStyleClassList.replace(el, bFontFamily[0].fontValue)
          : bodyStyleClassList.remove(el);
      } else if (bFontFamily[0].fontValue) {
        bodyStyleClassList.add(bFontFamily[0].fontValue);
      }
      /**HEADER FONT FAMILY */
      if (el.startsWith(OMO_HEADER_FONT_STYLE)) {
        hFontFamily[0].fontValue
          ? bodyStyleClassList.replace(el, hFontFamily[0].fontValue)
          : bodyStyleClassList.remove(el);
      } else if (hFontFamily[0].fontValue) {
        bodyStyleClassList.add(hFontFamily[0].fontValue);
      }
      /**FONT SIZE */
      let numBodyFontSize = bFontSize - Number(bodyFontSizeConfig);
      if (el.startsWith(OMO_BODY_FONT_SIZE_STYLE)) {
        Number(bodyFontSizeConfig) - bFontSize === 0
          ? bodyStyleClassList.remove(el)
          : bodyStyleClassList.replace(
              el,
              `${OMO_BODY_FONT_SIZE_STYLE}-${numBodyFontSize}`,
            );
      } else if (bFontSize.toString() !== bodyFontSizeConfig) {
        bodyStyleClassList.add(
          `${OMO_BODY_FONT_SIZE_STYLE}-${numBodyFontSize}`,
        );
      }
      /**HEADER FONT SIZE */
      let numHeaderFontSize = hFontSize - Number(headerFontSizeConfig);
      if (el.startsWith(OMO_HEADER_FONT_SIZE_STYLE)) {
        //RESET CASE
        Number(headerFontSizeConfig) - hFontSize === 0
          ? bodyStyleClassList.remove(el)
          : bodyStyleClassList.replace(
              el,
              `${OMO_HEADER_FONT_SIZE_STYLE}-${numHeaderFontSize}`,
            );
      } else if (hFontSize.toString() !== headerFontSizeConfig) {
        bodyStyleClassList.add(
          `${OMO_HEADER_FONT_SIZE_STYLE}-${numHeaderFontSize}`,
        );
      }
      /**BODY FONT WEIGHT */
      if (el.startsWith(OMO_FONT_WEIGHT_STYLE)) {
        bFontWeigth[0].fontWeightValue
          ? bodyStyleClassList.replace(el, bFontWeigth[0].fontWeightValue)
          : bodyStyleClassList.remove(el);
      } else {
        bFontWeigth[0].fontWeightValue &&
          bodyStyleClassList.add(bFontWeigth[0].fontWeightValue);
      }

      /*BODY LINE HEIGHT */
      if (el.startsWith(OMO_BODY_LINE_HEIGHT_STYLE)) {
        //RESET CASE
        if (bFontLineHeight[0].bLineHeightValue) {
          bodyStyleClassList.replace(el, bFontLineHeight[0].bLineHeightValue);
        } else {
          bodyStyleClassList.remove(el);
        }
      } else if (bFontLineHeight[0].value !== bodyLineHeightConfig) {
        bodyStyleClassList.add(bFontLineHeight[0].bLineHeightValue);
      }
      /* HEADER LINE HEIGHT*/
      if (el.startsWith(OMO_HEADER_LINE_HEIGHT_STYLE)) {
        //RESET CASE
        hFontLineHeight[0].hLineHeightValue
          ? bodyStyleClassList.replace(el, hFontLineHeight[0].hLineHeightValue)
          : bodyStyleClassList.remove(el);
      } else if (hFontLineHeight[0].value !== headerLineHeightConfig) {
        bodyStyleClassList.add(hFontLineHeight[0].hLineHeightValue);
      }
      /*BODY FONT SPACING */
      if (el.startsWith(OMO_BODY_LETTER_SPACING_STYLE)) {
        bFontSpacing[0].bFontSpacingValue
          ? bodyStyleClassList.replace(el, bFontSpacing[0].bFontSpacingValue)
          : bodyStyleClassList.remove(el);
      } else if (bodyFontSpacingsConfig !== bFontSpacing[0].value) {
        bodyStyleClassList.add(bFontSpacing[0].bFontSpacingValue);
      }

      /*HEADER FONT SPACING*/
      if (el.startsWith(OMO_HEADER_LETTER_SPACING_STYLE)) {
        hFontSpacing[0].hFontSpacingValue
          ? bodyStyleClassList.replace(el, hFontSpacing[0].hFontSpacingValue)
          : bodyStyleClassList.remove(el);
      } else if (headerFontSpacingConfig !== hFontSpacing[0].value) {
        bodyStyleClassList.add(hFontSpacing[0].hFontSpacingValue);
      }
      /*BACKGROUND COLOR */

      if (el.startsWith(OMO_BACKGROUND_STYLE)) {
        backgroundColor[0].backgroundValue
          ? bodyStyleClassList.replace(el, backgroundColor[0].backgroundValue)
          : bodyStyleClassList.remove(el);
      } else if (
        backgroundColor[0] &&
        backgroundColor[0].backgroundValue !== config.DEFAULT_BACKGROUND
      ) {
        backgroundColor[0].backgroundValue &&
          bodyStyleClassList.add(backgroundColor[0].backgroundValue);
      }
    });
  } else {
    currentClassList.forEach(el => {
      el.startsWith(OMO_BODY_FONT_STYLE) && bodyStyleClassList.remove(el);
      el.startsWith(OMO_HEADER_FONT_STYLE) && bodyStyleClassList.remove(el);
      el.startsWith(OMO_BODY_FONT_SIZE_STYLE) && bodyStyleClassList.remove(el);
      el.startsWith(OMO_HEADER_FONT_SIZE_STYLE) &&
        bodyStyleClassList.remove(el);
      el.startsWith(OMO_FONT_WEIGHT_STYLE) && bodyStyleClassList.remove(el);
      el.startsWith(OMO_BODY_LINE_HEIGHT_STYLE) &&
        bodyStyleClassList.remove(el);
      el.startsWith(OMO_HEADER_LINE_HEIGHT_STYLE) &&
        bodyStyleClassList.remove(el);
      el.startsWith(OMO_BODY_LETTER_SPACING_STYLE) &&
        bodyStyleClassList.remove(el);
      el.startsWith(OMO_HEADER_LETTER_SPACING_STYLE) &&
        bodyStyleClassList.remove(el);
      el.startsWith(OMO_BACKGROUND_STYLE) && bodyStyleClassList.remove(el);
    });
  }
};

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

  // THERE IS NO  header font size control HACK .. value of body size is added to predefined configuration value
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

  appendClassesToBody(
    bFontSize,
    hFontSize,
    bFontFamily,
    hFontFamily,
    bFontWeigth,
    bFontSpacing,
    hFontSpacing,
    bFontLineHeight,
    hFontLineHeight,
    backgroundColor,
    applied,
  );

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
  console.log(style);
  return style;
}

/** SAVE VALUE TO COOKIE/LOCAL STORAGE */
const saveCookie = valueChanges => {
  const name = `${config.OMO_WIDGET_COOKIE}_`;
  let data = getUserAppliedValues();
  const value = JSON.stringify(data);
  localStorage.setItem(`${name}`, value);
};

/** READ VALUE FROM SAVED COOKIE/LOCAL_STORAGE IF EXISTS*/
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
  setUserAppliedValues(JSON.parse(data), letters);
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
        id: NO_BACKGROUND_COLOR,
        value: config.DEFAULT_BACKGROUND,
      });
      // set it to no color first on load i.e in readCookie load color from local storage if exist!
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
