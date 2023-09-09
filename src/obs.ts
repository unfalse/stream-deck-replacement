import OBSWebSocket, { OBSRequestTypes, OBSResponseTypes } from "obs-websocket-js";
import { CONFIG } from './config.js';

const { SET_INPUT_MUTE, START_STREAM, STOP_STREAM, SET_SCENE, GET_OUTPUT_LIST, GET_INPUT_MUTE }: Record<string, keyof OBSRequestTypes> = {
    SET_INPUT_MUTE: 'SetInputMute',
    START_STREAM: 'StartStream',
    STOP_STREAM: 'StopStream',
    SET_SCENE: 'SetCurrentProgramScene',
    GET_OUTPUT_LIST: 'GetOutputList',
    GET_INPUT_MUTE: 'GetInputMute',
};

const { OBS_ADDRESS, OBS_PASSWORD, OBS_PORT } = CONFIG;

const obs = new OBSWebSocket();

const ConnectToObs = async () => {
    try {
        const {
            obsWebSocketVersion,
            negotiatedRpcVersion
        } = await obs.connect(`ws://${OBS_ADDRESS}:${OBS_PORT}`, OBS_PASSWORD);
        console.log(`Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`)
    } catch (error: any) {
        console.error('Failed to connect', error.code, error.message);
        console.log(error);
        process.exit(1);
    }
};

const MuteMic = (): Promise<OBSResponseTypes['SetInputMute']> =>
    obs.call(SET_INPUT_MUTE, { inputName: 'Mic/Aux', inputMuted: true });

const UnmuteMic = (): Promise<OBSResponseTypes['SetInputMute']> =>
    obs.call(SET_INPUT_MUTE, { inputName: 'Mic/Aux', inputMuted: false });

const SetMicState = (muteState: boolean): Promise<OBSResponseTypes['SetInputMute']> => 
    obs.call(SET_INPUT_MUTE, { inputName: 'Mic/Aux', inputMuted: muteState });

const StartStream = (): Promise<OBSResponseTypes['StartStream']> => 
    obs.call(START_STREAM);

const StopStream = (): Promise<OBSResponseTypes['StopStream']> =>
    obs.call(STOP_STREAM);

const SetCurrentScene = (sceneName: string): Promise<OBSResponseTypes['SetCurrentProgramScene']> =>
    obs.call(SET_SCENE, { sceneName });

const GetOutputList = (): Promise<OBSResponseTypes['GetOutputList']> =>
    obs.call(GET_OUTPUT_LIST);

const GetMicState = (): Promise<OBSResponseTypes['GetInputMute']> =>
    obs.call(GET_INPUT_MUTE, { inputName: 'Mic/Aux' });

export { ConnectToObs, MuteMic, UnmuteMic, SetMicState, StartStream, SetCurrentScene, GetOutputList, StopStream, GetMicState, obs };
