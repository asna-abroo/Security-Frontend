import React, { useEffect, useState } from "react";
import "../css/QuestionModal.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { color } from "framer-motion";

const QuestionModal = ({ domain, choice, onClose, onSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({}); // Track selected options
  const [isLoading, setIsLoading] = useState(false); // Naya state
  useEffect(() => {
    // Fetch questions from questions.json
    fetch("/questions.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load questions.json");
        return response.json();
      })
      .then((data) => {
        // Check if domain and choice exist in the data
        const selectedQuestions = data[choice]?.[domain] || [];
        setQuestions(selectedQuestions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setError("Could not load questions. Please try again.");
      });
  }, [domain, choice]);

  const handleOptionClick = (index, option) => {
    // Toggle the selected option for the question
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: option, // Store the selected option
    }));
  };

  const handleSubmit = async () => {
    const allQuestionsAnswered = questions.every((_, index) => selectedOptions[index]);

    if (!allQuestionsAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setIsLoading(true); // Loading start
    try {
      const promptData = questions.map((q, index) => ({
        question: q,
        answer: selectedOptions[index]
      }));

      const prompt = `You are a security assessment expert. Evaluate the following security assessment for ${domain}:
        ${promptData.map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n')}
        
        For each question, determine if the answer is correct based on security best practices.
        Each correct answer is worth 160 points. A correct answer means the response aligns with security best practices,
        regardless of whether it's "Yes" or "No".
        
        Please respond only with a number representing the total score out of 800.`;

      const genAI = new GoogleGenerativeAI('AIzaSyCsYTshfBT_4Mj0FzxMyerlsm74qMiQ1E4');
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);

      const responseText = result.response.text();
      const score = parseInt(responseText.match(/\d+/)[0], 10);

      if (isNaN(score) || score < 0 || score > 800) {
        throw new Error('Invalid score received from API');
      }

      const storageKey = `securityScores_${choice}`;
      const existingScores = JSON.parse(localStorage.getItem(storageKey) || '{}');
      existingScores[domain] = score;
      localStorage.setItem(storageKey, JSON.stringify(existingScores));
      onSubmit();
      onClose();
      window.dispatchEvent(new CustomEvent('securityScoreUpdate', { detail: { choice } }));
    } catch (error) {
      console.error('Error processing submission:', error);
      setError('Failed to process submission. Please try again.');
    }
    finally {
      setIsLoading(false); // Loading end
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-qs">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{domain} Questions ({choice})</h2>

        <ul>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <li key={index}>
                <p>{question}</p>
                <div className="options">
                  <button
                    className={`option-button ${selectedOptions[index] === 'Yes' ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(index, 'Yes')}
                  >
                    Yes
                  </button>
                  <button
                    className={`option-button ${selectedOptions[index] === 'No' ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(index, 'No')}
                  >
                    No
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No questions available for this category.</p>
          )}
        </ul>
        {error && <p style={{ width: '70%',
            backgroundColor: '#f8d7da',
            padding: '5px 10px',
            borderRadius: '5px',
            color: '#721c24',
            fontSize: '14px',
            textAlign: 'center',
            zIndex: '100',
            marginLeft: 'auto',
            marginRight: 'auto' }}>{error}</p>}
        <div className="submit-container">
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={isLoading} // Disable during loading
            style={{
              backgroundColor: isLoading ? 'white' : '', // White color on loading
              color: isLoading ? '#384740' : '', // Text color change
              boxShadow: isLoading ? '1px 1px 15px 6px #28a745' : ''
            }}
          >
            {isLoading ? 'Processing...' : 'Submit'} {/* Text change */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
