import * as PIXI from 'pixi.js'
import {BUTTON_LOOSE_STYLE, BUTTON_STYLE, BUTTON_TEXT_STYLE, BUTTON_WIN_STYLE} from "./constants";

export class Button extends PIXI.Sprite {
    protected text:PIXI.Text;
    protected container: PIXI.Container;
    public isOpened: boolean = false;

    constructor(text: string, backgroundColor: number, lineColor:number) {
        super();
        this.text = new PIXI.Text(text, new PIXI.TextStyle(BUTTON_TEXT_STYLE));
        this.container = new PIXI.Graphics();
        this.container.lineStyle(2, lineColor, 1);
        this.container.beginFill(backgroundColor);
        this.container.drawRect(0, 0, 150, 30);
        this.container.endFill();
        this.container.addChild(this.text);
        this.anchor.set(0.5);
        this.text.position.x = this.container.width / 2 - this.text.width / 2;
        this.text.position.y =this.container.height / 2 - this.text.height / 2;
        this.addChild(this.container);
        this.addEventListeners();

    }

    protected addEventListeners() {
        this.buttonMode = true;
        this.on('pointerdown', this.onButtonDown.bind(this));
        this.on('pointerup', this.onButtonUp.bind(this));
        this.on('pointeroutside', this.onButtonUp.bind(this));
        this.on('pointerover', this.onButtonOver.bind(this));
        this.on('pointerout', this.onButtonOut.bind(this));
    }

    protected onButtonDown() {
        this.scale.set(1);
    }

    protected onButtonUp() {
        this.scale.set(1);
    }

    protected onButtonOver() {
        this.scale.set(1.1);
    }

    protected onButtonOut() {
        this.scale.set(1);
    }

    public setOpenedState (style: BUTTON_STYLE) {
        this.interactive = false;
        this.text.style = style === BUTTON_STYLE.win ? BUTTON_WIN_STYLE : BUTTON_LOOSE_STYLE;
        this.container.beginFill(0x817E7C);
        this.container.drawRect(0, 0, 150, 30);
        this.container.endFill();
        this.isOpened = true;
    }

    public setDisabled (value: boolean) {
        this.interactive = !value;
    }

    public generatePosition(x, y) {
        this.x = x;
        this.y = y;
    }

    public animate(type: string) {

    }
}