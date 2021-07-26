import { IPlayerMatrix } from './../../commponents/game/index';
import { Socket } from 'socket.io-client';

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit('join_game', { roomId });
      socket.on('room_joined', () => rs(true));
      socket.on('room_join_error', ({ error }) => rj(error));
    });
  }

  public async updateGame(socket: Socket, gameMatrix: IPlayerMatrix) {
    socket.emit('update_game', gameMatrix);
  }

  public async onGameUpdate(
    socket: Socket,
    listiner: (matrix: IPlayerMatrix) => void
  ) {
    socket.on('on_update_game', listiner);
  }
}

export default new GameService();
