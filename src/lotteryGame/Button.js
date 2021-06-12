define(["require", "exports", "tslib", "pixi.js", "./constants"], function (require, exports, tslib_1, PIXI, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    var Button = /** @class */ (function (_super) {
        tslib_1.__extends(Button, _super);
        function Button(text, backgroundColor, lineColor) {
            var _this = _super.call(this) || this;
            var txt = new PIXI.Text(text, new PIXI.TextStyle(constants_1.BUTTON_TEXT_STYLE));
            var rectangle = new PIXI.Graphics();
            rectangle.lineStyle(2, lineColor, 1);
            rectangle.beginFill(backgroundColor);
            rectangle.drawRect(0, 0, 150, 30);
            rectangle.endFill();
            rectangle.addChild(txt);
            txt.position.x = rectangle.width / 2 - txt.width / 2;
            txt.position.y = rectangle.height / 2 - txt.height / 2;
            _this.addChild(rectangle);
            _this.addEventListeners();
            return _this;
        }
        Button.prototype.addEventListeners = function () {
            this.buttonMode = true;
            this.on('pointerdown', this.onButtonDown.bind(this));
            this.on('pointerup', this.onButtonUp.bind(this));
            this.on('pointeroutside', this.onButtonUp.bind(this));
            this.on('pointerover', this.onButtonOver.bind(this));
            this.on('pointerout', this.onButtonOut.bind(this));
        };
        Button.prototype.onButtonDown = function () {
            this.transform.scale.x = 1;
            this.transform.scale.y = 1;
        };
        Button.prototype.onButtonUp = function () {
            this.scale.set(1);
        };
        Button.prototype.onButtonOver = function () {
            this.scale.set(1.1);
            this.tint = 0x666666;
        };
        Button.prototype.onButtonOut = function () {
            this.scale.set(1);
        };
        Button.prototype.setDisabled = function (value) {
            this.interactive = !value;
        };
        Button.prototype.generatePosition = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Button.prototype.animate = function (type) {
        };
        return Button;
    }(PIXI.Sprite));
    exports.Button = Button;
});
//# sourceMappingURL=Button.js.map