'use client';

import React from 'react';

// DeleteRichText
export const DeleteRichText: React.FC<{ text: string }> = ({ text }) => {

    // ###や\nを削除するための関数
    const cleanText = (input: string) => {
        // ###を削除
        let output = input.replace(/###/g, '');
        // 改行(\n)を削除
        output = output.replace(/\n/g, ' ');
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
            return { html: `<li class="list-decimal ml-6">${line}</li>`, preventBreak: true };
        }

        // 箇条書きリスト
        if (line.startsWith('- ')) {
            return { html: `<li class="list-disc ml-6">${line.substring(2)}</li>`, preventBreak: true };
        }

        // コールアウト
        if (line.startsWith('> ')) {
            return { html: `<blockquote class="border-l-4 border-ws-primary pl-4 italic text-gray-700">${line.substring(2)}</blockquote>`, preventBreak: true };
        }

        // コメント
        if (line.startsWith('<c/>')) {
            return { html: `<blockquote class="border-l-4 border-ws-primary pl-4 italic text-gray-700">${line.substring(2)}</blockquote>`, preventBreak: true };
        }

        // それ以外のテキスト（通常のテキスト処理）
        let newLine = line.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        newLine = newLine.replace(/_(.*?)_/g, '<em>$1</em>');
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


//TargetValueFormat
export const TargetValueFormat: React.FC<{ target: string[] }> = ({ target }) => {
    const formatTarget = () => {
        const elementary = target.filter(t => t.startsWith('E')).map(t => parseInt(t[1]));
        const middle = target.filter(t => t.startsWith('S')).map(t => parseInt(t[1]));
        const high = target.filter(t => t.startsWith('H')).map(t => parseInt(t[1]));

        const formatRange = (arr: number[], prefix: string, gradePrefix: string, maxYear: number) => {
            if (arr.length === 0) return "";
            const min = Math.min(...arr);
            const max = Math.max(...arr);
            if (min === 1 && max === maxYear) {
                return `${prefix}`; // All years present, no parentheses
            } else if (min === 1) {
                return `${prefix}（～${gradePrefix}${max}）`;
            } else if (max === maxYear) {
                return `${prefix}（${gradePrefix}${min}~）`;
            } else {
                return `${prefix}（${gradePrefix}${min}~${gradePrefix}${max}）`;
            }
        };

        const elementaryText = elementary.length > 0 ? formatRange(elementary, "小学生", "小", 6) : "";
        const middleText = middle.length > 0 ? formatRange(middle, "中学生", "中", 3) : "";
        const highText = high.length > 0 ? formatRange(high, "高校生", "高", 3) : "";

        // Combine the results and remove empty values
        const result = [elementaryText, middleText, highText].filter(text => text).join(" / ");

        return result || "対象なし"; // Return "対象なし" if no levels are present
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

//