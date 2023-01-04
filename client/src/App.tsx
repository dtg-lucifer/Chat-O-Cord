import { Route, Routes } from "react-router-dom";
import { PropsWithChildren, useState } from "react";
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
import { SocketContext, socket } from "./utils/context/SocketContext";
import { Socket } from "socket.io-client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { Conversation } from "./types/ComponentProps/Conversation";
import { ActivechatContext } from "./utils/context/ActivechatContext";

interface Props {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket;
  activeConversation?: Conversation;
  setActiveConversation: React.Dispatch<
    React.SetStateAction<Conversation | undefined>
  >;
}

function App() {
  const [user, setUser] = useState<User>();
  const [activeConversation, setActiveConversation] = useState<Conversation>();
  return (
    <AppWithProviders
      user={user}
      setUser={setUser}
      socket={socket}
      activeConversation={activeConversation}
      setActiveConversation={setActiveConversation}
    >
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
      <ToastContainer theme="dark" />
    </AppWithProviders>
  );
}

function AppWithProviders({
  children,
  user,
  setUser,
  socket,
  activeConversation,
  setActiveConversation,
}: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateUser: setUser }}>
        <SocketContext.Provider value={socket}>
          <ActivechatContext.Provider
            value={{ activeConversation, setActiveConversation }}
          >
            {children}
          </ActivechatContext.Provider>
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
}

export default App;
