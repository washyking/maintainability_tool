import { Link } from 'preact-router'; // Import Link
import './styles/Navbar.css'; // Optional: Import a CSS file for styling

const Navbar = ({ currentPath }) => { // Accept currentPath as a prop
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className={currentPath === '/' ? 'active' : ''}>
          <Link href="/">Home</Link>
        </li>
        <li className={currentPath === '/lighthouse' ? 'active' : ''}>
          <Link href="/lighthouse">Lighthouse(remove)</Link>
        </li>
        <li className={currentPath === '/eslint' ? 'active' : ''}>
          <Link href="/eslint">ESLint</Link>
        </li>
        <li className={currentPath === '/metrics_timeline' ? 'active' : ''}>
          <Link href="/metrics_timeline">Metrics Timeline</Link>
        </li>
        <li className={currentPath === '/file_analysis' ? 'active' : ''}>
          <Link href="/file_analysis">File Analysis</Link>
        </li>
        <li className={currentPath === '/sonarqube' ? 'active' : ''}>
          <Link href="/sonarqube">SonarQube(remove)</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 