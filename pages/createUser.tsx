import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { useRouter } from 'next/router';
const apiKey = process.env.NEXT_PUBLIC__DUMMY_API_KEY
const headers = { 'Content-type': 'application/json', 'app-id': apiKey }

interface User {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
}

export default function CreateUser() {
    const [formData, setFormData] = useState<User>({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        picture: ""
    });
    const router = useRouter();
    const { id } = router.query

    const [users, setUsers] = useState([]);

    function getUsers() {
        axios.get("https://dummyapi.io/data/v1/user", { headers: headers }).then(res => {
            console.log(res.data.data)
            setUsers(res.data.data)
        })
    }

    function getUserDetail() {
        axios.get("https://dummyapi.io/data/v1/user/" + id, { headers: headers }).then(res => {
            console.log(res.data)
            setFormData({
                title: res.data.title,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                picture: res.data.picture
            })
        })
    }

    function updateUser() {
        axios.put("https://dummyapi.io/data/v1/user/" + id, formData, { headers: headers }).then((response) => {
            console.log('Updated:', response.data);
            router.push('/users')
        })
            .catch((error) => {
                console.error(error);
            });
    }

    function createUser() {
        axios.post("https://dummyapi.io/data/v1/user/create", {...formData}, { headers: headers }).then((response) => {
            console.log('Created:', response.data);
            router.push('/users')
        })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getUsers()
        if (id) {
            getUserDetail()
        }
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (id) {
            updateUser();
        }
        else {
            createUser();
        }

        // Form verilerini işleyin veya gönderin
        console.log(formData);
    };

    return (
        <>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <h2 className="text-center">Create User</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formText">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="formImage">
                                <Form.Label>Image Url</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Picture Url"
                                    value={formData.picture}
                                    onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="formText">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formText">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formText">
                                <Form.Label>Last E Mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Button className='mt-4' variant="primary" type="submit">
                                {id ? "Update" : "Create"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}