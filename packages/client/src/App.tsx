import React, { useEffect } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import socketService from './services/socketService';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const WelcomeText = styled.h1`
  margin: 0;
  color: #8e44ad;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const connectSocket = async () => {
    const socket = await socketService
      .connect('http://localhost:9000')
      .catch((err) => {
        console.log('Error', err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <AppContainer>
      <WelcomeText>Welcome to Tic-Tac-Toe</WelcomeText>
      <MainContainer></MainContainer>
    </AppContainer>
  );
}

export default App;
