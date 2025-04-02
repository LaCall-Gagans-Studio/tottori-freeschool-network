'use client';

import React, { useState } from 'react';


// TagSelector
export const TagSelector: React.FC<{ placeholder:string, selectedTags: string[], setSelectedTags: (tags: string[]) => void, tagsList:any }> = ({ placeholder, selectedTags, setSelectedTags, tagsList }) => {
    const [tagInput, setTagInput] = useState<string[]>(selectedTags);

    const handleTagSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTag = event.target.value;
        if (selectedTag && !tagInput.includes(selectedTag)) {
            const updatedTags = [...tagInput, selectedTag];
            setTagInput(updatedTags);
            setSelectedTags(updatedTags);
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        const updatedTags = tagInput.filter((tag) => tag !== tagToRemove);
        setTagInput(updatedTags);
        setSelectedTags(updatedTags);
    };

    return (
        <div>
            <div className="flex gap-2 flex-wrap">
                {/* タグ選択メニュー */}
                <select onChange={handleTagSelect} value="" className="px-2 py-1 border rounded bg-slate-50">
                    <option value="" disabled>{placeholder}</option>
                    {tagsList.map((tag:any) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>

                {/* 選択されたタグをブロックとして表示 */}
                {tagInput.map((tag, index) => (
                    <div key={index} className="relative inline-flex items-center bg-amber-600 opacity-70 px-3 py-1 text-sm rounded-sm text-white">
                        <span>{tag}</span>
                        <button
                            className="ml-2 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1"
                            onClick={() => handleTagRemove(tag)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// tagsData.ts
export const availableTags = [
    "少人数(~10)",
    "大人数(11~)",
    "未就学児",
    "小学生",
    "中学生",
    "高校生",
    "18歳以上",
    "送迎あり",
    "給食あり",
    "合宿あり",
    "学習サポート",
    "受験対応",
    "東部",
    "中部",
    "西部",
    "認定あり",
    // 必要なタグを追加
];

export const availableTargets = [
    "未就学児",
    "小学1年生",
    "小学2年生",
    "小学3年生",
    "小学4年生",
    "小学5年生",
    "小学6年生",
    "中学1年生",
    "中学2年生",
    "中学3年生",
    "高校1年生",
    "高校2年生",
    "高校3年生",
    "成年",
    // 必要な対象を追加
];
