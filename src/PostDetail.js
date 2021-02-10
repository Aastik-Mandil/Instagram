import React, { useState, useEffect } from 'react';
import "./PostDetail.css";
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import firebase from 'firebase';

function PostDetail() {
    const id = useParams();
    const [singleComment, setSingleComment] = useState("")
    const [postDetail, setPostDetail] = useState(null);
    const [comments, setComments] = useState([]);
    const [userDetail, setUserDetail] = useState(null);

    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("users").doc(user?.id).get().then(snapshot => {
            setUserDetail(snapshot.data());
            console.log(snapshot.data());
        });
        db.collection("posts").doc(id?.id).get().then(snapshot => {
            setPostDetail(snapshot.data());
        });
        db.collection("posts").doc(id?.id).collection("comments").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setComments(snapshot.docs.map(doc => ({
                id: doc.id, data: doc.data()
            })));
        });
    }, []);

    const postComment = () => {
        db.collection("posts").doc(id?.id).collection("comments").add({ comment: singleComment, user: userDetail?.displayName, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
        setSingleComment("");
    }

    return (
        <div className="postDetail">
            <div className="postDetail__header">
                <Avatar src="" alt="">A</Avatar>
                <h3>{userDetail?.displayName}</h3>
            </div>
            <img src={postDetail?.image} alt="" className="postDetail__image" />
            <h4 className="postDetail__text">
                {postDetail?.caption}
            </h4>
            <div className="postDetail__comments">
                {comments.map(({ id, data }) => (
                    <h4 key={id}><strong>{data?.user}:</strong> {data?.comment}</h4>
                ))}
            </div>
            <div className="postDetail__input">
                <input type="text" placeholder="Write Comment here..." value={singleComment} onChange={(e) => setSingleComment(e.target.value)} />
                <button onClick={postComment}>Post</button>
            </div>
        </div>
    )
}

export default PostDetail
