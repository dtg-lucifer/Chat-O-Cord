import React from "react";
import { Routes, Outlet, Route } from "react-router-dom";
import ProfileCard from "./components/_general/Card/ProfileCard";
import LogInPage from "./pages/Auth/LogInPage";
import AuthenticationPage from "./pages/Auth/RegisterPage";
import GetStartedPage from "./pages/GetStartedPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/_PageNotFound";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<GetStartedPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/auth/register" element={<AuthenticationPage />} />
                <Route path="/auth/login" element={<LogInPage />} />
                <Route path="/card" element={<ProfileCard />} />
                <Route
                    path="/conversation"
                    element={
                        <div>
                            Conversation
                            <Outlet />
                        </div>
                    }
                >
                    <Route
                        path=":id"
                        element={<div>Conversation id messages</div>}
                    />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;
