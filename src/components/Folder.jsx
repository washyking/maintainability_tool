import React, { useState } from 'react';
import axios from 'axios';

const Folder = () => {
  const [folderPath, setFolderPath] = useState('');
  const [status, setStatus] = useState('');

  const handleFolderChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Get the path of the selected folder
      const selectedFolder = files[0].webkitRelativePath.split('/')[0];
      setFolderPath(selectedFolder);
      setStatus('Running ESLint...');

      try {
        // Send the folder path to the backend to run ESLint
        const response = await axios.post('/run-eslint', { projectPath: selectedFolder });
        setStatus(response.data.message);
      } catch (error) {
        setStatus(`Error: ${error.response.data.error}`);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Select Your Preact Project Folder</h2>
      <input
        type="file"
        webkitdirectory="true"
        onChange={handleFolderChange}
        style={{ margin: '20px 0' }}
      />
      {status && <p>{status}</p>}
    </div>
  );
};

export default Folder;
