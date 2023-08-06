import React from "react";
import axios from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import About from "./page/About.js";
import Main from "./page/Main.js";
import SignUp from "./page/SignUp.js";

function App() {
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#home">Music site</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-center">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about">
                                login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signUp">
                                signUp
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* 리액트 라우터의 Route 컴포넌트 설정 */}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
