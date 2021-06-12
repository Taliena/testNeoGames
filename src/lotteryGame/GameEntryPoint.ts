import * as PIXI from 'pixi.js'
import {Button} from "./Button";
import {BUTTON_STYLE, CHEST_BUTTON_COUNT, HEADER_TEXT_STYLE, HEIGHT, OFFSET, SCREEN_TYPES, WIDTH} from "./constants";

export class GameEntryPoint {
    protected app: PIXI.Application;
    protected scene: PIXI.Container;
    protected playScreen: PIXI.Container;
    protected bonusScreen: PIXI.Container;
    protected chestButtons: Button[] = [];
    protected playButton: Button;
    protected triesMount: number;
    private stars: any[] = [];
    private gameTicker: PIXI.Ticker;

    init() {
        this.app = new PIXI.Application({backgroundColor: 0xFFFFFF, width: 600, height: 340});
        document.body.appendChild(this.app.view);
        this.start();
    }

    protected start(): void {
        let mainGameScreen = new PIXI.Container();
        mainGameScreen.width = WIDTH;
        mainGameScreen.height = HEIGHT;
        this.scene = new PIXI.Graphics();
        this.scene.lineStyle(2, 0x000000, 1);
        this.scene.drawRect(OFFSET, OFFSET, WIDTH - 2 * OFFSET, HEIGHT - 2 * OFFSET);
        this.scene.endFill();
        mainGameScreen.addChild(this.scene);
        this.app.stage.addChild(mainGameScreen);
        this.createScene(SCREEN_TYPES.regular, 'Main game Screen');
    }

    protected createScene(type: SCREEN_TYPES, text: string) {
        this.playScreen = this.refreshPlayScene(type, text);
        this.scene.addChild(this.playScreen);
        if (type == SCREEN_TYPES.playAgain) {
            this.createPlayAgainButton();
        } else if (type == SCREEN_TYPES.regular) {
            this._createButtons();
        }
        this.bonusScreen = this.refreshPlayScene(SCREEN_TYPES.win, 'Bonus Screen')
        this.scene.addChild(this.playScreen);
        this.gameTicker = new PIXI.Ticker();
        this.gameTicker.add(this.gameLoop.bind(this));
    }

    protected refreshPlayScene(type: SCREEN_TYPES, text: string): PIXI.Container {
        let scene = new PIXI.Container();
        scene.width = this.scene.width - OFFSET;
        scene.height = this.scene.height - OFFSET;
        let headText = new PIXI.Text(text, new PIXI.TextStyle(HEADER_TEXT_STYLE));
        headText.position.y = 2 * OFFSET;
        headText.position.x = this.scene.width / 2 - headText.width / 2;
        scene.addChild(headText);
        return scene;
    }

    protected createPlayAgainButton() {
        let playAgain = new Button('Play again', 0x8000FF, 0x000000);
        playAgain.generatePosition(WIDTH / 2 - playAgain.width / 2, HEIGHT / 2)
        playAgain.interactive = true;
        playAgain.setDisabled(false);
        this.playScreen.addChild(playAgain);
        playAgain.addListener('click', () => {
            this.scene.removeChild(this.playScreen);
            this.createScene(SCREEN_TYPES.regular, 'Main game Screen');
        });
    }

    protected _createButtons() {
        for (let i = 0; i < CHEST_BUTTON_COUNT; i++) {
            let btn = new Button('Chest', 0XFFFFFF, 0x66CCFF);
            btn.generatePosition(320 / 2 + i % 2 * 320 / 2 - 60 / 2, 70 + Math.floor(i / 2) * 60);
            this.playScreen.addChild(btn);
            btn.setDisabled(true);
            this.chestButtons.push(btn);
        }

        this.playButton = new Button('PLAY', 0x8000FF, 0x000000);
        this.playButton.position.x = 500 / 2 - 60 / 2;
        this.playButton.position.y = 250;
        this.playScreen.addChild(this.playButton);
        this.playButton.buttonMode = true;
        this.playButton.interactive = true;
        this.playButton.addListener('click', this.gameStarted.bind(this));
    }

    protected gameStarted() {
        this.triesMount = this.chestButtons.length;
        this.chestButtons.forEach(item => {
                item.setDisabled(false);
                item.addListener('click', this.isWin.bind(this));
                this.playButton.setDisabled(true);
            }
        );
    }

    // If the random number is even - the chest is winning, also for bonus
    protected isWin(btn) {
        if (this.triesMount > 1) {
            this.triesMount -= 1;
        } else {
            this.finishGame();
        }
        let isEven: boolean = Math.floor(Math.random() * 100 % 2) === 0;
        if (isEven) {
            btn.currentTarget.setOpenedState(BUTTON_STYLE.win);
            this.winAnimation();
        } else {
            btn.currentTarget.setOpenedState(BUTTON_STYLE.loose);
            this.looseAnimation();
        }
    }

    protected winAnimation() {
        this.stars = [];
        for (let i = 0; i < 200; i++) {
            let star = new PIXI.Graphics();
            star.lineStyle(2, 0x000000, 1);
            star.beginFill(0xFCFF34);
            star.drawCircle(Math.random() * 600, 0, Math.floor(Math.random() * 15));
            star.endFill();
            this.stars.push(star);
            this.playScreen.addChild(star);
        }
        this.gameTicker.start();
        let result = this.chestButtons.filter(btn => btn.isOpened != true);
        for(let i=0; i<result.length; i++){
            result[i].setDisabled(true);
        }
        setTimeout(() => {
            this.gameTicker.stop();
            for (let i = 0; i < 200; i++) {
                this.playScreen.removeChild(this.stars[i]);
            }
            for(let i=0; i<result.length; i++){
                result[i].setDisabled(false);
            }
            if (Math.floor(Math.random() * 100 % 2) === 0) {
                this.scene.removeChild(this.playScreen);
                let bonusScreen = this.refreshPlayScene(SCREEN_TYPES.win, 'Bonus Screen');
                this.scene.addChild(this.refreshPlayScene(SCREEN_TYPES.win, 'Bonus Screen'));
            }
        }, 4000);
    }

    protected looseAnimation() {
        let container = new PIXI.Container();
        container.width = WIDTH;
        container.height = HEIGHT;
        container.x = 0;
        container.y = 0;
        let sadSmile = new PIXI.Graphics();
        sadSmile.lineStyle(2, 0x000000, 1);
        sadSmile.beginFill(0xFCFF34);
        sadSmile.drawCircle(0, 0, 300);
        sadSmile.endFill();
        const mouth = new PIXI.Graphics();

        mouth.lineStyle(2, 0x000000, 1);
        mouth.moveTo(0, 0);
        mouth.lineTo(100, 200);
        mouth.lineTo(200, 200);
        mouth.lineTo(240, 100);
        container.addChild(mouth);
        mouth.position.x = 200;
        mouth.position.y = 800;
        const arc3 = new PIXI.Graphics();
        arc3.lineStyle(2, 0x000000, 1);
        arc3.arc(200, 200, 60, 2 * Math.PI, -2 * Math.PI / 2);
        container.addChild(arc3);
        this.playScreen.addChild(container);

    }

    protected finishGame() {
        this.scene.removeChild(this.playScreen);
        this.createScene(SCREEN_TYPES.playAgain, 'Main game Screen');
    }

    protected gameLoop() {
        for (let i = 0; i < 200; i++) {
            this.stars[i].y += Math.random() * 10;
        }
    }
}