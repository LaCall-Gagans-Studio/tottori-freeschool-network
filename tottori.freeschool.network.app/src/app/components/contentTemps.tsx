'use client';

import React, { ReactNode, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// StaffBox
export const StaffBox: React.FC<{ img: string, name: string, career: ReactNode, message: ReactNode }> = ({ img, name, career, message }) => {

    return (
        <>
            <div className='w-full flex flex-col items-center'>
                <img src={`/portfolio/${img}.webp`} className='w-11/12 h-64 object-cover object-center'/>
                <h2 className='font-bold mt-1'>{name}</h2>
                <div className='w-11/12'>

                    <p className='font-bold text-sm mt-4'>メッセージ</p>
                    <h6>{message}</h6>

                    <p className='font-bold text-sm mt-4'>経歴・生い立ち</p>
                    <h6 className=''>{career}</h6>

                </div>
                
            </div>
        </>
    );
};


//Accordion
export const Accordion: React.FC<{ icon: React.ComponentType, title: string, text: ReactNode }> = ({ icon: Icon, title, text }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div className="flex text-ws-primary text-2xl items-center font-semibold gap-2" >
                {Icon && <Icon />} 
                <h2>{title}</h2>
                <div className='lg:hidden' onClick={toggleExpanded}>{isExpanded ? <FaChevronUp /> : <FaChevronDown />}</div>
                
            </div>
            <div className={`ml-3 mt-2 ${isExpanded ? 'block' : 'hidden'} lg:block`}>
                {text}
            </div>
        </div>
    );
};