import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './elements/navbar';
import Home from './home';
import Library from './library';

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':    return <Home />;
      case 'library': return <Library />;
      default:        return <Home />;
    }
  };

  return (
      <div>
        <Navbar navigate={setPage} />
        {renderPage()}
      </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);