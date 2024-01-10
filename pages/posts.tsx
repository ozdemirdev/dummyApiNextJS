import Head from 'next/head'
import { NextPageContext } from 'next'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';

import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';

import { fetchPosts, deletePost, filterPosts } from '@/store/slices/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '@/src/components/postCard';


const Posts = () => {
    const router = useRouter();

    const dispatch = useDispatch();
    const posts = useSelector((state: any) => state.posts.data);

    const [selectedFilterType, setSelectedFilterType] = useState(0);
    const [filterText, setFilterText] = useState("")
    //const [posts, setPosts] = useState([])

    useEffect(() => {
        dispatch(fetchPosts() as any);
        console.log(posts);
      }, [dispatch]);

    function handlePostFilter(type: number, key: string) {
        dispatch(filterPosts({type: type, key: key }) as any)
    }

    function getFilterName(type: number) {
        switch (type) {
            case 1:
                return <div>Selected Filter: Get List By User</div>;
            case 2:
                return <div>Selected Filter: Get List By Tag</div>;
            case 3:
                return <div>Selected Filter: Get List By Id</div>;
            default:
                return <></>;
        }
    }

    return (
        <>
                <div className='container'>

                    <div className='row justify-content-center'>
                        <div className="col-8">
                            <div className='d-flex flex-row align-items-center gap-2 my-5'>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Filter By
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setSelectedFilterType(1)}>Get List By User</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSelectedFilterType(2)}>Get List By Tag</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSelectedFilterType(3)}>Get Post By Id</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <div className='text-dark'>
                                    {getFilterName(selectedFilterType)}
                                </div>
                                {
                                    selectedFilterType != 0 && <div><Form.Control value={filterText} onChange={evt => setFilterText(evt.target.value)}
                                     size="sm" type="text" placeholder="Search" /></div>
                                }
                                <div>
                                    {
                                        selectedFilterType != 0 &&
                                        <div className='d-flex gap-2'>
                                            <div>
                                                <button onClick={() => { setSelectedFilterType(0); setFilterText(""); dispatch(fetchPosts() as any);
                                             }}
                                                 type="button" className="btn btn-outline-info">Clear</button>
                                            </div>
                                            <div>
                                                <button onClick={() => handlePostFilter(selectedFilterType, filterText)} type="button" className="btn btn-outline-warning">Search</button>
                                            </div>
                                        </div>

                                    }
                                </div>

                            </div>
                        </div>
                        <div className='col-2 my-5'>
                            <button type="button" className="btn btn-primary" onClick={() => router.push('/createPost')}>Create Post</button>
                        </div>
                        <div className='col-2 my-5'>
                            <button type="button" className="btn btn-warning" onClick={() => router.push('/users')}>Users</button>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row gap-3">
                        {posts?.map((post: any, index: number) => <div key={post.id} className="col-sm"><PostCard  cardData={post}></PostCard></div>)}
                    </div>
                </div>
        </>
    )
}
  

export default Posts

