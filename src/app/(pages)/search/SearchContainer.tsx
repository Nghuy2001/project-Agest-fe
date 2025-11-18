/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { positionList, workingFormList } from "@/config/variable";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export const SearchContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const language = searchParams.get('language') || '';
  const city = searchParams.get('city') || '';
  const company = searchParams.get('company') || '';
  const keyword = searchParams.get('keyword') || '';
  const position = searchParams.get('position') || '';
  const workingForm = searchParams.get("workingForm") || "";
  const [jobList, setJobList] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?language=${language}&city=${city}&company=${company}&keyword=${keyword}&position=${position}&workingForm=${workingForm}`)
      .then(async (res) => {
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          console.error("Search API Error:", data);
          return;
        }

        if (data?.code === "success") {
          setJobList(data.jobs);
        }
      })
      .catch((err) => {
        console.error("Search request failed:", err);
      });

  }, [language, city, company, keyword, position, workingForm]);

  const handleFilterPosition = (event: any) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('position', value);
    } else {
      params.delete('position');
    }
    router.push(`?${params.toString()}`);
  }
  const handleFilterWorkingForm = (event: any) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("workingForm", value);
    } else {
      params.delete("workingForm");
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <>
      <div className="container mx-auto px-[16px]">

        <h2 className="font-[700] text-[28px] text-[#121212] mb-[30px]">
          {jobList.length} việc làm <span className="text-[#0088FF]">{language} {city} {company} {keyword}</span>
        </h2>
        <div
          className="bg-white rounded-[8px] py-[10px] px-[20px] mb-[30px] flex flex-wrap gap-[12px]"
          style={{
            boxShadow: "0px 4px 20px 0px #0000000F"
          }}
        >
          <select
            name=""
            className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]"
            onChange={handleFilterPosition}
            defaultValue={position}

          >
            <option value="">Cấp bậc</option>
            {positionList.map((item, index) => (
              <option key={index} value={item.value}>{item.label}</option>
            ))}
          </select>
          <select
            name=""
            className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]"
            onChange={handleFilterWorkingForm}
            defaultValue={workingForm}
          >
            <option value="">Hình thức làm việc</option>
            {workingFormList.map((item, index) => (
              <option key={index} value={item.value}>{item.label}</option>
            ))}
          </select>

        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
          {jobList.map(item => (
            <CardJobItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-[30px]">
          <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042] outline-none">
            <option value="">Trang 1</option>
            <option value="">Trang 2</option>
            <option value="">Trang 3</option>
          </select>
        </div>

      </div>
    </>
  )
}