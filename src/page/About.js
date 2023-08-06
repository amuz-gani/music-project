import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

const About = () => {
    const [login, setLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = e.target.elements.id.value;
        const password = e.target.elements.password.value;

        axios
            .post("/api/login", {
                id,
                password,
            })
            .then((res) => {
                if (1) {
                    setLogin(true);
                    window.location.href = "/main.js";
                } else {
                    alert("로그인 실패");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="id" placeholder="Enter Id" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                        We'll never share your password with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="outline-primary" type="submit">
                    로그인
                </Button>
            </Form>
        </Container>
    );
};

export default About;
