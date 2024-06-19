
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import SingleCompany from './components/singleCompany';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singlecompany/:id" element={<SingleCompany />} />
      </Routes>
    </Router>
  );
};

export default App;
