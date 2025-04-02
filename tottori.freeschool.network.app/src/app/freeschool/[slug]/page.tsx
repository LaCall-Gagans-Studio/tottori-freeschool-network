import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { DeleteRichText, TargetValueFormat, GoogleMapEmbed, Accordion, TimestampFormat, CustomText } from "@/app/components/utilities";
import ImageCarousel from "@/app/components/imageCarousel";
import RadarChartFormat from "@/app/components/radarChartFormat";
import {
  CiUser, CiLocationArrow1, CiForkAndKnife,
  CiClock1, CiCoins1, CiCalendarDate,
  CiSquareMore, CiFaceSmile, CiBookmarkCheck, CiStopwatch
} from "react-icons/ci";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";

// ISR (Incremental Static Regeneration)
export const revalidate = 3600;

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "posts", "entries");
  const files = await fs.readdir(postsDir);

  return files
    .filter((name) => name.endsWith(".md"))
    .map((name) => ({ slug: name.replace(/\.md$/, "") }));
}

export default async function FreeschoolPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "posts/entries", `${params.slug}.md`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data } = matter(raw);
    if (!data || data.category !== "freeschool") return notFound();

    const event = data;

    return (
      <div className="bg-white text-black p-6">
        <h1 className="text-3xl font-bold text-ws-primary">{event.name}</h1>
        <h2 className="text-lg">{event.org}</h2>
        <p className="text-sm text-slate-500">{event.address}</p>

        <div className="text-sm flex gap-1 lg:gap-2 py-2 flex-wrap">
          {(event.tag || []).map((tag: string) => (
            <div key={tag} className="bg-[#333200] px-1 py-1 rounded text-slate-50 cursor-pointer">{tag}</div>
          ))}
        </div>

        <div className="flex mt-6 flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-72 lg:h-96">
            <ImageCarousel images={event.img} />
          </div>
          <div className="w-full lg:w-3/5 p-1 ml-2">
            <h1 className="text-2xl mb-3">{event.eyecatch_short}</h1>
            <h3 className="text-base"><CustomText text={event.eyecatch_long} /></h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm lg:text-base mx-auto w-10/12 mt-12">
          <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
            <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
              <CiUser /><p className='text-sm lg:text-base'>対象</p>
            </div>
            <div className="text-base"><TargetValueFormat target={event.target} /></div>
          </div>
          <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
            <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
              <CiLocationArrow1 /><p className='text-sm lg:text-base'>送迎</p>
            </div>
            <div className="text-center"><CustomText text={event.transfer} /></div>
          </div>
          <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
            <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
              <CiForkAndKnife /><p className='text-sm lg:text-base'>給食</p>
            </div>
            <div className="text-center"><CustomText text={event.dish} /></div>
          </div>
        </div>

        <div className="bg-ws-gray w-full lg:w-10/12 mx-auto mt-12 relative p-6">
          <FaQuoteLeft className="absolute left-1" />
          <p className="text-base lg:text-lg"><CustomText text={event.quotation} /></p>
          <FaQuoteRight className="absolute right-1" />
          <a href={event.url} className="absolute right-0 -bottom-5 text-sm text-ws-primary">{event.org} HPから</a>
        </div>

        <div className="flex relative flex-col lg:flex-row">
          <div className="w-full lg:w-7/12 mt-24 ">
            <CustomText text={event.feature_long} />
          </div>
          <div className="w-11/12 lg:w-5/12 mx-auto lg:mx-0 flex flex-col justify-center items-center overflow-visible">
            <RadarChartFormat data={event.feature_star} />
            <div className='w-full lg:w-4/6 h-auto px-2 pb-3 lg:pb-1 bg-ws-gray rounded-md'>
              <img src='/portfolio/kanako_anime.png' alt='可奈子ポイント' className='h-24 w-auto' />
              <p className='text-sm'><CustomText text={event.point} /></p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-sm lg:text-base lg:mt-24 flex flex-col gap-8 lg:gap-10">
          <Accordion icon={CiClock1} title='時間割' text={<CustomText text={event.timetable} />} />
          <Accordion icon={CiCoins1} title='費用' text={<CustomText text={event.cost} />} />
          <Accordion icon={CiCalendarDate} title='行事など' text={<CustomText text={event.events} />} />
        </div>

        <div className="flex mt-8 lg:mt-12 text-ws-primary text-2xl items-center font-semibold gap-2">
          <CiSquareMore />
          <h2>その他</h2>
        </div>
        <div className="pl-4 flex mt-4 flex-col gap-3">
          <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
            <CiFaceSmile /><p>定員</p>
            <div className="text-black text-sm lg:text-base">{event.capacity === 0 ? "定員上限なし" : event.capacity}</div>
          </div>
          <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
            <CiBookmarkCheck /><p>認定の有無</p>
            <div className="text-black text-sm lg:text-base">{event.certificate ? "認定済み" : "まだ認定されていません"}</div>
          </div>
          <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
            <CiStopwatch /><p>設立年月日</p>
            <div className="text-black text-sm lg:text-base"><TimestampFormat timestamp={event.build_date} /></div>
          </div>
        </div>

        <div className='flex items-center justify-center my-11'>
          <GoogleMapEmbed location={event.location} width='80%' height='160' />
        </div>
      </div>
    );
  } catch (err) {
    console.error("ファイル読み込みに失敗しました:", err);
    return notFound();
  }
}
