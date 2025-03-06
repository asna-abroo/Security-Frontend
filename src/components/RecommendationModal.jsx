import React from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../css/RecommendationModal.css";

const RecommendationModal = ({ scores, totalPercentage, onClose }) => {
  const [recommendations, setRecommendations] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const getRecommendations = async () => {
      try {
        const genAI = new GoogleGenerativeAI('AIzaSyCsYTshfBT_4Mj0FzxMyerlsm74qMiQ1E4');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `As a security assessment expert, analyze these security scores and provide recommendations:

        Overall Security Score: ${totalPercentage}%

        Individual Domain Scores (out of 800):
        ${Object.entries(scores).map(([domain, score]) => `${domain}: ${score}`).join('\n')}

        Please provide:
        1. A brief analysis of the current security posture
        2. Top 3 specific recommendations to improve security
        3. 2-3 reliable online resources (with URLs) for further learning
        
        Format the response in clear sections.`;

        const result = await model.generateContent(prompt);
        setRecommendations(result.response.text());
        setLoading(false);
      } catch (error) {
        console.error('Error getting recommendations:', error);
        setError('Failed to generate recommendations. Please try again.');
        setLoading(false);
      }
    };

    getRecommendations();
  }, [scores, totalPercentage]);

  return (
    <div className="modal-overlay">
      <div className="modal-content recommendation-modal">
        <button className="AIclose-button" onClick={onClose}>X</button>
        <h2>AI Security Recommendations</h2>
        
        {loading && <div className="AIloading">Generating expert recommendations...</div>}
        {error && <div className="AIerror">{error}</div>}
        
        {recommendations && (
          <div className="recommendations-content">
            <div className="recommendation-section">
              <h3>Analysis</h3>
              <p>{recommendations.split('\n')[0].trim()}</p>
            </div>
            <div className="recommendation-section">
              <h3>Top Recommendations</h3>
              <ul>
                {recommendations.split('\n').slice(1, 4).map((rec, index) => (
                  <li key={index}>{rec.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="recommendation-section">
              <h3>Resources</h3>
              <ul>
                {recommendations.split('\n').slice(4).map((resource, index) => (
                  <li key={index}>{resource.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationModal;