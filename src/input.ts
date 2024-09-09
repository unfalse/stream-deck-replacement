import * as easymidi from 'easymidi';
import { GetDosboxMutedState, SetMuteStateForDosbox, getDosBoxSessionPid } from './game-process.js';
import {
    GetMicState,
    MuteMic,
    SetCurrentScene,
    SetMicState,
    StopStream,
    UnmuteMic,
    SetLabelOnScene,
    GetOutputList
} from './obs.js';
import { CONFIG } from './config.js';
import {
    ScenesEnum,
    STARTING_SCENE,
    GAME_SCENE,
    ENDING_SCENE,
    SHORT_BRB,
    TOGGLE_MUTE_DOSBOX,
    TOGGLE_MIC,
    EMPTY_SCENE,
    LONG_BRB,
    CODING_SCENE_UPPER_LEFT,
    INCREASE_DEATH_COUNTER,
    DECREASE_DEATH_COUNTER
} from './const.js';

const { MIDI_KEYBOARD_DEVICE_NAME, GAME_EXE } = CONFIG;

const isDevMode = process.argv[2] === '--dev';

let deathCounter = 0;

const handleMIDIKeyboardInput = async () => {

    const input = new easymidi.Input(MIDI_KEYBOARD_DEVICE_NAME);

    input.on('noteon', async (msg: easymidi.Note) => {
        const { note } = msg;
        if (isDevMode) {
            console.log({ note });
        }
        switch (note) {

            // msg.note === 40: starting scene
            case STARTING_SCENE:
                SetMuteStateForDosbox(true);
                await MuteMic();
                // await SetCurrentScene('Starting');
                await SetCurrentScene(ScenesEnum.Starting);
                break;

            // 41: game scene
            case GAME_SCENE:
                await SetLabelOnScene('Death counter (value)', deathCounter.toString());
                SetMuteStateForDosbox(false);
                await UnmuteMic();
                await SetCurrentScene(ScenesEnum.GameAndCamera);
                break;

            // 42: ending scene
            case ENDING_SCENE:
                SetMuteStateForDosbox(true);
                await MuteMic();
                await SetCurrentScene(ScenesEnum.Ending);
                break;

            // 43: short brb
            case SHORT_BRB:
                SetMuteStateForDosbox(true);
                await MuteMic();
                await SetCurrentScene(ScenesEnum.ShortBRB);
                break;

            // 36: toggle mute dosbox
            case TOGGLE_MUTE_DOSBOX:
                const dosboxPid = getDosBoxSessionPid();
                if (!dosboxPid) {
                    console.warn(`${GAME_EXE} not found!`);
                    return;
                }
                const isDosboxMuted = GetDosboxMutedState(dosboxPid);
                SetMuteStateForDosbox(!isDosboxMuted);
                break;

            // 37: toggle mic
            case TOGGLE_MIC:
                const muteState = await GetMicState();
                const isMicMuted = muteState.inputMuted;
                SetMicState(!isMicMuted);
                break;

            // 38: to empty scene
            case EMPTY_SCENE:
                SetMuteStateForDosbox(true);
                await MuteMic();
                await SetCurrentScene(ScenesEnum.Empty);
                // await StopStream();
                break;

            // 39: long brb
            case LONG_BRB:
                SetMuteStateForDosbox(true);
                await MuteMic();
                await SetCurrentScene(ScenesEnum.LongBRB);
                break;

            case CODING_SCENE_UPPER_LEFT:
                await UnmuteMic();
                await SetCurrentScene(ScenesEnum.Coding);
                break;

            case INCREASE_DEATH_COUNTER:
                deathCounter = deathCounter > 0 ? deathCounter - 1 : 0;
                await SetLabelOnScene('Death counter (value)', deathCounter.toString());
                break;

            case DECREASE_DEATH_COUNTER:
                deathCounter += 1;
                await SetLabelOnScene('Death counter (value)', deathCounter.toString());
                break;
        }
    });
        
    if (!isDevMode) {
        await MuteMic();
        await SetCurrentScene(ScenesEnum.PreStart);
    }

    const outputs = await GetOutputList();
    console.log({ outputs: outputs.outputs });
}

export { handleMIDIKeyboardInput };
