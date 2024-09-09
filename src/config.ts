type Config = {
    MIDI_KEYBOARD_DEVICE_NAME: string,
    OBS_ADDRESS: string,
    OBS_PORT: string,
    OBS_PASSWORD: string,
    GAME_EXE: string,
};

const ENV = process.env;

export const CONFIG: Config = {
    MIDI_KEYBOARD_DEVICE_NAME: ENV.MIDI_KEYBOARD_DEVICE_NAME || '',
    OBS_ADDRESS: ENV.OBS_ADDRESS || '',
    OBS_PORT: ENV.OBS_PORT || '',
    OBS_PASSWORD: ENV.OBS_PASSWORD || '',
    GAME_EXE: ENV.GAME_EXE || '',
}