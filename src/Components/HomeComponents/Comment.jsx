import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: '#f2f2f2',
      borderRadius: '0px 10px 10px 10px;',
      padding: '15px',
    },
    CommentAuthorName: {
      fontSize: '20px',
      fontFamily: 'Sans-serif',
    },
  }));

export default function Comment(props) {
    const classes = useStyles();
    const comment = props.comment;
    const user = props.user;
    const deleteComment = props.deleteComment

    const you = <span>{' '}<span>&#9737;</span> <span style={{color:'#6B7AA1'}}>You</span></span>

    return (<>
        <div className={classes.container}>
            <Grid container>
                <Grid item xs={10}>
                    <div>
                        <span className={classes.CommentAuthorName}>{capitalize(comment.Author)} {comment.AuthorID === user._id? you : null}</span>
                        <br />
                        <br />
                        <span>{comment.text}</span>
                    </div>
                </Grid>
                <Grid className="hoverItem" style={{textAlign:"right"}} xs={2}>
                    
                    {user._id == comment.AuthorID ? <HighlightOffIcon color="secondary" onClick={() => deleteComment(comment._id)}/> : null}
                </Grid>
            </Grid>
        </div>
        <br />
        </>)
}



function capitalize(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
  }