import * as PIXI from 'pixi.js'
import {Button} from "./Button";
import {Screen} from "./Screen";
import {BUTTON_STYLE, CHEST_BUTTON_COUNT, HEIGHT, OFFSET, SCREEN_TYPES, WIDTH} from "./constants";

export class GameEntryPoint {
    protected app: PIXI.Application;
    protected mainGameScreen: PIXI.Container;
    protected playScreen: Screen;
    protected bonusScreen: Screen;
    protected playAgainScreen: Screen;
    protected chestButtons: Button[] = [];
    protected playButton: Button;
    protected triesMount: number;
    protected winMode: boolean;
    private stars: PIXI.Graphics[] = [];
    private gameTicker: PIXI.Ticker;
    private sadSmile: PIXI.Container;

    init() {
        this.app = new PIXI.Application({backgroundColor: 0xFFFFFF, width: 600, height: 340});
        document.body.appendChild(this.app.view);
        this.mainGameScreen = new PIXI.Container();
        this.mainGameScreen.width = WIDTH;
        this.mainGameScreen.height = HEIGHT;
        let scene = new PIXI.Graphics();
        scene.lineStyle(2, 0x000000, 1);
        scene.drawRect(OFFSET, OFFSET, WIDTH - 2 * OFFSET, HEIGHT - 2 * OFFSET);
        scene.endFill();
        this.mainGameScreen.addChild(scene);
        this.app.stage.addChild(this.mainGameScreen);
        this._createScenes();
    }

    protected _createScenes(): void {
        this.playScreen = new Screen(SCREEN_TYPES.playAgain, 'Main game Screen');
        this.playAgainScreen = new Screen(SCREEN_TYPES.playAgain, 'PRESS TO PLAY AGAIN');
        this.bonusScreen = new Screen(SCREEN_TYPES.win, 'Bonus Screen');
        this.chestButtons = [];
        this._createPlayAgainButton();
        this._createButtons();
        this._createBonusScreen();
        this.gameTicker = new PIXI.Ticker();
        this.mainGameScreen.addChild(this.playScreen);
        this.gameTicker.add(this._gameLoop.bind(this));
    }

    protected _gameStarted(): void {
        this.triesMount = this.chestButtons.length;
        this.chestButtons.forEach(item => {
                item.setDisabled(false);
                item.addListener('click', this._isWin.bind(this));
            }
        );
        this.playButton.setDisabled(true);
    }

    protected _createBonusScreen(): void {
        let text = new PIXI.Text('Win Amount $1000');
        text.anchor.set(0.5, 0.5);
        text.x = WIDTH / 2;
        text.y = 200;
        this.bonusScreen.addChild(text);
        let button = new Button('Bonus animation!', 0xFFFFFF, 0x13FF23, 350);
        button.interactive = true;
        button.generatePosition(200, 100);
        this.bonusScreen.addChild(button);
        button.addListener('click', () => {
            this._createItemsForWinAnimation();
            for (let i = 0; i < 200; i++) {
                this.bonusScreen.addChild(this.stars[i]);
            }
            this.gameTicker.start();
            button.interactive = false;
            setTimeout(() => {
                for (let i = 0; i < 200; i++) {
                    this.bonusScreen.removeChild(this.stars[i]);
                }
                this.gameTicker.stop();
                button.interactive = true;
                this.mainGameScreen.removeChild(this.bonusScreen);
                this.triesMount === 0 ? this._finishGame() : this.mainGameScreen.addChild(this.playScreen);
            }, 3000);
        });
    }

    protected _createPlayAgainButton(): void {
        let playAgain = new Button('Play again', 0x8000FF, 0x000000);
        playAgain.generatePosition(200, 250)
        playAgain.interactive = true;
        playAgain.setDisabled(false);
        this.playAgainScreen.addChild(playAgain);
        playAgain.addListener('click', () => {
            this.mainGameScreen.removeChild(this.playAgainScreen);
            this._createScenes();
        });
    }

    protected _createButtons(): void {
        for (let i = 0; i < CHEST_BUTTON_COUNT; i++) {
            let btn = new Button('Chest', 0XFFFFFF, 0x66CCFF);
            btn.generatePosition(320 / 2 + i % 2 * 320 / 2 - 60 / 2, 70 + Math.floor(i / 2) * 60);
            this.playScreen.addChild(btn);
            btn.setDisabled(true);
            this.chestButtons.push(btn);
        }
        this.playButton = new Button('PLAY', 0x8000FF, 0x000000);
        this.playButton.position.x = 200;
        this.playButton.position.y = 250;
        this.playScreen.addChild(this.playButton);
        this.playButton.buttonMode = true;
        this.playButton.interactive = true;
        this.playButton.addListener('click', this._gameStarted.bind(this));
    }

