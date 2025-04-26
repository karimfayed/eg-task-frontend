// src/pages/Login.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../services/authApi';

function Login() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Use the login mutation hook from RTK Query
  const [login, { isLoading, error: loginError }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Call the login endpoint
        const result = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        console.log("res:", result);
        
        
        // If successful, navigate to the app
        navigate('/app');
      } catch (err) {
        // Handle API errors
        console.error('Failed to log in:', err);
      }
    }
  };

  const getErrorMessage = (error: unknown): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log("ERROR:", typeof (error as any).data?.body.message)
    if (
      error &&
      typeof error === 'object' &&
      'data' in error &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (error as any).data?.body.message === 'string'
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (error as any).data?.body.message;
    }
    return 'Login failed. Please try again.';
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors.form && <p className="error form-error">{errors.form}</p>}
        {loginError && (
          <p className="error form-error">
            {getErrorMessage(loginError)}
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
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;