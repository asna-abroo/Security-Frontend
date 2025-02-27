import React from 'react';
import '../css/form.css'; // External CSS file


const Signup = () => {
  return (

   
      <div className="registration form">
        <header>Signup</header>
        <form action="#">
          <input type="text" placeholder="Enter your email" />
          <input type="password" placeholder="Create a password" />
          <input type="password" placeholder="Confirm your password" />
          <input type="button" className="button" value="Signup" />
        </form>
        <div className="signup">
          <span className="signup">Already have an account?
            <label htmlFor="check">Login</label>
          </span>
        </div>
      </div>
   
  );
};

export default Signup;
