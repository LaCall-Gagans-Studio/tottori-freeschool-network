import React, { useState, useEffect } from 'react';

interface ImageSliderProps {
    images: string[];
    }

    const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // 自動で画像を切り替えるためのuseEffect
    useEffect(() => {
        const interval = setInterval(() => {
        slideToNext();
        }, 5000); // 5秒ごとに切り替わる

        return () => clearInterval(interval); // クリーンアップ
    }, [currentIndex]);

    // スライドを次の画像へ
    const slideToNext = () => {
        setIsAnimating(true);
        setTimeout(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
        }, 500); // アニメーションの時間
    };

    // ポツ点をクリックしたときに画像を切り替える
    const goToSlide = (index: number) => {
        setIsAnimating(true);
        setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
        }, 500); // アニメーションの時間
    };

    return (
        <div className="w-full flex flex-col items-center relative">
            {/* 画像のスライダー部分 */}
            <div className="relative overflow-hidden">
                <div
                className={`flex transition-transform duration-500 ease-in-out ${
                    isAnimating ? 'transform translate-x-0' : ''
                }`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                {images.map((img, index) => (
                    <img
                    key={index}
                    src={img}
                    alt={`Slide ${index}`}
                    className="bg-[#333200] px-1 py-1 rounded text-slate-50 w-full"
                    />
                ))}
                </div>
            </div>

            {/* ポツ点部分 */}
            <div className="flex mt-2 space-x-2 absolute bottom-2">
                {images.map((_, index) => (
                <button
                    key={index}
                    className={`h-3 w-3 rounded-full ${
                    currentIndex === index ? 'bg-ws-primary' : 'bg-gray-400'
                    }`}
                    onClick={() => goToSlide(index)}
                />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