    // If the random number is even - the chest is winning, also for bonus
    protected _isWin(btn): void {
        this.triesMount -= 1;
        let isEven: boolean = Math.floor(Math.random() * 100 % 2) === 0;
        if (isEven) {
            btn.currentTarget.setOpenedState(BUTTON_STYLE.win);
            this.winMode = true;
            this._winAnimation();
        } else {
            btn.currentTarget.setOpenedState(BUTTON_STYLE.loose);
            this.winMode = false;
            this._looseAnimation();
        }
    }

    protected _createItemsForWinAnimation(): void {
        this.stars = [];
        for (let i = 0; i < 200; i++) {
            let star = new PIXI.Graphics();
            star.lineStyle(2, 0x000000, 1);
            star.beginFill(0xFCFF34);
            star.drawCircle(Math.random() * 600, 0, Math.floor(Math.random() * 15));
            star.endFill();
            this.stars.push(star);
        }
    }

    protected _winAnimation(): void {
        this._createItemsForWinAnimation();
        for (let i = 0; i < 200; i++) {
            this.playScreen.addChild(this.stars[i]);
        }
        this.gameTicker.start();
        let result = this.chestButtons.filter(btn => btn.isOpened != true);
        for (let i = 0; i < result.length; i++) {
            result[i].setDisabled(true);
        }
        setTimeout(() => {
            this.gameTicker.stop();
            for (let i = 0; i < 200; i++) {
                this.playScreen.removeChild(this.stars[i]);
            }
            for (let i = 0; i < result.length; i++) {
                result[i].setDisabled(false);
            }
            if (Math.floor(Math.random() * 100 % 2) === 0) {
                this.mainGameScreen.removeChild(this.playScreen);
                this.mainGameScreen.addChild(this.bonusScreen);
            } else if (this.triesMount === 0){
                    this._finishGame();
            }
        }, 3000);
    }

    protected _looseAnimation(): void {
        let container = new PIXI.Container();
        container.width = WIDTH;
        container.height = HEIGHT;
        container.x = 0;
        container.y = 0;
        let sadSmile = new PIXI.Graphics();
        sadSmile.lineStyle(2, 0x000000, 1);
        sadSmile.beginFill(0xFCFF34);
        sadSmile.drawCircle(60, 60, 20);
        sadSmile.endFill();
        const arc3 = new PIXI.Graphics();
        arc3.lineStyle(2, 0x000000, 1);
        arc3.arc(60, 70, 10, 2 * Math.PI, -2 * Math.PI / 2);
        sadSmile.addChild(arc3);
        container.addChild(sadSmile);
        let text = new PIXI.Text('x');
        text.x = 45;
        text.y = 40;
        sadSmile.addChild(text);
        let text2 = new PIXI.Text('x');
        text2.x = 65;
        text2.y = 40;
        sadSmile.addChild(text2);
        this.sadSmile = container;
        this.sadSmile.scale.set(2);
        this.playScreen.addChild(this.sadSmile);
        this.gameTicker.start();
        let result = this.chestButtons.filter(btn => btn.isOpened != true);
        for (let i = 0; i < result.length; i++) {
            result[i].setDisabled(true);
        }
        setTimeout(() => {
            this.gameTicker.stop();
            for (let i = 0; i < result.length; i++) {
                result[i].setDisabled(false);
            }
            this.playScreen.removeChild(this.sadSmile);
            if (this.triesMount === 0) {
                this._finishGame();
            }
        }, 5000);
    }

    protected _finishGame(): void {
        this.mainGameScreen.removeChild(this.playScreen);
        this.mainGameScreen.addChild(this.playAgainScreen);
    }

    protected _gameLoop(container?: PIXI.Container): void {
        if (!this.winMode) {
            this.sadSmile.transform.scale.set(1.1, 1.1);
            this.sadSmile.x += 1;
            this.sadSmile.y += 1;
            this.sadSmile.rotation += 0.1;
        } else {
            for (let i = 0; i < 200; i++) {
                this.stars[i].y += Math.random() * 10;
            }
        }
    }
}