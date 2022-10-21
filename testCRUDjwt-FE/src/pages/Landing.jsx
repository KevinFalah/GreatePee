import React from 'react'
import {Col, Container, Row, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import gmlogo from "../assets/gmlogo.png"

export const Landing = () => {

  let navigate = useNavigate ()

  return (
    <div style={{minHeight: "100vh", backgroundColor: "black"}}>
        <Container>
      <Row>
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
        </Col>
        <Col>
        {/* text */}
          <div 
            style={{
              marginTop: "200px",
              textAlign: "center",
              }}>
            <h4
              style={{color: "white"}}>
              Tenangkan hati, cerahkan pikiran
            </h4>
            <h4 style={{color: "white"}}>
              Mari Berbelanja di
            </h4>
            <h1 
              style={{
                color: "red",
                fontSize: "100px"
                }}>
              Greatpee
            </h1>
          </div>

          {/* button */}
          <div
            style={{
              marginTop: "50px"
            }}>
            <Row>
              <Col>
                <Button variant="outline-danger"
                  style={{
                    float: "right",
                    width: "100px"
                    }}
                    onClick={() => navigate("/login")}
                  >
                  Login
                </Button>{' '}
              </Col>
              <Col>
                <Button 
                  variant="outline-primary"
                  style={{
                    width: "100px"
                  }}
                  onClick={() => navigate("/register")}
                  >
                  Register
                </Button>{' '}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  )
}
