import * as easymidi from 'easymidi';
import { GetDosboxMutedState, SetMuteStateForDosbox, getDosBoxSessionPid } from './dosbox.js';
import { GetMicState, MuteMic, SetCurrentScene, SetMicState, StopStream, UnmuteMic } from './obs.js';
import { CONFIG } from './config.js';
import { MIDI_KEYBOARD_PADS, ScenesEnum } from './const.js';

const { MIDI_KEYBOARD_DEVICE_NAME } = CONFIG;
const { PAD1, PAD2, PAD3, PAD4, PAD5, PAD6, PAD7, PAD8 } = MIDI_KEYBOARD_PADS;

const input = new easymidi.Input(MIDI_KEYBOARD_DEVICE_NAME);

    input.on('noteon', async (msg: easymidi.Note) => {
        const { note } = msg;
        switch (note) {

            // msg.note === 40: starting scene
            case PAD5:
                SetMuteStateForDosbox(true);
                await MuteMic();
                // await SetCurrentScene('Starting');
                await SetCurrentScene(ScenesEnum.Starting);
                break;

            // 41: game scene
            case PAD6:
                SetMuteStateForDosbox(false);
                await UnmuteMic();
                await SetCurrentScene(ScenesEnum.GameAndCamera);
                break;

            // 42: ending scene
            case PAD7:
                SetMuteStateForDosbox(true);
                await MuteMic();
                await SetCurrentScene(ScenesEnum.Ending);
                break;

            // 43: short brb
            case PAD8:
                SetMuteStateForDosbox(true);
                await MuteMic();
                await SetCurrentScene(ScenesEnum.ShortBRB);
                break;

            // 36: toggle mute dosbox
            case PAD1:
                const dosboxPid = getDosBoxSessionPid();
                if (!dosboxPid) {
                    console.warn('dosbox.exe not found!');
                    return;
                }
                const isDosboxMuted = GetDosboxMutedState(dosboxPid);
                SetMuteStateForDosbox(!isDosboxMuted);
                break;

            // 37: toggle mic
            case PAD2:
                const muteState = await GetMicState();
                const isMicMuted = muteState.inputMuted;
                SetMicState(!isMicMuted);
                break;

            // 38: to empty scene
            case PAD3:
                SetMuteStateForDosbox(true);
                await MuteMic();
                await SetCurrentScene(ScenesEnum.Empty);
                await StopStream();
                break;

            // 39: long brb
            case PAD4:
                SetMuteStateForDosbox(true);
                await MuteMic();
                await SetCurrentScene(ScenesEnum.LongBRB);
                break;
        }
    });
