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
                <div className='inset-0 bg-ws-gray cursor-default w-screen h-screen flex flex-col items-center justify-center gap-6 mx-auto'>
                    <img src='/common/logo.webp' className='w-96 h-auto' />
                    <p className='text-black'>読み込み中...</p>
                    <h1 className='opacity-0'>鳥取県内のフリースクールを詳しくまとめ、一覧にしています</h1>
                </div>
            )}
        </>
    );
};

export default App;
