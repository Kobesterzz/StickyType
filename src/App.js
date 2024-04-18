import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useParams } from 'react-router-dom';
import easyButtonOptions from './easyOptions';
import normalButtonOptions from './normalOptions';
import hardButtonOptions from './hardOptions';
import './App.css';

function Keyboard() {
  const [pressedKey, setPressedKey] = useState('');

  const handleKeyDown = (event) => {
    setPressedKey(event.key.toUpperCase());
  };

  const handleKeyUp = () => {
    setPressedKey('');
  };

  return (
    <div className="keyboard" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
      {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
        <div key={key} className={`key ${pressedKey === key ? 'active' : ''}`}>
          {key}
        </div>
      ))}
      {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
        <div key={key} className={`key ${pressedKey === key ? 'active' : ''}`}>
          {key}
        </div>
      ))}
      <div className={`key ${pressedKey === 'Z' ? 'active' : ''}`}>Z</div>
      <div className={`key ${pressedKey === 'X' ? 'active' : ''}`}>X</div>
      <div className={`key ${pressedKey === 'C' ? 'active' : ''}`}>C</div>
      <div className={`key ${pressedKey === 'V' ? 'active' : ''}`}>V</div>
      <div className={`key ${pressedKey === 'B' ? 'active' : ''}`}>B</div>
      <div className={`key ${pressedKey === 'N' ? 'active' : ''}`}>N</div>
      <div className={`key ${pressedKey === 'M' ? 'active' : ''}`}>M</div>
    </div>
  );
}


function DifficultyPage() {
  let { difficulty, option } = useParams();

  // Determine button options based on difficulty level
  let buttonOptions;
  switch (difficulty) {
    case 'easy':
      buttonOptions = easyButtonOptions;
      break;
    case 'normal':
      buttonOptions = normalButtonOptions;
      break;
    case 'hard':
      buttonOptions = hardButtonOptions;
      break;
    default:
      buttonOptions = {};
  }

  // Retrieve selected option based on parameter
  let buttonText = buttonOptions[option] || 'Invalid option';

  return (
    <div>
      <div className="box">
        <h2>{buttonText}</h2>
      </div>
      <Keyboard/>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Sticky Type</h1>
        <div>
          {/* Render buttons for each difficulty level */}
          <div className="buttons">
            <h3>Easy</h3>
            {Object.keys(easyButtonOptions).map((key) => (
              <Link key={key} to={`/difficulty/easy/${key}`} className="animated-button">
                <span className="text">{easyButtonOptions[key]}</span>
              </Link>
            ))}
            <h3>Normal</h3>
            {Object.keys(normalButtonOptions).map((key) => (
              <Link key={key} to={`/difficulty/normal/${key}`} className="animated-button">
                <span className="text">{normalButtonOptions[key]}</span>
              </Link>
            ))}
            <h3>Hard</h3>
            {Object.keys(hardButtonOptions).map((key) => (
              <Link key={key} to={`/difficulty/hard/${key}`} className="animated-button">
                <span className="text">{hardButtonOptions[key]}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Render DifficultyPage component */}
      <Routes>
        <Route path="/difficulty/:difficulty/:option" element={<DifficultyPage />} />
      </Routes>
    </Router>
  );
}

export default App;