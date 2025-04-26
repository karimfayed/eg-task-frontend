import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../services/authApi';
import { getErrorMessage } from '../utils/errorUtils';
import { ErrorMessages } from '../enums/errorMessages';
import { Path } from '../enums/paths';
import { LoginFormData } from '../types/formdata.types';
import { validateLoginForm } from '../utils/formValidators';

function Login() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [login, { isLoading, error: loginError }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLoginForm(formData, setErrors)) {
      try {
        await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        
        navigate(Path.APP);
      } catch (err) {
        console.error('Failed to log in:', err);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors.form && <p className="error form-error">{errors.form}</p>}
        {loginError && (
          <p className="error form-error">
            {getErrorMessage(loginError, ErrorMessages.DEFAULT_LOGIN )}
          </p>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      
      <p>
        Don't have an account? <Link to={Path.SIGNUP}>Sign up</Link>
      </p>
    </div>
  );
}

export default Login;