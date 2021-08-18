import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Post from './Post'

export default function ViewPosts() {

    const url = "http://18.220.118.126/api/v1/post/";

    const [posts, setPosts] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"))

    const getAllPosts = () => {

        axios.get(url)
        .then( (res) => {
            // console.log(res.data.data);
            setPosts(res.data.data);
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
                        {post.hidden? null : 
                        <div>
                            <Post key={index} post={post} user={user}  removePostById={removePostById} />
                            <br />
                            <br />
                        </div>
                        }
                    </>
                )}
                </div>
            </Container>
    )
}
