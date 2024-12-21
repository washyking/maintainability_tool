import { Link } from 'preact-router/match';
import './styles/Redirect.css'; 

const Redirect = () => {
  return (
    <div className="redirect-container">
      <h2>Choose a Tool to Analyse Your Code</h2>
      <div className="redirect-buttons">
        <Link href="/lighthouse" className="redirect-button">Lighthouse</Link>
        <Link href="/eslint" className="redirect-button">ESLint</Link>
        <Link href="/sonarqube" className="redirect-button">SonarQube</Link>

      </div>
    </div>
  );
};

export default Redirect; 