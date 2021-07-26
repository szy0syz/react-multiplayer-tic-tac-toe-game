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
