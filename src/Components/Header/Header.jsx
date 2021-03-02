import React from "react";
import { Navbar, Nav, NavDropdown , Form, FormControl, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";


function Header(props){

    return (
        <>  
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to="/" class="nav-link active text-white" style={{fontWeight:"bold"}}>
                ITrello
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link">Home</Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets" >NAME</Nav.Link>
                        <Nav.Link href="#deets">Logout</Nav.Link>
                        <Nav.Link href="#deets">Registration</Nav.Link>
                        <Link className="nav-link">Login</Link>
                        <Nav.Link href="#deets">RU</Nav.Link>
                        <Nav.Link href="#deets">EN</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;