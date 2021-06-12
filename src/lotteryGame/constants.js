define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SCREEN_TYPES = exports.CHEST_BUTTON_COUNT = exports.OFFSET = exports.WIDTH = exports.HEIGHT = exports.BUTTON_TEXT_STYLE = exports.HEADER_TEXT_STYLE = void 0;
    exports.HEADER_TEXT_STYLE = {
        fontFamily: 'Arial',
        fontSize: 25,
        fontWeight: 'bold',
        fill: ['#000000'],
        stroke: '#4a1850',
        strokeThickness: 1,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 1,
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 1,
        wordWrap: true,
        wordWrapWidth: 440,
    };
    exports.BUTTON_TEXT_STYLE = {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: ['#000000'],
        wordWrap: true,
        wordWrapWidth: 440
    };
    exports.HEIGHT = 300;
    exports.WIDTH = 600;
    exports.OFFSET = 10;
    exports.CHEST_BUTTON_COUNT = 6;
    var SCREEN_TYPES;
    (function (SCREEN_TYPES) {
        SCREEN_TYPES[SCREEN_TYPES["regular"] = 0] = "regular";
        SCREEN_TYPES[SCREEN_TYPES["win"] = 1] = "win";
        SCREEN_TYPES[SCREEN_TYPES["playAgain"] = 2] = "playAgain";
    })(SCREEN_TYPES = exports.SCREEN_TYPES || (exports.SCREEN_TYPES = {}));
});
//# sourceMappingURL=constants.js.map