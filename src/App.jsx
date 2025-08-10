import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import Login from './components/Login'
import Signup from "./components/Signup";
import Dashboard from './components/Dashboard';
import {AuthProvider} from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Logout from "./components/Logout.jsx";

function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/dashboard"
                         element={
                             <ProtectedRoute>
                                 <Dashboard />
                             </ProtectedRoute>
                         } />
              </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App
