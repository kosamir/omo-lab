import config from "../config";
import "./totemWidget.css";
import html from "./totemWidget.html";

const IMAGE_OPEN = "/img/open.png";
const IMAGE_CLOSE = "/img/close.png";
const IMAGE_SAVE_ACTIVE = "/img/SAVE-ACTIVE-ICON.png";

const elements = [];
let body;
let toggler;

var initOmoWidgetControls = function() {
  // elements

  const widget = document.querySelector("#omo-widget");
  const mainToggle = widget.querySelector(".omo-widget__main-toggle");
  const forms = widget.querySelectorAll("form");
  const optionDisplayToggles = widget.querySelectorAll(
    ".omo-widget__toggle-options"
  );
  const valueInputs = widget.querySelectorAll(".omo-widget__option-value");
  const incrementControlButtons = widget.querySelectorAll('[type="button"]');
  const resetElements = widget.querySelectorAll(".omo-widget__reset");
  const backgroundSettingsForm = widget.querySelector(
    '[data-setting-name="background"] form'
  );
  const backgroundSettingsReset = backgroundSettingsForm.querySelector(
    ".omo-widget__reset"
  );
  const fontTypePreview = widget.querySelector(".omo-widget__type-preview");
  const powerToggle = widget.querySelector(".omo-widget__power-toggle");

  const elementsWithActiveState = widget.querySelectorAll("label, button");

  // functions

  const closeOptions = function() {
    [].slice.call(optionDisplayToggles).forEach(function(optionDisplayToggle) {
      optionDisplayToggle.checked = false;
      optionDisplayToggle.setAttribute("aria-selected", "false");
    });
    // [].slice.call(valueInputs).forEach(function(value) {
    //   alert(value.id + " " + value.value);
    // });
  };

  const handlePowerToggle = function(event) {
    console.log(event.target);
    if (mainToggle.parentElement.classList.toggle("power-off")) {
      removeOverides();
    } else {
      applyOverides();
    }
    saveCookie(0);
    closeOptions();
  };

  const updateFontFamilyPreview = function(value) {
    const letters = ["O", "A", "B", "C", "D", "E"];

    +fontTypePreview.setAttribute("data-selected", letters[value]);
  };

  const handleButtonClick = function(event) {
    let input = event.target.parentElement.querySelector("[type='number'");
    let curVal = parseInt(input.value);
    let isAdd = event.target.classList.contains("omo-widget__add");

    console.log(input.id + " " + input.value);
    if (
      (isAdd && curVal == input.getAttribute("max")) ||
      (!isAdd && curVal == 0)
    ) {
      return;
    }
    input.value = isAdd ? curVal + 1 : curVal - 1;

    handleValueChange();

    // !! only if font type
    if (input.id === "totem_body_ff") updateFontFamilyPreview(input.value);
  };

  const handleValueChange = function() {
    let changesActive = 0;
    [].slice.call(forms).forEach(function(form) {
      console.log("form.checkValidity:" + form.checkValidity());
      if (form.checkValidity()) {
        form.classList.add("valid");
        changesActive++;
      } else {
        form.classList.remove("valid");
      }
    });

    if (!document.getElementById("applyOverides").checked) {
      // changesActive > 0 && applyOverides();
      applyOverides();
    }
    if (changesActive === 0) {
      removeOverides();
    }

    // changesActive > 0
    //   ? mainToggle.parentElement.classList.toggle("power-off")
    //   : mainToggle.parentElement.classList.toggle("power-on");
    // console.log(changesActive);
    // saveCookie(changesActive);

    widget.classList[changesActive > 0 ? "add" : "remove"]("has-changes");
    // widget.classList[changesActive > 0 ? "add" : "add"](
    //   "has-changes power-off"
    // );
    return changesActive;
  };

  const handleValueKeyboardEvents = function(event) {
    const isDown = event.code == "ArrowDown";
    const isUp = event.code == "ArrowUp";
    const isTab = event.code == "Tab";

    if (isTab) {
      event.preventDefault();
      event.target.parentElement.parentElement.nextElementSibling
        .querySelector("[type='radio']")
        .focus();
      return;
    }

    const addBtn = event.target.parentElement.querySelector(".add");
    const substractBtn = event.target.parentElement.querySelector(".substract");

    updateFontFamilyPreview(event.target.value);

    if (isDown) {
      substractBtn.classList.add("active");
      setTimeout(function() {
        substractBtn.classList.remove("active");
      }, 20);
      if (event.target.value == 1) {
        event.target.value = 0;
        updateFontFamilyPreview(0);
      }
    } else if (isUp) {
      addBtn.classList.add("active");
      setTimeout(function() {
        addBtn.classList.remove("active");
      }, 20);
    }
  };

  const resetValuesToZero = e => {
    if (e.target.id === "totem_body_ff_reset") {
      updateFontFamilyPreview(0);
      document.getElementById("totem_body_ff").value = 0;
    } else if (e.target.id === "totem_bsize_reset") {
      document.getElementById("totem_bsize").value = 0;
    } else if (e.target.id === "totem_font_weight_reset") {
      document.getElementById("totem_font_weight").value = 0;
    } else if (e.target.id === "totem_bspacing_reset") {
      document.getElementById("totem_bspacing").value = 0;
    } else if (e.target.id === "totem_bheight_reset") {
      document.getElementById("totem_bheight").value = 0;
    }
  };

  const handleResetClick = function(e) {
    resetValuesToZero(e);
    closeOptions();
    setTimeout(function() {
      handleValueChange(), 1;
    });
  };

  const handleOptionDisplayToggle = function(event) {
    const optionDisplayToggle = event.target;
    // console.log(event.target);

    if (event.code) {
      const isTab = event.code == "Tab";
      const isSpace = event.code == "Space";
      const isEnter = event.code == "Enter";

      if (
        isTab &&
        optionDisplayToggle.getAttribute("aria-selected") == "false"
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
    if (optionDisplayToggle.getAttribute("aria-selected") == "true") {
      optionDisplayToggle.setAttribute("aria-selected", "false");
      optionDisplayToggle.checked = false;
    } else {
      closeOptions();
      optionDisplayToggle.setAttribute("aria-selected", "true");
      optionDisplayToggle.checked = true;
    }
  };

  // event listeners

  mainToggle.addEventListener("click", closeOptions);

  powerToggle.addEventListener("click", handlePowerToggle);

  [].slice.call(optionDisplayToggles).forEach(function(radio) {
    radio.addEventListener("click", handleOptionDisplayToggle);
    radio.addEventListener("keydown", handleOptionDisplayToggle);
  });

  [].slice.call(valueInputs).forEach(function(value) {
    value.addEventListener("keydown", handleValueKeyboardEvents);
    value.addEventListener("change", handleValueChange);
  });

  [].slice.call(incrementControlButtons).forEach(function(button) {
    button.addEventListener("click", handleButtonClick);
  });

  [].slice.call(resetElements).forEach(function(reset) {
    reset.addEventListener("click", handleResetClick);
  });

  backgroundSettingsForm.addEventListener("change", function(event) {
    backgroundSettingsForm.parentElement.setAttribute(
      "data-value",
      event.srcElement.value
    );
    handleValueChange();
  });

  [].slice.call(elementsWithActiveState).forEach(function(element) {
    element.addEventListener("mousedown", function(event) {
      event.target.classList.add("active");
    });
    element.addEventListener("mouseup", function(event) {
      event.target.classList.remove("active");
    });
  });

  backgroundSettingsReset.addEventListener("click", function() {
    backgroundSettingsForm.parentElement.setAttribute("data-value", -1);
  });
  return {
    updateFont: function(value) {
      updateFontFamilyPreview(value);
    },
    getValueChanges: function() {
      return handleValueChange();
    }
  };
};
// document.addEventListener("DOMContentLoaded", initOmoWidgetControls);

function addOmolabClassScopeToBody(doc) {
  const document = doc.querySelector("body");
  if (document && !document.classList.contains(config.OMOLAB_BODY_CLASS)) {
    document.classList.add(config.OMOLAB_BODY_CLASS);
  }
}

const setUserAppliedValues = (data, fn) => {
  console.log("setUserAppliedValues:" + data.checked);
  console.log(data.checked === false);
  const widget = document.querySelector("#omo-widget");
  const mainToggle = widget.querySelector(".omo-widget__main-toggle");
  if (!data.checked) {
    alert("widget is on");
    widget.classList["add"]("has-changes");
    // const mainToggle = widget.querySelector(".omo-widget__main-toggle");
    // mainToggle.parentElement.classList.toggle("power-off");
  } else {
    mainToggle.parentElement.classList.toggle("power-off");
  }
  document.getElementById("applyOverides").checked = data.checked;

  document.getElementById("totem_bsize").value = setFontSize(data.bodyFontSize);
  alert(document.getElementById("totem_bsize").value);
  document.getElementById("totem_body_ff").value = setFontFamilyId(
    data.bodyFontFamily
  )[0].id;

  fn.updateFont(document.getElementById("totem_body_ff").value);

  document.getElementById("totem_font_weight").value = setFontWeightId(
    data.bodyFontWeight
  )[0].id;
  document.getElementById("totem_bspacing").value = setsetLetterSpacingId(
    data.bodyFontSpacing
  )[0].id;
  document.getElementById("totem_bheight").value = setLineHeightId(
    data.bodyLineHeight
  )[0].id;
  var bg = document.getElementById("selectedBackround");
  bg.setAttribute("data-value", getColorValue(data.bgColor)[0].id);
};

const setFontSize = val => Number(val) - Number(config.BODY_FONT_SIZE);

const FONT_WEIGHT = [
  { id: 1, value: "500", omoType: "BoldOne" },
  { id: 2, value: "600", omoType: "BookOne" },
  { id: 3, value: "800", omoType: "MediumOne" }
  // ,
  // { id: 4, value: "lighter" }
];

const setFontWeight = val => FONT_WEIGHT.filter(el => el.id === Number(val));
const setFontWeightId = val => FONT_WEIGHT.filter(el => el.value === val);

const LETTER_SPACING = [
  { id: 1, value: 1.25 },
  { id: 2, value: 1.5 },
  { id: 3, value: 1.75 },
  { id: 4, value: 2 }
];

const setLetterSpacing = val =>
  LETTER_SPACING.filter(el => el.id === Number(val));
const setsetLetterSpacingId = val =>
  LETTER_SPACING.filter(el => el.value === val);

const LINE_HEIGHT = [
  { id: 1, value: 1.8 },
  { id: 2, value: 2.0 },
  { id: 3, value: 2.2 },
  { id: 4, value: 2.4 }
];
const setLineHeight = val => LINE_HEIGHT.filter(el => el.id === Number(val));
const setLineHeightId = val => LINE_HEIGHT.filter(el => el.value === val);

const OMO_TYPE = "OmoType";
const BODY_FONT_CHOOSER = [
  { id: 1, style: "OmoTypeA", value: `${OMO_TYPE}A-` },
  { id: 2, style: "OmoTypeB", value: `${OMO_TYPE}B-` },
  { id: 3, style: "OmoTypeC", value: `${OMO_TYPE}C-` },
  { id: 4, style: "OmoTypeD", value: `${OMO_TYPE}D-` },
  { id: 5, style: "OmoTypeE", value: `${OMO_TYPE}E-` }
];

const HEADER_FONT_CHOOSER = [
  { id: 1, style: "OmoTypeA", value: `${OMO_TYPE}A-` },
  { id: 2, style: "OmoTypeB", value: `${OMO_TYPE}B-` },
  { id: 3, style: "OmoTypeC", value: `${OMO_TYPE}C-` },
  { id: 4, style: "OmoTypeD", value: `${OMO_TYPE}D-` },
  { id: 5, style: "OmoTypeE", value: `${OMO_TYPE}E-` }
];
const setHeaderFontFamily = val =>
  HEADER_FONT_CHOOSER.filter(el => el.id === Number(val));
const setHeaderFontFontFamilyId = val =>
  HEADER_FONT_CHOOSER.filter(el => el.value === val);

const setFontFamily = val =>
  BODY_FONT_CHOOSER.filter(el => el.id === Number(val));
const setFontFamilyId = val => BODY_FONT_CHOOSER.filter(el => el.value === val);

const COLOR_MAP = [
  { id: 0, background: "#EFF3EE" },
  { id: 1, background: "#D9D8D8" },
  { id: 2, background: "#231F20" },
  { id: 3, background: "#9FB5DE" },
  { id: 4, background: "#B894C4" },
  { id: 5, background: "#E2B0AF" }
];
const getColor = val => COLOR_MAP.filter(el => el.id === Number(val));
const getColorValue = val => COLOR_MAP.filter(el => el.background === val);

/** get APPLIED VALUES FROM WIDGET */
const getUserAppliedValues = () => {
  const applied = document.getElementById("applyOverides").checked;

  const bFontSize =
    Number(document.getElementById("totem_bsize").value) +
    Number(config.BODY_FONT_SIZE);

  const hFontSize =
    Number(document.getElementById("totem_bsize").value) +
    Number(config.HEADER_FONT_SIZE);

  const bFontFamily = setFontFamily(
    document.getElementById("totem_body_ff").value
  );
  const hFontFamily = setHeaderFontFamily(
    document.getElementById("totem_body_ff").value
  );

  const bFontWeigth = setFontWeight(
    document.getElementById("totem_font_weight").value
  );
  const bFontSpacing = setLetterSpacing(
    document.getElementById("totem_bspacing").value
  );
  const bFontLineHeight = setLineHeight(
    document.getElementById("totem_bheight").value
  );
  var fileldSetColor = document.getElementById("selectedBackround");
  let color = fileldSetColor.getAttribute("data-value");
  const backgroundColor = getColor(color);

  const data = {
    checked: applied,
    bodyFontSize: bFontSize,
    headerFontSize: hFontSize,
    bodyFontFamily: bFontFamily[0].value,
    headerFontFamily: hFontFamily[0].value,
    bodyFontWeight: bFontWeigth[0].value,
    bodyFontSpacing: bFontSpacing[0].value,
    bodyLineHeight: bFontLineHeight[0].value,
    bgColor: backgroundColor[0].background
  };
  return data;
};

function generateOmoStyle() {
  const values = getUserAppliedValues();
  console.log(values);
  // ako je odabrao bez boje ili boja nije odabrana napravi bez boje
  let style =
    values.bgColor === "transparent"
      ? ""
      : config.setBackGroundColor(
          config.BACKGROUND_COLOR_ELEMENTS,
          values.bgColor
        );

  // style += config.IMPORTANT_ELEMENTS_SELECTOR;
  // style += setBackGroundColorImportant(
  //   BACKGROUND_COLOR_ELEMENTS_IMPORTANT,
  //   bgCol
  // );

  const isOmoTypeTurnedOn = () => {
    return (
      document.getElementById("totem_font_weight").value !== "0" &&
      document.getElementById("totem_body_ff").value !== "0"
    );
  };

  const headerStyle = config.setHeaderStyle(
    config.transformHeaderStyles(config.HEADER_STYLE_ELEMENTS).join(","),
    // isOmoTypeTurnedOn()
    //   ? values.headerFontFamily +
    //       setFontWeightId(values.bodyFontWeight)[0].omoType
    //   : values.headerFontFamily,
    values.headerFontFamily,
    values.bodyFontWeight,
    values.headerFontSize,
    values.bodyFontSpacing,
    values.bodyLineHeight,
    values.bgColor
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
    // isOmoTypeTurnedOn()
    //   ? values.bodyFontFamily +
    //       setFontWeightId(values.bodyFontWeight)[0].omoType
    //   : values.bodyFontFamily,
    values.bodyFontFamily,
    values.bodyFontWeight,
    values.bodyFontSize,
    values.bodyFontSpacing,
    values.bodyLineHeight,
    values.bgColor
  );
  style += bodyStyle;

  const widgetStyle = config.setOmoWidgetStyle(
    config.OMO_WIDGET_ELEMENTS,
    config.omoWidgetStyle
  );
  style += widgetStyle;

  const tweaks = config.TWEAK();
  // console.log(tweaks);
  style += tweaks;
  // console.log(style);
  return style;
}

const saveCookie = valueChanges => {
  const name = `${config.OMO_WIDGET_COOKIE}_`;
  let data = getUserAppliedValues();
  // data.checked = Number(valueChanges) > 0 ? false : true;
  console.log("save cookie:" + JSON.stringify(data));
  const value = JSON.stringify(data);

  localStorage.setItem(`${name}`, value);
  // document.cookie = `${name}=${value}; SameSite=None; Secure;`;
  console.log(`saved:${value}`);
};

/** SAVES CURRENT CONFIGURATION REFACTOR 
const saveConf = event => {
  const text = ""; // document.getElementById('omoConf').value;
  if (
    event.target.type === "button" ||
    event.target.type === "image" ||
    event.target.type === "checkbox"
  ) {
    saveCookie(text);
  }
};
*/

/** READ VALUE FROM SAVED COOKIE */
const readCookie = fn => {
  // const cookie = document.cookie
  //   .split(";")
  //   .filter(el => el.startsWith(` ${config.OMO_WIDGET_COOKIE}`));
  // if (cookie.length > 0) {
  //   const data = cookie[0].split("=")[1];
  let data = localStorage.getItem(`${config.OMO_WIDGET_COOKIE}_`);
  console.log(data === null);
  if (data === null) {
    alert("can't fetch from local storage, please clear browser histroy!");
    return;
  }

  setUserAppliedValues(JSON.parse(data), fn);
  alert("read cookie" + JSON.stringify(data));
  alert(data);
  const widget = document.querySelector("#omo-widget");
  fn.getValueChanges();
  /** 
  if (!getUserAppliedValues().checked) {
    // widget.classList["add"]("has-changes");
    let active = fn.getValueChanges();
    // active > 0
    //   ? mainToggle.parentElement.classList.toggle("power-off")
    //   : mainToggle.parentElement.classList.toggle("power-on");
    // applyOverides();
  } else {
  }*/
};

function getLastAppliedStyleSheet() {
  const children = document.getElementsByTagName("head")[0];
  const len = children.getElementsByTagName("style").length;
  const style = children.getElementsByTagName("style")[len - 1];
  return style;
}

const forceRedraw = element => {
  if (!element) {
    return;
  }

  const n = document.createTextNode(" ");
  const disp = element.style.display;
  element.appendChild(n);
  element.style.display = "none";

  setTimeout(() => {
    element.style.display = disp;
    n.parentNode.removeChild(n);
  }, 0);
};

const applyOverides = () => {
  const omoStyle = document.getElementById("omolab_style_w");
  let style = getLastAppliedStyleSheet();
  if (omoStyle) {
    style.innerHTML = generateOmoStyle();
    // forceRedraw(style);
    return;
  }
  const css = document.createElement("style");
  css.type = "text/css";
  css.id = "omolab_style_w";
  style = generateOmoStyle();
  if (css.styleSheet) {
    css.styleSheet.cssText = style;
  } else {
    css.appendChild(document.createTextNode(style));
  }

  /* Append style to the tag name */
  document.getElementsByTagName("head")[0].appendChild(css);
};

const removeOverides = () => {
  const appliedStyle = document.getElementById("omolab_style_w");
  const children = document.getElementsByTagName("head")[0];
  const style = getLastAppliedStyleSheet();
  console.log(appliedStyle === style);
  /**  if omolab_style_w stylesheet is applied remove it, otherwise ignore */
  if (appliedStyle === style) {
    children.removeChild(style);
  }
};
/*
function applyOmoStyles(event) {
  const check = document.getElementById("applyOverides").checked;
  check ? applyOverides() : removeOverides();
  saveConf(event);
}

function applyOmoStylesTotem() {
  alert("applyOmoStylesTotem");
  const check = document.getElementById("applyOverides").checked;
  check ? applyOverides() : removeOverides();
  // saveConf(event);
}
*/
export const showWidget = (text, configurations) => {
  // convert plain HTML string into DOM elementss
  const temporary = document.createElement("div");
  temporary.innerHTML = html;
  console.log(text);
  console.log(configurations);

  addOmolabClassScopeToBody(document);
  // append elements to body
  body = document.getElementsByClassName("omo-widget-container")[0];
  while (temporary.children.length > 0) {
    const tmp = temporary.children[0];
    elements.push(tmp);
    body.appendChild(tmp);
  }
  var handle = initOmoWidgetControls();

  config
    .readConfigurationFromFile(configurations.config)
    .then(message => {
      // push default font from configuration
      HEADER_FONT_CHOOSER.push({ id: 0, value: config.HEADER_FONT_FAMILY });
      BODY_FONT_CHOOSER.push({ id: 0, value: config.BODY_FONT_FAMILY });
      LINE_HEIGHT.push({ id: 0, value: config.BODY_LINE_HEIGHT });
      FONT_WEIGHT.push({ id: 0, value: config.BODY_FONT_WEIGHT });
      LETTER_SPACING.push({ id: 0, value: config.BODY_FONT_SPACING });
      COLOR_MAP.push({ id: -1, value: config.DEFAULT_BACKGROUND });
      var color = document.getElementById("selectedBackround");
      console.log(getColor(-1));
      color.setAttribute("data-value", getColor(-1)[0].id);
      readCookie(handle);
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
};
