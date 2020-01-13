import config from '../config';
import './omoTotemWidget.css';
import html from './omoTotemWidget.html';

let body;
const elements = [];

const saveCookie = (text) => {
    const name = `${config.OMO_WIDGET_COOKIE}_${text}`;
    const value = JSON.stringify(getUserAppliedValues());
    document.cookie = `${name}=${value};`;
    console.log(`saved:${value}`);
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

function generateOmoStyle() {
    const values = getUserAppliedValues();
    // ako je odabrana pozadina primjeni na definirane elemente, ako je transparent onda zaobidji
    let style = values.bgColor !== config.DEFAULT_BACKGROUND ? config.setBackGroundColor(config.BACKGROUND_COLOR_ELEMENTS, values.bgColor) : '';
    const bodyStyle = config.setBodyTextStyle(config.BODY_STYLE, values.bodyFontFamily, values.bodyFontWeight, values.bodyFontSize, values.bodyFontSpacing, values.bodyLineHeight, values.bgColor);
    style += bodyStyle;
    const widgetStyle = config.setOmoWidgetStyle(config.OMO_WIDGET_ELEMENTS, config.omoWidgetStyle);
    style += widgetStyle;
    const tweaks = config.TWEAK();
    // console.log(tweaks);
    style += tweaks;
    console.log(style);
    return style;
}

const higlightSelections = (userData) => {
    if (userData.bodyFontSize !== config.BODY_FONT_SIZE) {
        let fontSize = document.getElementById('font');
        fontSize.click.apply(fontSize);
        fontSize.click.apply(fontSize);
    }
    if (userData.bodyFontFamily !== config.BODY_FONT_FAMILY) {
        let fontType = document.getElementById('font-type');
        fontType.click.apply(fontType);
        fontType.click.apply(fontType);
    }
    if (userData.bodyFontWeight !== config.BODY_FONT_WEIGHT) {
        let fontWeight = document.getElementById('font-weight');
        fontWeight.click.apply(fontWeight);
        fontWeight.click.apply(fontWeight);
    }
    if (userData.bodyFontSpacing !== config.BODY_FONT_SPACING) {
        let fontSpacing = document.getElementById('font-spacing');
        fontSpacing.click.apply(fontSpacing);
        fontSpacing.click.apply(fontSpacing);
    }
    if (userData.bodyLineHeight !== config.BODY_LINE_HEIGHT) {
        let lineSpacing = document.getElementById('line-spacing');
        lineSpacing.click.apply(lineSpacing);
        lineSpacing.click.apply(lineSpacing);
    }
    if (userData.bgColor !== config.DEFAULT_BACKGROUND) {
        let selectedCollor = userData.bgColor.substring(1); // makni #
        let collor = document.getElementById(selectedCollor);
        collor.click.apply(collor);
        let picker = document.getElementById('background');
        picker.click.apply(picker);
        picker.click.apply(picker);
    }
    var parent = document.getElementById('parent')
    parent.click.apply(parent);
    parent.click.apply(parent);
}

/** READ VALUE FROM SAVED COOKIE */
const readCookie = () => {
    const cookie = document.cookie.split(';').filter((el) => el.startsWith(` ${config.OMO_WIDGET_COOKIE}`));
    if (cookie.length > 0) {
        const data = cookie[0].split('=')[1];

        setUserAppliedValues(JSON.parse(data));
        var userData = getUserAppliedValues();
        // higlightSelections(userData);
        if (userData.checked) {
            alert('from cookie')
            // todo power all buttons that were selected!
            var main = document.getElementById('ignite')
            main.click.apply(main);

            applyOverides()
        } else {
            // removeOverides()
            alert('remove overides')
        }

    }
};


const setUserAppliedValues = (data) => {
    document.getElementById('applyOverides').value = data.checked == true ? 'on' : 'off';
    document.getElementById('totem_bsize').value = data.bodyFontSize;
    document.getElementById('totem_body_ff').value = data.bodyFontFamily;
    document.getElementById('totem_font_weight').value = data.bodyFontWeight;
    document.getElementById('totem_bspacing').value = data.bodyFontSpacing;
    document.getElementById('totem_bheight').value = data.bodyLineHeight;
    document.getElementById('selectedBackground').value = data.bgColor


};
/** get APPLIED VALUES FROM WIDGET */
const getUserAppliedValues = () => {
    const applied = document.getElementById('applyOverides').value == 'on' ? true : false;

    const bFontSize = document.getElementById('totem_bsize').value;
    const bFontFamily = document.getElementById('totem_body_ff').value;
    const bFontWeigth = document.getElementById('totem_font_weight').value;
    const bFontSpacing = document.getElementById('totem_bspacing').value;
    const bFontLineHeight = document.getElementById('totem_bheight').value;
    const backgroundColor = document.getElementById('selectedBackground').value

    const data = {
        checked: applied,
        bodyFontSize: bFontSize,
        bodyFontFamily: bFontFamily,
        bodyFontWeight: bFontWeigth,
        bodyFontSpacing: bFontSpacing,
        bodyLineHeight: bFontLineHeight,
        bgColor: backgroundColor,
    };
    return data;
};

function addOmolabClassScopeToBody(doc) {
    const document = doc.querySelector('body');
    if (document && !document.classList.contains(config.OMOLAB_BODY_CLASS)) {
        document.classList.add(config.OMOLAB_BODY_CLASS);
    }
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
    }
    /**MAIN POWER TOOGLER ON_OF WIDGET */
    let powerToggler = widgetOnOffToggler(document.getElementById('ignite'), ['omo-totem-off'], ['omo-totem-on', 'omo-eye-on'], document.getElementById('applyOverides'))//collorToogler(document.getElementById('ignite'), 'omo-totem-on', 'omo-totem-off');
    document.getElementById('ignite').addEventListener('click', powerToggler.toogle)
    /**TOTEM TOOGLER */
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

    var fontSizeToogler = tooglerMain(document.getElementById("font"),
        'omo-totem-font-size-choose',
        'omo-totem-font-size-on',
        [document.getElementById("font-hand-left"),
        document.getElementById("font-size-up"),
        document.getElementById("font-size-down")
        ],
        document.getElementById('totem_bsize'));

    document.getElementById("font").addEventListener('click', fontSizeToogler.toogle);

    var fontTypeToogler = tooglerMain(document.getElementById("font-type"),
        'omo-totem-font-type-choose',
        'omo-totem-font-type-on',
        [document.getElementById("font-type-hand-left"),
        document.getElementById("font-type-up"),
        document.getElementById("font-type-container"),
        document.getElementById("font-type-down")
        ], document.getElementById('totem_body_ff'))
    document.getElementById("font-type").addEventListener('click', fontTypeToogler.toogle);

    var toogleFonts = pictureToogler(document.getElementById('font-type-container'),
        FONT_CHOOSER, document.getElementById('totem_body_ff'))
    document.getElementById('font-type-up').addEventListener('click', toogleFonts.up)
    document.getElementById('font-type-down').addEventListener('click', toogleFonts.down)

    var fontWeightoogler = tooglerMain(document.getElementById("font-weight"),
        'omo-totem-font-weight-choose',
        'omo-totem-font-weight-on',
        [
            document.getElementById('font-weight-hand-left'),
            document.getElementById('font-weight-up'),
            document.getElementById('font-weight-down')
        ],
        document.getElementById('totem_font_weight')

    )
    document.getElementById("font-weight").addEventListener('click', fontWeightoogler.toogle);
    document.getElementById('totem_font_weight').value = config.BODY_FONT_WEIGHT;
    var toogleWeight = pictureToogler(document.getElementById('font-weight-container'),
        FONT_WEIGHT_CHOOSER, document.getElementById('totem_font_weight'));

    document.getElementById("font-weight-up").addEventListener('click', toogleWeight.up);
    document.getElementById("font-weight-down").addEventListener('click', toogleWeight.down);

    var fontSpacingToogler = tooglerMain(document.getElementById("font-spacing"),
        'omo-totem-font-spacing-choose',
        'omo-totem-font-spacing-on',
        [document.getElementById("font-spacing-hand-left"),
        document.getElementById("font-spacing-up"),
        document.getElementById("font-spacing-container"),
        document.getElementById("font-spacing-down")
        ],
        document.getElementById('totem_bspacing'))

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
        ], document.getElementById('totem_bheight'))

    document.getElementById("line-spacing").addEventListener('click', lineSpacingToogler.toogle);

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
        ],
        document.getElementById('selectedBackground')

    )

    document.getElementById("background").addEventListener('click', backgroundToogler.toogle);

    let whiteToggler = collorToogler(document.getElementById("EFF3EE"),
        'omo-totem-background-white-on',
        'omo-totem-background-white');
    document.getElementById("EFF3EE").addEventListener('click', whiteToggler.toogle)

    let greyToggler = collorToogler(document.getElementById("D9D8D8"),
        'omo-totem-background-grey-on',
        'omo-totem-background-grey');
    document.getElementById("D9D8D8").addEventListener('click', greyToggler.toogle)

    let blackToggler = collorToogler(document.getElementById("231F20"),
        'omo-totem-background-black-on',
        'omo-totem-background-black');
    document.getElementById("231F20").addEventListener('click', blackToggler.toogle)

    let blueToggler = collorToogler(document.getElementById("9FB5DE"),
        'omo-totem-background-blue-on',
        'omo-totem-background-blue');
    document.getElementById("9FB5DE").addEventListener('click', blueToggler.toogle)

    let pinkToggler = collorToogler(document.getElementById("B894C4"),
        'omo-totem-background-pink-on',
        'omo-totem-background-pink');
    document.getElementById("B894C4").addEventListener('click', pinkToggler.toogle)

    let orangeToggler = collorToogler(document.getElementById("E2B0AF"),
        'omo-totem-background-orange-on',
        'omo-totem-background-orange');
    document.getElementById("E2B0AF").addEventListener('click', orangeToggler.toogle)

    let infoClick = function (e) {
        alert('Jesus loves you!! &#128540;');
    }
    document.getElementById('info').addEventListener('click', infoClick)

    config.readConfigurationFromFile(configurations.config)
        .then((message) => {
            console.log(message);
            document.getElementById('totem_body_ff').value = config.BODY_FONT_FAMILY;
            document.getElementById('totem_bsize').value = config.BODY_FONT_SIZE;
            document.getElementById('totem_font_weight').value = config.BODY_FONT_WEIGHT;
            document.getElementById('totem_bspacing').value = config.BODY_FONT_SPACING;
            document.getElementById('totem_bheight').value = config.BODY_LINE_HEIGHT;

            var toogleSize = sizeToogler(parseInt(config.BODY_FONT_SIZE), parseInt(config.BODY_FONT_SIZE_MAX), 1, document.getElementById('totem_bsize'));
            document.getElementById('font-size-up').addEventListener('click', toogleSize.up) //applyOmoStylesTotem
            document.getElementById('font-size-down').addEventListener('click', toogleSize.down) //applyOmoStylesTotem

            var lineSpacingToogler = sizeToogler(parseInt(config.BODY_LINE_HEIGHT), parseInt(config.BODY_LINE_HEIGHT_MAX), 0.05, document.getElementById('totem_bheight'));
            document.getElementById('line-spacing-up').addEventListener('click', lineSpacingToogler.up)//applyOmoStylesTotem
            document.getElementById('line-spacing-down').addEventListener('click', lineSpacingToogler.down)//applyOmoStylesTotem
            DEFAULT_TOTEM_VALUES.push(
                { 'id': 'totem_body_ff', 'value': config.BODY_FONT_FAMILY })
            DEFAULT_TOTEM_VALUES.push(
                { 'id': 'totem_bsize', 'value': config.BODY_FONT_SIZE })
            DEFAULT_TOTEM_VALUES.push(
                { 'id': 'totem_font_weight', 'value': config.BODY_FONT_WEIGHT })
            DEFAULT_TOTEM_VALUES.push(
                { 'id': 'totem_bspacing', 'value': config.BODY_FONT_SPACING })
            DEFAULT_TOTEM_VALUES.push(
                { 'id': 'totem_bheight', 'value': config.BODY_LINE_HEIGHT })
            DEFAULT_TOTEM_VALUES.push(
                { 'id': 'selectedBackground', 'value': config.DEFAULT_BACKGROUND })
            // config.BACKGROUND_COLOR_ELEMENTS.forEach(el => {
            //     let element = el.substring(el.indexOf('.') !== -1 ? el.indexOf('.') + 1 : el.indexOf('#') + 1)
            //     alert(document.getElementsByClassName(element)[0].style.backgroundColor);
            // })
            readCookie();
        }).catch((err) => {
            console.log(err);
            alert(err);
        });


};
export default show;


