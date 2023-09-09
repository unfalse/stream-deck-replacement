import 'dotenv/config';
import { MuteMic, ConnectToObs, StartStream, SetCurrentScene } from './obs.js';
import { SetMuteStateForDosbox } from './dosbox.js';
import { ScenesEnum } from './const.js';

await ConnectToObs();

SetMuteStateForDosbox(true);

import './input.js';

await StartStream();

await MuteMic();

await SetCurrentScene(ScenesEnum.PreStart);

import './http-server.js';
