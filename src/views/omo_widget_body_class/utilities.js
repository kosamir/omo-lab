export const $ = function (css, parent) {
    return (parent || document).querySelector(css);
};

export const $$ = function (css, parent) {
    var nodes = (parent || document).querySelectorAll(css);
    return Array.prototype.slice.call(nodes, 0);
};

export const ready = function (fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

export const getFormData = function (input) {
    const formData = new FormData();

    for (const name in input) {
        formData.append(name, input[name]);
    }

    return formData;
};

export const serialize = function (form) {
    // Setup our serialized data
    var serialized = [];
    var object = {};

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {
        var field = form.elements[i];

        // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
        if (
            !field.name ||
            field.disabled ||
            field.type === 'file' ||
            field.type === 'reset' ||
            field.type === 'submit' ||
            field.type === 'button'
        )
            continue;

        // If a multi-select, get all selections
        if (field.type === 'select-multiple') {
            for (var n = 0; n < field.options.length; n++) {
                if (!field.options[n].selected) continue;
                object[field.name] = field.value;
                serialized.push(
                    encodeURIComponent(field.name) +
                        '=' +
                        encodeURIComponent(field.options[n].value)
                );
            }
        }

        // Convert field data to a query string
        else if (
            (field.type !== 'checkbox' && field.type !== 'radio') ||
            field.checked
        ) {
            object[field.name] = field.value;
            serialized.push(
                encodeURIComponent(field.name) +
                    '=' +
                    encodeURIComponent(field.value)
            );
        }
    }

    return {
        serialized: serialized.join('&'),
        object,
    };
};

export const elementCreate = function (options) {
    var el, a, i;
    if (!options.tagName) {
        el = document.createDocumentFragment();
    } else {
        el = document.createElement(options.tagName);
        if (options.className) {
            el.className = options.className;
        }

        if (options.attributes) {
            for (a in options.attributes) {
                el.setAttribute(a, options.attributes[a]);
            }
        }

        if (options.html !== undefined) {
            el.innerHTML = options.html;
        }
    }

    if (options.text) {
        el.appendChild(document.createTextNode(options.text));
    }

    // IE 8 doesn"t have HTMLElement
    if (window.HTMLElement === undefined) {
        window.HTMLElement = Element;
    }

    if (options.childs && options.childs.length) {
        for (i = 0; i < options.childs.length; i++) {
            el.appendChild(
                options.childs[i] instanceof window.HTMLElement
                    ? options.childs[i]
                    : createElement(options.childs[i])
            );
        }
    }

    return el;
};

/*!
 * Add an event listener
 * @param  {String}   event    The event type
 * @param  {Node}     elem     The element to attach the event to (optional, defaults to window)
 * @param  {Function} callback The callback to run on the event
 * @param  {Boolean}  capture  If true, forces bubbling on non-bubbling events
 */
export const on = function (event, elem, callback, capture) {
    if (typeof elem === 'function') {
        capture = callback;
        callback = elem;
        elem = window;
    }
    capture = capture ? true : false;
    elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
    if (!elem) return;
    elem.addEventListener(event, callback, capture);
};

/*!
 * Remove an event listener
 * @param  {String}   event    The event type
 * @param  {Node}     elem     The element to remove the event to (optional, defaults to window)
 * @param  {Function} callback The callback that ran on the event
 * @param  {Boolean}  capture  If true, forces bubbling on non-bubbling events
 */
export const off = function (event, elem, callback, capture) {
    if (typeof elem === 'function') {
        capture = callback;
        callback = elem;
        elem = window;
    }
    capture = capture ? true : false;
    elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
    if (!elem) return;
    elem.removeEventListener(event, callback, capture);
};

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * getAnimatableEndEvent
 *
 * returns the name of transitionend/animationend event for cross browser compatibility
 *
 * @param {string} type of the animatableEvent: 'transition' or 'animation'
 * @returns {string} the transitionend/animationend event name
 */
export const getAnimatableEndEvent = function whichAnimationType(type) {
    let animatableEvent;

    const el = document.createElement('fakeelement');
    const capitalType = capitalize(type);

    const animations = {
        [type]: `${type}end`,
        [`O${capitalType}`]: `o${capitalType}End`,
        [`Moz${capitalType}`]: `${type}end`,
        [`Webkit${capitalType}`]: `webkit${capitalType}End`,
        [`MS${capitalType}`]: `MS${capitalType}End`,
    };

    const hasEventEnd = Object.keys(animations).some((item) => {
        if (el.style[item] !== undefined) {
            animatableEvent = animations[item];
            return true;
        }

        return false;
    });

    if (!hasEventEnd) {
        throw new Error(`${type}end is not supported in your web browser.`);
    }

    return animatableEvent;
};
