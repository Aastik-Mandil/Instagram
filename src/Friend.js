import React, { useState, useEffect } from 'react';
import "./Friend.css";
import { Avatar, IconButton } from '@material-ui/core';
import { DeleteOutlineOutlined, Add } from '@material-ui/icons';
import { db } from './firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';

function Friend({ name, email, img, userId }) {
    const [isFriend, setIsFriend] = useState(false);

    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("users").doc(user?.id).collection("followings").onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                if (doc.data().user === userId) {
                    setIsFriend(true)
                }
            })
        });
    }, []);

    const addFollowing = () => {
        db.collection("users").doc(user?.id).collection("followings").add({ user: userId });
        db.collection("users").doc(userId).collection("followers").add({ user: user?.id });
    };
    const removeFollowing = () => {
        db.collection("users").doc(userId).collection("followers").onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                if (doc.data().user === user?.Id) {
                    db.collection("users").doc(userId).collection("followers").doc(doc.id).delete();
                }
            })
        });
        db.collection("users").doc(user?.id).collection("followings").onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                if (doc.data().user === userId) {
                    db.collection("users").doc(user?.id).collection("followings").doc(doc.id).delete();
                }
            })
        });
    };

    return (
        <div className="friend">
            <Avatar src={img} >{name[0]}</Avatar>
            <div className="friend__info">
                <h3>{name}</h3>
                <h4>{email}</h4>
            </div>
            <div className="friend__action">
                {isFriend ? (
                    <IconButton onClick={removeFollowing}>
                        <DeleteOutlineOutlined />
                    </IconButton>
                ) : (
                        <IconButton onClick={addFollowing}>
                            <Add />
                        </IconButton>
                    )}
            </div>
        </div>
    )
}

export default Friend
