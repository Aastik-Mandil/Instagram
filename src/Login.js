import React, { useState } from 'react'
import "./Login.css";
import { useHistory } from 'react-router-dom';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux';
import { addUser } from './features/appSlice';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();

    const goToRegister = () => {
        history.push("/register");
    }
    const loginUser = () => {
        auth.signInWithEmailAndPassword(email, password).then(res => {
            db.collection("users").onSnapshot(snapshot => {
                snapshot.docs.map(doc => {
                    if (res.user.email === doc.data().email) {
                        dispatch(addUser({ id: doc.id }));
                        // return;
                    }
                })
            })
            history.push("/");
        });
        setEmail("");
        setPassword("");
    }

    return (
        <div className="login">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={loginUser}>Login</button>
            <p>Don't have an account? <span onClick={goToRegister}>Register here...</span></p>
        </div>
    )
}

export default Login
