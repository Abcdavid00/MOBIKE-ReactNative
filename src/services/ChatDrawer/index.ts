import Store from '../../redux/store';
import io, {Socket} from 'socket.io-client';
import {
  GetMessageByRoom,
  GetPost,
  GetRoom,
  GetRoomByUser,
} from '../../backendAPI';
import {useDispatch} from 'react-redux';
import {setRoom, Room} from '../../redux/slice/roomSlice';
import {setMessage, addMessages, Message} from '../../redux/slice/messageSlice';

const socketScheme = 'https';
const socketHost = 'mobike.ddns.net';
const socketPort = 443;

let socket: Socket;

export async function init() {
  const uid = Store.getState().auth.ID;
  console.log('Chat drawer init with UID: ' + uid);
  if (!uid) {
    console.log('No UID found, chat drawer init will retrying in 5 seconds');
    setTimeout(init, 5000);
    return;
  }

  socket = io(socketScheme + '://' + socketHost + ':' + socketPort);

  socket.on('connect', () => {
    console.log('Chat socket connected');
  });

  socket.on('request user', () => {
    console.log('Chat server requesting user, sending user ID: ' + uid);
    socket.emit('set user', uid);
  });

  socket.on('chat message', OnMessageReceived);

  socket.on('room created', OnRoomCreated);

  socket.on('room updated', OnRoomUpdated);
  await fetchRoom(uid);

  // console.log('Latest room set to store');
  // console.log(Store.getState().room);

  console.log('Chat drawer init done');
}

async function fetchRoom(uid: string) {
  // console.log('Fetching latest room');
  const latestRoom = await GetRoomByUser(uid);
  for (const room of latestRoom) {
    await addRoom(room);
  }
}

async function addRoom(room: any) {
  const currentRooms = Store.getState().room;
  if (currentRooms[room._id]) {
    console.log('Room already exist, skipping');
    return;
  }
  const post = (await GetPost(room.postId)).post;
  let imageId = undefined;
  if (post.rel_Image.length > 0) {
    imageId = post.rel_Image[0];
  }
  // console.log('Post: ' + JSON.stringify(post));
  const roomObj: Room = {
    id: room._id,
    postTitle: post.Title,
    users: room.users,
    latestMessage: room.latestMessage,
    latestTimestamp: new Date(room.latestTimestamp),
    imageId: imageId,
  };
  console.log('Adding Room: ');
  console.log(roomObj);
  Store.dispatch(setRoom([room._id, roomObj]));

  const messages = await GetMessageByRoom(room._id);
  // console.log('Messages: ' + JSON.stringify(messages));
  // for (const message of messages) {
  //   const messageObj: Message = {
  //     id: message._id,
  //     roomId: message.roomId,
  //     senderId: message.senderId,
  //     content: message.content,
  //     timestamp: new Date(message.timestamp),
  //   };
  //   Store.dispatch(setMessage(messageObj));
  // }
  Store.dispatch(
    addMessages([
      room._id,
      messages.map((m: any) => {
        return {
          id: m._id,
          roomId: m.roomId,
          senderId: m.senderId,
          content: m.content,
          timestamp: new Date(m.timestamp),
        };
      }),
    ]),
  );
  // console.log(`Latest message of ${room._id} set to store:`)
  // console.log(Store.getState().message[room._id]);
}

export function sendMessage(roomId: string, content: string) {
  socket.emit('chat message', {roomId, content});
}

async function OnMessageReceived(message: any) {
  console.log('Message received: ' + JSON.stringify(message));
  const roomId = message['roomId'];
  if (!Store.getState().room[roomId]) {
    console.log('Room not found, requesting room from server');
    const room = await GetRoom(roomId);
    await addRoom(room);
    return;
  } else {
    console.log('Room found, adding message to store');
    const messageObj: Message = {
      id: message._id,
      roomId: message.roomId,
      senderId: message.senderId,
      content: message.content,
      timestamp: new Date(message.timestamp),
    };
    Store.dispatch(setMessage(messageObj));
  }
}

async function OnRoomCreated(room: any) {
  console.log('Room created: ' + JSON.stringify(room));
  await addRoom(room);
  console.log(`Room ${room._id} added to store`);
}

async function OnRoomUpdated(room: any) {
  console.log('Room updated: ' + JSON.stringify(room));
  Store.dispatch(setRoom([room._id, room]));
  console.log(`Room ${room._id} updated to store`);
}

export function getSocket(): Socket | undefined {
  return socket;
}

export default {init, getSocket};
