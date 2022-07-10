import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const TYPING_STATUS = 'typingStatus';
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (chatId, name) => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { chatId, name, time: new Date() },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(TYPING_STATUS, (status) => {
      setTyping(status);
    })

    return () => {
      socketRef.current.disconnect();
    };
  }, [chatId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  const sendTypingStatus = (name, typing) => {
    console.log(name, typing, 'hello');
    socketRef.current.emit(TYPING_STATUS, { name: name, typing: typing });
  }

  return { messages, sendMessage, sendTypingStatus,typing };
};

export default useChat;
