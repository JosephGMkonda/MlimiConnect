
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../features/auth/Login';
import Registration from '../features/auth/Registration';
import HomePage from '../features/home/Feed'

const AppRoute = () => {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    
  );
};

export default AppRoute;