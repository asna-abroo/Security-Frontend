import React from "react";
import "../css/CircleMenu.css";

const CircularMenu = ({ onSelectDomain, completedDomains }) => {
    // Define labels for each menu item
    const labels = [
        "Asset Security",
        "Security Architecture and Engineering",
        "Communication and Network Security",
        "Identity and Access Management (IAM)",
        "Security Assessment and Testing",
        "Security Operations",
        "Software Development Security",
        "Security and Risk Management"
    ];

    // Function to calculate position for each item
    const calculatePosition = (index, totalItems, radius) => {
        const angle = (index / totalItems) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return { left: `${50 + x}%`, top: `${50 + y}%` };
    };

    return (
        <div className="circular-menu">
        <video autoPlay muted loop>
            <source src="/df.mp4" type="video/mp4" />
        </video>

        {labels.map((label, index) => (
            <div
                key={index}
                className={`menu-item ${
                    completedDomains.includes(label) ? "completed-domain" : ""
                }`}
                style={calculatePosition(index, labels.length, 35)}
                onClick={() => onSelectDomain(label)}
            >
                {label}
            </div>
        ))}
    </div>
    );
};

export default CircularMenu;
