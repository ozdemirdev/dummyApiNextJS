import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@/store/slices/userSlice';
import { createPost } from '@/store/slices/postsSlice';

const apiKey = process.env.NEXT_PUBLIC__DUMMY_API_KEY
const headers = { 'Content-type': 'application/json', 'app-id': apiKey }

interface Post {
    text: string;
    image: string;
    likes: number;
    tags: string[];
    owner: string;
}

export default function CreatePost() {
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.users.data);

    const [formData, setFormData] = useState<Post>({
        text: "",
        image: "",
        likes: 0,
        tags: [],
        owner: ""
    });
    const router = useRouter();
    const { id } = router.query

    function getPostDetail() {
        axios.get("https://dummyapi.io/data/v1/post/" + id, { headers: headers }).then(res => {
            setFormData({
                text: res.data.text,
                image: res.data.image,
                likes: res.data.likes,
                tags: res.data.tags,
                owner: res.data.owner.id
            })
        })
    }

    function updatePost() {
        axios.put("https://dummyapi.io/data/v1/post/" + id, formData, { headers: headers }).then((response) => {
            console.log('Created:', response.data);
            router.push('/posts')
        })
            .catch((error) => {
                console.error(error);
            });
    }

    async function handleCreatePost(){
        await dispatch(createPost(formData) as any)
        router.push('/posts')
    }

    useEffect(() => {
        dispatch(fetchUsers() as any);
        if(id) {
            getPostDetail()
        }
      }, [dispatch]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (id) {
            updatePost();
        }
        else {
            handleCreatePost();
        }
    };

    return (
        <>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <h2 className="text-center">Create Post</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formText">
                                <Form.Label>Text</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Text"
                                    value={formData.text}
                                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formImage">
                                <Form.Label>Image Url</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Image Url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formLikes">
                                <Form.Label>Likes</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Count of Likes"
                                    value={formData.likes}
                                    onChange={(e) => setFormData({ ...formData, likes: parseInt(e.target.value) })}
                                />
                            </Form.Group>

                            <Form.Group controlId="formTags">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Tags (Use Comma If Multiple Tags)"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value?.split(',')?.map(tag => tag.trim()) })}
                                />
                            </Form.Group>

                            <Form.Group controlId="formOwner">
                                <Form.Label>Select Owner</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    value={formData.owner}
                                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                                    required
                                >
                                    <option value="">Select User</option>
                                    {
                                        users.map((user: any, index: number) => (
                                            <option key={index} value={user.id}>{user.title + " " + user.firstName + " " + user.lastName}</option>
                                        ))
                                    }
                                </Form.Select>
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