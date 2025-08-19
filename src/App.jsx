import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import Login from './components/pages/Login.jsx'
import Signup from "./components/pages/Signup.jsx";
import Dashboard from './components/pages/Dashboard.jsx';
import {AuthProvider} from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Logout from "./components/userFlow/Logout.jsx";
import EmailVerification from "./components/pages/EmailVerification.jsx";
import {CookiesProvider} from "react-cookie";

function App() {
  return (
      <BrowserRouter>
          <CookiesProvider>
              <AuthProvider>
                  <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/logout" element={<Logout />} />
                      <Route path="/verify-email" element={<EmailVerification />} />
                      <Route path="/dashboard"
                             element={
                                 <ProtectedRoute>
                                     <Dashboard />
                                 </ProtectedRoute>
                             } />
                  </Routes>
              </AuthProvider>
          </CookiesProvider>
      </BrowserRouter>
  );
}

export default App
