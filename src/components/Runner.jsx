import React, { useState } from 'react';

const Runner = () => {
  const [toolStatus, setToolStatus] = useState({});

  const tools = ['Lighthouse', 'ESLint', 'SonarCube'];

  const runTool = (tool) => {
    setToolStatus((prevStatus) => ({
      ...prevStatus,
      [tool]: true,
    }));
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Run Your Tools</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        {tools.map((tool) => (
          <button
            key={tool}
            onClick={() => runTool(tool)}
            style={{
              backgroundColor: toolStatus[tool] ? 'green' : 'white',
              color: toolStatus[tool] ? 'white' : 'black',
              padding: '10px 20px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              borderRadius: '5px',
              fontSize: '16px',
            }}
          >
            {tool}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Runner;
