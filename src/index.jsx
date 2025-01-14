import { render } from 'preact';
import { Router, Route} from 'preact-router';

import Home from './pages/Home';
import LighthousePage from './pages/LightHousePage';
import Navbar from './components/Navbar';
import ESLintPage from './pages/ESlintPage';
import SonarQubePage from './pages/SonarCubePage';
import ImprovementOverTime from './pages/ImprovementOverTime';

const App = () => (
  <Router>
    <Route path="/" component={() => <><Navbar currentPath="/" /><Home /></>} />
    <Route path="/lighthouse" component={() => <><Navbar currentPath="/lighthouse" /><LighthousePage /></>} />
    <Route path="/eslint" component={() => <><Navbar currentPath="/eslint" /><ESLintPage /></>} />
    <Route path="/sonarqube" component={() => <><Navbar currentPath="/sonarqube" /><SonarQubePage /></>} />
    <Route path="/metrics_timeline" component={() => <><Navbar currentPath="/metrics_timeline" /><ImprovementOverTime /></>} />
  </Router>
);

render(<App />, document.getElementById('app'));
