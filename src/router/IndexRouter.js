import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Login from "../views/login/Login";
import NewsSandBox from "../views/newssandbox/NewsSandBox";

const RequiredAuthed = ({ children }) => {
    const authed = localStorage.getItem('token')
    return children;
    // return authed ? children : <Navigate to="/login" />;
}

function IndexRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<RequiredAuthed><NewsSandBox/></RequiredAuthed>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default IndexRouter;
