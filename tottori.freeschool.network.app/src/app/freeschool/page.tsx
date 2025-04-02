// library
import { DeleteRichText, TargetValueFormat } from "../components/utilities";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// icon
import { CiLocationOn, CiUser } from "react-icons/ci";

const entriesDir = path.join(process.cwd(), "posts", "entries");

export interface FreeschoolEntry {
  id: string;
  name: string;
  eyecatch_short?: string;
  eyecatch_long?: string;
  target?: string[];
  address?: string;
  tag?: string[];
  img?: string[];
  [key: string]: any;
}

export async function getFreeschoolEntries(): Promise<FreeschoolEntry[]> {
  const files = await fs.readdir(entriesDir);
  const freeschoolEntries: FreeschoolEntry[] = [];

  for (const file of files) {
    if (file.endsWith(".md")) {
      const filePath = path.join(entriesDir, file);
      const content = await fs.readFile(filePath, "utf-8");
      const { data } = matter(content);

      if (data.category === "freeschool") {
        freeschoolEntries.push({
          id: path.basename(file, ".md"),
          name: data.name || "名称未設定",
          eyecatch_short: data.eyecatch_short,
          eyecatch_long: data.eyecatch_long,
          target: data.target,
          address: data.address,
          tag: data.tag || [],
          img: data.img || [],
        });
      }
    }
  }

  return freeschoolEntries;
}


export default async function FreeschoolList() {
  const events = await getFreeschoolEntries();

  return (
    <div className="p-4 pt-4 lg:pt-12 h-[calc(100svh*11/12)] lg:h-full w-full mx-auto overflow-y-scroll bg-[#f8fdee] lg:bg-transparent z-20">
      <div className="w-full lg:max-w-[800px] lg:w-4/6 h-auto mx-auto grid grid-cols-1 gap-6 lg:gap-8 items-center relative">
        <div className="w-auto text-nowrap text-sm lg:text-base h-auto text-ws-black absolute top-6 text-center left-1/2 -translate-x-1/2 z-10">
          {events.length === 0 ? (
            <>
              <p>おっと、何もないようです。</p>
              <p>絞り込みを解除してみてください。</p>
            </>
          ) : (
            <>
              <p>読み込み中です。</p>
            </>
          )}
        </div>

        {events.map((event) => (
          <a
            key={event.id}
            href={`/freeschool/${event.id}`}
            className="h-44 relative rounded-lg shadow-md hover:shadow-xl group duration-300 cursor-pointer transition-shadow"
          >
            <div className="h-full z-10 bg-[#f8fdee] pr-3 rounded-lg rounded-r-lg flex relative duration-300 group-hover:-translate-x-1 lg:group-hover:-translate-x-8 transition-all">
              {event.img && event.img.length > 0 ? (
                <img
                  className="h-full w-1/3 lg:w-1/4 rounded-l-lg border-l-2 border-ws-primary object-cover object-center"
                  src={`/img/${event.img[0]}.webp`}
                  alt="画像がありません"
                />
              ) : (
                <div className="h-full w-1/3 lg:w-1/4 rounded-l-lg border-l-2 border-ws-primary object-cover object-center bg-gray-200 flex items-center justify-center">
                  <span>画像がありません</span>
                </div>
              )}

              <div className="ml-2 lg:ml-4 pr-3 pt-1 pb-2 w-2/3 lg:w-3/4 rounded-r-lg relative overflow-hidden">
                <h1 className="text-base lg:text-2xl font-bold text-ws-primary text-nowrap">{event.name}</h1>
                <h2 className="text-xs lg:text-base font-medium text-slate-600 text-nowrap">{event.eyecatch_short}</h2>
                <h2 className="text-xs lg:text-sm w-full font-thin text-slate-600 text-nowrap  group-hover:animate-marquee ">
                  {event.eyecatch_long ? <DeleteRichText text={event.eyecatch_long} /> : "詳細がありません"}
                </h2>

                <div className="mt-2 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <CiUser className="text-ws-primary" />
                    <p className="text-xs lg:text-sm font-normal text-slate-400">
                      {event.target ? <TargetValueFormat target={event.target} /> : "対象が未設定"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <CiLocationOn className="text-ws-primary" />
                    <p className="text-xs lg:text-sm font-normal text-slate-400 text-nowrap overflow-hidden">
                      {event.address}
                    </p>
                  </div>

                  <div className="relative lg:h-auto mt-2 mb-1 lg:my-0 lg:absolute lg:bottom-2 lg:right-1 text-[0.6rem] text-nowrap lg:text-xs font-thin flex flex-wrap lg:flex-nowrap gap-1 lg:gap-2 lg:font-semibold text-slate-600">
                    {event.tag && event.tag.length > 0 ? (
                      event.tag.map((tag: string, index: number) => (
                        <p key={index} className="bg-ws-black px-1 py-1 rounded text-slate-50">
                          {tag}
                        </p>
                      ))
                    ) : (
                      <span className="text-slate-400">タグがありません</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full w-16 flex items-center bg-ws-primary absolute right-0 top-0 z-0 rounded-r-lg">
              <p className="text-right w-6 ml-auto pr-2 font-bold text-white">詳細を見る</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
