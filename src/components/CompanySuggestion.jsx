import React, { useEffect, useRef, useState } from 'react';
import CompanySuggestionStyle from '../css/CompanySuggestionStyle.css';

const companies = [
  {
    name: "WebFX",
    logo: "/webfx-logo.svg",
    website: "https://www.webfx.com/web-development/services/website-security-analysis/",
    trustpilotLink: "https://www.trustpilot.com/review/webfx.com",
    services: "Website Security Analysis, Vulnerability Scanning, Security Audits"
  },
  {
    name: "1Password",
    logo: "/1pass.avif",
    website: "https://1password.com",
    trustpilotLink: "https://www.trustpilot.com/review/1password.com",
    services: "Password Management, Secure Vault, Two-Factor Authentication"
  }
,
   
    {
      "name": "Assure Technical",
      "logo": "/assure.avif",
      "website": "https://www.assuretechnical.com",
      "trustpilotLink": "https://uk.trustpilot.com/review/assuretechnical.com",
      "services": "Cyber Security, IT Consultancy, Vulnerability Assessment"
    },
    {
      "name": "Cyber Trust",
      "logo": "/cyber.png",
      "website": "https://www.cyber-trust.co.uk",
      "trustpilotLink": "https://uk.trustpilot.com/review/cyber-trust.co.uk",
      "services": "Cyber Security Services, Risk Assessment, Incident Response"
    },
    {
      "name": "GoGoDigital",
      "logo": "/gogo.avif",
      "website": "https://www.gogodigital.co.uk",
      "trustpilotLink": "https://uk.trustpilot.com/review/gogodigital.co.uk",
      "services": "IT Security, Computer Security Service, Software Vendor"
    },
    {
      "name": "Armourdog",
      "logo": "/armour.png",
      "website": "https://www.armourdog.com",
      "trustpilotLink": "https://uk.trustpilot.com/review/www.armourdog.com",
      "services": "Device Protection, Computer Security Service, Hardware Security"
    },
    {
      "name": "Concept Management",
      "logo": "/concept.avif",
      "website": "https://www.conceptmanagement.co.uk",
      "trustpilotLink": "https://uk.trustpilot.com/review/conceptmanagement.co.uk",
      "services": "Data Destruction, IT Security, Asset Disposal, Computer Security Service"
    }
,    
    {
      "name": "Inflection Point",
      "logo": "/inflection.png",
      "website": "https://www.inflectionpoint.uk",
      "trustpilotLink": "https://uk.trustpilot.com/review/inflectionpoint.uk",
      "services": "IT Security, Managed Security Services, Vulnerability Scanning"
    }
    
];

function CompanySuggestion() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div>
      <div >
        <h1 className="securitySecHeading text-white">
          <span className="text-[#B1FF8F]">Partnering For</span> Protection:
        </h1>
        <h1 className="mt-2 md:mt-10 text-white securitySecHeading">
          Elevate Your Security with Industry Leaders
        </h1>
      </div>
      <div ref={containerRef} className={`company-container ${isVisible ? 'visible' : ''}`}>
        {/* Column Headings */}
        <div className="column-headings">
          <h3 className="company-heading">Company</h3>
          <h3 className="reviews-heading">Reviews</h3>
          <h3 className="services-heading">Services</h3>
        </div>

        {companies.map((company, index) => (
          <div className="company-row" key={index}>
            {/* First Column: Company Name and Logo */}
            <div className="company-info">
            <a href={company.website} target="_blank" rel="noopener noreferrer" ><img src={company.logo} alt={company.name} className="company-logo" /></a>
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="company-link">
                {company.name}
              </a>
            </div>

            {/* Second Column: Trustpilot Button */}
            <a href={company.trustpilotLink} target="_blank" rel="noopener noreferrer" className="trustpilot-button">
              View on Trustpilot
            </a>

            {/* Third Column: Services Description */}
            <div className="services-description">
              <p>{company.services}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default CompanySuggestion;