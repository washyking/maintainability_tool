import React, { useState } from 'react';
import FileSelector from '../components/FileSelector';
import FileMetrics from '../components/FileMetrics';
import Header from '../components/Title';

const InDepthAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div>
      <Header />
      <FileSelector onSelect={setSelectedFile} />
      {selectedFile && <FileMetrics selectedFile={selectedFile} />}
    </div>
  );
};

export default InDepthAnalysis;
