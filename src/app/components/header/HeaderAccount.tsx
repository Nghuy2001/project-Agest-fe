import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

export const HeaderAccount = () => {
  const { isLogin, infoUser } = useAuth();

  return (
    <>
      <div className="inline-flex items-center gap-x-[5px] text-white font-[600] sm:text-[16px] text-[12px] relative group/sub-1">
        {isLogin ? (
          <>
            {/* Đã đăng nhập user */}
            {infoUser && (
              <>
                <Link href="#" className="">{infoUser.fullName}</Link>
                <ul className="absolute top-[100%] right-[0px] w-[200px] bg-[#000065] hidden group-hover/sub-1:block z-[999]">
                  <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                    <Link href="" className="text-white font-[600] text-[16px]">
                      Thông tin cá nhân
                    </Link>
                  </li>
                  <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                    <Link href="" className="text-white font-[600] text-[16px]">
                      Quản lý CV đã gửi
                    </Link>
                  </li>
                  <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                    <Link href="" className="text-white font-[600] text-[16px]">
                      Đăng xuất
                    </Link>
                  </li>
                </ul>
              </>
            )}

            {/* Đã đăng nhập compnay */}
            {/* <Link href="#" className="">LG Elect...</Link>
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
            </ul> */}
          </>
        ) : (
          <>
            {/* Chưa đăng nhập */}
            <Link href="/user/login" className="">
              Đăng Nhập
            </Link>
            <span className="">/</span>
            <Link href="/user/register" className="">
              Đăng Ký
            </Link>
          </>
        )}
      </div>
    </>
  )
}
