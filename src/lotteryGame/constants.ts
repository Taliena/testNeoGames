import {Button} from "./Button";

export const HEADER_TEXT_STYLE: {} = {
    fontFamily: 'Arial',
    fontSize: 25,
    fontWeight: 'bold',
    fill: ['#000000'], // gradient
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

export const BUTTON_TEXT_STYLE: {} = {
    fontFamily: 'Arial',
    fontSize: 20,
    fill: ['#000000'],
    wordWrap: true,
    wordWrapWidth: 440
};

export const BUTTON_WIN_STYLE: {} = {
    fontFamily: 'Arial',
    fontSize: 20,
    fill: ['#ff33fd'],
    wordWrap: true,
    wordWrapWidth: 440
};

export const BUTTON_LOOSE_STYLE: {} = {
    fontFamily: 'Arial',
    fontSize: 20,
    fill: ['#ffffff'],
    wordWrap: true,
    wordWrapWidth: 440
};

export const HEIGHT = 300;
export const WIDTH = 600;
export const OFFSET = 10;
export const CHEST_BUTTON_COUNT = 6;

export enum SCREEN_TYPES {
    regular,
    win,
    playAgain
}

export enum BUTTON_STYLE{
    win,
    loose
}


