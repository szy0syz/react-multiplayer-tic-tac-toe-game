import { Server, Socket } from 'socket.io';
import {
  ConnectedSocket,
  OnConnect,
  SocketController,
  SocketIO,
} from 'socket-controllers';

@SocketController()
export class MainController {
  @OnConnect()
  public onConnection(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ) {
    console.log('~~New Socket connected: ', socket.id);

    socket.on("custom_event", (data: any) => {
      console.log('custom_event DATA:', data);
    })
  }
}
