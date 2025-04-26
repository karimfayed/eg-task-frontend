import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../services/authApi';
import { getErrorMessage } from '../utils/errorUtils';
import { ErrorMessages } from '../enums/errorMessages';
import { Path } from '../enums/paths';
import { SignupFormData } from '../types/formdata.types';
import { validateSignupForm } from '../utils/formValidators';

function Signup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [signup, { isLoading, error: signupError }] = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignupForm(formData, setErrors)) {
      try {
        await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }).unwrap();
        
        navigate(Path.LOGIN);
      } catch (err) {
        console.error('Failed to sign up:', err);
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.form && <p className="error form-error">{errors.form}</p>}
        {signupError && (
          <p className="error form-error">
            {getErrorMessage(signupError, ErrorMessages.DEFAULT_SIGNUP)}
          </p>
        )}
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        
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
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      
      <p>
        Already have an account? <Link to={Path.LOGIN}>Log in</Link>
      </p>
    </div>
  );
}

export default Signup;