import React, { useEffect, useState } from 'react';
import "./Search.css";
import Friend from './Friend';
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { useHistory } from 'react-router-dom';
import { db } from './firebase';

function Search() {
    const [allUsers, setAllUsers] = useState([]);
    const user = useSelector(selectUser);
    const history = useHistory();
    if (user === null) {
        history.push("/login");
    }

    useEffect(() => {
        db.collection("users").onSnapshot(snapshot => {
            setAllUsers(snapshot.docs.map(doc => ({
                id: doc.id, data: doc.data()
            })));
        });
    }, []);

    return (
        <div className="search">
            {allUsers.map(({ id, data }) => (
                <Friend name={data.displayName} email={data.email} img="" userId={id} key={id} />
            ))}
        </div>
    )
}

export default Search
