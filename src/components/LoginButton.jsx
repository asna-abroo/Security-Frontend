import React from "react";

const LoginButton = () => {
  return (
    <div className="flex items-center space-x-2 mr-12">
      <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
        <i className="fas fa-user"></i>{" "}
      </div>
      <span className="text-lg">Log In</span>
    </div>
  );
};

export default LoginButton;
