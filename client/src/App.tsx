import { Routes, Route } from "react-router-dom";
import LogInPage from "./pages/Auth/LogInPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ConversationPage from "./pages/conversation/ConversationPage";
import GetStartedPage from "./pages/GetStartedPage";
import PageNotFound from "./pages/_PageNotFound";

function App() {
  return (
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LogInPage />} />
        </Route>
        <Route path="/conversations">
          <Route index element={<ConversationPage channelActive={false} />} />
          <Route path=":id" element={<ConversationPage channelActive />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  );
}

export default App;
