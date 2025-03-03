import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import OrganisationIndividualChoice from "./components/OrganisationIndividualChoice";
import Services from "./components/Services";
import AboutPage from "./components/AboutPage";
import ContactForm from "./components/ContactForm";
import QuestionPage from "./components/QuestionPage";
import LiveStats from "./components/LiveStats";
import SecuritySections from "./components/SecuritySections";
import './index.css';


function App() {
  const [choice, setChoice] = useState(() => {
    return localStorage.getItem("currentChoice") || "individual";
  });

  useEffect(() => {
    localStorage.setItem("currentChoice", choice);
  }, [choice]);

  const handleChoiceSelect = (newChoice) => {
    if (newChoice !== choice) {
      setChoice(newChoice);
    }
  };

  return (
    <Router>
      <AppContent
        choice={choice}
        handleChoiceSelect={handleChoiceSelect}
      />
    </Router>
  );
}

function AppContent({ choice, handleChoiceSelect }) {
  const location = useLocation();

  // Hide NavBar and shared sections for specific routes
  const hideSharedComponents = location.pathname === "/security-score";

  return (
    <div>
      {!hideSharedComponents && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {!hideSharedComponents && (
                <>
                  <div id="services">
                    <Services />
                  </div>
                  <div id="live-stats">
                    <LiveStats />
                  </div>
                  <div id="hero-section">
                    <HeroSection />
                  </div>
                  <div id="organisation-individual-choice">
                    <OrganisationIndividualChoice
                      onChoiceSelect={handleChoiceSelect}
                      initialChoice={choice}
                    />
                  </div>
                 
                  <div id="question-page">
                    <QuestionPage choice={choice} />
                  </div>
                  <div id="about-page">
                    <AboutPage />
                  </div>
                  <div id="contact-form">
                    <ContactForm />
                  </div>
                </>
              )}
             
            </>
          }
        />
        <Route
          path="/security-score"
          element={<SecuritySections result={choice} />}
        />
      </Routes>
    </div>
  );
}

export default App;
