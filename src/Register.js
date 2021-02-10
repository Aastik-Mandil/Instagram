import React, { useState } from 'react'
import "./Register.css";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, db } from './firebase';
import firebase from 'firebase';
import { addUser } from './features/appSlice';

function Register() {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();

    const goToLogin = () => {
        history.push("/login");
    }
    const registerUser = (e) => {
        e.preventDefault();
        const newUser = { displayName: displayName, email: email, timestamp: firebase.firestore.FieldValue.serverTimestamp() };
        auth.createUserWithEmailAndPassword(email, password).then(res => {
            console.log(res);
            db.collection("users").add(newUser).then(() => {
                db.collection("users").onSnapshot(snapshot => {
                    snapshot.docs.map(doc => {
                        if (doc.data().email === email) {
                            dispatch(addUser({ id: doc.id }));
                            history.push("/");
                            return;
                        }
                    })
                });
            }).catch(err => {
                alert(err.message);
            });
        }).catch(err => {
            alert(err.message);
        })
        setDisplayName("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className="register">
            <input type="text" placeholder="Username" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={registerUser}>Register</button>
            <p>Already have an account? <span onClick={goToLogin}>Login here...</span></p>
        </div>
    )
}

export default Register
