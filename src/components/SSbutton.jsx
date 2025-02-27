import React, { useState } from 'react';

const SSbutton = ({ scores, totalPercentage }) => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (!email) {
      alert('Please enter a valid email address.'); // Show alert for invalid email
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/send-score-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          scores,
          totalPercentage,
        }),
      });

      if (response.ok) {
        alert('Your score report has been sent successfully to your email!'); // Show success alert
        setEmail('');
        setShowModal(false);
      } else {
        alert('Failed to send email. Please try again.'); // Show error alert
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Something went wrong. Please try again.'); // Show error alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          marginTop: '20px',
          padding: '12px 38px',
          backgroundColor: '#B1FF8F',
          border: 'none',
          borderRadius: '25px',
          fontSize: '16px',
          color: '#384740',
          transition: 'background-color 0.3s ease',
          marginBottom: '20px',
        }}
      >
        Send Email to Yourself
      </button>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              width: '300px',
              textAlign: 'center',
            }}
          >
            <h3>Enter Your Email</h3>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={handleSendEmail}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#B1FF8F',
                border: 'none',
                borderRadius: '25px',
                fontSize: '16px',
                color: '#384740',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                backgroundColor: '#ccc',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SSbutton;