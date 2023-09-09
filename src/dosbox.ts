import { NodeAudioVolumeMixer } from 'node-audio-volume-mixer';

const getDosBoxSessionPid = () => {
    const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
    const session = sessions.find(value => value.name === 'dosbox.exe');
    return session ? session.pid : undefined;
};

const SetMuteStateForDosbox = (isMuted: boolean) => {
    const dosboxPid = getDosBoxSessionPid();
    if (!dosboxPid) {
        console.warn('dosbox.exe not found!');
        return;
    }
    NodeAudioVolumeMixer.setAudioSessionMute(dosboxPid, isMuted);
};

const GetDosboxMutedState = (dosboxPid: number) => NodeAudioVolumeMixer.isAudioSessionMuted(dosboxPid);

export { getDosBoxSessionPid, SetMuteStateForDosbox, GetDosboxMutedState };