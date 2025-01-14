import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const runSonarScanner = async (projectPath, serverUrl = 'http://localhost:9000') => {
  try {
    const scannerPath = 'sonar-scanner'; // Assume it's in PATH
    const scannerExists = () => {
      try {
        require('child_process').execSync(`${scannerPath} -v`, { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    };

    if (!scannerExists()) {
      console.error(
        'Sonar Scanner not found! Please install it from https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/'
      );
      process.exit(1);
    }

    // Prepare the sonar-project.properties file
    const propsContent = `
      sonar.projectKey=sample-project
      sonar.sources=${projectPath}
      sonar.host.url=${serverUrl}
      sonar.login=admin
      sonar.password=admin
    `;

    const propsPath = path.join(projectPath, 'sonar-project.properties');
    fs.writeFileSync(propsPath, propsContent);

    // Spawn the Sonar Scanner process
    const scanner = spawn(scannerPath, [], { cwd: projectPath });

    scanner.stdout.on('data', (data) => console.log(data.toString()));
    scanner.stderr.on('data', (data) => console.error(data.toString()));

    scanner.on('close', (code) => {
      if (code === 0) {
        console.log('SonarQube analysis completed successfully.');
      } else {
        console.error(`SonarQube analysis failed with exit code ${code}.`);
      }
    });
  } catch (error) {
    console.error('Error running Sonar Scanner:', error.message);
  }
};

// Run the script
const projectPath = process.argv[2];
const serverUrl = process.argv[3] || 'http://localhost:9000';

if (projectPath) {
  runSonarScanner(projectPath, serverUrl);
} else {
  console.error('Please provide the path to a project.');
}
