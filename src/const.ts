export const SERVER_PORT = 4456;
export const STARTING_SCENE = 40;
export const GAME_SCENE = 41;
export const ENDING_SCENE = 42;
export const SHORT_BRB = 43;
export const TOGGLE_MUTE_DOSBOX = 36;
export const TOGGLE_MIC = 37;
export const EMPTY_SCENE = 38;
export const LONG_BRB = 39;
export const CODING_SCENE_UPPER_LEFT = 72;
export const INCREASE_DEATH_COUNTER = 48;
export const DECREASE_DEATH_COUNTER = 50;

export const MIDI_KEYBOARD_PADS = {
    PAD5: 40,
    PAD6: 41,
    PAD7: 42,
    PAD8: 43,
    PAD1: 36,
    PAD2: 37,
    PAD3: 38,
    PAD4: 39,
};

export enum ScenesEnum {
    GameAndCamera = 'Game and camera',
    Empty = 'Empty',
    Starting = 'Starting',
    Ending = 'Ending',
    ShortBRB = 'Short BRB',
    LongBRB = 'Long BRB',
    PreStart = 'PreStart',
    Coding = 'Coding (upper left part of screen)'
};