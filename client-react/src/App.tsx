import { Route, BrowserRouter, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>Hello</>} />
          <Route path="/auth">
            <Route path="login" element={<>Login</>} />
            <Route path="register" element={<>Register</>} />
          </Route>
          <Route path="/dashboard">
            <Route path="profile" element={<>Profile</>} />
            <Route path="settings" element={<>Settings</>} />
          </Route>
          <Route path="/conversations">
            <Route path=":id" element={<>Conversation</>} />
          </Route>
          <Route path="*" element={<>Not Found</>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark"/>
    </QueryClientProvider>
  );
}

export default App;
