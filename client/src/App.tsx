import React from "react";
import { Routes, Outlet, Route } from "react-router-dom";
import AuthenticationPage from "./pages/Auth/AuthenticationPage";
import PageNotFound from "./pages/_PageNotFound";

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth/register" element={<AuthenticationPage />} />
                <Route path="/conversation" element={
                  <div>
                    Conversation
                    <Outlet />
                  </div>
                }>
                  <Route path=":id" element={<div>Conversation id messages</div>} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;
