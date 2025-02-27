// ResultButton.js
import React, { useState, useEffect } from 'react';
import "../App.css";


const ResultButton = ({ completedDomains, onSubmit }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Check if all domains are completed
  useEffect(() => {
    if (completedDomains.length === 8) {
      setIsButtonDisabled(false);  // Enable button when all domains are completed
    }
  }, [completedDomains]);

  // Handle the click event for the Next button
  const handleNextPage = () => {
    onSubmit();  // Trigger the onSubmit action when button is clicked
    console.log("Proceeding to next page");
  };

  return (
    <div className="result-button">
    <button
      
      disabled={isButtonDisabled}
      onClick={handleNextPage}
      style={{ cursor: isButtonDisabled ? 'not-allowed' : 'pointer' }}
    >
      Next
    </button>
    </div>
  );
};

export default ResultButton;
