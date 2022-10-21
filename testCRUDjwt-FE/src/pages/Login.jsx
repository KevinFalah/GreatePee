import React, { useContext, useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbars from "../components/Navbar";
import gmlogo from "../assets/gmlogo.png";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { UserContext } from "../context/userContext";

export const Login = () => {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);


      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "AUTH_SUCCESS",
          payload: response.data.data,
        });
        console.log("ini response :",response)

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
        navigate('/myproduct')
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
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
                marginTop: "100px",
              }}
            />
            <h1
              style={{
                color: "red",
                fontSize: "60px",
                textAlign: "center",
              }}
            >
              Greatpee
            </h1>
          </Col>

          {/* right */}
          <Col>
            <div
              style={{
                marginTop: "170px",
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                marginLeft: "8rem",
              }}
            >
              <h3>Log in</h3>
              <Container>
                {message && message}
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      name="email"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      name="password"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button
                    variant="outline-danger"
                    type="submit"
                    style={{
                      width: "100%",
                    }}
                  >
                    LOG IN
                  </Button>
                </Form>
                <br />
                <div>
                  Don't have an account? Click
                  <span
                    style={{ cursor: "pointer" }}
                    className="here fw-bold"
                    onClick={() => navigate("/register")}
                  >
                    {" "}
                    here
                  </span>
                </div>
                <br />
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
