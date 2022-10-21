import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

import gmlogo from "../assets/gmlogo.png"

function Navbars() {

  // let navigate = useNavigate()

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to='/' style={{textDecoration: 'none'}}>
          <Navbar.Brand >
            <img
              alt=""
              src={gmlogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              
            />{' '}
            Greatpee
          </Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;