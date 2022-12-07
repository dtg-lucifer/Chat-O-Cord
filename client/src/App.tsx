import { Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "./components/_general/AuthenticatedRoute";
import LogInPage from "./pages/Auth/LogInPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ConversationPage from "./pages/conversation/ConversationPage";
import GetStartedPage from "./pages/GetStartedPage";
import SettingsPage from "./pages/SettingsPage";
import PageNotFound from "./pages/_PageNotFound";

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
  );
}

export default App;
