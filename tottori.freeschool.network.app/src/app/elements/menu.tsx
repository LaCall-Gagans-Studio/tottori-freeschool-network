import React from "react";

const Menu: React.FC<{ toggleView: () => void, isMapView: boolean, toggleTag: (tag: string) => void, selectedTags: string[] }> = ({ toggleView, isMapView, toggleTag, selectedTags }) => {
    const tags = ["少人数(~8)", "中人数(9~19)", "大人数(20~)", "未就学児", "小学生", "中学生", "高校生", "20際以上", "送迎あり", "給食あり", "学習サポート", "受験対応", "東部", "中部", "西部", "県認定",];  // 利用可能なタグ

    return (
        <div className="w-full h-screen mx-auto border bg-[#333200] px-2">
            <p>Dev now</p>
            <img src="./common/logo.png" className="max-w-full h-auto"/>
            <p className="my-2 text-lg text-[#bcc000]">鳥取県内のフリースクールを詳しくまとめています</p>
            <div className="my-3 text-sm text-[#bcc000]">
                <li className="">すべてのフリースクールの情報を掲載することを目指して活動しています</li>
                <li className="">元教員の３児の母と、不登校支援に携わる大学生が主に運営しています</li>
            </div>

            {/* 表示切り替え */}
            <div className="mt-4 pl-2">
                <h2 className="text-sm text-ws-gray font-light my-1">表示</h2>
                <button
                    onClick={toggleView}
                    className="text-white rounded flex"
                >
                    <div className={`${isMapView ? "bg-ws-primary" : "bg-ws-gray text-ws-black"} py-2 px-3 rounded-l`}>マップ</div>
                    <div className={`${isMapView ? "bg-ws-gray text-ws-black" : "bg-ws-primary"} py-2 px-3 rounded-r`}>リスト</div>
                </button>
            </div>

            {/* 絞り込み */}
            <div className="mt-4 pl-2 w-full">
                <h2 className="text-sm text-ws-gray font-light my-1">絞り込み</h2>
                {tags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-white text-sm p-2 rounded mr-1 mb-2 ${
                        selectedTags.includes(tag) ? "bg-ws-primary" : "bg-ws-gray text-ws-black"
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menu;