const COLOR_MAP = [
    { id: 'EFF3EE', on: false, css_open: 'omo-totem-background-white-on', css_close: 'omo-totem-background-white' },
    { id: 'D9D8D8', on: false, css_open: 'omo-totem-background-grey-on', css_close: 'omo-totem-background-grey' },
    { id: '231F20', on: false, css_open: 'omo-totem-background-black-on', css_close: 'omo-totem-background-black' },
    { id: '9FB5DE', on: false, css_open: 'omo-totem-background-blue-on', css_close: 'omo-totem-background-blue' },
    { id: 'B894C4', on: false, css_open: 'omo-totem-background-pink-on', css_close: 'omo-totem-background-pink' },
    { id: 'E2B0AF', on: false, css_open: 'omo-totem-background-orange-on', css_close: 'omo-totem-background-orange' }
]
const OMO_TYPE = "OmoType";
const FONT_CHOOSER = [
    { id: "fontEmpty", style: "fontEmpty", value: 'Roboto' },
    { id: "A", style: "OmoTypeA", value: `${OMO_TYPE}A-` },
    { id: "B", style: "OmoTypeB", value: `${OMO_TYPE}B-` },
    { id: "C", style: "OmoTypeC", value: `${OMO_TYPE}C-` },
    { id: "D", style: "OmoTypeD", value: `${OMO_TYPE}D-` },
    { id: "E", style: "OmoTypeE", value: `${OMO_TYPE}E-` },

]

