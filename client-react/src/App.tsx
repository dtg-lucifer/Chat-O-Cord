import { Route, BrowserRouter, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./pages/pageNotFound";
import RegisterPage from "./pages/auth/register";
import AuthenticatedGuard from "./components/authenticatedGuard";
import AuthContext from "./utils/context/authContext";
import { useState } from "react";
import { SafeUser } from "./types/conversation";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<SafeUser | null>(null);


  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AuthenticatedGuard>
                  <>Home</>
                </AuthenticatedGuard>
              }
            />
            <Route path="/auth">
              <Route path="login" element={<>Login</>} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path="/dashboard">
              <Route path="profile" element={<>Profile</>} />
              <Route path="settings" element={<>Settings</>} />
            </Route>
            <Route path="/conversations">
              <Route path=":id" element={<>Conversation</>} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer theme="dark" />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
