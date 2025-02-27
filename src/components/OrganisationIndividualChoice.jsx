import React, { useEffect, useState } from "react";
import "../App.css";

const OrganisationIndividualChoice = ({ onChoiceSelect, initialChoice }) => {
  const [selected, setSelected] = useState(initialChoice || "individual");

  // Update the selected state whenever the initialChoice prop changes
  useEffect(() => {
    setSelected(initialChoice);
  }, [initialChoice]);

  const handleChoice = (choice) => {
    if (choice !== selected) {  // Only proceed if the choice is different
      setSelected(choice);
      onChoiceSelect(choice);
      
      // Clear scores for the previous choice
      const previousChoice = localStorage.getItem('currentChoice');
      if (previousChoice) {
        localStorage.removeItem(`securityScores_${previousChoice}`);
      }
      
      // Update current choice in localStorage
      localStorage.setItem('currentChoice', choice);
      
      // Force a page refresh
      window.location.reload();
    }
  };

  return (
    <div className="bg-[#384740]  flex items-center justify-center mt-10 mb-8">
      <div className="text-center">
        <h3 className="text-2xl xs:text-base sm:text-2xl font-semibold mb-8 text-white ">
          Are you an Organization or an Individual?
        </h3>

        <div className="organizationButton flex justify-center space-x-4 ">
          <button 
            className={`btn px-6 py-3 rounded-md text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${
              selected === "organization"
                ? "bg-[#b1ff8f] text-black font-bold"
                : "bg-[#5B6359] text-gray-300 hover:bg-[#b1ff8f] hover:text-black font-bold"
            }`}
            onClick={() => handleChoice("organization")}
          >
            Organization
          </button>

          <button
            className={`btn px-6 py-3 rounded-md text-lg font-semibold transition duration-300 btn ease-in-out transform hover:scale-105 ${
              selected === "individual"
                ? "bg-[#b1ff8f] text-black font-bold"
                : "bg-[#5B6359] text-gray-300 hover:bg-[#b1ff8f] hover:text-black font-bold"
            }`}
            onClick={() => handleChoice("individual")}
          >
            Individual
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganisationIndividualChoice;
