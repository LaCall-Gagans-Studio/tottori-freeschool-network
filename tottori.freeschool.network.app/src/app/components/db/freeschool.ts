// Freeschool
export interface Event {
    id: string;
    name: string;
    location: any;
    tag: string[];
    eyecatch_short: string;
    eyecatch_long: string;
    thumbnail: string;
    address: string;
    org: string;
    target: string[];
    cost: string;
    timetable: string;
    feature_star: string[];
    feature_long: string;
    point: string;
    quotation: string;
    capacity: number;
    transfer: string;
    dish: string;
    events: string;
    img: string[];
    url: string;
    contact: string;
    certificate: boolean;
    build_date: string;
}

//基本フィールドセット
export const basicFields: (keyof Event)[] = [
    "id",
    "name",
    "location",
    "tag",
    "eyecatch_short",
    "eyecatch_long",
    "target",
    "address",
    "img",
];

// 詳細フィールドセット
export const detailFields: (keyof Event)[] = [
    ...basicFields,  // 基本フィールドも含める
    "timetable",
    "quotation",
    "org",
    "target",
    "cost",
    "feature_star",
    "feature_long",
    "point",
    "capacity",
    "transfer",
    "dish",
    "events",
    "url",
    "contact",
    "certificate",
    "build_date"
];

// フィルター
export const filters = [
    "少人数(~10)", "大人数(11~)", "未就学児", "小学生", "中学生", "高校生", "18歳以上", "送迎あり", "給食あり", "合宿あり", "学習サポート", "受験対応", "東部", "中部", "西部", "認定あり"
]