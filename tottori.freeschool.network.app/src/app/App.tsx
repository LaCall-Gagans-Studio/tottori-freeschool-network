// App.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page';

const App = () => {
    const [isClient, setIsClient] = useState(false);

    // クライアントサイドでのみ実行されるコンポーネント
    useEffect(() => {
        if (typeof document !== 'undefined') {
        setIsClient(true);
        }
    }, []);

    
    return (
        <>
            {isClient ? (
                <Router>
                    <Routes>
                        <Route path="/*" element={<Home />} />
                    </Routes>
                </Router>
            ) : (
                <div>Loading client data...</div>
            )}
        </>
    );
};

export default App;
