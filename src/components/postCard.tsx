import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";
import Badge from 'react-bootstrap/Badge';
import { useRouter } from 'next/router';
import { deletePost } from "@/store/slices/postsSlice";
import { useDispatch } from 'react-redux';

const PostCard = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();

    function handleDeletePost(cardData: any) {
        dispatch(deletePost(cardData.id) as any)
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.cardData.image} />
            <Card.Body>
                <Card.Title>{props.cardData.owner.firstName} {props.cardData.owner.lastName}</Card.Title>
                <Card.Text>
                    {props.cardData.text}
                </Card.Text>
                <div className='d-flex flex-row gap-2'>
                    {props.cardData.tags.map((tag: string, i: any) => (
                        <Badge key={i} bg="secondary">{tag}</Badge>
                    ))}
                </div>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{new Date(props.cardData.publishDate).toLocaleDateString()}</ListGroup.Item>
                <ListGroup.Item>Likes: {props.cardData.likes}</ListGroup.Item>
            </ListGroup>
            <div className='delete-button-wrapper' onClick={() => handleDeletePost(props.cardData)}><FontAwesomeIcon icon={faTrash} color='red' /></div>
            <div className='update-button-wrapper' onClick={() => router.push("/createPost?id=" + props.cardData.id)}><FontAwesomeIcon icon={faFilePen} color='blue' /></div>
        </Card>
        )
}

export default PostCard