/** tu ce se jednom slagati cjeli font */
const FONT_WEIGHT_CHOOSER = [
    { id: "Current", style: "Regular", value: "normal" },
    { id: "Regular", style: "Regular", value: "bold" },
    { id: "Light", style: "Light", value: "lighter" },
    { id: "Bold", style: "Bold", value: "bolder" }
    // ,
    // { id: "Book", style: "Book", value: "Book" },
    // { id: "Medium", style: "Medium", value: "Medium" },
    // { id: "Black", style: "Black", value: "Black" }

]

const FONT_SPACING = [
    { id: "fontSpacingEmpty", style: "fontSpacingEmpty", value: '0' },
    { id: 'fontSpacingOne', style: 'fontSpacingOne', value: '1.25' },
    { id: 'fontSpacingTwo', style: 'fontSpacingTwo', value: '1.50' },
    { id: 'fontSpacingThree', style: 'fontSpacingThree', value: '1.75' },
    { id: 'fontSpacingFour', style: 'fontSpacingFour', value: '2' }

]
// ovo uopce neam smisla .. nema sajza SLAZE SE IME FONTA!!!! od djelova
//!!!!!!!!???????
const sizeToogler = (_start, _end, _step, _el) => {
    let start = _start;
    let end = _end;
    let step = _step;
    let current = start;
    let element = _el;
    return {
        up: () => {
            current = current < end ? current += step : current;
            element.value = current % 1 === 0 ? current : parseFloat(current).toFixed(2);
            applyOverides();
        },
        down: () => {
            current = current > start ? current -= step : current
            element.value = current % 1 === 0 ? current : parseFloat(current).toFixed(2);
            applyOverides();
        },
        get: () => element.value
    }

}
const DEFAULT_TOTEM_VALUES = [

]

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
            applyOverides()

        },
        down: () => {
            num_of_fonts = num_of_fonts <= 0 ? chooser.length - 1 : num_of_fonts -= 1
            let value = chooser[Math.abs(num_of_fonts) % chooser.length];
            element.setAttribute('class', value.style);
            hidden.value = value.value;
            applyOverides()

        },
        get: () => hidden.value //chooser[Math.abs(num_of_fonts)]
    }
}

