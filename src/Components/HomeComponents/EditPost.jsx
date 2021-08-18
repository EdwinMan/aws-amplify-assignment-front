import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container';
import Post from './Post'
import axios from 'axios';

export default function EditPost() {

    const user = JSON.parse(localStorage.getItem("user"));

    const url = "http://18.220.118.126/api/v1/post/" + user._id;

    const [posts, setPosts] = useState([]);

    const getAllPosts = () => {

        axios.get(url)
        .then( (res) => {
            // console.log(res.data);
            setPosts(res.data);
        })
        .catch( (err) => {
            console.log("Couldnt get The Posts, with Error: ", err)
        });

    }

    useEffect(() => {
        getAllPosts();
   }, []);

   const removePostById = (id) => {

        const delete_URL = "http://18.220.118.126/api/v1/post/" + id

        axios.delete(delete_URL)
        .then( (res) => {
            // console.log(res.data);
            setPosts(res.data.Posts);
        })
        .catch( (err) => {
            console.log("Couldnt get The Posts, with Error: ", err)
        });

   }

    return (
        <Container style={{marginTop: "50px", width:'fit-content'}}  maxWidth="sm">
            <div>
                {posts.map( (post, index) => 
                    <>
                        <Post key={index} post={post} user={user} removePostById={removePostById} />
                        <br />
                        <br />
                    </>
                )}
            </div>
        </Container>
    )
}
