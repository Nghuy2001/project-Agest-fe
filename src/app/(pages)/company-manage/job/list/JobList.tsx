/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ButtonDelete } from "@/app/components/button/ButtonDelete";
import { ButtonDisplay } from "@/app/components/display/ButtonDisplay";
import { positionList, workingFormList } from "@/config/variable";
import Link from "next/link"
import { useEffect, useState } from "react";
import { FaBriefcase, FaLocationDot, FaUserTie } from "react-icons/fa6"

export const JobList = () => {

  const [jobList, setJobList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>();
  const loadJobs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/list?page=${page}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          window.location.href = "/company/login";
          return;
        }
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "An error occurred!");
      }

      const data = await res.json();

      if (data.code === "success") {
        setJobList(data.dataFinal);
        setTotalPage(data.totalPage);
      } else {
        console.error("Lỗi BE:", data.message);
        setJobList([]);
        setTotalPage(0);
      }
    } catch (err: any) {
      console.error("[JobList Error]", err.message);
      setJobList([]);
      setTotalPage(0);
    }
  };
  useEffect(() => {
    loadJobs();
  }, [page]);
  const handlePagination = (event: any) => {
    setPage(parseInt(event.target.value));
  }
  const handleDeleteSuccess = (id: string) => {
    setJobList((prev) => {
      const newList = prev.filter((job) => job.id !== id);
      if (newList.length === 0 && page > 1) {
        setPage((prevPage) => prevPage - 1);
      } else {
        loadJobs();
      }
      return newList;
    });
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
        {jobList.map(item => {
          const position = positionList.find(itemPos => itemPos.value == item.position)?.label;
          const workingForm = workingFormList.find(itemWork => itemWork.value == item.workingForm)?.label;

          return (
            <div
              key={item.id}
              className="border border-[#DEDEDE] rounded-[8px] flex flex-col relative truncate"
              style={{
                background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
              }}
            >
              <img
                src="/assets/images/card-bg.svg"
                alt=""
                className="absolute top-[0px] left-[0px] w-[100%] h-auto pointer-events-none"
              />
              <div
                className="relative mt-[20px] w-[116px] h-[116px] bg-white mx-auto rounded-[8px] p-[10px]"
                style={{
                  boxShadow: "0px 4px 24px 0px #0000001F"
                }}
              >
                <img
                  src={item.companyLogo}
                  alt={item.title}
                  className="w-[100%] h-[100%] object-contain"
                />
              </div>
              <h3 className="mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2">
                {item.title}
              </h3>
              <div className="mt-[6px] text-center font-[400] text-[14px] text-[#121212]">
                {item.companyName}
              </div>
              <div className="mt-[12px] text-center font-[600] text-[16px] text-[#0088FF]">
                {item.salaryMin.toLocaleString("vi-VN")}$ - {item.salaryMax.toLocaleString("vi-VN")}$
              </div>
              <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                <FaUserTie className="text-[16px]" /> {position}
              </div>
              <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                <FaBriefcase className="text-[16px]" /> {workingForm}
              </div>
              <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                <FaLocationDot className="text-[16px]" /> {item.companyCity}
              </div>
              <div className="mt-[12px] mb-[20px] mx-[16px] flex flex-wrap justify-center gap-[8px]">
                {item.technologies.map((itemTech: string, indexTech: number) => (
                  <div
                    key={indexTech}
                    className="border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]"
                  >
                    {itemTech}
                  </div>
                ))}
              </div>
              <div className="grid grid-flow-col items-center justify-center gap-y-[12px] mb-[20px]">
                <Link href={`/company-manage/job/edit/${item.id}`} className="bg-[#FFB200] rounded-[4px] font-[400] text-[14px] text-black inline-block py-[8px] px-[20px]  mr-[12px]">
                  Sửa
                </Link>
                <ButtonDisplay
                  api={`${process.env.NEXT_PUBLIC_API_URL}/company/job/change-display/${item.id}`}
                  item={item}
                  loadJobs={loadJobs}
                />
                <ButtonDelete
                  api={`${process.env.NEXT_PUBLIC_API_URL}/company/job/delete/${item.id}`}
                  item={item}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              </div>
            </div>
          )
        })}
      </div>
      {totalPage && (
        <div className="mt-[30px]">
          <select
            name=""
            className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]"
            onChange={handlePagination}
          >
            {Array(totalPage).fill("").map((item, index) => (
              <option key={index} value={index + 1}>Trang {index + 1}</option>
            ))}
          </select>
        </div>
      )}
    </>
  )
}
