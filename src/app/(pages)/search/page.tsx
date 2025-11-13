import { Metadata } from "next"
import { CardJobItem } from "@/app/components/card/CardJobItem"

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
  description: "Kết quả tìm kiếm công việc...",
}

export default function SearchPage() {
  return (
    <>
      {/* Kết quả tìm kiếm */}
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          
          <h2 className="font-[700] text-[28px] text-[#121212] mb-[30px]">
            76 việc làm <span className="text-[#0088FF]">reactjs</span>
          </h2>
        
          <div 
            className="bg-white rounded-[8px] py-[10px] px-[20px] mb-[30px] flex flex-wrap gap-[12px]"
            style={{
              boxShadow: "0px 4px 20px 0px #0000000F"
            }}
          >
            <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]">
              <option value="">Cấp bậc</option>
              <option value="">Intern</option>
              <option value="">Fresher</option>
              <option value="">Junior</option>
              <option value="">Middle</option>
              <option value="">Senior</option>
              <option value="">Manager</option>
            </select>
            <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]">
              <option value="">Hình thức làm việc</option>
              <option value="">Tại văn phòng</option>
              <option value="">Làm từ xa</option>
              <option value="">Linh hoạt</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            <CardJobItem />
          </div>

          <div className="mt-[30px]">
            <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042] outline-none">
              <option value="">Trang 1</option>
              <option value="">Trang 2</option>
              <option value="">Trang 3</option>
            </select>
          </div>

        </div>
      </div>
      {/* Hết Kết quả tìm kiếm */}
    </>
  )
}