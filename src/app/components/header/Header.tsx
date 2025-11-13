"use client"

import Link from "next/link"
import { FaBars } from "react-icons/fa6"
import { HeaderMenu } from "./HeaderMenu"
import { useState } from "react"

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <header className="bg-[#000071] py-[15px] px-[16px]">
        <div className="container mx-auto">
          {/* Wrap */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="#" className="text-white font-[800] sm:text-[28px] text-[20px] lg:flex-none flex-1">
              28.ITJobs
            </Link>
            {/* Menu */}
            <HeaderMenu showMenu={showMenu} />
            {/* Account */}
            <div className="inline-flex items-center gap-x-[5px] text-white font-[600] sm:text-[16px] text-[12px] relative group/sub-1">
              {/* Chưa đăng nhập */}
              {/* <Link href="#" className="">
                Đăng Nhập
              </Link>
              <span className="">/</span>
              <Link href="#" className="">
                Đăng Ký
              </Link> */}

              {/* Đã đăng nhập */}
              <Link href="#" className="">LG Elect...</Link>
              <ul className="absolute top-[100%] right-[0px] w-[200px] bg-[#000065] hidden group-hover/sub-1:block z-[999]">
                <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                  <Link href="" className="text-white font-[600] text-[16px]">
                    Thông tin công ty
                  </Link>
                </li>
                <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                  <Link href="" className="text-white font-[600] text-[16px]">
                    Quản lý công việc
                  </Link>
                </li>
                <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                  <Link href="" className="text-white font-[600] text-[16px]">
                    Quản lý CV
                  </Link>
                </li>
                <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                  <Link href="" className="text-white font-[600] text-[16px]">
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
            {/* Button Menu Mobile */}
            <button 
              onClick={handleShowMenu}
              className="text-white text-[20px] lg:hidden inline-block ml-[12px]"
            >
              <FaBars className="" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}