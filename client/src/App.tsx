import React from "react";
import { Routes, Outlet, Route } from "react-router-dom";
import LogInPage from "./pages/Auth/LogInPage";
import AuthenticationPage from "./pages/Auth/RegisterPage";
import GetStartedPage from "./pages/GetStartedPage";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import PageNotFound from "./pages/_PageNotFound";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<GetStartedPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/auth/register" element={<AuthenticationPage />} />
                <Route path="/auth/login" element={<LogInPage />} />
                <Route path="/new" element={<NewPage/>}/>
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
