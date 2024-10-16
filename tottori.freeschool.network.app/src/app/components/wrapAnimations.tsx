import React from 'react';
import { useInView } from 'react-intersection-observer';

interface WrapAnimationsProps {
    children: React.ReactNode;
    additionalClass?: string;
    animationClass?: string; // アニメーションをカスタマイズ可能に
    threshold?: number;      // ビューポート内に入ったタイミングをカスタマイズ可能に
    triggerOnce?: boolean;   // 一度だけトリガーするかどうか
}

const WrapAnimations: React.FC<WrapAnimationsProps> = ({
    children,
    additionalClass = '',   // デフォルトの追加クラス
    animationClass = 'animate-fade-up', // デフォルトのアニメーションクラス
    threshold = 0.5,        // デフォルトの閾値
    triggerOnce = true      // デフォルトで一度だけトリガー
}) => {
    // useCallbackを使って効率化
    const { ref, inView } = useInView({
        triggerOnce,
        threshold,
    });

    // 結合されたクラス
    const combinedClass = `${inView ? animationClass : 'opacity-0'} ${additionalClass}`;

    return (
        <div ref={ref} className={combinedClass}>
            {children}
        </div>
    );
};

export default WrapAnimations;
