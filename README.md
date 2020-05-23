## Omo Widget

# How to buid/run:

-CHECK the totemWidget.html edit path in SVG LINKS ie {SERVER_HOST}/assets/...
-configure webpack.config.js if needed
-run build
./node_modules/.bin/webpack --config webpack.config.js
-start localy
./node_modules/.bin/webpack-dev-server --open

# widget controls:

font size - size of the font on page to be applied on elements defined in

- "HEADER_STYLE_ELEMENTS",
- "CUSTOM_HEADER_STYLE_ELEMENTS"
- "ELEMENTS_TO_TWEAK_STYLE",
- "BODY_STYLE"

font family - chooser of omo type family applied on elements defined in

- "HEADER_STYLE_ELEMENTS",
- "CUSTOM_HEADER_STYLE_ELEMENTS"
- "ELEMENTS_TO_TWEAK_STYLE",
- "BODY_STYLE"

font weight - chooser of font weight ie bold, bolder, light, lighter applied on elements defined in

- "HEADER_STYLE_ELEMENTS",
- "CUSTOM_HEADER_STYLE_ELEMENTS"
- "ELEMENTS_TO_TWEAK_STYLE",
- "BODY_STYLE"

font spacing - chooser of font spacing on page applied on elements defined in

- "HEADER_STYLE_ELEMENTS",
- "CUSTOM_HEADER_STYLE_ELEMENTS"
- "ELEMENTS_TO_TWEAK_STYLE",
- "BODY_STYLE"

line height - chooser of line height on page applied on elements defined in

- "HEADER_STYLE_ELEMENTS",
- "CUSTOM_HEADER_STYLE_ELEMENTS"
- "ELEMENTS_TO_TWEAK_STYLE",
- "BODY_STYLE"

background color- pick a background color to be applied on elements defined in "BACKGROUND_COLOR_ELEMENTS"

# configuratin options:

file should be put in /config folder
file SHOULD be i JSON format

# params:

## "DEFAULT_BACKGROUND":"transparent"

default background of web page on wich widget is shown

## "HEADER_FONT_FAMILY": "inherit",

default header font family

## "HEADER_LINE_HEIGHT": "1.5",

default header line height

## "HEADER_FONT_SPACING": "0",

default header font spacing

## "HEADER_FONT_SIZE": "20",

default header font size

## "BODY_FONT_FAMILY": "inherit",

default body font family

## "BODY_FONT_WEIGHT": "400",

default body font weight

## "BODY_LINE_HEIGHT": "1.5",

default body line height

## "BODY_FONT_SPACING": "0",

default body font spacing

## "BODY_FONT_SIZE": "14",

default body font size

## DESKTOP VARIABLES

# for resolution wich is < 768 default "DESKTOP\_" values are taken, values are same as above only applied for different screen resoution

- "DESKTOP_HEADER_LINE_HEIGHT": "1.2",
- "DESKTOP_HEADER_FONT_SPACING": "2",
- "DESKTOP_HEADER_FONT_SIZE": "23",
- "DESKTOP_BODY_LINE_HEIGHT": "1.8",
- "DESKTOP_BODY_FONT_SPACING": "2.3",
- "DESKTOP_BODY_FONT_SIZE": "18",

## style that is applied to header style elements

"HEADER_STYLE_ELEMENTS": [
"h1",
"h2",
"h3",
"h4",
"h5",
"h6",
".c-item__title"
],

## custom header style elements example: div class header is header element wich dont have h1,h2....h6 style but shuld be aplied same style as for h1...h6 elements

"CUSTOM_HEADER_STYLE_ELEMENTS": [],

## style for widget.. not in use i think

"OMO_WIDGET_ELEMENTS": ["div.omo-widget-container *"],

## elements to tweak style example

"ELEMENTS_TO_TWEAK_STYLE": [

{

"element": "div.body",

"style": "max-height: 100px; overflow:auto;"

}

],

## on div class body apply max height of 100px and set overflow to auto, matrix is used to apply additional styling to some page element

"ELEMENTS_TO_TWEAK_STYLE": [],

## style that is applied to body elements,

"BODY_STYLE": [
"div.c-item__summary *",
".l-header__menu a",
".js-language-nav span.text-uppercase",
"input.NormalTextBox",
".c-item__title",
".c-contents__content p",
"div.c-article-detail__main-col *",
"div.footer-top",
"nav.c-nav-aside *",
"div.container",
"div.c-nav-card *",
"div.Normal",
"div.c-pane",
"section.edn-feed",
"div.c-item__title",
"li.c-nav-card__item *"
],

## background collor of elements that are defined in bellow array

"BACKGROUND_COLOR_ELEMENTS": [
" ",
"main",
".c-nav--iconified .c-item",
".c-nav-card__link--parent",
".l-item__button",
".slick-arrow:before"
]
