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
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;
  const salaryMinParam = searchParams.get("salaryMin");
  const salaryMin = salaryMinParam ? parseInt(salaryMinParam) : 0;
  const salaryMaxParam = searchParams.get("salaryMax");
  const salaryMax = salaryMaxParam ? parseInt(salaryMaxParam) : 0;
  const [jobList, setJobList] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState();
  const [totalRecord, setTotalRecord] = useState();


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?language=${language}&city=${city}&company=${company}&keyword=${keyword}&position=${position}&workingForm=${workingForm}&page=${page}&salaryMin=${salaryMin}&salaryMax=${salaryMax}`)
      .then(async (res) => {
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          console.error("Search API Error:", data);
          return;
        }

        if (data?.code === "success") {
          setJobList(data.jobs);
          setTotalPage(data.totalPage);
          setTotalRecord(data.totalRecord);

        }
      })
      .catch((err) => {
        console.error("Search request failed:", err);
      });
  }, [language, city, company, keyword, position, workingForm, page, salaryMin, salaryMax]);

  const handleFilterPosition = (event: any) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('position', value);
    } else {
      params.delete('position');
    }
    params.delete("page");
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
    params.delete("page");
    router.push(`?${params.toString()}`);
  }
  const handlePagination = (event: any) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value && parseInt(value) > 0) {
      params.set("page", value);
    } else {
      params.delete("page");
    }

    router.push(`?${params.toString()}`);
  }
  const handleSalaryMin = (event: any) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString())
    if (value && parseInt(value) > 0) {
      params.set("salaryMin", value);
    } else {
      params.delete("salaryMin");
    }

    router.push(`?${params.toString()}`);
  }
  const handleSalaryMax = (event: any) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString())
    if (value && parseInt(value) > 0) {
      params.set("salaryMax", value);
    } else {
      params.delete("salaryMax");
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <>
      <div className="container mx-auto px-[16px]">
        {totalRecord && (
          <h2 className="font-[700] text-[28px] text-[#121212] mb-[30px]">
            {totalRecord} việc làm:
            <span className="text-[#0088FF] ml-[6px]">
              {language} {city} {company} {keyword}
            </span>
          </h2>
        )}

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
          <input className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[22px] font-[400] text-[16px] text-[#414042]" type="number" placeholder="Mức lương tối thiểu ($)" onChange={handleSalaryMin} />
          <input className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[22px] font-[400] text-[16px] text-[#414042]" type="number" placeholder="Mức lương tối đa ($)" onChange={handleSalaryMax} />
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
          {jobList.map(item => (
            <CardJobItem key={item.id} item={item} />
          ))}
        </div>

        {totalPage && (
          <div className="mt-[30px]">
            <select
              name=""
              className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]"
              onChange={handlePagination}
              defaultValue={page}
            >
              {Array(totalPage).fill("").map((item, index) => (
                <option key={index} value={index + 1}>Trang {index + 1}</option>
              ))}
            </select>
          </div>
        )}

      </div>
    </>
  )
}
