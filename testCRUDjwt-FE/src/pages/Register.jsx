import React, { useContext, useState } from 'react'
import {Col, Container, Row, Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { UserContext } from '../context/userContext';
import { API } from "../config/api";
import {Swal} from 'sweetalert2'


import Navbars from '../components/Navbar';
import gmlogo from "../assets/gmlogo.png"

export const Register = () => {

  let navigate = useNavigate();

  const title = 'Register';
  document.title = 'DumbMerch | ' + title;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);

      console.log(response);

      // Notification
      if (response.data.code == 200) {
        const alert = (
          <Alert variant="success" className="py-1">
          Succesfully Register, Please go to login page
        </Alert>
        );
        setMessage(alert);
        setForm({
          name: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div style={{
      minHeight: "100vh", 
      backgroundColor: "black"
      }}
      >
      <Navbars />
      <Container>
        <Row>
          {/* left */}
          <Col>
              <img 
                src={gmlogo} 
                alt="logo" 
                style={{
                  width: "100%", 
                  objectFit: "cover", 
                  marginTop: "100px"
                  }}
                />
              <h1
                style={{
                  color: "red",
                  fontSize: "60px",
                  textAlign: "center"
                }}>
                Greatpee
              </h1>
          </Col>

          {/* right */}
          <Col>
            <div
              style={{
                marginTop: "150px",
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                marginLeft: "8rem",
              }}>
              <h3>
                Register
              </h3>
              {message && message}
              <Container>
              <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleChange}
              className="px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
          </div>
          <div className="d-grid gap-2 mt-5">
            <button type="submit" className="btn btn-login">
              Register
            </button>
          </div>
        </form>
              {/* <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control type="text" placeholder="Enter name" value={name} name='name' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control type="email" placeholder="Enter email" value={email} name='email' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Control type="password" placeholder="Password" value={password} name='password' onChange={handleChange} />
                </Form.Group>
                <Button 
                  variant="outline-primary" 
                  type="submit"
                  style={{
                    width: "100%"
                  }}
                  >
                  REGISTER
                </Button>
              </Form> */}
              <br/>
              <div>
                Already have an account? Click
                <span 
                  style={{cursor: "pointer"}} 
                  className='here fw-bold' 
                  onClick={() => navigate("/login")}
                  >{' '}
                  here
                </span>
              </div>
              <br/>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
