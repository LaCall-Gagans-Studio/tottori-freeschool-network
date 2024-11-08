// body.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BodyProps {
    setCollectionName: (id: "events" | "afterday") => void;
    }

    const Body: React.FC<BodyProps> = ({ setCollectionName }) => {
    const navigate = useNavigate();

    // Button data array
    const buttonData = [
        { label: 'フリースクール', id: 'events', description:'', href:'common/freeschool.webp'},
        // { label: '児童発達支援・放デイ', id: 'afterday', description: '準備中です' }
    ];

    const handleClick = (id: "events" | "afterday") => {
        setCollectionName(id);
        navigate(`/network/${id}`); // 動的なパスに変更
    };

    return (
        <div className="h-[calc(100svh*11/12)] lg:h-full w-full mx-auto bg-white overflow-x-hidden text-black overflow-y-scroll">
            
            {/* hero */}
            <div className='w-full flex flex-col items-center mx-auto gap-6'>
                <img src='https://cdn.pixabay.com/photo/2023/07/05/20/12/ai-generated-8109142_1280.jpg' className='w-full h-64 object-cover'/>
                <div className='flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-16 mx-6'>
                    <img src='common/logo.webp' className='h-24 w-auto'/>
                    <p className='text-sm lg:text-base'>
                        『とっとりフリースクールネットワーク』は、<br />
                        鳥取県にある<b>すべてのフリースクールの情報を掲載すること</b>を目指して活動しているプロジェクトです。<br />
                        元教諭の３児の母と、<br className='lg:hidden'/>不登校支援に携わる大学生が主に運営しています。<br />
                        フリースクールの情報をまとめた後は、<br className='lg:hidden'/>子ども食堂や養護学校、学童など、<br />
                        行政と民間が交わる部分である<br className='lg:hidden'/><b>『やわらかいインフラ』</b><br className='lg:hidden'/>の全てを集めることを目標に活動していく予定です。<br />
                        （2024.11.02 始動）
                    </p>
                </div>
            </div>

            {/* news */}
            {/* <div className='w-5/6 mx-auto flex flex-col items-center mt-16'>
                <ul>
                    <li>情報を更新しました</li>
                    <li>情報を更新しました</li>
                    <li>情報を更新しました</li>
                    <li>情報を更新しました</li>
                    <li>情報を更新しました</li>
                </ul>
            </div> */}

            {/* body */}
            <div className='w-5/6 mx-auto flex flex-col items-center mt-16 mb-16'>
                <h1 className='text-2xl'>▼一覧を見る！▼</h1>
                <div className='grid grid-cols-1 gap-4 mt-4'>
                    {buttonData.map((button) => (
                        <button
                            key={button.id}
                            onClick={() => handleClick(button.id as "events" | "afterday")}
                            className='w-64 h-64 text-base rounded-full hover:bg-ws-gray flex flex-col border border-ws-primary hover:border-none items-center gap-0 hover:-translate-y-2 transition-all duration-200'
                        >
                            {button.href? ( <img src={button.href} className='w-48 h-auto object-cover'/>): (<></>)}
                            {button.label}
                            {button.description? ( <><br /><p className='text-xs'>{button.description}</p></>): (<></>)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Body;
