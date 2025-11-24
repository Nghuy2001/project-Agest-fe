/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { cvStatusList, positionList, workingFormList } from "@/config/variable"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaCircleCheck } from "react-icons/fa6"
import { CVItem } from "./CVItem"
export const CVList = () => {
  const [listCV, setListCV] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;

  const loadCV = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cv/list?page=${page}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          router.push("/user/login");
          return;
        }
        const errorData = await res.json().catch(() => null);
        console.error("Fetch CVList failed:", errorData?.message || "Unknown error");
        setListCV([]);
        setTotalPage(0);
        return;
      }

      const data = await res.json();

      if (data.code === "success") {
        setListCV(data.listCV);
        setTotalPage(data.totalPage);
      } else {
        console.error("BE error:", data.message);
        setListCV([]);
        setTotalPage(0);
      }

    } catch (err: any) {
      console.error("[CVList Error]", err.message);
      setListCV([]);
      setTotalPage(0);
    }
  };
  useEffect(() => {
    loadCV();
  }, [page])
  const handleDeleteSuccess = async (id: string) => {
    setListCV(prev => prev.filter(cv => cv.id !== id));
    await loadCV()
  };
  const handlePagination = (event: any) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value && parseInt(value) > 0) {
      params.set("page", value);
    } else {
      params.delete("page");
    }
    router.push(`?${params.toString()}`)
  }
  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
        {listCV.map(item => {
          item.jobPosition = positionList.find(itemPos => itemPos.value == item.jobPosition)?.label;
          item.jobWorkingForm = workingFormList.find(itemWork => itemWork.value == item.jobWorkingForm)?.label;
          const status = cvStatusList.find(itemStatus => itemStatus.value == item.status);
          const renderStatus = () => {
            if (status?.value === "initial" && item.viewed) {
              return (
                <div
                  style={{ color: "#1D86FF" }}
                  className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px]"
                >
                  <FaCircleCheck className="text-[16px]" />
                  Đã xem
                </div>
              )
            }
            return (
              <div
                style={{ color: status?.color }}
                className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px]"
              >
                <FaCircleCheck className="text-[16px]" />
                {status?.display}
              </div>
            )
          }
          return (
            <CVItem renderStatus={renderStatus} key={item.id} item={item} onDeleteSuccess={handleDeleteSuccess} />
          )
        })}
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
    </>
  )
}