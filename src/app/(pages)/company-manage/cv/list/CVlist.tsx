/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { positionList, workingFormList } from "@/config/variable"

import { useEffect, useState } from "react"
import { CVItem } from "./CVItem"

export const CVList = () => {
  const [listCV, setListCV] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/cv/list`, {
      method: "GET",
      credentials: "include",
    }).then(async (res) => {
      if (res.status === 401) {
        window.location.href = '/company/login'
        return null;
      }
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "An error occurred!");
      }
      return res.json();
    }).then((data) => {
      if (!data) return;

      if (data.code === "success") {
        setListCV(data.dataFinal);
      } else {
        console.error("Lỗi BE:", data.message);
      }
    }).catch((err) => {
      console.error("[CVList Error]", err.message);
    });
  }, [])
  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
        {listCV.map((item) => {
          item.jobPosition = positionList.find(itemPos => itemPos.value == item.jobPosition)?.label;
          item.jobWorkingForm = workingFormList.find(itemWork => itemWork.value == item.jobWorkingForm)?.label;
          return (
            <CVItem item={item} key={item.id} />
          )
        })}
      </div>

      <div className="mt-[30px]">
        <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]">
          <option value="">Trang 1</option>
          <option value="">Trang 2</option>
          <option value="">Trang 3</option>
        </select>
      </div>
    </>
  )
}