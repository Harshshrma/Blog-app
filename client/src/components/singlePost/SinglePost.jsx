import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './singlePost.css'
import { Context } from '../../context/Context'

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({})
    const { user } = useContext(Context)
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [updateMode,setupdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);
    const PF = "http://localhost:5000/images/";

    const handleDelete = async ()=>{
        try{
            await axios.delete(`/posts/${post._id}`,{
                data : {username : user.username},
            });
            window.location.replace("/");
        }catch(err){

        }
    }

    const handleUpdate = async ()=>{
        try{
            await axios.put(`/posts/${post._id}`,{
                username : user.username,
                title,
                desc,
            });
            setupdateMode(false);
        }catch(err){}
    };

    return (
        <Container className='mt-5'>

            <div className='singlePost'>
                <div className="singlePostWrapper">
                    {post.photo && (
                        <img src={PF + post.photo} className='singlePostImg' alt='' />
                    )}
                    {
                        updateMode? (<input type='text' value={title} className="singlePostTitleInput" 
                        autoFocus onChange={(e)=>setTitle(e.target.value)}/>) : (

                    <h1 className="singlePostTitle">
                        {post.title}
                        {post.username === user?.username && (

                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setupdateMode(true)}></i>
                                <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                            </div>
                        )}
                    </h1>
                        )
                    }
                    <div className="singlePostInfo">
                        <span className="singlePostAuthor">Author: <b>{post.username}</b></span>
                        <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                    </div>
                    {
                        updateMode? <textarea className='singlePostDescInput' value={desc} onChange={(e)=>setDesc(e.target.value)}/> : (

                    <p className='singlePostDesc'>
                        {desc}

                    </p>
                        )
                    }
                    {
                        updateMode && (
                            <button className='singlePostButton' onClick={handleUpdate}>Update</button>
                        )
                    }
                </div>
            </div>
        </Container>
    )
}
