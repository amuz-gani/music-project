import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";

const SignUp = () => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [agree, setAgree] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            name === "" ||
            nickname === "" ||
            email === "" ||
            id === "" ||
            password === "" ||
            passwordCheck === "" ||
            !agree
        ) {
            alert("모든 정보를 입력하세요.");
            return;
        }

        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        axios
            .post("/api/signup", {
                name,
                nickname,
                email,
                id,
                password,
            })
            .then((res) => {
                if (res.data.success) {
                    alert("회원가입 성공");
                    setAgree(false);
                    setPassword("");
                    setPasswordCheck("");
                } else {
                    alert("회원가입 실패");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNickname">
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control type="nickname" placeholder="Enter your Nickname" />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="id" placeholder="Enter ID" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Passwordcheck" />
                    <Form.Label>Password Check</Form.Label>
                    <Form.Control type="password" placeholder="Password Check" />
                    <Form.Text className="text-muted">
                        We'll never share your password with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="회원가입 하는 것에 동의합니다." />
                </Form.Group>
                <Button variant="outline-primary" type="submit">
                    회원가입
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;
