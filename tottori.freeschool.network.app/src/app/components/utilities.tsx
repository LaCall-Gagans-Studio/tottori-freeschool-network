'use client';

// library
import React, { ReactNode, useState } from 'react';

// -------------------------------

// DeleteRichText
export const DeleteRichText: React.FC<{ text: string }> = ({ text }) => {

    // ###や\nを削除するための関数
    const cleanText = (input: string) => {
        // ###を削除
        let output = input.replace(/###/g, '');
        // ##を削除
        output = output.replace(/##/g, '');
        // 改行(\n)を削除
        output = output.replace(/\\n/g, ' ');
        // '-' を削除
        output = output.replace(/-/g, '');
        // '~' を削除
        output = output.replace(/~/g, '');
        return output;
    };

    return <span>{cleanText(text)}</span>;
};


// CustomText
export const CustomText: React.FC<{ text: string }> = ({ text }) => {
    
    // 改行ごとにテキストを分割
    const processedText = text.split('\\n');

    // パターンを置換し、特定の要素では改行を追加しないようにするフラグ
    const replacePatterns = (line: string) => {
        // 見出し (例: ## 見出し2 -> h2, ### 見出し3 -> h3)
        if (line.startsWith('### ')) {
            return { html: `<h3 class="text-lg font-semibold mt-2 mb-2">${line.substring(4)}</h3>`, preventBreak: true };
        } else if (line.startsWith('## ')) {
            return { html: `<h2 class="text-xl font-bold mt-6 mb-2">${line.substring(3)}</h2>`, preventBreak: true };
        }

        // 番号付きリスト
        if (line.match(/^\d+\.\s/)) {
            return { html: `<li class="list-none ml-6">${line}</li>`, preventBreak: true };
        }

        // 箇条書きリスト
        if (line.startsWith('- ')) {
            return { html: `<li class="list-disc ml-6">${line.substring(2)}</li>`, preventBreak: true };
        }

        // リスト文章
        if (line.startsWith('~ ')) {
            return { html: `<li class="list-none ml-10">${line.substring(2)}</li>`, preventBreak: true };
        }

        // コールアウト
        if (line.startsWith('> ')) {
            return { html: `<blockquote class="border-l-4 border-ws-primary pl-4 italic text-gray-700">${line.substring(2)}</blockquote>`, preventBreak: true };
        }

        // コメント
        if (line.startsWith('<c/>')) {
            return { html: `<blockquote class="border-l-4 border-ws-primary pl-4 italic text-gray-700">${line.substring(2)}</blockquote>`, preventBreak: true };
        }

        // 通常テキスト処理：太字、斜体、リンクの追加
        let newLine = line.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        newLine = newLine.replace(/_(.*?)_/g, '<em>$1</em>');

        // カスタムリンク形式を検出して変換 [リンクテキスト](URL)
        newLine = newLine.replace(
            /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-ws-primary underline">$1</a>'
        );

        return { html: newLine, preventBreak: false };
    };

    return (
        <>
            {processedText.map((line, index) => {
                const { html, preventBreak } = replacePatterns(line);
                return (
                    <React.Fragment key={index}>
                        {/* 文字列をパターン置換してHTMLに変換 */}
                        <span dangerouslySetInnerHTML={{ __html: html }} />
                        {/* preventBreakがtrueでない場合のみ<br />を追加 */}
                        {!preventBreak && index < processedText.length - 1 && <br />}
                    </React.Fragment>
                );
            })}
        </>
    );
};



//TimestampFormat
export const TimestampFormat: React.FC<{ timestamp: any }> = ({ timestamp }) => {

    const date = new Date(timestamp.seconds * 1000); // Firestore TimestampをDateに変換
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return <span>{date.toLocaleDateString("ja-JP", options)}</span>;
};


// TargetValueFormat
export const TargetValueFormat: React.FC<{ target: string[] }> = ({ target }) => {
    const formatTarget = () => {
        const hasPreschool = target.includes('N');
        const hasAdult = target.includes('A');
        const elementary = target.filter(t => t.startsWith('E')).map(t => parseInt(t[1]));
        const middle = target.filter(t => t.startsWith('S')).map(t => parseInt(t[1]));
        const high = target.filter(t => t.startsWith('H')).map(t => parseInt(t[1]));

        const formatRange = (arr: number[], gradePrefix: string) => {
            if (arr.length === 0) return null;
            const min = Math.min(...arr);
            const max = Math.max(...arr);
            return { start: `${gradePrefix}${min}`, end: `${gradePrefix}${max}` };
        };

        const ranges = [];
        if (hasPreschool) ranges.push({ start: "未就学児", end: "未就学児" });
        const elementaryRange = formatRange(elementary, "小");
        const middleRange = formatRange(middle, "中");
        const highRange = formatRange(high, "高");
        if (elementaryRange) ranges.push(elementaryRange);
        if (middleRange) ranges.push(middleRange);
        if (highRange) ranges.push(highRange);
        if (hasAdult) ranges.push({ start: "18歳以上", end: "18歳以上" });

        // Ensure ranges are not empty before accessing start and end
        if (ranges.length > 0) {
            const overallStart = ranges[0]?.start;
            const overallEnd = ranges[ranges.length - 1]?.end;
            return `${overallStart} ~ ${overallEnd}`;
        }

        return "対象なし"; // Default if no levels are present
    };

    return <span>{formatTarget()}</span>;
};


//googleMapEmbed
export const GoogleMapEmbed: React.FC<{ 
    location: {
        latitude: number;
        longitude: number;
    }, width: string, height: string
    }> = ({ location, width, height }) => {

    const { latitude, longitude } = location;
    const mapSrc = `https://maps.google.co.jp/maps?&q=${latitude},${longitude}&output=embed&t=m&z=17`;

    return (
        <iframe
        width={width}
        height={height}
        src={mapSrc}
        allowFullScreen
        loading="lazy"
        title="Event Location"
        ></iframe>
    );
};


// StaffBox
export const StaffBox: React.FC<{ img: string, name: string, post: string, role: ReactNode, career: ReactNode, message: ReactNode }> = ({ img, name, post, role, career, message }) => {

    return (
        <>
            <div className='w-full flex flex-col items-center'>
                <img src={`/portfolio/${img}.webp`} className='w-11/12 h-96 object-cover object-center'/>
                <h2 className='font-bold mt-1'>{name}</h2>
                <div className='w-11/12'>
                    <h2 className='font-bold text-sm mt-4'>役職</h2>
                    <h6>{post}</h6>
            
                    <h2 className='font-bold text-sm mt-4'>担当</h2>
                    <h6>{role}</h6>  

                    <h2 className='font-bold text-sm mt-4'>メッセージ</h2>
                    <h6>{message}</h6>

                    <h2 className='font-bold text-sm mt-4'>経歴・生い立ち</h2>
                    <h6 className=''>{career}</h6>

                </div>
                
            </div>
        </>
    );
};


// menuLinkElements
import { Link } from "react-router-dom";
export const MenuLinkElements: React.FC<{
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, 
    url: string,
    body: string
}> = ({ icon: Icon, url, body }) => {
    return (
        <Link
            to={url}
            className="flex gap-3 items-center text-sm border border-b-ws-primary px-4 py-2 rounded hover:bg-ws-primary hover:text-white transition group duration-100"
        >
            {Icon && <Icon className="text-black group-hover:text-white" />}
            <h3 className="text-black group-hover:text-white">{body}</h3>
        </Link>
    );
};


//Accordion
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
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