const widgetOnOffToggler = (el, css_close, css_open, _hidden) => {
    let is_open = false;
    let element = el;
    let hidden = _hidden;
    return {
        toogle: () => {
            if (is_open) {
                is_open = false;
                element.setAttribute('class', css_close)
                document.getElementById('parent').setAttribute('class', 'omo-eye')
                hidden.value = 'off'
                saveCookie('');
                removeOverides();
            } else {
                is_open = true;
                element.setAttribute('class', css_open[0])
                document.getElementById('parent').setAttribute('class', 'omo-eye-on')
                hidden.value = 'on'
                saveCookie('');
                applyOverides();
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
                document.getElementById('selectedBackground').value = '#' + element.id;
                applyOverides()
            }
        }
    }
}

/**
 * tu pocinje totem
 */
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
                            // if (el.children && el.children.length > 0) {
                            //     el.children.forEach(e => {
                            //         let ee = document.getElementById(e.id);
                            //         ee.setAttribute('style', 'display:none')
                            //     })
                            // }
                            main.setAttribute('class', el.off)
                        }
                    }
                })
                if (typeof toogler != 'undefined') console.log(toogler.isOpen());
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
                            // if (el.children && el.children.length > 0) {
                            //     el.children.forEach(e => {
                            //         var ee = document.getElementById(e.id);
                            //         ee.setAttribute('style', 'display:none')
                            //     })
                            // }

                            main.setAttribute('class', el.off)
                            // alert('should reset value' + el.hidden);
                            let def = DEFAULT_TOTEM_VALUES.filter(e => el.hidden === e.id)[0].value
                            document.getElementById(el.hidden).value = def
                            applyOverides()
                        }
                    }
                })
                console.log(toogler);
                if (typeof toogler != 'undefined') console.log(toogler.isOpen());
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
        hidden: 'totem_bsize',
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
        hidden: 'totem_body_ff',
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
        off: 'omo-totem-font-weight',
        on: 'omo-totem-font-weight-on',
        hidden: 'totem_font_weight',
        choose: 'omo-totem-font-weight-choose',
        children: [
            { id: 'font-weight-hand-left' },
            { id: 'font-weight-up' },
            { id: 'font-weight-down' }
        ]
    },
    {
        id: 'font-spacing',
        off: 'omo-totem-font-spacing',
        on: 'omo-totem-font-spacing-on',
        hidden: 'totem_bspacing',
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
        hidden: 'totem_bheight',
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
        hidden: 'selectedBackground',
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