import React, { useState } from 'react';

const ResiliencyHierarchyVisual = () => {
  // Define the matrix data structure
  const matrixData = {
    "Post Data Analysis": {
      "Timeliness": [
        {
          "metric": "Analysis Processing Time",
          "submetrics": [
            "VOTC: Target Average Track Duration"
          ]
        }
      ],
      "Reliability": [
        {
          "metric": "Data Integrity Rate",
          "submetrics": [
            "AFSIM: Effectiveness of Mitigation"
          ]
        }
      ]
    },
    "Threat": {
      "Detection": [
        {
          "metric": "Threat Detection Accuracy",
          "submetrics": [
            "AFSIM: FA Rate"
          ]
        }
      ],
      "Timeliness": [
        {
          "metric": "Threat Response Time",
          "submetrics": [
            "VOTC: Target Track Initialization Time"
          ]
        }
      ]
    },
    "C2": {
      "Timeliness": [
        {
          "metric": "Command Execution Time",
          "submetrics": [
            "AFSIM: Time of Launch Accuracy"
          ]
        }
      ],
      "Reliability": [
        {
          "metric": "Command Success Rate",
          "submetrics": [
            "VOTC: Target Tracked Indicator"
          ]
        }
      ]
    },
    "Comms": {
      "Timeliness": [
        {
          "metric": "Comms Latency",
          "submetrics": [
            "AFSIM: Data Volume"
          ]
        }
      ],
      "Reliability": [
        {
          "metric": "Packet Loss Rate",
          "submetrics": [
            "AFSIM: Denied Area"
          ]
        }
      ]
    },
    "Track Processing": {
      "Accuracy": [
        {
          "metric": "Average Positional Tracking Error",
          "submetrics": [
            "AFSIM: Track Accuracy",
            "VOTC: Target Associated Angular Error",
            "VOTC: Target Average Angular Error"
          ]
        }
      ],
      "Timeliness": [
        {
          "metric": "Track Update Latency",
          "submetrics": [
            "AFSIM: Track Latency"
          ]
        }
      ],
      "Precision": [
        {
          "metric": "Dilution of Precision",
          "submetrics": [
            "AFSIM: Azimuth/Elevation",
            "VOTC: Target Associated Angular Error",
            "VOTC: Target Average Angular Error"
          ]
        }
      ]
    },
    "Environment/Scenario": {
      "Warning": [
        {
          "metric": "Early Warning Accuracy",
          "submetrics": [
            "AFSIM: Probability of Warning"
          ]
        }
      ],
      "Variability": [
        {
          "metric": "Scenario Variability Index",
          "submetrics": [
            "AFSIM: Data Volume",
            "AFSIM: Counterspace Effect vs. Orbital Regime"
          ]
        }
      ],
      "Coverage": [
        {
          "metric": "Denied Area",
          "submetrics": [
            "AFSIM: Denied Area"
          ]
        },
        {
          "metric": "Folds of Coverage",
          "submetrics": [
            "AFSIM: # Satellites Tracking Target",
            "VOTC: Target Unique Tracks"
          ]
        }
      ]
    },
    "Sensor": {
      "Accuracy": [
        {
          "metric": "Launch Point Accuracy",
          "submetrics": [
            "AFSIM: Launch Point Accuracy",
            "RSAT: Launch Point Accuracy"
          ]
        },
        {
          "metric": "Time of Launch Accuracy",
          "submetrics": [
            "AFSIM: Time of Launch Accuracy"
          ]
        }
      ],
      "Detection": [
        {
          "metric": "Probability of Detection",
          "submetrics": [
            "VOTC: Target Association Indicator",
            "VOTC: Target Association Percentage",
            "VOTC: Target Track Indicator",
            "VOTC: Percentage Tracked"
          ]
        }
      ],
      "Warning": [
        {
          "metric": "Probability of Warning",
          "submetrics": [
            "AFSIM: Pw"
          ]
        }
      ],
      "Timeliness": [
        {
          "metric": "Time of First Detect",
          "submetrics": [
            "AFSIM: Time of First Detect",
            "VOTC: Target Track Initialization Time",
            "RSAT: Time of First Detection"
          ]
        }
      ],
      "Reliability": [
        {
          "metric": "False Alarm Rate",
          "submetrics": [
            "AFSIM: FA Rate"
          ]
        }
      ],
      "Quality": [
        {
          "metric": "Effective SNR",
          "submetrics": [
            "VOTC: Target Average Intensity"
          ]
        },
        {
          "metric": "Image Quality",
          "submetrics": [
            "AFSIM: Images",
            "VOTC: Target Average Intensity"
          ]
        },
        {
          "metric": "Total System MTF",
          "submetrics": [
            "RSAT: Scene Differential SNR/SCR"
          ]
        }
      ]
    }
  };

  // Function to get color for different output types
  const getOutputColor = (text) => {
    if (text.includes("AFSIM")) return "#4285F4"; // Blue
    if (text.includes("VOTC")) return "#AA46BC";  // Purple
    if (text.includes("RSAT")) return "#F5B041";  // Orange
    return "#000000";
  };

  // State for hover and active nodes
  const [activeKeyArea, setActiveKeyArea] = useState(null);
  const [activeMOP, setActiveMOP] = useState(null);
  const [activeMetric, setActiveMetric] = useState(null);

  // Get all MOPs for a particular Key Area
  const getMOPsForKeyArea = (keyArea) => {
    return Object.keys(matrixData[keyArea] || {});
  };

  // Get all metrics for a particular Key Area and MOP
  const getMetricsForMOP = (keyArea, mop) => {
    if (!matrixData[keyArea] || !matrixData[keyArea][mop]) return [];
    return matrixData[keyArea][mop];
  };

  // Get all submetrics for a particular metric
  const getSubmetricsForMetric = (keyArea, mop, metricIndex) => {
    if (!matrixData[keyArea] || !matrixData[keyArea][mop] || !matrixData[keyArea][mop][metricIndex]) {
      return [];
    }
    return matrixData[keyArea][mop][metricIndex].submetrics;
  };

  // Key area colors
  const keyAreaColors = {
    "Post Data Analysis": { bg: "#E3F2FD", border: "#2196F3", text: "#0D47A1" },
    "Threat": { bg: "#FFEBEE", border: "#F44336", text: "#B71C1C" },
    "C2": { bg: "#E8F5E9", border: "#4CAF50", text: "#1B5E20" },
    "Comms": { bg: "#FFF8E1", border: "#FFC107", text: "#FF6F00" },
    "Track Processing": { bg: "#F3E5F5", border: "#9C27B0", text: "#4A148C" },
    "Environment/Scenario": { bg: "#E0F7FA", border: "#00BCD4", text: "#006064" },
    "Sensor": { bg: "#FBE9E7", border: "#FF5722", text: "#BF360C" }
  };

  // MOP colors
  const mopColors = {
    "Accuracy": { bg: "#BBDEFB", border: "#1976D2", text: "#0D47A1" },
    "Detection": { bg: "#FFCDD2", border: "#E53935", text: "#B71C1C" },
    "Warning": { bg: "#C8E6C9", border: "#43A047", text: "#1B5E20" },
    "Timeliness": { bg: "#FFF9C4", border: "#FDD835", text: "#F57F17" },
    "Reliability": { bg: "#E1BEE7", border: "#8E24AA", text: "#4A148C" },
    "Quality": { bg: "#B2EBF2", border: "#26C6DA", text: "#006064" },
    "Precision": { bg: "#FFCCBC", border: "#FF7043", text: "#BF360C" },
    "Variability": { bg: "#D1C4E9", border: "#5E35B1", text: "#311B92" },
    "Coverage": { bg: "#F8BBD0", border: "#EC407A", text: "#880E4F" }
  };

  return (
    <div className="font-sans bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Resiliency Score Hierarchy</h1>
          <p className="text-gray-600">Interactive visualization of Key Areas, MOPs, Metrics, and Outputs</p>
        </div>
        
        {/* Legend */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-lg mr-2 bg-blue-500"></div>
            <span className="text-sm">Key Areas</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-lg mr-2 bg-purple-500"></div>
            <span className="text-sm">MOPs</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-lg mr-2 bg-green-500"></div>
            <span className="text-sm">Metrics</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2 bg-blue-400"></div>
            <span className="text-sm">AFSIM</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2 bg-purple-400"></div>
            <span className="text-sm">VOTC</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2 bg-orange-400"></div>
            <span className="text-sm">RSAT</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mb-8 bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Click on elements to expand/collapse the hierarchy</p>
        </div>

        {/* Main Sunburst-inspired Diagram */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Center Node - Resiliency Score */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-4 px-8 rounded-full shadow-lg text-xl font-bold">
              Resiliency Score
            </div>
          </div>
          
          {/* Key Areas Ring */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {Object.keys(matrixData).map((keyArea) => (
              <div 
                key={keyArea} 
                className={`relative p-3 rounded-lg shadow cursor-pointer transition-all hover:shadow-md ${
                  activeKeyArea === keyArea ? 'ring-4 ring-blue-300' : ''
                }`}
                style={{
                  backgroundColor: keyAreaColors[keyArea]?.bg || '#E3F2FD',
                  borderLeft: `5px solid ${keyAreaColors[keyArea]?.border || '#2196F3'}`,
                }}
                onClick={() => {
                  setActiveKeyArea(activeKeyArea === keyArea ? null : keyArea);
                  setActiveMOP(null);
                  setActiveMetric(null);
                }}
              >
                <div 
                  className="font-bold"
                  style={{ color: keyAreaColors[keyArea]?.text || '#0D47A1' }}
                >
                  {keyArea}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getMOPsForKeyArea(keyArea).length} MOPs
                </div>
              </div>
            ))}
          </div>
          
          {/* MOP Ring - Only visible if a Key Area is selected */}
          {activeKeyArea && (
            <div className="mt-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: keyAreaColors[activeKeyArea]?.text }}>
                  {activeKeyArea} - MOPs
                </h3>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {getMOPsForKeyArea(activeKeyArea).map((mop) => (
                  <div 
                    key={`${activeKeyArea}-${mop}`} 
                    className={`p-3 rounded-lg shadow cursor-pointer transition-all hover:shadow-md ${
                      activeMOP === mop ? 'ring-4 ring-purple-300' : ''
                    }`}
                    style={{
                      backgroundColor: mopColors[mop]?.bg || '#E1BEE7',
                      borderLeft: `5px solid ${mopColors[mop]?.border || '#8E24AA'}`,
                    }}
                    onClick={() => {
                      setActiveMOP(activeMOP === mop ? null : mop);
                      setActiveMetric(null);
                    }}
                  >
                    <div 
                      className="font-bold"
                      style={{ color: mopColors[mop]?.text || '#4A148C' }}
                    >
                      {mop}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getMetricsForMOP(activeKeyArea, mop).length} Metrics
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Metrics Ring - Only visible if a Key Area and MOP are selected */}
          {activeKeyArea && activeMOP && (
            <div className="mt-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: mopColors[activeMOP]?.text }}>
                  {activeMOP} - Metrics
                </h3>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {getMetricsForMOP(activeKeyArea, activeMOP).map((metric, idx) => (
                  <div 
                    key={`${activeKeyArea}-${activeMOP}-${idx}`} 
                    className={`p-3 rounded-lg shadow cursor-pointer transition-all hover:shadow-md ${
                      activeMetric === idx ? 'ring-4 ring-green-300' : ''
                    }`}
                    style={{
                      backgroundColor: '#E8F5E9',
                      borderLeft: '5px solid #43A047',
                    }}
                    onClick={() => setActiveMetric(activeMetric === idx ? null : idx)}
                  >
                    <div className="font-bold text-green-900">
                      {metric.metric}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {metric.submetrics.length} Outputs
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Submetrics/Outputs - Only visible if a Key Area, MOP, and Metric are selected */}
          {activeKeyArea && activeMOP && activeMetric !== null && (
            <div className="mt-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-green-900">
                  {getMetricsForMOP(activeKeyArea, activeMOP)[activeMetric]?.metric} - Outputs
                </h3>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {getSubmetricsForMetric(activeKeyArea, activeMOP, activeMetric).map((submetric, idx) => (
                  <div 
                    key={`${activeKeyArea}-${activeMOP}-${activeMetric}-${idx}`} 
                    className="py-2 px-4 rounded-full shadow-sm"
                    style={{ 
                      backgroundColor: `${getOutputColor(submetric)}20`,
                      color: getOutputColor(submetric),
                      border: `1px solid ${getOutputColor(submetric)}`
                    }}
                  >
                    {submetric}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Alternative View - Horizontal Diagram */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-center mb-6">Horizontal Hierarchy View</h2>
          
          <div className="overflow-auto" style={{ maxHeight: '500px' }}>
            <div className="flex">
              {/* Level 1: Key Areas */}
              <div className="min-w-max border-r border-gray-200 pr-4">
                <div className="text-sm font-bold text-gray-500 mb-3">Key Areas</div>
                {Object.keys(matrixData).map((keyArea, idx) => (
                  <div 
                    key={keyArea}
                    className={`p-2 my-2 rounded cursor-pointer transition-all ${
                      activeKeyArea === keyArea ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-blue-50'
                    }`}
                    onClick={() => {
                      setActiveKeyArea(activeKeyArea === keyArea ? null : keyArea);
                      setActiveMOP(null);
                      setActiveMetric(null);
                    }}
                  >
                    <div className="font-medium">{keyArea}</div>
                  </div>
                ))}
              </div>
              
              {/* Level 2: MOPs for selected Key Area */}
              {activeKeyArea && (
                <div className="min-w-max border-r border-gray-200 px-4">
                  <div className="text-sm font-bold text-gray-500 mb-3">MOPs</div>
                  {getMOPsForKeyArea(activeKeyArea).map((mop) => (
                    <div 
                      key={`h-${activeKeyArea}-${mop}`}
                      className={`p-2 my-2 rounded cursor-pointer transition-all ${
                        activeMOP === mop ? 'bg-purple-100 border-l-4 border-purple-500' : 'hover:bg-purple-50'
                      }`}
                      onClick={() => {
                        setActiveMOP(activeMOP === mop ? null : mop);
                        setActiveMetric(null);
                      }}
                    >
                      <div className="font-medium">{mop}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Level 3: Metrics for selected MOP */}
              {activeKeyArea && activeMOP && (
                <div className="min-w-max border-r border-gray-200 px-4">
                  <div className="text-sm font-bold text-gray-500 mb-3">Metrics</div>
                  {getMetricsForMOP(activeKeyArea, activeMOP).map((metric, idx) => (
                    <div 
                      key={`h-${activeKeyArea}-${activeMOP}-${idx}`}
                      className={`p-2 my-2 rounded cursor-pointer transition-all ${
                        activeMetric === idx ? 'bg-green-100 border-l-4 border-green-500' : 'hover:bg-green-50'
                      }`}
                      onClick={() => setActiveMetric(activeMetric === idx ? null : idx)}
                    >
                      <div className="font-medium">{metric.metric}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Level 4: Outputs for selected Metric */}
              {activeKeyArea && activeMOP && activeMetric !== null && (
                <div className="min-w-max px-4">
                  <div className="text-sm font-bold text-gray-500 mb-3">Outputs</div>
                  {getSubmetricsForMetric(activeKeyArea, activeMOP, activeMetric).map((submetric, idx) => (
                    <div 
                      key={`h-${activeKeyArea}-${activeMOP}-${activeMetric}-${idx}`}
                      className="p-2 my-2 rounded"
                      style={{ 
                        backgroundColor: `${getOutputColor(submetric)}10`,
                        color: getOutputColor(submetric),
                        border: `1px solid ${getOutputColor(submetric)}`
                      }}
                    >
                      {submetric}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          © 2025 MITRE CORPORATION. ALL RIGHTS RESERVED. FOR INTERNAL MITRE USE.
        </div>
      </div>
    </div>
  );
};

export default ResiliencyHierarchyVisual;
