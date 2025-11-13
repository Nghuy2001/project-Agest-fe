import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thông tin công ty",
  description: "Mô tả trang thông tin công ty...",
}

export default function CompanyManageProfilePage() {
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <h1 className="font-[700] text-[20px] text-black mb-[20px]">
              Thông tin công ty
            </h1>
            <form action="" className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
              <div className="sm:col-span-2">
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
              <div className="sm:col-span-2">
                <label htmlFor="logo" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Logo
                </label>
                <input 
                  type="file" 
                  name="" 
                  id="logo" 
                  accept="image/*" 
                  className="" 
                />
              </div>
              <div className="">
                <label htmlFor="city" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Thành phố
                </label>
                <select 
                  name="" 
                  id="city" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                >
                  <option value="">Hà Nội</option>
                  <option value="">Đà Nẵng</option>
                  <option value="">Hồ Chí Minh</option>
                </select>
              </div>
              <div className="">
                <label htmlFor="address" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Địa chỉ
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="address" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="companyModel" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Mô hình công ty
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="companyModel" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="companyEmployees" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Quy mô công ty
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="companyEmployees" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="workingTime" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Thời gian làm việc
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="workingTime" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="WorkOvertime" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Làm việc ngoài giờ
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="WorkOvertime" 
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
                <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Số điện thoại
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="phone" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Mô tả chi tiết
                </label>
                <textarea 
                  name="" 
                  id="description" 
                  className="w-[100%] h-[350px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <button className="bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}