import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Photo2 from '../components/Photo2.js';
import LoginForm from "../components/LoginForm";
import SigninForm from "../components/SigninForm.js";

function Page1() {
  return (
    <div className='a'>
      <h1 className="App">Photos</h1>
      <Photo2 />
    </div>
  );
}

function Page2() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Connexion réussie, naviguer vers la page 1
    navigate('/page1');
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}

function Page3() {
  return <SigninForm/>;
}

function Menu() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="dropdown">
          <button className="mainmenubtn">Main Menu</button>
          <div className="dropdown-child">
           
            <Link to="/page2">Sub-Menu 2</Link>
            <Link to="/page3">Sub-Menu 3</Link>
          </div>
        </div>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
