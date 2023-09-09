import * as http from 'http';
import * as fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { SetCurrentScene, StopStream, UnmuteMic } from './obs.js';
import { SetMuteStateForDosbox } from './dosbox.js';
import { SERVER_PORT, ScenesEnum } from './const.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const listener = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage
}) => {
    const { url = '' } = req;
    const questionMarkPos = url.indexOf('?');
    const urlPath = questionMarkPos > 0 ? url.slice(0, questionMarkPos) : req.url;

    switch (urlPath) {
        case "/ytapi":
            console.log('/ytapi');
            const contents = await fs.readFile(__dirname + "\\ytapi.html");
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
            break
        case "/view.js":
            console.log('/view.js');
            const viewjs = await fs.readFile(__dirname + "\\view.js");
            res.setHeader("Content-Type", "text/javascript");
            res.writeHead(200);
            res.end(viewjs);
            break
        case '/next':
            console.log('/next');
            await SetCurrentScene(ScenesEnum.GameAndCamera);
            SetMuteStateForDosbox(false);
            await UnmuteMic();
            res.end();
            break
        case '/end':
            console.log('/end');
            await SetCurrentScene(ScenesEnum.Empty);
            await StopStream();
            break
        default:
            res.end();
    }
};

const server = http.createServer(listener);
  
server.listen(SERVER_PORT);

server.on('error', (error: Error) => {
    if (error) {
        console.log('Something went wrong', error);
    }
    else {
        console.log('Server is listening on port ' + SERVER_PORT);
    }
});