import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/QuestionPage.css';
import CircularMenu from './CircularMenu';
import QuestionModal from './QuestionModal';
import '../css/SecurityScorePage.css';


const QuestionPage = ({ choice }) => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [completedDomains, setCompletedDomains] = useState({});
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip visibility state
  const navigate = useNavigate(); // Initialize navigate function
  // Function to check if all domains have been completed
  const handleSelectDomain = (domain) => {
    setSelectedDomain(domain);
  };
  const areDomainsFilled = () => {
    const requiredDomains = [
      "Asset Security",
      "Security Architecture and Engineering",
      "Communication and Network Security",
      "Identity and Access Management (IAM)",
      "Security Assessment and Testing",
      "Security Operations",
      "Software Development Security",
      "Security and Risk Management"
    ];
    return requiredDomains.every(domain => completedDomains[domain]);
  };

  const handleQuestionModalSubmit = (domain) => {
    setCompletedDomains((prev) => ({
      ...prev,
      [domain]: true, // Mark domain as completed
    }));
  };
  const handleNextPage = () => {
    if (areDomainsFilled()) {
      navigate('/security-score');  // Navigate to the SecurityScore page
    }
  };

  return (
    <div id="question-page">
      <div className="question-page ">
        <div className="diagram-container">
          <CircularMenu
            onSelectDomain={handleSelectDomain}
            completedDomains={Object.keys(completedDomains)} // Pass completed domains
          />
        </div>

        <div className="info-text">
          <h2>Check Out Your Security Level in 60 Seconds!</h2>
          <p>
            Experience the cutting-edge 'Security Level System', where in just 60
            seconds, you'll navigate 8 pivotal security domains to uncover your
            true security standing.
          </p>
        </div>

        {selectedDomain && (
          <QuestionModal
            domain={selectedDomain}
            choice={choice} // Pass the current choice to the QuestionModal
            onClose={() => setSelectedDomain(null)}
            onSubmit={() => handleQuestionModalSubmit(selectedDomain)} // Handle submit
          />
        )}



      </div>
      <div className="resultbtn" style={{ marginTop: '20px', padding: '12px 30px', backgroundColor: areDomainsFilled() ? '#B1FF8F' : '#cccccc', border: 'none', borderRadius: '25px', fontSize: '16px', color: '#384740', cursor: areDomainsFilled() ? 'pointer' : 'not-allowed', transition: 'background-color 0.3s ease', marginBottom: '17px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
        onClick={areDomainsFilled() ? handleNextPage : () => { }}
        onMouseEnter={() => !areDomainsFilled() && setShowTooltip(true)}  // Show tooltip only when button is disabled
        onMouseLeave={() => setShowTooltip(false)} // Hide tooltip when hover ends
      >
        Boost Security
      </div>

      {showTooltip && !areDomainsFilled() && (
        <div
          style={{
            width: '70%',
            backgroundColor: '#f8d7da',
            padding: '5px 10px',
            borderRadius: '5px',
            color: '#721c24',
            fontSize: '14px',
            textAlign: 'center',
            zIndex: '100',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          Please fill out all questionnaires first!
        </div>
      )}
      <div className='dashboard-container text-center' style={{marginTop:'5%', marginBottom:'0%'}}>

      <h2 className="title">Stay Informed, Stay Secure!</h2>
      <p className="subtitle">
      Stay ahead in the world of cybersecurity! Tune in to our latest news feed for real-time updates on global security stats and breaking news on security
      breaches. Stay Informed and Stay Secure!      </p>

      <div className="center-info">
        <div className="info-block">
          <h3>72%<p>Ransomware</p></h3>
          <p>72% of cybersecurity attacks in 2023 were ransomware.</p>
        </div>
        <div className="info-block">
          <h3>14.8</h3>
          <p>Cyber Attacks</p>
          <p>14.8 cyber attacks every minute on UK businesses.</p>
        </div>
        <div className="info-block">
          <h3>£4.6B</h3>
          <p>Cybercrime</p>
          <p>Cybercrime costs UK businesses £4.6 billion annually.</p>
        </div>
      </div>
     
      </div>
    </div>
  );
};

export default QuestionPage;
