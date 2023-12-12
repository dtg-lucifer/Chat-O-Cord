import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import AuthenticatedGuard from "./components/authenticatedGuard";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ConversationPage from "./pages/conversation";
import PageNotFound from "./pages/pageNotFound";
import { Conversation, SafeUser } from "./types/conversation";
import { ActiveChatContext } from "./utils/context/activeChatContext";
import AuthContext from "./utils/context/authContext";
import { store } from "./utils/store";
import { SocketContext, socket } from "./utils/context/socketContext";

function App() {
  return (
    <AppWithProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>Home</>} />
          <Route path="/auth">
            <Route
              path="login"
              element={
                <AuthenticatedGuard>
                  <LoginPage />
                </AuthenticatedGuard>
              }
            />
            <Route
              path="register"
              element={
                <AuthenticatedGuard>
                  <RegisterPage />
                </AuthenticatedGuard>
              }
            />
          </Route>
          <Route path="/dashboard">
            <Route
              path="profile"
              element={
                <AuthenticatedGuard>
                  <>Profile</>
                </AuthenticatedGuard>
              }
            />
            <Route
              path="settings"
              element={
                <AuthenticatedGuard>
                  <>Settings</>
                </AuthenticatedGuard>
              }
            />
          </Route>
          <Route path="/conversations">
            <Route
              index
              element={
                <AuthenticatedGuard>
                  <ConversationPage />
                </AuthenticatedGuard>
              }
            />
            <Route path=":mode">
              <Route
                index
                element={
                  <AuthenticatedGuard>
                    <ConversationPage />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path=":id"
                element={
                  <AuthenticatedGuard>
                    <ConversationPage />
                  </AuthenticatedGuard>
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        richColors
        closeButton
        toastOptions={{ className: "main__toaster" }}
        theme="dark"
        position="top-right"
      />
    </AppWithProviders>
  );
}

function AppWithProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<SafeUser | null>(null);
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SocketContext.Provider value={{ socket }}>
          <AuthContext.Provider value={{ user, setUser }}>
            <ActiveChatContext.Provider value={{ activeChat, setActiveChat }}>
              {children}
            </ActiveChatContext.Provider>
          </AuthContext.Provider>
        </SocketContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
