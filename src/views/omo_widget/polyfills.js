if (typeof window.Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    window.Object.defineProperty(window.Object, 'assign', {
        value: function assign(target, varArgs) {
            // .length of function is 2
            'use strict';
            if (target === null || target === undefined) {
                throw new TypeError(
                    'Cannot convert undefined or null to object'
                );
            }

            var to = window.Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (
                            window.Object.prototype.hasOwnProperty.call(
                                nextSource,
                                nextKey
                            )
                        ) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true,
    });
}

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
            var matches = (
                    this.document || this.ownerDocument
                ).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}
