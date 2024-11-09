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
        <div className='inset-0 flex-col justify-center items-center bg-ws-gray text-black w-screen h-screen'>
            <p>対象ページにリダイレクトしています…</p>
        </div>
    );
}
