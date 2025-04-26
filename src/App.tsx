import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import './App.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Application from './pages/Application';
import { JSX } from 'react';
import { Path } from './enums/paths';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to={Path.LOGIN} />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={Path.SIGNUP} element={<Signup />} />
          <Route path={Path.LOGIN} element={<Login />} />
          <Route 
            path={Path.APP} 
            element={
              <ProtectedRoute>
                <Application />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to={Path.SIGNUP} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;