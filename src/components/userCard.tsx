import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";
import { useDispatch } from 'react-redux';
import { deleteUser } from "@/store/slices/userSlice";

const UserCard = (props: any) => {
    const dispatch = useDispatch();
    return (
        <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={props.userData.picture} />
                    <Card.Body>
                        <Card.Title>{props.userData.title + " " + props.userData.firstName + " " + props.userData.lastName}</Card.Title>
                        <Card.Text>
                            {props.userData.text}
                        </Card.Text>
                    </Card.Body>
                    <div className='delete-button-wrapper' onClick={() => handleDeletePost(props.userData.id)}><FontAwesomeIcon icon={faTrash} color='red' /></div>
                    <div className='update-button-wrapper' onClick={() => router.push("/createUser?id=" + props.userData.id)}><FontAwesomeIcon icon={faFilePen} color='blue' /></div>
                </Card>
            </>
    )

    function handleDeletePost(userId: any) {
        dispatch(deleteUser(userId) as any)
    }
}

export default UserCard