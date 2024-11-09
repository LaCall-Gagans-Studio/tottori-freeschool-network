"use client";

import { useEffect } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - ページが見つかりません',
    };

    export default function NotFoundPage() {
    useEffect(() => {
        sessionStorage.setItem('path', location.pathname);
        location.replace('/');
    }, []); // useEffectによりクライアントサイドのみで実行

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - ページが見つかりません</h1>
            <p>トップページにリダイレクトします…</p>
        </div>
    );
}
