import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import '../css/LiveStats.css';

const LiveStats = () => {
  const [breachCount, setBreachCount] = useState(0);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    // Fetch data from Have I Been Pwned API for breaches
    const fetchBreaches = async () => {
      try {
        const response = await fetch('https://haveibeenpwned.com/api/v3/breaches');
        if (!response.ok) throw new Error('Network response was not ok');
        const breaches = await response.json();
        setBreachCount(breaches.length); // Count of breaches
      } catch (error) {
        console.error('Error fetching breaches:', error);
      }
    };

    // Fetch alert count from Shodan API
    const fetchAlerts = async () => {
      const apiKey = 'key=5IejjbpMfB2aq4Lvp2pkU6roYaHnM46c'; // Replace with your actual API key
      try {
        const response = await fetch(`https://api.shodan.io/shodan/alert?key=${apiKey}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAlertCount(data.total); // Assuming the response contains a total count
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchBreaches();
    fetchAlerts();
  }, []);

  return (
    <div className="stats-container bg-[#384740]">
      <div className="stat">
        <CountUp start={0} end={breachCount} duration={3} separator="," />
        <p>Data Breaches Reported</p>
      </div>
      <div className="stat">
        <CountUp start={0} end={26582} duration={3} separator="," />
        <p>Security Alerts</p>
      </div>
    </div>
  );
};

export default LiveStats;
