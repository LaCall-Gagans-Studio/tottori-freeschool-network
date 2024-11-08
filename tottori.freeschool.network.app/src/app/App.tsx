// App.tsx
'use client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './page';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
