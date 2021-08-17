import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { useHistory } from "react-router-dom";
// import { alpha } from '@material-ui/core/styles';

export default function CreatePost() {

    const [hidden, setHidden] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");
    const history = useHistory();

    const handleChange = (event) => {
        setHidden(event.target.checked);
      };

    const url = "http://localhost:5000/api/v1/post/";

    const PostHandler= () => {

        const user = JSON.parse(localStorage.getItem("user"))

        const post = {
            Author: user._id,
            AuthorName: user.firstName + " " + user.lastName,
            title: title,
            text: text,
            hidden: hidden,
        }

        // console.log("post", post)

        axios.post(url, post)
        .then( (res) => {
            // console.log(res.data);
            history.replace("/home");

        })
        .catch( (err) => {
            console.log("Couldnt Add The Posts, with Error: ", err)
        });

    }


    return (
        <div style={{width:'100%', marginTop:'100px', textAlign:'center'}}>
            <div>
                <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(event) => setTitle(event.target.value)} />
                <br />
                <br />
                <TextField
                    label="Post"
                    multiline
                    rows={10}
                    variant="outlined"
                    onChange={(event) => setText(event.target.value)}
                />

                <br />
                <br />
                <label htmlFor="">Make Private</label>
                <Switch
                    checked={hidden}
                    onChange={handleChange}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <br />
                <br />
                <Button onClick={PostHandler} variant="contained" color="primary">
                    Add Post
                </Button>
            </div>
        </div>
    )
}