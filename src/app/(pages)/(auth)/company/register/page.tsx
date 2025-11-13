import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Đăng ký (Nhà tuyển dụng)",
  description: "Mô tả trang đăng ký (Nhà tuyển dụng)...",
}

export default function CompanyRegisterPage() {
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] py-[50px] px-[20px] max-w-[602px] mx-auto">
            <h1 className="font-[700] text-[20px] text-black text-center mb-[20px]">
              Đăng ký (Nhà tuyển dụng)
            </h1>
            <form action="" className="grid grid-cols-1 gap-y-[15px]">
              <div className="">
                <label htmlFor="companyName" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Tên công ty *
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="companyName" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Email *
                </label>
                <input 
                  type="email" 
                  name="" 
                  id="email" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="password" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Mật khẩu *
                </label>
                <input 
                  type="password" 
                  name="" 
                  id="password" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <button className="bg-[#0088FF] rounded-[4px] w-[100%] h-[48px] px-[20px] font-[700] text-[16px] text-white">
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}