import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from 'socket-controllers';
import { Server, Socket } from 'socket.io';

@SocketController()
export class RoomController {
  @OnMessage('join_game')
  public async joinGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log('New User joining room:', message);
    console.log('@socket.rooms.values()', socket.rooms);
    console.log('@io.sockets.adapter.rooms', io.sockets.adapter.rooms);
    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );
    console.log(socketRooms, connectedSockets);
    if (socketRooms.length > 0 || connectedSockets?.size === 2) {
      socket.emit('room_join_error', {
        error: 'Room is full please choose another room to play!',
      });
    } else {
      await socket.join(message.roomId);
      socket.emit('room_joined');

      if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
        //! 发送给第二个进入房间的玩家开始游戏，让其先下棋，并选择x
        socket.emit('start_game', { start: true, symbol: 'x' });
        //! 发送给房间其他人开始游戏，但等另一个玩家下棋，并选择o
        socket
          .to(message.roomId)
          .emit('start_game', { start: false, symbol: 'o' });
      }
    }
  }
}
