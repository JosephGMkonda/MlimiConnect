import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../features/auth/Login';
import Registration from '../features/auth/Registration';
import HomePage from '../features/home/Feed';
import RightBar from '../features/home/RightBar';
import LeftBar from '../features/home/LeftBar';
import TopBar from '../features/home/TopBar';
import ProtectedRoute from './ProtectedRoute'; 

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-blue-500"> 
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main Content */}
      <div className="flex flex-1 p-4 gap-4">
        <LeftBar className="w-64 bg-brown-700 p-4 rounded-lg" />
        <div className="flex-1 bg-white p-4 rounded-lg">{children}</div>
        <RightBar className="w-64 bg-brown-700 p-4 rounded-lg" />
      </div>
    </div>
  );
};

const AppRoute = () => {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        
        {/* Protected Home Page Route */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
      </Routes>
    
  );
};

export default AppRoute;
