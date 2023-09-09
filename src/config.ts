type Config = {
    MIDI_KEYBOARD_DEVICE_NAME: string,
    OBS_ADDRESS: string,
    OBS_PORT: string,
    OBS_PASSWORD: string,
};

export const CONFIG: Config = {
    MIDI_KEYBOARD_DEVICE_NAME: process.env.MIDI_KEYBOARD_DEVICE_NAME || '',
    OBS_ADDRESS: process.env.OBS_ADDRESS || '',
    OBS_PORT: process.env.OBS_PORT || '',
    OBS_PASSWORD: process.env.OBS_PASSWORD || ''
}