import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DialogSelect(props) {

  const post = props.post;
  const user = props.user;
  const postChangeHandler = props.postChangeHandler

  const editPost_url = "http://localhost:5000/api/v1/post/" + post._id

  const [text, setText] = useState()
  const [isHidden, setIsHidden] = useState()
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  useEffect( ()=>{
    setText(post.text)
    setIsHidden(post.hidden)
  }, [])


  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postEditHandler = () => {
    // console.log(text)
    // console.log(isHidden)

    const newPost = {
      text: text,
      hidden: isHidden
    }

    axios.put(editPost_url, newPost)
    .then( (res) => {
        // console.log(res.data);
        postChangeHandler(newPost.text)
        handleClose()
      })
      .catch( (err) => {
        console.log("Couldnt Edit The Posts, with Error: ", err)
      });
      
  }

  return (
    <div>
      <div onClick={handleClickOpen}>{props.children}</div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Post</DialogTitle>
        <DialogContent>
          <div style={{ textAlign:'center'}}>
              <div>
                <TextField disabled id="outlined-basic" label="Title" defaultValue="sdsd" variant="outlined" />
                  <br />
                  <br />
                  <TextField
                      id="edit-text"
                      label="Post"
                      multiline
                      rows={6}
                      variant="outlined"
                      defaultValue={text}
                      onChange={(event) => setText(event.target.value)}
                  />
                  <br />
                  <br />
                  <label htmlFor="">Make Private</label>
                  <Switch
                      checked={isHidden}
                      onChange={()=>{setIsHidden(!isHidden)}}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
              </div>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={postEditHandler} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
