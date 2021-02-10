import React, { useState, useEffect } from 'react'
import "./Home.css";
import Post from './Post';
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { useHistory } from 'react-router-dom';
import { db } from './firebase';

function Home() {
    const [posts, setPosts] = useState([]);
    const [userDetail, setUserDetail] = useState(null);

    const user = useSelector(selectUser);
    const history = useHistory();
    if (user === null) {
        history.push("/login");
    }

    useEffect(() => {
        db.collection("users").doc(user?.id).get().then(snapshot => {
            setUserDetail(snapshot.data());
        });
        db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, post: doc.data()
            })));
        });
    }, []);

    return (
        <div className="home">
            {posts.map(({ id, post }) => {
                // let gettingPostUser = null;
                // db.collection("users").doc(post.user).get().then(snapshot => {
                //     gettingPostUser = snapshot.data();
                //     // console.log(snapshot.data());
                // });
                // console.log(gettingPostUser);
                return (
                    <Post key={id} username={post?.user} caption={post?.caption} imageUrl={post?.image} postId={id} post={post} user={userDetail} />
                );
            })}
        </div>
    )
}

export default Home
