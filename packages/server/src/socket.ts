import { Server } from 'socket.io';
import { useSocketServer } from 'socket-controllers';

export default (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  // 改到去控制器里写
  // io.on('connection', (socket) => {})

  useSocketServer(io, { controllers: [__dirname + '/api/controllers/*.ts'] });

  return io;
};
