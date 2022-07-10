import moment from "moment";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useChat from "../../hooks/useChat";

import "./Chat.css";

const Chat = (props) => {
  const params = useParams();
  const { id, name } = params;
  const { messages, sendMessage } = useChat(id, name);
  const [newMessage, setNewMessage] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage({ message: newMessage, name, time: new Date() });
    setNewMessage("");
  };

  return (
    <div>
      <div>
        <h1>Chat Listing</h1>
      </div>
      <Container className="chat-container">
        <Row>
          <div className="d-flex justify-content-between">
            <h1 className="room-name">{name}</h1>
            <h5 className="text-primary invite" title="Click me" onClick={() => navigator.clipboard.writeText(`http://localhost:3000/${id}`)}>Invite User</h5>
          </div>
        </Row>
        <div className="messages-container">
          <ol className="messages-list">
            {messages.map((message, i) => (
              <div className={`message-item ${message.ownedByCurrentUser ? "my-message" : "received-message"}`}>
                <li
                  key={i}
                >
                  {message.body.message}
                </li>
                <small>{moment(message.body.time).format('hh:mmA')}: {message.body.name}</small>
              </div>
            ))}
          </ol>
        </div>
        <form onSubmit={handleSendMessage}>
          <Row sm={2}>
            <Col sm={10}>
              <input
                value={newMessage}
                onChange={handleNewMessageChange}
                placeholder="Write message..."
                className="input-field"
              />
            </Col>
            <Col sm={2}>
              <button className="send-button">
                Send
              </button>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
};

export default Chat;
