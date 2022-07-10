import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import "./Home.css";

const Home = () => {
  const [userName, setUserName] = React.useState("");
  const [chatId, setChatId] = React.useState('');
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  useEffect(() => {
    setChatId(id || uuidv4());
  }, [])
  return (
    <Container className='home-container'>
      <Row sm={1}>
        <Col sm={{ span: 8, offset: 2 }}>
          <h2>Live Chat</h2>
        </Col>
      </Row>
      <form onSubmit={() => navigate(`/${chatId}/${userName}`)}>
        <Row sm={2}>
          <Col sm={{ span: 6, offset: 2 }}>
            <input
              type="text"
              placeholder="Enter Name "
              value={userName}
              onChange={handleUserNameChange}
              className="text-input-field"
            />
          </Col>
          <Col sm={2}>
            <Button className="userName-button bg-primary">
              Continue
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default Home;
