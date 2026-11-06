import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './elements/navbar';
import Home from './home';
import Library from './library';
import Settings from "./settings";
import '../scss/base.css'

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':    return <Home />;
      case 'library': return <Library />;
      case 'settings': return <Settings />;
      default:        return <Home />;
    }
  };

  return (
      <div>
        <Navbar page={page} navigate={setPage} />
        <hr></hr>
        {renderPage()}
      </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);