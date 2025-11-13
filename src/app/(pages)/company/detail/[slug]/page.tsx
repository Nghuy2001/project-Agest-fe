/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next"
import { FaLocationDot } from "react-icons/fa6"
import { CardJobItem } from "@/app/components/card/CardJobItem"

export const metadata: Metadata = {
  title: "Chi tiết công ty",
  description: "Mô tả trang chi tiết công ty...",
}

export default function CompanyDetailPage() {
  return (
    <>
      <div className="pt-[30px] pb-[60px]">
        <div className="container mx-auto px-[16px]">

          {/* Thông tin công ty */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <div className="flex flex-wrap items-center gap-[16px] mb-[20px]">
              <div className="w-[100px]">
                <img 
                  src="/assets/images/demo-cong-ty-2.jpg" 
                  alt="LG CNS Việt Nam" 
                  className="w-[100%] aspect-square object-cover rounded-[4px]"
                />
              </div>
              <div className="sm:flex-1">
                <h1 className="font-[700] text-[28px] text-[#121212] mb-[10px]">
                  LG CNS Việt Nam
                </h1>
                <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                  <FaLocationDot className="text-[16px]" /> Tầng 15, tòa Keangnam Landmark 72, Mễ Trì, Nam Tu Liem, Ha Noi
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Mô hình công ty:
                <span className="text-[#121212]">
                  Sản phẩm
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Quy mô công ty:
                <span className="text-[#121212]">
                  151 - 300 nhân viên
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Thời gian làm việc:
                <span className="text-[#121212]">
                  Thứ 2 - Thứ 6
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Làm việc ngoài giờ:
                <span className="text-[#121212]">
                  Không có OT
                </span>
              </div>
            </div>
          </div>
          {/* Hết Thông tin công ty */}

          {/* Mô tả chi tiết */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
            Mô tả chi tiết
          </div>
          {/* Hết Mô tả chi tiết */}

          {/* Việc làm */}
          <div className="mt-[30px]">
            <h2 className="font-[700] text-[28px] text-[#121212] mb-[20px]">
              Công ty có 6 việc làm
            </h2>
      
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
              <CardJobItem />
            </div>
          </div>
          {/* Hết Việc làm */}

        </div>
      </div>
    </>
  )
}