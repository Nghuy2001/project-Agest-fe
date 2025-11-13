import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Đăng ký (Ứng viên)",
  description: "Mô tả trang đăng ký (Ứng viên)...",
}

export default function UserRegisterPage() {
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] py-[50px] px-[20px] max-w-[602px] mx-auto">
            <h1 className="font-[700] text-[20px] text-black text-center mb-[20px]">
              Đăng ký (Ứng viên)
            </h1>
            <form action="" className="grid grid-cols-1 gap-y-[15px]">
              <div className="">
                <label htmlFor="fullName" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Họ tên *
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="fullName" 
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