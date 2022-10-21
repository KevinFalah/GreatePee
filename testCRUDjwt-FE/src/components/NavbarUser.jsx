import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {UserContext} from '../context/userContext'
import {useNavigate} from 'react-router-dom'

import gmlogo from "../assets/gmlogo.png"
import profile from '../assets/profile.jfif'

function NavbarUser() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    return dispatch({
      type: "LOGOUT",
    });
    
  }

  return (
    <Navbar bg="dark" variant='dark'>
      <Container>
        <Navbar.Brand>
        <img
              alt=""
              src={gmlogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

      
          </Nav>
            <NavDropdown id="navbarScrollingDropdown" style={{color: 'white'}} >
              <NavDropdown.Item 
                onClick={() => handleLogout(navigate("/"))}
                style={{backgroundColor: 'whitesmoke'}}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          <div>
            <img 
                src={profile} 
                alt='profile'
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50px'
                }} />
          </div>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarUser;