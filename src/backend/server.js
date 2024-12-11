import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve Lighthouse reports
app.get('/lighthouse-results', (req, res) => {
  const resultsPath = path.resolve('./src/backend/results.json');
  if (fs.existsSync(resultsPath)) {
    const data = fs.readFileSync(resultsPath, 'utf-8');
    res.json(JSON.parse(data));
  } else {
    res.status(404).json({ error: 'Results not found' });
  }
});


// Serve API for metrics
app.get('/api/metrics', (req, res) => {
  try {
    const data = fs.readFileSync(path.resolve('src/backend/results.json'), 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch metrics.' });
  }
});

// Serve frontend

app.use('/lighthouse-reports', express.static(path.join(__dirname, '../../public/lighthouse-reports')));


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
