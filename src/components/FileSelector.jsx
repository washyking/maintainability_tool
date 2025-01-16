import React, { useEffect, useState } from 'react';

const FileSelector = ({ onSelect }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/files.json');
        const data = await response.json();
        setFiles(data.files || []);
      } catch (error) {
        console.error('Error fetching file list:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <label htmlFor="file-selector">Select File: </label>
      <select id="file-selector" onChange={(e) => onSelect(e.target.value)}>
        <option value="">--Select--</option>
        {files.map((file, index) => (
          <option key={index} value={file}>{file}</option>
        ))}
      </select>
    </div>
  );
};

export default FileSelector;
