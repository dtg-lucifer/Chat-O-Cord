import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import LogInPage from "./pages/Auth/LogInPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ConversationPage from "./pages/conversation/ConversationPage";
import GetStartedPage from "./pages/GetStartedPage";
import SettingsPage from "./pages/SettingsPage";
import PageNotFound from "./pages/_PageNotFound";
import { UseAuthProps } from "./types/Utils/Authentication";

function App() {
  return (
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LogInPage />} />
        </Route>
        <Route path="/conversations">
          <Route index element={
            <RequireAuth>
              <ConversationPage channelActive={false} />
            </RequireAuth>
          } />
          <Route path=":id" element={
            <RequireAuth>
              <ConversationPage channelActive />
            </RequireAuth>
          } />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  );
}

const RequireAuth: React.FC<UseAuthProps> = ({ children }) =>  {

  const auth = useAuth()
  const location = useLocation()

  console.log(auth)
  if(!auth.user) return <Navigate to="/auth/login" state={{ from: location}} replace />

  return <>{children}</>
}

export default App;
