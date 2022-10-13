import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Login } from "./pages/share/Login";
import Register from "./pages/share/Register";
import { HomePage } from "./pages/users/HomePage";
function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRouter = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRouter>
                  <HomePage />
                </ProtectedRouter>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
