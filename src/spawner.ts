import { spawn } from 'node:child_process';
import { SetMuteStateForDosbox } from './game-process.js';

const PretendToSpawn = (command: string, cwd: string, timeout = 0, args: string[] = []) => new Promise(resolve => {
    const obs = spawn(
        command,
        args,
        {
            cwd,
            detached: true,
        }
    );
    obs.on('spawn', () => {
        setTimeout(resolve, timeout);
    });
});

export const RunOBS = async () => {
    // Run OBS and wait for it
    await PretendToSpawn(
        "C:\\Program Files\\obs-studio\\bin\\64bit\\obs64.exe",
        "C:\\Program Files\\obs-studio\\bin\\64bit",
        10 * 1000
    );
};

export const RunEverythingForStream = async () => {
    await PretendToSpawn(
        "C:\\OneDrive_f01\\OneDrive\\Twitch\\AxelChat\\AxelChat.exe",
        "C:\\OneDrive_f01\\OneDrive\\Twitch\\AxelChat"
    );
    await PretendToSpawn(
        "C:\\Users\\nopefish\\Downloads\\NohBoard-ReWrite-v1.3.0\\NohBoard.exe",
        "C:\\Users\\nopefish\\Downloads\\NohBoard-ReWrite-v1.3.0"
    );
    await PretendToSpawn(
        "H:\\SteamLibrary\\steamapps\\common\\SS1EE\\sekhmet_x64.exe",
        "",
        10 * 1000
    );
    await PretendToSpawn(
        "cmd.exe",
        "",
        0,
        ["/c", "start", "\"\"", "http://localhost:4456/popout_chat"]
    );

    // open twitch chat in popup - https://www.twitch.tv/popout/nopefish_/chat?popout=

    SetMuteStateForDosbox(true);
};
