import { NodeAudioVolumeMixer } from 'node-audio-volume-mixer';
import { CONFIG } from './config.js';

const { GAME_EXE } = CONFIG;

const getDosBoxSessionPid = () => {
    const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
    const session = sessions.find(value => value.name === GAME_EXE);
    return session ? session.pid : undefined;
};

const SetMuteStateForDosbox = (isMuted: boolean) => {
    const dosboxPid = getDosBoxSessionPid();
    if (!dosboxPid) {
        console.warn(`${GAME_EXE} not found!`);
        return;
    }
    NodeAudioVolumeMixer.setAudioSessionMute(dosboxPid, isMuted);
};

const GetDosboxMutedState = (dosboxPid: number) => NodeAudioVolumeMixer.isAudioSessionMuted(dosboxPid);

export { getDosBoxSessionPid, SetMuteStateForDosbox, GetDosboxMutedState };