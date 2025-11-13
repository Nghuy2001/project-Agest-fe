import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6"
import { CardCompanyItem } from "@/app/components/card/CardCompanyItem"

export default function Home() {
  return (
    <>
      {/* Section 1 */}
      <div className="bg-[#000065] py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h1 className="text-white font-[700] text-[28px] text-center mb-[30px]">
            887 Việc làm IT cho Developer &quot;Chất&quot;
          </h1>
          <form action="" className="flex flex-wrap gap-x-[15px] gap-y-[12px] mb-[30px]">
            <select name="" className="bg-white md:w-[240px] w-[100%] h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px] text-[#121212]">
              <option value="">Tất cả thành phố</option>
              <option value="">Hà Nội</option>
              <option value="">Đà Nẵng</option>
              <option value="">Hồ Chí Minh</option>
              <option value="">Khác</option>
            </select>
            <input type="text" name="" placeholder="Nhập từ khoá..." className="md:flex-1 flex-none w-[100%] bg-white h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px]" />
            <button className="bg-[#0088FF] md:w-[240px] w-[100%] h-[56px] rounded-[4px] font-[500] text-[16px] text-white inline-flex items-center justify-center">
              <FaMagnifyingGlass className="text-[20px] mr-[10px]" /> Tìm Kiếm
            </button>
          </form>
          <div className="flex flex-wrap gap-x-[12px] gap-y-[15px] items-center">
            <div className="text-[#DEDEDE] font-[500] text-[16px]">
              Mọi người đang tìm kiếm:
            </div>
            <div className="flex flex-wrap gap-[10px]">
              <Link href="#" className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px]">
                ReactJS
              </Link>
              <Link href="#" className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px]">
                Javascript
              </Link>
              <Link href="#" className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px]">
                NodeJS
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* End Section 1 */}

      {/* Section 2 */}
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] text-center mb-[30px]">
            Nhà tuyển dụng hàng đầu
          </h2>
          {/* Wrap */}
          <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
            {/* Item */}
            <CardCompanyItem />
          </div>
        </div>
      </div>
      {/* End Section 2 */}
    </>
  );
}