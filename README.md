# react

> 01-13-09

## Server

- `yarn add -D ts-node typescript nodemon`
- `yarn add socket.io`
- `yarn add socket-controllers reflect-metadata`

## Client

- `yarn add socket.io-client styled-components`

## Notes

![001](/images/001.png)

- 在某个命名空间下，一旦有socket建立连接，则会默认创建一个默认的以这个socketID为key的房间
- 其结构为 Map 的 item，且 value 为 Set

```ts
  @OnMessage('update_game')
  public async updateGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit('on_update_game')
  }
```

- 当对同一 `action` 含义的时间响应时，应加 `on_xxxx_xxxx`
- 否则前后端发送监听都用同一个事件，太难辨别，不好维护
