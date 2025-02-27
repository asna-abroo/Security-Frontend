import React from 'react';
import '../css/Service.css'; // External CSS file

const Services = () => {
    return (
        <div className="bg-[#384740] min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="service-container">
                    <img src="/wds.png" alt="Service" className="service-image" />
                </div>

                <div className="container my-5">
                    <h2 className="main-title text-center mb-5">
                        Secure your future in <span className="text-success">4 Simple Steps</span>
                    </h2>

                    <div className="stepper d-flex justify-content-between align-items-center ">
                        {/* Step 1 */}
                        <div className="step text-center">
                            <div className="step-circle">1</div>
                            <h5>What User Type are you?</h5>
                            <p>Either select an Organisation or an Individual.</p>
                        </div>

                        {/* Arrow */}


                        {/* Step 2 */}
                        <div className="step text-center">
                            <div className="step-circle">2</div>
                            <h5>Dive into answering Security Questions</h5>
                            <p>Based on 8 domains to determine your security level.</p>
                        </div>

                        {/* Arrow 
                    <div className="step-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="36" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5.707 1.5a.5.5 0 0 0-.707.707L9.293 6.5H1.5a.5.5 0 0 0 0 1h7.793L5 11.793a.5.5 0 0 0 .707.707l5-5a.5.5 0 0 0 0-.707l-5-5z" />
                        </svg>
                    </div> */}

                        {/* Step 3 */}
                        <div className="step text-center">
                            <div className="step-circle">3</div>
                            <h5>Security Score Report</h5>
                            <p>Download your report and assess areas of risk.</p>
                        </div>

                        {/* Arrow 
                    <div className="step-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="36" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5.707 1.5a.5.5 0 0 0-.707.707L9.293 6.5H1.5a.5.5 0 0 0 0 1h7.793L5 11.793a.5.5 0 0 0 .707.707l5-5a.5.5 0 0 0 0-.707l-5-5z" />
                        </svg>
                    </div> */}

                        {/* Step 4 */}
                        <div className="step text-center">
                            <div className="step-circle">4</div>
                            <h5>Recommendations</h5>
                            <p>Get tailored recommendations to improve security.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Services;
