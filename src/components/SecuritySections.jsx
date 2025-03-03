import React, { useState, useEffect } from 'react';
import '../css/SecuritySection.css';
import SecurityScorePage from './SecurityScorePage';
import CompanySuggestion from './CompanySuggestion'

const SecuritySections = ({ result }) => {
  const [sectionsData, setSectionsData] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from public folder
  useEffect(() => {
    fetch('/data/securityData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setSectionsData(data.sections);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDivClick = (section) => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSection(null);
  };

  if (loading) {
    return <div className="loading-message">Loading security data...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="security-sections">
      <SecurityScorePage choice={result} />
      
      <div >
        <h1 className="securitySecHeading text-white">
          <span className="text-[#B1FF8F]">Security Risk</span> Overview:
        </h1>
        <h1 className="mt-2 md:mt-10 text-white securitySecHeading">
          Domain-by-Domain
        </h1>
      </div>

      <div className="sections-container">
        {sectionsData.map((section) => (
          <div
            key={section.id}
            className="section-div"
            onClick={() => handleDivClick(section)}
          >
            {section.title}
          </div>
        ))}
      </div>

      {isModalOpen && selectedSection && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <h4 style={{color:'#B1FF8F',fontSize:'33px',fontWeight:'600'}}>{selectedSection.title}</h4>
            
            {/* Overview Section */}
            {selectedSection.content.find(section => section.type === "overview") && (
              <div className="modal-section">
                <h4>Overview</h4>
                <p>{selectedSection.content.find(section => section.type === "overview").description}</p>
                <ul>
                  {selectedSection.content.find(section => section.type === "overview").items.map((item, index) => (
                    <li key={index}>
                      <strong>{item.name}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Use & Impact Section */}
            {selectedSection.content.find(section => section.type === "useImpact") && (
              <div className="modal-section">
                <h4>Use & Impact</h4>
                {selectedSection.content.find(section => section.type === "useImpact").subsections.map((subsection, index) => (
                  <div key={index} className="subsection">
                    <h5 className="subsection-heading">{subsection.heading}</h5>
                    <div className="impact-points">
                      {subsection.business && (
                        <p><strong>For Businesses:</strong> {subsection.business}</p>
                      )}
                      {subsection.individual && (
                        <p><strong>For Individuals:</strong> {subsection.individual}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Vulnerabilities Section */}
            {selectedSection.content.find(section => section.type === "vulnerabilities") && (
              <div className="modal-section">
                <h4>Vulnerabilities</h4>
                <h5><b>Common Vulnerabilities:</b></h5>
                <ul>
                  {selectedSection.content.find(section => section.type === "vulnerabilities").common.map((vuln, index) => (
                    <li key={index}>{vuln}</li>
                  ))}
                </ul>
                <h5><b>Exploitation Tactics:</b></h5>
                <ul>
                  {selectedSection.content.find(section => section.type === "vulnerabilities").exploitationTactics.map((tactic, index) => (
                    <li key={index}>{tactic}</li>
                  ))}
                </ul>
                <h5><b>Impacts</b>:</h5>
                <ul>
                  {selectedSection.content.find(section => section.type === "vulnerabilities").impacts.individual.map((impact, index) => (
                    <li key={index}><span><b>Individual</b></span>: {impact}</li>
                  ))}
                  {selectedSection.content.find(section => section.type === "vulnerabilities").impacts.business.map((impact, index) => (
                    <li key={index}><span><b>Business</b></span>: {impact}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Takeaway Section */}
            {selectedSection.content.find(section => section.type === "keyTakeaway") && (
              <div className="modal-section">
                <h4>Key Takeaway</h4>
                <p>{selectedSection.content.find(section => section.type === "keyTakeaway").description}</p>
              </div>
            )}
          </div>
        </div>
      )}
      <h2 className="securitySecHeading text-white">
          <span className="text-[#B1FF8F]">Partnering for Protection:</span> Elevate Your Security with Industry Leaders
      </h2>
<CompanySuggestion/>
    </div>
  );
};

export default SecuritySections;