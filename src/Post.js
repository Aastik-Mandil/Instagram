import React, { useState, useEffect } from 'react'
import "./Post.css";
import { Avatar, IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorder, ChatBubbleOutline, ShareOutlined } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom';
import { db } from './firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';

function Post({ username, caption, imageUrl, postId, post, user }) {
    const [liked, setLiked] = useState(false);

    const history = useHistory();
    const curr_user = useSelector(selectUser);

    const likePost = () => {
        setLiked(true);
        db.collection("posts").doc(postId).collection("likes").add({ user: curr_user?.id });
    };
    const dislikePost = () => {
        setLiked(false);
        db.collection("posts").doc(postId).collection("likes").onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                if (doc.data().user === curr_user?.id) {
                    console.log(doc.id);
                    db.collection("posts").doc(postId).collection("likes").doc(doc.id).delete();
                }
            });
        });
    };
    const goToDetail = () => {
        history.push(`/view/${postId}`);
    }

    useEffect(() => {
        db.collection("posts").doc(postId).collection("likes").onSnapshot(snapshot => (
            snapshot.docs.map(doc => {
                if (curr_user.id === doc.data().user) {
                    setLiked(true);
                    return;
                }
            })
        ));
    }, []);

    return (
        <div className="post">
            <div className="post__header">
                {username && <Avatar className="post__avatar" alt="" src="">{username[0]}</Avatar>}
                <h3>{username}</h3>
            </div>
            <img src={imageUrl} alt={`@${username}`} className="post__image" />
            <div className="post__action">
                {liked ? (
                    <IconButton className="post__icon" onClick={dislikePost}>
                        <Favorite />
                    </IconButton>
                ) : (
                        <IconButton className="post__icon" onClick={likePost}>
                            <FavoriteBorder />
                        </IconButton>
                    )}
                <IconButton className="post__icon" onClick={goToDetail}>
                    <ChatBubbleOutline />
                </IconButton>
                <IconButton className="post__icon">
                    <ShareOutlined />
                </IconButton>
            </div>
            <h4 className="post__text">
                <strong>{username}:</strong> {caption}
            </h4>
        </div>
    )
}

export default Post
