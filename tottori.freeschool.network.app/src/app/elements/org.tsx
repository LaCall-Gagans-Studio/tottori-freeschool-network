'use client';

//library
import React, { useState, useEffect } from 'react';

//components
import { StaffBox } from '../components/utilities';

const Org: React.FC = ({ }) => {
    const [isVisible, setIsVisible] = useState(false);

    // ポップアップが表示される時にアニメーションを開始
    useEffect(() => {
        // 表示を待ってからアニメーションをトリガー
        setTimeout(() => {
            setIsVisible(true);
        }, 50);  // 少し遅延を入れることでアニメーションがスムーズに表示される
    });

    return (
        <>
            <div className={`fixed h-[calc(100svh*11/12)] bg-white lg:h-full w-full lg:w-[calc(100vw*5/6)] overflow-y-scroll border-2 top-0 flex items-center right-0 justify-center z-50 cursor-default`}>
                <div
                    className={`absolute p-6 text-black h-screen w-full transition-transform duration-300 ease-in-out ${
                        isVisible ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                        <div className={`relative w-full lg:w-5/6 mx-auto justify-center content-center mt-20 flex flex-col items-center`}>

                            {/* hero */}
                            <div className='flex flex-col items-center'>

                                <div className='flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-8'>
                                    <img src='/common/logo.webp' alt='ロゴ' className='w-auto h-24 lg:h-36'/>
                                    <a href='https://docs.google.com/forms/d/e/1FAIpQLSdLSt6eRfqxkhKIXissDbGS6GoreU-Fw-wGPY238exlaOG8Fw/viewform?usp=sf_link' className="h-20 lg:h-32 w-56 lg:w-auto flex flex-col items-center justify-center px-3 text-center hover:bg-ws-primary hover:text-slate-50 cursor-pointer rounded-md text-ws-primary border-ws-primary border-2 transition-all duration-100">
                                        <h6 className="text-sm lg:text-xl font-semibold">お問い合わせ</h6>     
                                        <p className="text-xs mt-2">お気軽にお聞きください</p>           
                                        <p className="text-xs">フォームにご入力ください</p>
                                    </a>    
                                </div>
                                
                                <p className='w-full mt-14 text-center lg:text-start text-sm lg:text-base'>
                                    『とっとりフリースクールネットワーク』は、<br />
                                    鳥取県にある<b>すべてのフリースクールの情報を掲載すること</b>を目指して活動しているプロジェクトです。<br />
                                    元教諭の３児の母と、<br className='lg:hidden'/>不登校支援に携わる大学生が主に運営しています。<br />
                                    フリースクールの情報をまとめた後は、<br className='lg:hidden'/>子ども食堂や養護学校、学童など、<br />
                                    行政と民間が交わる部分である<br className='lg:hidden'/><b>『やわらかいインフラ』</b><br className='lg:hidden'/>の全てを集めることを目標に活動していく予定です。<br />
                                    （2024.11.02 始動）
                                </p>
                            </div>

                            {/* sponsor */}
                            <h3 className='mt-16 text-sm lg:text-base'>▼スポンサー▼</h3>
                            <p>現在募集中です。</p>

                            {/*  */}

                            {/* staff */}
                            <h3 className='mt-8 text-sm lg:text-base'>▼下のような人たちが主に運営しています▼</h3>
                            <div className='mt-2 flex flex-col lg:flex-row w-full gap-6 lg:gap-0 text-sm lg:text-base'>
                                <StaffBox img='otani' name='三児の母 / 大谷 可奈子' 
                                    post={"共同代表"}
                                    role={
                                        <>
                                            サブスタンス
                                            <p className='text-xs text-slate-500'>情報収集、相談対応、記事執筆など</p>
                                        </>
                                    }
                                    career={
                                        <>
                                            ３児の母。元養護教諭。産後うつ経験。<br />
                                            我が子も不登校。子ども達の心に寄り添いたいと念願の養護教諭になったものの、業務に追われてゆっくりと子ども達の話を聞いてあげられないことにいつも葛藤する日々。<br />
                                            ８年取得した育休期間で、学校の外の世界に触れながら、様々な気付きを得る。<br />
                                            そして我が子の不登校を通して、自分自身の働き方ややりたいことを見つめ直すことができ、夢を叶えるために退職を決意。<br />
                                            「子ども達が生き生きと暮らせる社会をつくる」というゴール設定の下、今後思いをかたちにしていきたいと思っています。<br />
                                            その第一歩がこちらのサイトです。
                                        </>
                                    }
                                    message={
                                        <>
                                            今や珍しくない「不登校」。<br />
                                            だけどその現状を突きつけられた時、まずどんな感情が湧きますか？<br />
                                            多くの方は「不安」なのではないでしょうか。<br />
                                            そもそも「学校に行きたくない」と相談する相手が「学校」しかないって、保護者にとっては心の負担が大きいなと感じていました。<br />
                                            学校側も、学校外のフリースクールの情報についてなかなか知る機会がありません。<br />
                                            調べに調べぬいた方だけが、フリースクールなどの新しい選択肢に辿り着ける現状があるなと感じ、もっとサクッとお手軽に、こんな新しい世界があることを知ってほしいとずっと思っていました。<br />
                                            フリースクールって、とても経営が大変です。善意でしか成り立っていない、子どもファーストの世界です。<br />
                                            「不登校」で感じた「不安」を、「発見」「希望」「喜び」に変えていきたい。<br />
                                            どんな選択をしたって、どの子も保護者も堂々と生きる権利があります！<br />
                                            そのお手伝いが、このサイトでできれば幸いです。ママ友感覚で何でも相談してもらえる場を提供したい思いでおります。<br />
                                            お気軽にお問い合わせください！
                                        </>
                                    } />
                                <StaffBox img='akashi' name='大学生 / 明石 到真' 
                                    post={"共同代表"}
                                    role={
                                        <>
                                            ロジスティクス
                                            <p className='text-xs text-slate-500'>データ構造化、プロセス設計、渉外など</p>
                                        </>
                                    }
                                    career={
                                        <>
                                            鳥取県内の高校を卒業後、欧州に二年滞在。<br />
                                            現在はアメリカの大学をオンラインで受けながら、不登校支援とSNS制作を絡めた会社を経営している。<br />
                                            <br />
                                            2021 University of Pecs Architecture and Engineering Foundation Course 修了<br />
                                            2022 University of Tartu Bachlor of Science and Technology 入学<br />
                                            2022 University of People Bachelor of Computer Science 編入<br />
                                            2023 合同会社ラコールガガンズ 設立<br />
                                        </>
                                    }
                                    message={
                                        <>
                                            「鳥取の情報が全然まとまってないじゃない！」<br />
                                            という思いから始まったこのプロジェクト。<br />
                                            <br />
                                            まず見やすい情報が一か所にまとまっていて、それを見てあーだこーだ検討できる。<br />
                                            皆それぞれ抱える物に不安な夜があっても、丁寧に情報がまとめられているという事実が、冷静に置かれた状況を見つめ、結果、安心感に繋がっていくと考えています。<br />
                                            <br />
                                            そんな当たり前の環境を目指して、私たちは情報をまとめていきます！<br />
                                        </>
                                    } />
                            </div>
                        </div>
                </div>
            </div>
        </>

)}

export default Org;
