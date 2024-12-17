import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

// Registering Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Sample KPI data
const kpiData = {
  userEngagement: 75,
  tradeVolume: 1200,
  eventParticipation: 450,
  marketplaceTransactions: 300,
  resourceAccess: 800,
  sharingStatistics: 350,
  userRetention: 85,
};

function Dashboard() {
  const [selectedMetrics, setSelectedMetrics] = useState([
    'userEngagement',
    'tradeVolume',
    'eventParticipation',
    'marketplaceTransactions',
    'resourceAccess',
    'sharingStatistics',
    'userRetention',
  ]);

  // Handle metric toggle for showing/hiding metrics
  const handleMetricToggle = (metric) => {
    setSelectedMetrics((prevMetrics) => {
      if (prevMetrics.includes(metric)) {
        return prevMetrics.filter((item) => item !== metric);
      } else {
        return [...prevMetrics, metric];
      }
    });
  };

  // Function to generate Pie chart data
  const getPieChartData = (metric) => {
    const value = kpiData[metric];
    return {
      labels: ['Achieved', 'Remaining'],
      datasets: [
        {
          data: [value, 100 - value],
          backgroundColor: ['#34D399', '#D1D5DB'],
          borderWidth: 0,
        },
      ],
    };
  };

  return (
    <div className="p-6 space-y-6  bg-white dark:bg-black">
      <h1 className="text-5xl font-semibold text-center  text-indigo-600 mb-8 dark:text-white">Dashboard</h1>

      {/* Customization Panel */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-medium mb-4 text-grey-800">Customize Dashboard</h2>
        <div className="space-y-3">
          {Object.keys(kpiData).map((metric) => (
            <div key={metric} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedMetrics.includes(metric)}
                onChange={() => handleMetricToggle(metric)}
                className="w-5 h-5"
              />
              <label className="text-lg text-gray-700">
                {metric.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Display Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {selectedMetrics.map((metric, index) => (
          <motion.div
            key={metric}
            className={`p-6 rounded-lg shadow-md text-center text-white ${getCardColor(index)}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold">
              {metric.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </h3>
            <p className="text-3xl font-bold mt-2">{kpiData[metric]}</p>

            {/* Pie Chart */}
            <div className="mt-4">
              <Pie data={getPieChartData(metric)} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Helper function to determine the card color
const getCardColor = (index) => {
  const colors = [
    'bg-yellow-400',  // Yellow
    'bg-green-500',   // Green
    'bg-blue-500',    // Blue
    'bg-red-500',     // Red
    'bg-purple-500',  // Purple
    'bg-indigo-600',  // Indigo
    'bg-teal-400',    // Cyan
  ];
  return colors[index % colors.length];
};

export default Dashboard;
