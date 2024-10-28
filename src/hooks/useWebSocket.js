// hooks/useWebSocket.js
import { useEffect, useRef } from 'react';

const useWebSocket = (url, onMessage) => {
  const socketRef = useRef(null);
  const pingInterval = useRef(null);

  useEffect(() => {
      socketRef.current = new WebSocket(url);

      socketRef.current.onopen = () => {
          console.log('WebSocket connected');
          pingInterval.current = setInterval(() => {
              if (socketRef.current.readyState === WebSocket.OPEN) {
                  socketRef.current.send(JSON.stringify({ type: 'ping' }));
              }
          }, 30000); // Ping every 30 seconds
      };

      socketRef.current.onmessage = (event) => {
          const messageData = JSON.parse(event.data);
          console.log('Message received from server:', messageData);
          if (onMessage) onMessage(messageData); // Trigger callback for received messages
      };

      socketRef.current.onclose = () => {
          console.log('WebSocket connection closed');
          clearInterval(pingInterval.current);
      };

      return () => {
          clearInterval(pingInterval.current);
          socketRef.current.close();
      };
  }, [url, onMessage]);
};

export default useWebSocket;


