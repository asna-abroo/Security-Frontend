import React, { useState } from "react";
import "../css/ContactForm.css";

const EmailReport = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get scores from localStorage
    const individualScores = JSON.parse(
      localStorage.getItem("securityScores_individual") || "{}"
    );
    const organizationScores = JSON.parse(
      localStorage.getItem("securityScores_organization") || "{}"
    );

    // Format the email message
    const formatScores = (scores) => {
      return Object.entries(scores)
        .map(([domain, score]) => `${domain}: ${score}`)
        .join("\n");
    };

    const messageContent = `
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
How they heard about us: ${formData.website}
Feedback: ${formData.message}

Individual Scores:
${formatScores(individualScores)}

Organization Scores:
${formatScores(organizationScores)}
    `;

    const emailParams = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      messageContent: messageContent,
    };

    try {
      const response = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailParams),
      });

      if (response.ok) {
        alert("Email sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          website: "",
          message: "",
        });
      } else {
        alert("Error sending email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#384740]">
      <div className="cmaindiv">
        <div className="clogo">
          <img src="/wdspng.png" alt="" />
        </div>
        <div className="Contactcontainer">
          <div className="text">Questions about your security?</div>
          <form onSubmit={handleSubmit}>
            {/* First and Last Name Fields */}
            <div className="form-row ">
              <div className="input-data">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <div className="underline"></div>
                <label>First Name</label>
              </div>
              <div className="input-data">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <div className="underline"></div>
                <label>Last Name</label>
              </div>
            </div>

            {/* Email and Website Name Fields */}
            <div className="form-row">
              <div className="input-data">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="underline"></div>
                <label>Email Address</label>
              </div>
              <div className="input-data">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                />
                <div className="underline"></div>
                <label>How did you hear about us?</label>
              </div>
            </div>

            {/* Message Text Area */}
            <div className="form-row">
              <div className="input-data textarea">
                <textarea
                  rows="8"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <div className="underline"></div>
                <label>Feedback</label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-row submit-btn">
              <div className="input-data , bnt">
                <div className="inner"></div>
                <input
                  type="submit"
                  value={loading ? "Sending..." : "Submit"}
                  disabled={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailReport;
