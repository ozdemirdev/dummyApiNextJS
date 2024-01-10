import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";
import UserCard from "@/src/components/userCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "@/store/slices/userSlice";

export default function Users() {
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.users.data);

    useEffect(() => {
        dispatch(fetchUsers() as any);
    }, [dispatch])

    return (
        <>
            <div className="container">
                <div className='row justify-content-end'>
                    <div className='col-2 my-5'>
                        <button type="button" className="btn btn-primary" onClick={() => router.push('/createUser')}>Create Post</button>
                    </div>
                    <div className='col-2 my-5'>
                        <button type="button" className="btn btn-warning" onClick={() => router.push('/posts')}>Posts</button>
                    </div>
                </div>

                <div className="container">
                    <div className="row gap-3">
                        {users?.map((user: any, index: number) => <div key={index} className="col-sm"><UserCard userData={user}></UserCard></div>)}
                    </div>
                </div>
            </div>
        </>
    )
}