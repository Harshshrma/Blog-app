import {useEffect, useState} from 'react'
import { Container } from 'react-bootstrap';
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts';
import './home.css'
import axios from 'axios'


export default function Home() {

  const[posts,setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      try{

        const res = await axios.get("/posts");
        setPosts(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchPosts();
  },[])

  return (
    <>
    <Container>
      <Header />
      <Posts posts={posts} />
    </Container>

    </>
  );
}
