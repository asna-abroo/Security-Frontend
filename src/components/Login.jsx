import React from 'react';
import '../css/form.css'; // External CSS file


const Login = () => {
  return (
  
    <div className="login form">
      <header>Login</header>
      <form action="#">
        <input type="text" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />
        <a href="#">Forgot password?</a>
        <input type="button" className="button" value="Login" />
      </form>
      <div className="signup">
        <span className="signup">Don't have an account? 
          <label htmlFor="check">Signup</label>
        </span>
      </div>
    </div>
  
  );
};

export default Login;
