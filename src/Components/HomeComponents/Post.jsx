import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Accordion from '@material-ui/core/Accordion';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Comment from './Comment';
import axios from 'axios';
import DialogEdit from './EditPostDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const useStyles2 = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));



export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [expanded, setExpanded] = React.useState(false);
  const [commentsView, setCommentsView] = React.useState(false);
  const [newComment, setNewComment] = React.useState("");
  const [listComment, setListComment] = React.useState();
  const [text, setText] = React.useState();
  

  const post = props.post;
  const user = props.user;
  const removePostById = props.removePostById || null;

  useEffect( ()=>{
    // console.log(post)
    setListComment(props.post.comments);
    setText(post.text);
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const commentsViewHandler = () => {
    setCommentsView(!commentsView)
  }

  const Comments = () => {

    const addComment_url = "http://18.220.118.126/api/v1/post/" + post._id
    const deleteComment_url = "http://18.220.118.126/api/v1/post/comment/" + post._id
    
      const commentDetails = {
      author: user.firstName + " " + user.lastName,
      authorID: user._id,
      comment: newComment

    }

    const addCommentHandler = () => {

      if(commentDetails.comment == "" || commentDetails.comment == null || commentDetails.comment == undefined)
        return false;
        
      // console.log({url: addComment_url})
      // console.log(commentDetails)

      axios.post(addComment_url, commentDetails)
      .then( (res) => {
          console.log(res.data.data);
          setListComment([...listComment, res.data.data])
      })
      .catch( (err) => {
          console.log("Couldnt get The Posts, with Error: ", err)
      });

    }

    const commentDeleteHandler = (commentID) => {

      const toSend = {
        commentId: commentID
      }

      axios.post(deleteComment_url, toSend)
      .then( (res) => {
          // console.log(res.data);
          setListComment(res.data.listComments)
          
      })
      .catch( (err) => {
          console.log("Couldnt get The Posts, with Error: ", err)
      });
    }

    return (
      <div style={{width:"100%"}}>
        <hr />
        <br />
        <div style={{textAlign:"center"}}>
          <TextField size="small" onChange={(event) => setNewComment(event.target.value)} label="Comment"  variant="outlined"/>
          {' '}
          <span className="hoverItem">
            <SendIcon  color="primary" fontSize="large" onClick={addCommentHandler} />
          </span>
        </div>
        <br />
        <hr />
        <br />
        {listComment.map((comment, index) => <Comment key={index} comment={comment} user={user} deleteComment={commentDeleteHandler} />)}
      </div>
    )  
  }

  const postChangeHandler = (text) => {
    setText(text);
  }

  var dateTemp  = post.createdAt;
  var temp = dateTemp.split("T")
  var date = temp[0].split("-").reverse().join("/")
  var time = temp[1].split(".")[0]
  var fullDate = date + " " + time

  var letter = post.AuthorName[0].toUpperCase() || "NaN";

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {letter}
          </Avatar>
        }
        action={ user._id == post.Author?
          <Grid container>
            <Grid className="hoverItem" item xs={5}>
              <DialogEdit post={post} user={user} postChangeHandler={postChangeHandler}>
              <EditIcon color="primary"/>
              </DialogEdit>
            </Grid>

            <Grid item xs={2}>
            </Grid>

            <Grid  className="hoverItem" item xs={5}>
              <DeleteForeverIcon onClick={()=> removePostById(post._id)} color="secondary"/>
            </Grid>
          </Grid>
          :
          null
        }
        title={<b style={{fontSize:"20px"}}>{capitalize(post.title)}</b>}
        subheader={fullDate}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {text}
        </Typography>
      </CardContent>

      <div className="hoverItem" onClick={commentsViewHandler} >
        <Grid style={{textAlign:"center"}} container>
          <Grid item xs={3}>
          </Grid>
            <Grid style={{marginTop:"18px"}} item xs={2}>
              <ChatBubbleOutlineIcon color="primary"/>
            </Grid>
            <Grid item xs={2}>
              <p >Comments</p>
            </Grid>
          <Grid item xs={5}>
          </Grid>
        </Grid>
      </div>

      <CardActions disableSpacing>
        {commentsView ? Comments() : null}
      </CardActions>

    </Card>
  );
}


function capitalize(words) {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}