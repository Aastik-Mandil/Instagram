import React, { useState, useEffect } from 'react';
import "./Header.css";
import { HomeOutlined, Home, PermIdentity, Person, AddCircleOutlineSharp, AddCircleSharp, FavoriteBorder, FavoriteSharp, PeopleOutline, GroupSharp } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

function Header() {
    const [page, setPage] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (history.location.pathname === "/") {
            setPage("Home");
        }
        else if (history.location.pathname === "/search") {
            setPage("Search");
        }
        else if (history.location.pathname === "/create") {
            setPage("Create");
        }
        else if (history.location.pathname === "/following") {
            setPage("Following");
        }
        else if (history.location.pathname === "/profile") {
            setPage("Profile");
        }
        else {
            setPage("");
        }
    }, [history]);

    return (
        <div className="header">
            <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png" alt="Instagram Logo" />
            <div className="header__action">
                <Link to="/">
                    <IconButton onClick={() => setPage("Home")} className="header__icon">
                        {page !== "Home" ? (<HomeOutlined />) : (<Home />)}
                    </IconButton>
                </Link>
                <Link to="/search">
                    <IconButton onClick={() => setPage("Search")} className="header__icon">
                        {page !== "Search" ? (<PermIdentity />) : (<Person />)}
                    </IconButton>
                </Link>
                <Link to="/create">
                    <IconButton onClick={() => setPage("Create")} className="header__icon">
                        {page !== "Create" ? (<AddCircleOutlineSharp />) : (<AddCircleSharp />)}
                    </IconButton>
                </Link>
                <Link to="/following">
                    <IconButton onClick={() => setPage("Following")} className="header__icon">
                        {page !== "Following" ? (<FavoriteBorder />) : (<FavoriteSharp />)}
                    </IconButton>
                </Link>
                <Link to="/profile">
                    <IconButton onClick={() => setPage("Profile")} className="header__icon">
                        {page !== "Profile" ? (<PeopleOutline />) : (<GroupSharp />)}
                    </IconButton>
                </Link>
            </div>
        </div>
    )
}

export default Header
