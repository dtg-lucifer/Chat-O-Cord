import React from "react";
import { Routes, Outlet, Route } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AuthenticationPage />} />
                <Route path="/conversation" element={
                  <div>
                    Conversation
                    <Outlet />
                  </div>
                }>
                  <Route path=":id" element={<div>Conversation id messages</div>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
