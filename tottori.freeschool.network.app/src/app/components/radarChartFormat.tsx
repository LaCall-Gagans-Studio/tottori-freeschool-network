'use client';

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
    data: string[];
}

const RadarChartFormat: React.FC<RadarChartProps> = ({ data }) => {
    // 文字列をパースしてオブジェクト配列に変換
    const parsedData = data.map(item => {
        const [name, score] = item.split('=');
        return {
            subject: name,
            score: parseInt(score, 10),
        };
    });

    return (
        <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius="70%" data={parsedData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#555' }} color='black' fontSize="bold"/>
            <PolarRadiusAxis angle={90} domain={[0, 5]} tickCount={5}/>
            <Radar name="Score" dataKey="score" stroke="#bcc000"  fill="#bcc000" fillOpacity={0.4} />
        </RadarChart>
        </ResponsiveContainer>
    );
};

export default RadarChartFormat;
