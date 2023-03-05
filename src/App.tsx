import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Home from "./components/Home/Home";
import News from "./components/News/News";
import Profile from "./components/Profile/Profile";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/profile" element={<AuthRoute>
                    <Profile />
                </AuthRoute>} />
            </Routes>
        </>
    );
};

export default App;
