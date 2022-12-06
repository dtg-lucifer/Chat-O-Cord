import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LogInPage from "./pages/Auth/LogInPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ConversationPage from "./pages/conversation/ConversationPage";
import GetStartedPage from "./pages/GetStartedPage";
import SettingsPage from "./pages/SettingsPage";
import PageNotFound from "./pages/_PageNotFound";
import { UseAuthProps, User } from "./types/Utils/Authentication";
import { GetAuthDetails } from "./utils/api";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GetStartedPage />} />
      <Route path="/auth">
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LogInPage />} />
      </Route>
      <Route
        path="/settings"
        element={
          <RequireAuth>
            <SettingsPage />
          </RequireAuth>
        }
      />
      <Route path="/conversations">
        <Route
          index
          element={
            <RequireAuth>
              <ConversationPage channelActive={false} />
            </RequireAuth>
          }
        />
        <Route
          path=":id"
          element={
            <RequireAuth>
              <ConversationPage channelActive />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

const RequireAuth: React.FC<UseAuthProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const controller = new AbortController();

  useEffect(() => {
    setLoading(true);
    GetAuthDetails()
      .then(({ data }) => {
        console.log("UseAuth", data);
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  if (loading)
    return (
      <main className="loading__wrapper">
        <div>
          <span className="loader"></span>
          <div>Getting your session details...</div>
        </div>
      </main>
    );
  if (user) return <>{children}</>;
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default App;
