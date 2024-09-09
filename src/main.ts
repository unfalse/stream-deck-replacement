import 'dotenv/config';
import { MuteMic, ConnectToObs, SetCurrentScene } from './obs.js';
import { SetMuteStateForDosbox } from './game-process.js';
import { ScenesEnum } from './const.js';
import { handleMIDIKeyboardInput } from './input.js';

await ConnectToObs();

SetMuteStateForDosbox(true);

await handleMIDIKeyboardInput();
// import './input.js';

//await StartStream();

await MuteMic();

await SetCurrentScene(ScenesEnum.PreStart);

import './http-server.js';
