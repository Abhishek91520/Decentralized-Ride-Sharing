import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Button}from "react-bootstrap";
import AdminLogin from './LoginContent/AdminLogin';
import UserLogin from './LoginContent/UserLogin';
import AdminRegister from './RegisterContent/AdminRegister';
import UserRegister from './RegisterContent/UserRegister';
import './Login.css';

function Navigation({setLoginUser, setUserAccount,userAccount}){
    const [modalShow, setModalShow] = useState(false);
    const [modalDisplay, setModalDisplay] = useState(false);
    const [modalAdminRegister, setModalAdminRegister] = useState(false);
    const [modalUserRegister, setModalUserRegister] = useState(false);

    return(
        <Navbar collapseOnSelect expand="lg" bg="black" fixed="top">
            <Container>
                <Link to="/" className="text-decoration-none ms-3">
                    <Navbar.Brand style={{color:"white",fontWeight:"700",fontSize:"22px"}}>DRS</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                    <Link to="/SearchCabs" className="text-decoration-none ms-3">
                        <Nav.Link href="/SearchCabs" style={{color:"white"}}>Search Rides</Nav.Link>
                    </Link>
                    <Button title="Login" id="collasible-nav-dropdown" className="loginbtn ms-3">
                        {/* <NavDropdown.Item href="#admin" onClick={() => setModalShow(true)} className="navDropdownItem">Admin</NavDropdown.Item>
                        <AdminLogin
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                        <NavDropdown.Divider /> */}
                        <Nav href="#user" onClick={() => setModalDisplay(true)} className="navDropdownItem">Login</Nav>
                        <UserLogin
                            show={modalDisplay}
                            onHide={() => setModalDisplay(false)}
                            setLoginUser={setLoginUser}
                            setUserAccount={setUserAccount}
                            userAccount={userAccount}
                        />
                    </Button>
                    <Button title="Register" id="collasible-nav-dropdown" className="registerbtn ms-3" >
                     {/* <NavDropdown.Item href="#adminRegister" onClick={() => setModalAdminRegister(true)} className="navDropdownItem">Admin</NavDropdown.Item>
                        <AdminRegister
                            show={modalAdminRegister}
                            onHide={() => setModalAdminRegister(false)}
                        />
                        <NavDropdown.Divider />  */}
                        <Nav href="#userRegister" onClick={() => setModalUserRegister(true)} className="navDropdownItem">Register</Nav>
                        <UserRegister
                            show={modalUserRegister}
                            onHide={() => setModalUserRegister(false)}
                        />
                        
                    </Button>
                </Nav>
                </Navbar.Collapse>
            </Container>
      </Navbar>
    );
}

export default Navigation;