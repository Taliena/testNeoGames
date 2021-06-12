define(["require", "exports", "pixi.js", "./Button", "./constants"], function (require, exports, PIXI, Button_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameEntryPoint = void 0;
    var GameEntryPoint = /** @class */ (function () {
        function GameEntryPoint() {
            this.chestButtons = [];
        }
        GameEntryPoint.prototype.init = function () {
            this.app = new PIXI.Application({ backgroundColor: 0xFFFFFF });
            var loader = new PIXI.Loader();
            /*loader
                .add("https://images.app.goo.gl/FsGqEtB1qQ4QJ2Vy7")
                .load(this.start.bind(this));*/
            this.start();
        };
        GameEntryPoint.prototype.start = function () {
            this.animation = new PIXI.Ticker();
            var mainGameScreen = new PIXI.Container();
            mainGameScreen.width = constants_1.WIDTH;
            mainGameScreen.height = constants_1.HEIGHT;
            this.scene = new PIXI.Graphics();
            this.scene.lineStyle(2, 0x000000, 1);
            this.scene.drawRect(constants_1.OFFSET, constants_1.OFFSET, constants_1.WIDTH - 2 * constants_1.OFFSET, constants_1.HEIGHT - 2 * constants_1.OFFSET);
            this.scene.endFill();
            mainGameScreen.addChild(this.scene);
            this.app.stage.addChild(mainGameScreen);
            document.body.appendChild(this.app.view);
            this.createScene(constants_1.SCREEN_TYPES.regular, 'Main game Screen');
        };
        GameEntryPoint.prototype.createScene = function (type, text) {
            this.playScreen = this.refreshPlayScene(type, text);
            this.scene.addChild(this.playScreen);
            if (type == constants_1.SCREEN_TYPES.playAgain) {
                this.createPlayAgain();
            }
            else if (type == constants_1.SCREEN_TYPES.regular) {
                this.createMainScene();
            }
            this.scene.addChild(this.playScreen);
        };
        GameEntryPoint.prototype.refreshPlayScene = function (type, text) {
            var scene = new PIXI.Container();
            scene.width = this.scene.width - constants_1.OFFSET;
            scene.height = this.scene.height - constants_1.OFFSET;
            var headText = new PIXI.Text(text, new PIXI.TextStyle(constants_1.HEADER_TEXT_STYLE));
            headText.position.y = 2 * constants_1.OFFSET;
            headText.position.x = this.scene.width / 2 - headText.width / 2;
            scene.addChild(headText);
            return scene;
        };
        GameEntryPoint.prototype.createMainScene = function () {
            this._createButtons();
        };
        GameEntryPoint.prototype.createPlayAgain = function () {
            this.createPlayAgainButton();
        };
        GameEntryPoint.prototype.createPlayAgainButton = function () {
            var _this = this;
            var playAgain = new Button_1.Button('Play again', 0x8000FF, 0x000000);
            playAgain.generatePosition(400, 250);
            playAgain.interactive = true;
            playAgain.setDisabled(false);
            this.playScreen.addChild(playAgain);
            playAgain.addListener('click', function () {
                _this.scene.removeChild(_this.playScreen);
                _this.createScene(constants_1.SCREEN_TYPES.regular, 'PLAY');
            });
        };
        GameEntryPoint.prototype._createButtons = function () {
            for (var i = 0; i < constants_1.CHEST_BUTTON_COUNT; i++) {
                var btn = new Button_1.Button('Chest', 0XFFFFFF, 0x66CCFF);
                btn.generatePosition(320 / 2 + i % 2 * 320 / 2 - 60 / 2, 70 + Math.floor(i / 2) * 60);
                this.playScreen.addChild(btn);
                btn.setDisabled(true);
                this.chestButtons.push({ id: i, button: btn });
            }
            this.playButton = new Button_1.Button('PLAY', 0x8000FF, 0x000000);
            this.playButton.position.x = 500 / 2 - 60 / 2;
            this.playButton.position.y = 250;
            this.playScreen.addChild(this.playButton);
            this.playButton.buttonMode = true;
            this.playButton.interactive = true;
            this.playButton.addListener('click', this.gameStarted.bind(this));
        };
        GameEntryPoint.prototype.gameStarted = function () {
            var _this = this;
            this.triesMount = this.chestButtons.length;
            this.chestButtons.forEach(function (item) {
                item.button.setDisabled(false);
                item.button.addListener('click', _this.isWin.bind(_this));
                _this.playButton.setDisabled(true);
            });
        };
        // If the random number is even - the chest is winning, also for bonus
        GameEntryPoint.prototype.isWin = function (btn) {
            var _this = this;
            if (this.triesMount > 1) {
                this.triesMount -= 1;
            }
            else {
                this.finishGame();
            }
            var isEven = Math.floor(Math.random() * 100 % 2) === 0;
            if (isEven) {
                // Победная анимация
                btn.currentTarget.setDisabled(true);
                this.bonusScreen = this.refreshPlayScene(constants_1.SCREEN_TYPES.win, 'Bonus Screen');
                this.scene.removeChild(this.playScreen);
                this.scene.addChild(this.bonusScreen);
                setTimeout(function () {
                    _this.scene.removeChild(_this.bonusScreen);
                    _this.scene.addChild(_this.playScreen);
                }, 5000);
                debugger;
                this.animation.
                    this.animation.start();
            }
            else {
                btn.currentTarget.setDisabled(true);
            }
        };
        GameEntryPoint.prototype.finishGame = function () {
            this.scene.removeChild(this.playScreen);
            this.createScene(constants_1.SCREEN_TYPES.playAgain, 'Main game Screen');
        };
        GameEntryPoint.prototype.gameLoop = function (delta) {
            // let's rotate the aliens a little bit
            for (var i = 0; i < 10; i++) {
                console.log(i);
            }
            this.animation.stop();
        };
        return GameEntryPoint;
    }());
    exports.GameEntryPoint = GameEntryPoint;
});
//# sourceMappingURL=GameEntryPoint.js.map