import React from "react";
import { Routes, Outlet, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<div>Home</div>} />
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
