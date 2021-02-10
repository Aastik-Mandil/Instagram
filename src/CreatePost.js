import React, { useState, useEffect } from 'react';
import "./CreatePost.css";
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { db, storage } from './firebase';

function CreatePost() {
    const [userDetail, setUserDetail] = useState(null);
    const [caption, setCaption] = useState("");
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const user = useSelector(selectUser);
    const history = useHistory();
    if (user === null) {
        history.push("/login");
    }

    useEffect(() => {
        db.collection("users").doc(user?.id).get().then(snapshot => {
            setUserDetail(snapshot.data());
        })
    }, []);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        } else {
            console.log("Some error");
        }
    }
    const uploadPost = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image?.name}`).put(image);
        uploadTask.on("state_changed", (snapshot) => {
            const progressVal = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progressVal);
        }, (error) => {
            console.log(error);
            alert(error.message);
        }, () => {
            storage.ref("images").child(image.name).getDownloadURL().then(url => {
                db.collection("posts").add({ image: url, user: userDetail?.displayName, caption: caption, likes: 0, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
                db.collection("users").doc(user?.id).collection("posts").add({ img: url });
                setProgress(0);
                setCaption("");
                setImage(null);
            }).catch(err => console.log("error", err));
        });
    }

    return (
        <div className="createPost">
            <progress className="createPost__progress" value={progress} max="100" />
            <form onSubmit={uploadPost}>
                <textarea placeholder="Caption" value={caption} rows="10" cols="30" onChange={(e) => setCaption(e.target.value)}></textarea>
                <input type="file" onClick={handleChange} />
                <button>Upload</button>
            </form>
        </div>
    )
}

export default CreatePost
