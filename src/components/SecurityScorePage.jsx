import React, { useEffect, useState, useRef } from 'react';
import ApexCharts from 'apexcharts';
import '../css/SecurityScorePage.css';
import RecommendationModal from './RecommendationModal';
import SSbutton from './SSbutton';


const SecurityScorePage = ({ choice }) => {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [scores, setScores] = useState({});
  const [scorePercentage, setScorePercentage] = useState(0);

  useEffect(() => {
    const storageKey = `securityScores_${choice}`;
    const currentScores = JSON.parse(localStorage.getItem(storageKey) || '{}');
    setScores(currentScores);

    const maxScore = 800 * 8;
    const totalScore = Object.values(currentScores).reduce((sum, score) => sum + score, 0);
    const percentage = Math.round((totalScore / maxScore) * 100);
    setScorePercentage(percentage);
  }, [choice]);

  const areAllScoresFilled = () => {
    const requiredDomains = [
      'Security and Risk Management',
      'Asset Security',
      'Security Architecture and Engineering',
      'Communication and Network Security',
      'Identity and Access Management (IAM)',
      'Security Assessment and Testing',
      'Security Operations',
      'Software Development Security'
    ];

    return requiredDomains.every(domain => scores[domain] !== undefined);
  };

  useEffect(() => {
    const storageKey = `securityScores_${choice}`;
    const scores = JSON.parse(localStorage.getItem(storageKey) || '{}');

    const maxScore = 800 * 8;
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const scorePercentage = Math.round((totalScore / maxScore) * 100);




    // Determine color based on score percentage
    let scoreColor;
    let scoreText;
    if (scorePercentage < 45) {
      scoreColor = '#FF4D4D'; // Bright red for low score
      scoreText = 'Low';
    } else if (scorePercentage < 75) {
      scoreColor = '#FFD700'; // Yellow for medium score
      scoreText = 'Medium';
    } else {
      scoreColor = '#B1FF8F'; // Green for high score
      scoreText = 'High';
    }

    // Radial chart options
    const radialOptions = {
      series: [scorePercentage],
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: '97%',
            margin: 5,
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: scoreColor,
              opacity: 1,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: '16px',
              color: scoreColor,
              offsetY: 30,
              formatter: function () {
                return scoreText;
              }
            },
            value: {
              offsetY: -10,
              fontSize: '24px',
              color: scoreColor,
              formatter: function (val) {
                return val + "%";
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
          colorStops: [
            {
              offset: 0,
              color: scoreColor,
              opacity: 1
            },
            {
              offset: 100,
              color: scoreColor,
              opacity: 1
            }
          ]
        },
      },
      labels: ['Security Score'],
    };

    const radialChart = new ApexCharts(document.querySelector("#semiCircleChart"), radialOptions);
    radialChart.render();

    const barOptions = {
      series: [{
        data: [
          Math.round((scores['Security and Risk Management'] || 0) / 800 * 100),
          Math.round((scores['Asset Security'] || 0) / 800 * 100),
          Math.round((scores['Security Architecture and Engineering'] || 0) / 800 * 100),
          Math.round((scores['Communication and Network Security'] || 0) / 800 * 100),
          Math.round((scores['Identity and Access Management (IAM)'] || 0) / 800 * 100),
          Math.round((scores['Security Assessment and Testing'] || 0) / 800 * 100),
          Math.round((scores['Security Operations'] || 0) / 800 * 100),
          Math.round((scores['Software Development Security'] || 0) / 800 * 100)
        ]
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        },
        stacked: false
      },

      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          barHeight: '70%',
          // DataLabels ko bar ke andar customize karein
          dataLabels: {
            position: 'bottom', // 'top', 'center' ya 'bottom'
            hideOverflowingLabels: false // Sab labels dikhaye
          }
        }
      },
      colors: ['#B1FF8F'],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#384740'], // Text color (dark green)
          fontSize: '12px',
          fontWeight: 'bold'
        },
        formatter: function (val, { seriesIndex, dataPointIndex }) {
          // Categories array se name lekar return kare
          const categories = [
            'Security & Risk',
            'Asset Security',
            'Security Architecture',
            'Network Security',
            'IAM',
            'Security Testing',
            'Security Ops',
            'Software Security'
          ];
          return categories[dataPointIndex]; // Shortened names
        },
        offsetX: 80, // Right side shift
        background: {
          enabled: true,
          foreColor: '#B1FF8F', // Background color
          borderRadius: 4,
          padding: 4
        }
      }
      ,
      xaxis: {
        categories: [
          Math.round((scores['Security and Risk Management'] || 0) / 800 * 100),
          Math.round((scores['Asset Security'] || 0) / 800 * 100),
          Math.round((scores['Security Architecture and Engineering'] || 0) / 800 * 100),
          Math.round((scores['Communication and Network Security'] || 0) / 800 * 100),
          Math.round((scores['Identity and Access Management (IAM)'] || 0) / 800 * 100),
          Math.round((scores['Security Assessment and Testing'] || 0) / 800 * 100),
          Math.round((scores['Security Operations'] || 0) / 800 * 100),
          Math.round((scores['Software Development Security'] || 0) / 800 * 100)

        ],
        labels: {
          show: false, // Hide numbers
          style: {
           
            colors: '#ffffff'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val + "%"; // Convert to percentage format
          },
          style: {
            colors: '#ffffff'
          }
        }
      }

      ,
      responsive: [{
        breakpoint: 768, // Mobile screens (adjust as needed)
        options: {
          chart: {
            height: 400 // Better height for mobile
          },
          plotOptions: {
            bar: {
              barHeight: '50%' // Slimmer bars for small screens
            }

          },
          
            xaxis: {
              labels: {
                style: {

                  colors: '#ffffff',

                  fontSize: '10px' // Smaller text for x-axis
                }
              }
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return val + "%"; // Convert to percentage format
                },
                style: {
                  colors: '#ffffff',
                  fontSize: '10px' // Smaller text for y-axis
                },
                maxWidth: 120 // Prevent label truncation
              }
            }
          }
        },
        { breakpoint: 330,
          dataLabels: {

            style: {
              colors: ['#384740'], // Text color (dark green)
              fontSize: '8px',
              fontWeight: 'bold'
            }
            },
        }
       
      ]
    };
    const barChart = new ApexCharts(document.querySelector("#barChart"), barOptions);
    barChart.render();

    // Update charts when scores change
    const handleScoreUpdate = (event) => {
      if (event.detail?.choice === choice) {
        const newScores = JSON.parse(localStorage.getItem(storageKey) || '{}');
        const newTotalScore = Object.values(newScores).reduce((sum, score) => sum + score, 0);
        const newPercentage = Math.round((newTotalScore / maxScore) * 100);

        let newColor;
        let newText;
        if (newPercentage < 45) {
          newColor = '#FF4D4D';
          newText = 'Low';
        } else if (newPercentage < 75) {
          newColor = '#FFD700';
          newText = 'Medium';
        } else {
          newColor = '#B1FF8F';
          newText = 'High';
        }

        radialChart.updateOptions({
          fill: {
            type: 'gradient',
            gradient: {
              colorStops: [
                { offset: 0, color: newColor, opacity: 1 },
                { offset: 100, color: newColor, opacity: 1 }
              ]
            }
          },
          plotOptions: {
            radialBar: {
              track: {
                dropShadow: {
                  color: newColor
                }
              },
              dataLabels: {
                name: {
                  color: newColor,
                  formatter: function () {
                    return newText;
                  }
                },
                value: {
                  color: newColor
                }
              }
            }
          }
        });

        radialChart.updateSeries([newPercentage]);
        barChart.updateSeries([{
          data: [
            newScores['Security and Risk Management'] || 0,
            newScores['Asset Security'] || 0,
            newScores['Security Architecture and Engineering'] || 0,
            newScores['Communication and Network Security'] || 0,
            newScores['Identity and Access Management (IAM)'] || 0,
            newScores['Security Assessment and Testing'] || 0,
            newScores['Security Operations'] || 0,
            newScores['Software Development Security'] || 0
          ]
        }]);
      }
    };

    window.addEventListener('securityScoreUpdate', handleScoreUpdate);

    return () => {
      radialChart.destroy();
      barChart.destroy();
      window.removeEventListener('securityScoreUpdate', handleScoreUpdate);
    };
  }, [choice]);
  return (
    <div className="bg-[#384740] flex items-center justify-center">
      <div  className="dashboard-container text-center">
        <h2 className="title">Security Score Report</h2>
        <p className="subtitle">
          Uncover your hidden security risks and unlock a powerful, personalized security score!
        </p>

        <div className="charts-container">
          {/* Semicircle Chart */}
          <div className="semi-circle-chart" id="semiCircleChart">
            {/* Chart will be rendered here */}
          </div>

          {/* Bar Chart */}
          <div className="bar-chart" id="barChart">
            {/* Chart will be rendered here */}
          </div>
        </div>
        <button
          style={{
            marginTop: '20px',
            padding: '12px 30px',
            backgroundColor: areAllScoresFilled() ? '#B1FF8F' : '#cccccc',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            color: '#384740',
            cursor: areAllScoresFilled() ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.3s ease',
            marginBottom: '20px'
          }}
          onClick={() => setShowRecommendations(true)}
          disabled={!areAllScoresFilled()}
        >
          Get AI recommendation
        </button>

        {showRecommendations && (
          <RecommendationModal
            scores={scores}
            totalPercentage={scorePercentage}
            onClose={() => setShowRecommendations(false)}
          />
        )}


    <div>
      <SSbutton scores={scores} totalPercentage={scorePercentage} />
    </div>

        
      </div>
    </div>
  );
};

export default SecurityScorePage;
