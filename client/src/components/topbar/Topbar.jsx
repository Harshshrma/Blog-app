import React, { useContext } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Context } from '../../context/Context';

export default function Topbar() {
  const { user, dispatch } = useContext(Context)
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  };

  const navbar = {backgroundColor: '#f8f9fa'};
  return (
    <>
      <Navbar collapseOnSelect expand="lg" style={navbar} fixed='top' >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><i className="fa-brands fa-blogger-b">log</i></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='m-auto'>
              <LinkContainer to='/write'>

                <Nav.Link>WRITE</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/about'>

                <Nav.Link>ABOUT</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/contact'>

                <Nav.Link>CONTACT</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/login'>
              <Nav.Link onClick={handleLogout}>

                {user && "LOGOUT"}
                
              </Nav.Link>
              </LinkContainer>
              </Nav>

                <Nav className='topRight'>
              <i className="topIcon fa-brands fa-facebook-square"></i>
              <i className="topIcon fa-brands fa-twitter-square"></i>
              <i className="topIcon fa-brands fa-pinterest-square"></i>
              <i className="topIcon fa-brands fa-instagram-square"></i>
                </Nav>
              <Nav>
              {user ? (
                <LinkContainer to='/settings'>

                  <Nav.Link>
                    <img className="topImg" src={PF + user.profilePic} alt="" style={{width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
  cursor: "pointer"}}/>
                  </Nav.Link>
                </LinkContainer>
              )

                : (
                  <Nav>

                  <LinkContainer to='/login'>

                    <Nav.Link >
                      LOGIN
                    </Nav.Link>
                  </LinkContainer>
                
                  <LinkContainer to='/register'>

                    <Nav.Link >
                      REGISTER
                    </Nav.Link>
                  </LinkContainer>
                  </Nav>
                )}





            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>

  )
}
