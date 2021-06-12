import * as PIXI from 'pixi.js'
import {HEADER_TEXT_STYLE, HEIGHT, OFFSET, SCREEN_TYPES, WIDTH} from "./constants";

export class Screen extends PIXI.Container{
    constructor(type: SCREEN_TYPES, text: string){
        super();
        this.width = WIDTH - OFFSET;
        this.height = HEIGHT - OFFSET;
        let headText = new PIXI.Text(text, new PIXI.TextStyle(HEADER_TEXT_STYLE));
        headText.position.y = 2 * OFFSET;
        headText.position.x = WIDTH / 2 - headText.width / 2;
        this.addChild(headText);
    }
}