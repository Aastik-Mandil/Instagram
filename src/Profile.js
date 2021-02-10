import React, { useEffect, useState } from 'react';
import "./Profile.css";
import { Avatar } from '@material-ui/core';
import { auth, db } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, selectUser } from './features/appSlice';
import { useHistory } from 'react-router-dom';

function Profile() {
    const [userDetail, setUserDetail] = useState(null);
    const [posts, setPosts] = useState([]);
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    if (user === null) {
        history.push("/login");
    }

    const loggedOut = () => {
        auth.signOut();
        dispatch(removeUser());
    }

    useEffect(() => {
        if (user) {
            db.collection("users").doc(user?.id).get().then(snapshot => {
                setUserDetail(snapshot.data());
                console.log(userDetail);
            });
            db.collection("users").doc(user?.id).collection("posts").onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => doc.data()));
            })
            db.collection("users").doc(user?.id).collection("followers").onSnapshot(snapshot => {
                setFollower(snapshot.docs.map(doc => doc.data()));
            })
            db.collection("users").doc(user?.id).collection("followings").onSnapshot(snapshot => {
                setFollowing(snapshot.docs.map(doc => doc.data()));
            })
        }
    }, []);

    return (
        <div className="profile">
            <div className="profile__info">
                <Avatar className="profile__avatar">{userDetail?.displayName[0]}</Avatar>
                <div className="profile__post">
                    <h2>{posts?.length || 0}</h2>
                    <h4>Posts</h4>
                </div>
                <div className="profile__follower">
                    <h2>{follower?.length || 0}</h2>
                    <h4>Follower</h4>
                </div>
                <div className="profile__following">
                    <h2>{following?.length || 0}</h2>
                    <h4>Following</h4>
                </div>
            </div>
            <h3>{userDetail?.displayName}</h3>
            <h4>{userDetail?.email}</h4>
            <button onClick={loggedOut}>Logout</button>
        </div>
    )
}

export default Profile
