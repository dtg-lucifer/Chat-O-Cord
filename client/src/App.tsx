import { Route, BrowserRouter, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PageNotFound from "./pages/pageNotFound";
import RegisterPage from "./pages/auth/register";
import AuthenticatedGuard from "./components/authenticatedGuard";
import AuthContext from "./utils/context/authContext";
import { useState } from "react";
import { SafeUser } from "./types/conversation";
import LoginPage from "./pages/auth/login";
import { Toaster } from "sonner";
import ConversationPage from "./pages/conversation";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<SafeUser | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<>Home</>} />
            <Route path="/auth">
              <Route path="login" element={
                <AuthenticatedGuard>
                  <LoginPage />
                </AuthenticatedGuard>
              } />
              <Route path="register" element={
                <AuthenticatedGuard>
                  <RegisterPage />
                </AuthenticatedGuard>
              } />
            </Route>
            <Route path="/dashboard">
              <Route path="profile" element={
                <AuthenticatedGuard>
                  <>Profile</>
                </AuthenticatedGuard>
              } />
              <Route path="settings" element={
                <AuthenticatedGuard>
                  <>Settings</>
                </AuthenticatedGuard>
              } />
            </Route>
            <Route path="/conversations">
              <Route index element={
                <AuthenticatedGuard>
                  <ConversationPage />
                </AuthenticatedGuard>
              } />
              <Route
                path="u/:id"
                element={
                  <AuthenticatedGuard>
                    <ConversationPage />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path="g/:id"
                element={
                  <AuthenticatedGuard>
                    <ConversationPage />
                  </AuthenticatedGuard>
                }
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster richColors theme="dark" />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
