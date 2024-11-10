// library
import React from 'react';
import { useNavigate } from 'react-router-dom';

// icon
import { BsThreeDotsVertical } from "react-icons/bs";

const Body: React.FC = () => {
    const navigate = useNavigate();

    // Button data array
    const buttonData = [
        { label: 'フリースクール', link: '/network/events', description:'民間の教育機関', href:'common/freeschool.webp'},
        // { label: '児童発達支援・放デイ', id: 'afterday', description: '準備中です' }
    ];

    // Button data array
    const newsData = [
        { id: 'フリースクール', link: '/network/events/e65LoeGXIcM9boVsNpzk', title:'『認定フリースクール森の子がっこう いっぽ』をまとめました', date:'2024.11.01'},
        { id: 'フリースクール', link: '/network/events/CnPEGumIRS2KRjXdhd6B', title:'『牧場フリースクールまなび～馬』をまとめました', date:'2024.10.29'},
        { id: 'フリースクール', link: '/network/events/FWd8QAUudHaVxeyI0tzh', title:'『ちゃれすくーる』をまとめました', date:'2024.10.28'},
        { id: 'フリースクール', link: '/network/events/Wx191BS8F6eGEt4tx7us', title:'『認定フリースクールほとり』をまとめました', date:'2024.11.26'},
        { id: 'フリースクール', link: '/network/events/Y7w0tn0D6D8WlwGRv7PG', title:'『新田サドベリースクール』をまとめました', date:'2024.10.18'},
    ];

    // Smooth scroll function
    const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetSection = document.getElementById('concept');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="h-[calc(100svh*11/12)] lg:h-full w-full mx-auto bg-white overflow-x-hidden text-black overflow-y-scroll cursor-default" >
            
            {/* hero */}
            <section className="relative h-[calc(100svh*11/12)] lg:h-full flex items-center justify-center bg-cover bg-center bg-hero-pattern">
                {/* Overlay */}
                <img src='https://cdn.pixabay.com/photo/2023/07/05/20/12/ai-generated-8109142_1280.jpg' alt='再読み込みしてください'  className="absolute inset-0 bg-black h-full object-cover opacity-100"></img>

                {/* Content */}
                <div className="relative text-center px-6 mx-auto text-white flex flex-col justify-center items-center">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight text-ws-black text-nowrap">
                        不登校は、不幸じゃない
                    </h1>
                    <p className="text-base lg:text-xl mb-8 font-light bg-ws-primary px-2">
                        不登校や行きしぶりへの不安を<br className='lg:hidden'/>一緒に軽減していくサイトです
                    </p>
                    <a
                        href="#"
                        onClick={handleScrollClick}
                        className="mt-10 inline-block bg-primary bg-ws-primary bg-opacity-70 text-white text-lg px-3 py-2 rounded-full shadow-md hover:-translate-y-2 duration-150 transition ease-in-out"
                    >
                        サイトを見る
                    </a>
                    
                </div>
            </section>

            {/* about */}
            <div className='w-full flex flex-col items-center mx-auto gap-6 mt-12'>
                <div id='concept' className='flex flex-col lg:flex-col justify-center items-center gap-4 lg:gap-16 mx-6'>
                    <img src='common/logo.webp' alt='再読み込みしてください'  className='h-24 lg:h-36 w-auto'/>
                    <p className='text-sm lg:text-base text-center'>
                        『とっとりフリースクールネットワーク』は、<br />
                        鳥取県にある<b>すべてのフリースクールの情報を掲載すること</b>を目指して活動しているプロジェクトです。<br />
                        元教諭の３児の母と、<br className='lg:hidden'/>不登校支援に携わる大学生が主に運営しています。<br />
                        フリースクール情報の他にも、相談窓口、保護者コミュニティの場、他の専門機関の紹介ページなど、<br />
                        不登校や行きしぶりへの不安が軽減されていくコンテンツを随時追加していく予定です。<br />
                        （2024.11.02 始動）
                    </p>
                </div>
            </div>

            {/* news */}
            <div className='w-5/6 mx-auto flex flex-col items-center mt-16'>
                <h1 className='text-slate-500 my-4'>お知らせ・最新情報</h1>
                <ul className='flex flex-col justify-start gap-2 text-xs lg:text-sm'>
                    {newsData.map((news) => (
                        <li 
                            key={news.id}
                            className='cursor-pointer relative flex gap-8 rounded-sm px-2 py-1 hover:-translate-x-5 duration-500 border-l-2 border-ws-primary'
                            onClick={() => navigate(news.link)}
                        >
                            {news.date}
                            {news.title}
                            <div className='absolute top-1/2 -translate-y-1/2 right-0'></div>
                        </li>
                    ))}
                </ul>
                <BsThreeDotsVertical className='text-slate-500 my-5'/>
            </div>

            {/* body */}
            <div className='w-5/6 mx-auto flex flex-col items-center mt-16 mb-16'>
                <h1 className='text-2xl'>▼一覧を見る！▼</h1>
                <div className='grid grid-cols-1 gap-4 mt-4'>
                    {buttonData.map((button) => (
                        <button
                            key={button.link}
                            onClick={() => navigate(button.link)}
                            className='w-64 h-64 relative text-base z-10 rounded-full flex flex-col items-center justify-center gap-0 hover:-translate-y-2 transition-all duration-200 shadow-2xl hover:border-ws-primary hover:border hover:shadow-ws-primary hover:shadow-2xl group'
                        >
                            <img src={button.href} alt='再読み込みしてください'  className='absolute -z-10 w-full h-full inset-0 rounded-full overflow-hidden object-cover'/>
                            <div className='border-2 border-ws-gray group-hover:border-ws-primary px-6 py-2 bg-white group-hover:bg-ws-primary bg-opacity-50 group-hover:bg-opacity-100'>
                                <h2 className='text-xl'>{button.label}</h2>
                                <p className='text-xs'>{button.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Body;
