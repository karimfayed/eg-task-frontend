import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import { useEffect } from 'react';
import logo from '../assets/react.svg'
import { Path } from '../enums/paths';

function Application() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Path.LOGIN);
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(Path.LOGIN);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="application-container">
      <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <img src={logo} alt="Logo" style={{ height: '50px' }} />
        <h1>Welcome to the application!</h1>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      
      <main className="app-main">
        <div className="dashboard">
          <h2>Home Page</h2>
          <p>This is your application's main page.</p>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>© 2025 Your Easy Generator Frontend Application</p>
      </footer>
    </div>
  );
}

export default Application;