import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from 'socket-controllers';
import { Server, Socket } from 'socket.io';

@SocketController()
export class GameController {
  private getSocketGameRoom(socket: Socket): string {

    //! 下面这行代码是因为：命名空间下默认都有一个已自己socketId为名的房间，得过滤掉
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );

    //! 游戏规定，一个 socket 只能加入一个房间
    const gameRoom = socketRooms && socketRooms[0];

    return gameRoom;
  }

  @OnMessage('update_game')
  public async updateGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit('on_update_game', message);
  }
}
