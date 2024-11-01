'use client';

//library
import React, { useState, useEffect } from 'react';
import { CiMinimize1 } from "react-icons/ci";

//components
import { StaffBox } from '../components/contentTemps';

interface OrgPopupProps {
    onClose: () => void;
}

const OrgPopup: React.FC<OrgPopupProps> = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    // ポップアップが表示される時にアニメーションを開始
    useEffect(() => {
        // 表示を待ってからアニメーションをトリガー
        setTimeout(() => {
            setIsVisible(true);
        }, 50);  // 少し遅延を入れることでアニメーションがスムーズに表示される
    });

    const handleClose = () => {
        setIsVisible(false); // アニメーションをトリガー
        setTimeout(() => {
            onClose(); // アニメーション終了後にコンテンツを閉じる
        }, 100);  // アニメーション時間を待ってからポップアップを閉じる
    };

    if (!onClose) return null;  //selectedEventがない場合は何も表示しない

    return (
        <>
            <div className={`fixed h-[calc(100svh*11/12)] lg:h-full w-full lg:w-[calc(100vw*5/6)] overflow-y-scroll border-2 top-0 flex items-center right-0 justify-center z-50`}>
                <div
                    className={`absolute bg-white p-6 text-black h-screen w-full overflow-scroll transition-transform duration-300 ease-in-out ${
                        isVisible ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                        <div className={`relative w-full lg:w-5/6 mx-auto justify-center content-center mt-24 flex flex-col items-center`}>
                            <div className='flex flex-col items-center'>
                                <img src='./common/logo.png' className='w-auto h-24 lg:h-36'/>
                                <p className='w-full lg:w-5/6 mt-14'>
                                    『とっとりフリースクールネットワーク』は、鳥取県にある<b>すべてのフリースクールの情報を掲載すること</b>を目指して活動しているプロジェクトです。<br />
                                    元教諭の３児の母と、不登校支援に携わる大学生が主に運営しています。<br />
                                    フリースクールの情報をまとめた後は、子ども食堂や養護学校、学童など、<br />
                                    行政と民間が交わる部分である<b>『やわらかいインフラ』</b>の全てを集めることを目標に活動していく予定です。<br />
                                </p>
                            </div>

                            <h3 className=' mt-16'>▼下のような人たちが主に運営しています▼</h3>
                            <div className='mt-2 flex flex-col lg:flex-row w-full gap-6 lg:gap-0'>
                                <StaffBox img='otani' name='三児の母 / 大谷 可奈子' 
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
            <button
                className={`bg-ws-black text-white py-2 px-4 rounded fixed top-3 right-3 z-50 flex gap-1 h-10 items-center group ${isVisible ? "block" : "hidden"}`}
                onClick={handleClose}
            >
                <CiMinimize1 className='h-5 w-auto group-hover:scale-95 duration-200 transition-all'/>閉じる
            </button>
        </>

)}

export default OrgPopup;
