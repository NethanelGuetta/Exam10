import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(SERVER_URL);
    setSocket(socketInstance);
    setConnected(true);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, connected };
}
