import React from 'react'
import "./posts.css"
import Post from "../post/Post"
import { Row, Col } from "react-bootstrap"

export default function Posts({posts}) {
  return (
    // <div className='posts'>
    <>
      <Row>
          {posts.map((p)=>(
        <Col md={6} xs={12} xl={4}>

          <Post post={p}/>
        </Col> 
          ))}
        </Row>
      </>

      )
}
