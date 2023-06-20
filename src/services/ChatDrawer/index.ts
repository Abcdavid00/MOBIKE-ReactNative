import Store from '../../redux/store';
import io from 'socket.io-client';

const socketScheme = 'https';
const socketHost = 'mobike.ddns.net';
const socketPort = 443;

const socket = io(socketScheme + '://' + socketHost + ':' + socketPort);

export async function init() {
        const uid = Store.getState().auth.ID;
        console.log('Chat drawer init with UID: ' + uid);
        if (!uid) {
            console.log('No UID found, chat drawer init will retrying in 5 seconds');
            setTimeout(init, 5000);
        }

        socket.on('connect', () => {
            console.log('Chat socket connected');
        });

        socket.on('request user', ()=>{
            console.log('Chat server requesting user, sending user ID: ' + uid);
            socket.emit('set user', uid);
        })

        socket.on('chat message', (msg: string) => {
            console.log('Socket Message: ' + msg);
        })
        console.log('Chat drawer init done');
}

export default { init, socket}