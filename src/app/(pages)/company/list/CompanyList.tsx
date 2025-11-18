/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { CardCompanyItem } from "@/app/components/card/CardCompanyItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const CompanyList = () => {
  const [companyList, setCompanyList] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/list?&page=${page}`)
      .then(res => res.json())
      .then(data => {
        if (data.code == "success") {
          setCompanyList(data.companyListFinal);
          setTotalPage(data.totalPage);
        }
      })
  }, [page]);
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
      <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
        {/* Item */}
        {companyList.map(item => (
          <CardCompanyItem key={item.id} item={item} />
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
    </>
  )
}