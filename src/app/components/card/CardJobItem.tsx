/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { FaBriefcase, FaLocationDot, FaUserTie } from "react-icons/fa6"

export const CardJobItem = () => {
  return (
    <>
      <Link 
        href="" 
        className="border border-[#DEDEDE] rounded-[8px] flex flex-col relative truncate"
        style={{
          background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
        }}
      >
        <img 
          src="/assets/images/card-bg.svg" 
          alt=""
          className="absolute top-[0px] left-[0px] w-[100%] h-auto" 
        />
        <div 
          className="relative mt-[20px] w-[116px] h-[116px] bg-white mx-auto rounded-[8px] p-[10px]" 
          style={{
            boxShadow: "0px 4px 24px 0px #0000001F"
          }}
        >
          <img 
            src="/assets/images/demo-cong-ty-1.png" 
            alt="Frontend Engineer (ReactJS)"
            className="w-[100%] h-[100%] object-contain"
          />
        </div>
        <h3 className="mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2">
          Frontend Engineer (ReactJS)
        </h3>
        <div className="mt-[6px] text-center font-[400] text-[14px] text-[#121212]">
          LG CNS Việt Nam
        </div>
        <div className="mt-[12px] text-center font-[600] text-[16px] text-[#0088FF]">
          1.000$ - 1.500$
        </div>
        <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
          <FaUserTie className="text-[16px]" /> Fresher
        </div>
        <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
          <FaBriefcase className="text-[16px]" /> Tại văn phòng
        </div>
        <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
          <FaLocationDot className="text-[16px]" /> Ha Noi
        </div>
        <div className="mt-[12px] mb-[20px] mx-[16px] flex flex-wrap justify-center gap-[8px]">
          <div className="border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]">
            ReactJS
          </div>
          <div className="border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]">
            NextJS
          </div>
          <div className="border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]">
            Javascript
          </div>
        </div>
      </Link>
    </>
  )
}