/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next"
import Link from "next/link"
import { FaArrowRightLong, FaBriefcase, FaLocationDot, FaUserTie } from "react-icons/fa6"

export const metadata: Metadata = {
  title: "Chi tiết công việc",
  description: "Mô tả trang chi tiết công việc...",
}

export default function JobDetailPage() {
  return (
    <>
      {/* Chi tiết công việc */}
      <div className="pt-[30px] pb-[60px]">
        <div className="container mx-auto px-[16px]">
          {/* Wrap */}
          <div className="flex flex-wrap gap-[20px]">
            {/* Left */}
            <div className="lg:w-[65%] w-[100%]">
              {/* Thông tin công việc */}
              <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
                <h1 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] mb-[10px]">
                  Front End Developer ( Javascript, ReactJS)
                </h1>
                <div className="font-[400] text-[16px] text-[#414042] mb-[10px]">
                  LG CNS Việt Nam
                </div>
                <div className="font-[700] text-[20px] text-[#0088FF] sm:mb-[20px] mb-[10px]">
                  1.000$ - 1.500$
                </div>
                <Link href="#" className="bg-[#0088FF] rounded-[4px] font-[700] text-[16px] text-white flex items-center justify-center h-[48px] mb-[20px]">
                  Ứng tuyển
                </Link>
                <div className="grid grid-cols-3 sm:gap-[16px] gap-[8px] mb-[20px]">
                  <img 
                    src="/assets/images/demo-banner-1.jpg" 
                    alt="" 
                    className="aspect-[232/145] object-cover rounded-[4px]"
                  />
                  <img 
                    src="/assets/images/demo-banner-2.jpg" 
                    alt="" 
                    className="aspect-[232/145] object-cover rounded-[4px]"
                  />
                  <img 
                    src="/assets/images/demo-banner-3.jpg" 
                    alt="" 
                    className="aspect-[232/145] object-cover rounded-[4px]" 
                  />
                </div>
                <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
                  <FaUserTie className="text-[16px]" /> Fresher
                </div>
                <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
                  <FaBriefcase className="text-[16px]" /> Tại văn phòng
                </div>
                <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
                  <FaLocationDot className="text-[16px]" /> Tầng 15, tòa Keangnam Landmark 72, Mễ Trì, Nam Tu Liem, Ha Noi
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  <div className="border border-[#DEDEDE] rounded-[20px] font-[400] text-[12px] text-[#414042] py-[6px] px-[16px]">
                    ReactJS
                  </div>
                  <div className="border border-[#DEDEDE] rounded-[20px] font-[400] text-[12px] text-[#414042] py-[6px] px-[16px]">
                    NextJS
                  </div>
                  <div className="border border-[#DEDEDE] rounded-[20px] font-[400] text-[12px] text-[#414042] py-[6px] px-[16px]">
                    Javascript
                  </div>
                </div>
              </div>
              {/* Hết Thông tin công việc */}

              {/* Mô tả chi tiết */}
              <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
                Mô tả chi tiết
              </div>
              {/* Hết Mô tả chi tiết */}

              {/* Form ứng tuyển */}
              <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
                <h2 className="font-[700] text-[20px] text-black mb-[20px]">
                  Ứng tuyển ngay
                </h2>
                <form action="" className="">
                  <div className="mb-[15px]">
                    <label htmlFor="fullName" className="block font-[500] text-[14px] text-black mb-[5px]">
                      Họ tên *
                    </label>
                    <input type="text" name="" id="fullName" className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" />
                  </div>
                  <div className="mb-[15px]">
                    <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
                      Email *
                    </label>
                    <input type="email" name="" id="email" className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" />
                  </div>
                  <div className="mb-[15px]">
                    <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
                      Số điện thoại *
                    </label>
                    <input type="text" name="" id="phone" className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" />
                  </div>
                  <div className="mb-[15px]">
                    <label htmlFor="fileCV" className="block font-[500] text-[14px] text-black mb-[5px]">
                      File CV dạng PDF *
                    </label>
                    <input type="file" name="" id="fileCV" accept="application/pdf" className="" />
                  </div>
                  <button className="w-[100%] h-[48px] rounded-[4px] bg-[#0088FF] font-[700] text-[16px] text-white">
                    Gửi CV ứng tuyển
                  </button>
                </form>
              </div>
              {/* Hết Form ứng tuyển */}
            </div>
            {/* Right */}
            <div className="flex-1">
              {/* Thông tin công ty */}
              <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
                <div className="flex gap-[12px]">
                  <div className="w-[100px]">
                    <img 
                      src="/assets/images/demo-cong-ty-2.jpg" 
                      alt="LG CNS Việt Nam"
                      className="aspect-square object-cover rounded-[4px]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-[700] text-[18px] text-[#121212] mb-[10px]">
                      LG CNS Việt Nam
                    </div>
                    <Link href="#" className="flex items-center gap-[8px] font-[400] text-[16px] text-[#0088FF]">
                      Xem công ty <FaArrowRightLong className="" />
                    </Link>
                  </div>
                </div>
                <div className="mt-[20px] flex flex-col gap-[10px]">
                  <div className="flex flex-wrap justify-between font-[400] text-[16px]">
                    <div className="text-[#A6A6A6]">
                      Mô hình công ty
                    </div>
                    <div className="text-[#121212]">
                      Sản phẩm
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between font-[400] text-[16px]">
                    <div className="text-[#A6A6A6]">
                      Quy mô công ty
                    </div>
                    <div className="text-[#121212]">
                      151 - 300 nhân viên
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between font-[400] text-[16px]">
                    <div className="text-[#A6A6A6]">
                      Thời gian làm việc
                    </div>
                    <div className="text-[#121212]">
                      Thứ 2 - Thứ 6
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between font-[400] text-[16px]">
                    <div className="text-[#A6A6A6]">
                      Làm việc ngoài giờ
                    </div>
                    <div className="text-[#121212]">
                      Không có OT
                    </div>
                  </div>
                </div>
              </div>
              {/* Hết Thông tin công ty */}
            </div>
          </div>
        </div>
      </div>
      {/* Hết Chi tiết công việc */}
    </>
  )
}