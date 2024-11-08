'use client';
// app.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';

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
                <div className='inset-0 bg-ws-gray w-screen h-screen flex flex-col items-center justify-center gap-6 mx-auto'>
                    <img src='/common/logo.webp' className='w-96 h-auto' />
                    <p className='text-black'>読み込み中...</p>
                </div>
            )}
        </>
    );
};

export default App;
