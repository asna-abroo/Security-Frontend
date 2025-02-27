import React from 'react';
import '../css/AboutPage.css'; // Import the CSS for the component

const AboutPage = () => {
    return (
        <div className="maindiv bg-[#384740]  flex items-center justify-center" >

       
        <div className="about-container text-center">
        <div className="about-image">
                <img src="/about.jpg" alt="NeuralAI logo" />
            </div>
            <div className="about-text">
                <h2>Who we are</h2>
                <p>
                At the forefront is security innovation, we are your partner in safeguarding and elevating your defences. We bridge the gap between your current security measures and industry-leading consultants, offering AI-driven insights that turn vulnerabilities into strengths. 


Our unique security assessment delivers a detailed score and dynamic visual report, evaluating your security across eight crucial domains with simple yes/no questions. Instantly see where you stand and where you can improve. 


Dive into our comprehensive resources to discover the importance of each security domain. Our website is your go-to hub for staying informed and proactive against high-risk threats. Elevate your security with us and <span className='font-bold font-italic'>Stay Informed, Stay Secure! </span>
                </p>

            </div>
           

        </div>




        </div>
    );
};

export default AboutPage;
