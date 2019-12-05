import html from './message.html';
import './message.css';

const OMOLAB_BODY_CLASS = `omolab-w-body-${Date.now()}-${Math.ceil(Math.random()*1000)}`;
const headerStyles =['h1','h2','h3','h4','h5','h6']

let elements = [];
let body;
//TODO vidjeti kako ovo rjesiti div .omo-widget-container .omoContainer:not(.omoBox*,.omoClose)
// const setHeaderStyle = (headerFontFamily, headerFontSize) => headerFontFamily ? `body.${OMOLAB_BODY_CLASS} h1, body.${OMOLAB_BODY_CLASS} h1 *, body h2, body h3, body h4, body h5, body h6 { font-family:${headerFontFamily} !important ; font-size:${headerFontSize ? headerFontSize : 10}px !important}\n` : '';
const setBodyTextStyle = (bodyFontFamily, bodyFontSize) => bodyFontFamily ? `body.${OMOLAB_BODY_CLASS}, body.${OMOLAB_BODY_CLASS} div > * { font-family:${bodyFontFamily} !important; font-size:${bodyFontSize ? bodyFontSize : 10}px !important}\n` : '';
const widgetStyle = `body.${OMOLAB_BODY_CLASS} div.omoBox *, body.${OMOLAB_BODY_CLASS} div.omoClose * { font-family: Arial !important ; font-size:17px !important;  }\n`
const backGroundColor = (bgColor) => bgColor ? `body.${OMOLAB_BODY_CLASS}, body.${OMOLAB_BODY_CLASS} div > * { background-color:${bgColor} }\n` : ''

const setHeaderStyle = () => headerStyles.map(element =>`body.${OMOLAB_BODY_CLASS} ${element}, body.${OMOLAB_BODY_CLASS} ${element} *`) 
const css_headerStyle = (style,headerFontFamily, headerFontSize) => style + `{ font-family:${headerFontFamily} !important ; font-size:${headerFontSize ? headerFontSize : 10}px !important}\n`   

var show_w;


function addOmolabClassScopeToBody(doc){
    const body = doc.querySelector('body');
    if (body && !body.classList.contains(OMOLAB_BODY_CLASS)){
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
        elements.push(temporary.children[0]);
        body.appendChild(temporary.children[0]);
        console.log(temporary.children[0])

    }
    show_w = showWidget();
    var closeButton = body.getElementsByClassName('omoClose')[0].firstChild;
    closeButton.addEventListener("click", show_w.open);
    
    var omoElements = Array.from(body.getElementsByClassName('omoElements')[0].children)
    omoElements.forEach(element => {
        console.log(element.nodeName);
        if (element.nodeName === 'INPUT') element.addEventListener("change", click_me);
        if (element.nodeName === 'SELECT') element.addEventListener("change", click_me);
        
    });
    // console.log(collorPicker.value);

    var check = body.getElementsByClassName('omoControl')[0].childNodes[1]
    console.log(check);
    // console.log(collorPicker.innerHTML);
    check.addEventListener('change', click_me);

}




function showWidget(){
   let open = true;
   var widget = document.getElementsByClassName('omoBox')[0];
   return {
       open:function(){
           if(open){
            //    alert("closing widget");
               widget.setAttribute('style','display:none')
               open=false;
           }else{
            //    alert("showing widget")
               widget.setAttribute('style','display:block')
               open = true;
           }
       }
   }
}



function getGenerateStyle() {
    var bgColor = document.getElementById('bgColor').value
    var headerFontSize = document.getElementById('hsize').value;
    var headerFontFamily = document.getElementById('header_ff').value
    var bodyFontSize = document.getElementById('bsize').value;
    var bodyFontFamily = document.getElementById('body_ff').value

    var style = backGroundColor(bgColor)
    var headerStyle = css_headerStyle(setHeaderStyle().join(','),headerFontFamily,headerFontSize);
    var bodyStyle = setBodyTextStyle(bodyFontFamily, bodyFontSize);
    console.log(headerStyle);
    style += headerStyle;
    
    style += widgetStyle;
    style += bodyStyle;
    return style;
}

var forceRedraw = function(element){

    if (!element) { return; }

    var n = document.createTextNode(' ');
    var disp = element.style.display;  // don't worry about previous display style

    element.appendChild(n);
    element.style.display = 'none';

    setTimeout(function(){
        element.style.display = disp;
        n.parentNode.removeChild(n);
    },20); // you can play with this timeout to make it as short as possible
}


function applyOverides() {

    if (document.getElementById('omolab_style_w')) {
        var children = document.getElementsByTagName("head")[0];
        var style = children.getElementsByTagName('style')[1];
        style.innerHTML = getGenerateStyle();
        forceRedraw(style);
    } else {
        var css = document.createElement('style');
        css.type = 'text/css';
        css.id = 'omolab_style_w'

        var style = getGenerateStyle();
        // console.log(style);

        if (css.styleSheet)
            css.styleSheet.cssText = style
        else
            css.appendChild(document.createTextNode(style));

        /* Append style to the tag name */
        document.getElementsByTagName("head")[0].appendChild(css);
        console.log("apply overides\n" + style);
    }
    

}

function removeOverides() {
    var omo_style = document.getElementById('omolab_style');
    var omo_style_w = document.getElementById('omolab_style_w');
    var children = document.getElementsByTagName("head")[0];
    var style = children.getElementsByTagName('style')[1];
    children.removeChild(style);


}

export function click_me(event) {
    var check = document.getElementById('applyOverides').checked;
    check ? applyOverides() : removeOverides()


}


export function close() {
    while (elements.length > 0) {
        elements.pop().remove();
    }
    body.removeEventListener('click', close);
}