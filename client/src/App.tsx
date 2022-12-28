import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import AuthenticatedRoute from "./components/_others/AuthenticatedRoute";
import LogInPage from "./pages/auth/LogInPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ConversationPage from "./pages/conversation/ConversationPage";
import GetStartedPage from "./pages/GetStartedPage";
import SettingsPage from "./pages/SettingsPage";
import PageNotFound from "./pages/_PageNotFound";
import { User } from "./types/Utils/Authentication";
import { AuthContext } from "./utils/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext, socket } from "./utils/context/SocketContext";

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AuthContext.Provider value={{ user, updateUser: setUser }}>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<GetStartedPage />} />
          <Route path="/auth">
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LogInPage />} />
          </Route>
          <Route
            path="/settings"
            element={
              <AuthenticatedRoute>
                <SettingsPage />
              </AuthenticatedRoute>
            }
          />
          <Route path="/conversations">
            <Route
              index
              element={
                <AuthenticatedRoute>
                  <ConversationPage channelActive={false} />
                </AuthenticatedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <AuthenticatedRoute>
                  <ConversationPage channelActive />
                </AuthenticatedRoute>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </SocketContext.Provider>
      <ToastContainer theme="dark" />
    </AuthContext.Provider>
  );
}

export default App;
