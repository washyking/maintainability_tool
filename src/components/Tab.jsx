import React from 'react';

const Tab = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: activeTab === tab ? '#4BC0C0' : '#fff',
            color: activeTab === tab ? '#fff' : '#000',
            cursor: 'pointer',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tab; 