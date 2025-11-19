/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { positionList, workingFormList } from "@/config/variable"
import { Metadata } from "next"
import Link from "next/link"
import { FaArrowRightLong, FaBriefcase, FaLocationDot, FaUserTie } from "react-icons/fa6"
import { FormApply } from "./FormApply"

export const metadata: Metadata = {
  title: "Chi tiết công việc",
  description: "Mô tả trang chi tiết công việc...",
}

export default async function JobDetailPage({ params }: {
  params: { slug: string }
}) {
  const { slug } = await params;
  let jobDetail: any = null;
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/detail/${slug}`)
    .then(async (res) => {
      if (res.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/company/login";
        }
        return null;
      }
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "An error occurred!");
      }
      return res.json();
    }).then((data) => {
      if (!data) return null;
      if (data.code == "success") {
        jobDetail = data.jobDetail;
        jobDetail.position = positionList.find(item => item.value == jobDetail.position)?.label;
        jobDetail.workingForm = workingFormList.find(item => item.value == jobDetail.workingForm)?.label;
      }
    }).catch((err) => {
      console.error("[JobDetail Error]", err.message);
      return null;
    });

  return (
    <>
      {/* Chi tiết công việc */}
      {jobDetail && (
        <div className="pt-[30px] pb-[60px]">
          <div className="container mx-auto px-[16px]">
            {/* Wrap */}
            <div className="flex flex-wrap gap-[20px]">
              {/* Left */}
              <div className="lg:w-[65%] w-[100%]">
                {/* Thông tin công việc */}
                <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
                  <h1 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] mb-[10px]">
                    {jobDetail.title}
                  </h1>
                  <div className="font-[400] text-[16px] text-[#414042] mb-[10px]">
                    {jobDetail.companyName}
                  </div>
                  <div className="font-[700] text-[20px] text-[#0088FF] sm:mb-[20px] mb-[10px]">
                    {jobDetail.salaryMin.toLocaleString("vi-VN")}$ - {jobDetail.salaryMax.toLocaleString("vi-VN")}$
                  </div>
                  <Link href="#form-apply" className="bg-[#0088FF] rounded-[4px] font-[700] text-[16px] text-white flex items-center justify-center h-[48px] mb-[20px]">
                    Ứng tuyển
                  </Link>
                  <div className="grid grid-cols-3 sm:gap-[16px] gap-[8px] mb-[20px]">
                    {jobDetail.images.map((image: string, index: number) => (
                      <img
                        src={image}
                        key={index}
                        alt=""
                        className="aspect-[232/145] object-cover rounded-[4px]"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
                    <FaUserTie className="text-[16px]" />{jobDetail.position}
                  </div>
                  <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
                    <FaBriefcase className="text-[16px]" /> {jobDetail.workingForm}
                  </div>
                  <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
                    <FaLocationDot className="text-[16px]" /> {jobDetail.jobAddress}
                  </div>
                  <div className="flex flex-wrap gap-[8px]">
                    {jobDetail.technologies.map((itemTech: string, indexTech: number) => (
                      <div
                        className="border border-[#DEDEDE] rounded-[20px] font-[400] text-[12px] text-[#414042] py-[6px] px-[16px]"
                        key={indexTech}>
                        {itemTech}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Hết Thông tin công việc */}

                {/* Mô tả chi tiết */}
                <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
                  <div dangerouslySetInnerHTML={{ __html: jobDetail.description }} />
                </div>
                {/* Hết Mô tả chi tiết */}

                {/* Form ứng tuyển */}
                <div id="form-apply" className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
                  <h2 className="font-[700] text-[20px] text-black mb-[20px]">
                    Ứng tuyển ngay
                  </h2>
                  <FormApply jobId={jobDetail.id} />
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
                        src={jobDetail.companyLogo}
                        alt={jobDetail.companyName}
                        className="aspect-square object-cover rounded-[4px]"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-[700] text-[18px] text-[#121212] mb-[10px]">
                        {jobDetail.companyName}
                      </div>
                      <Link href={`/company/detail/${jobDetail.companyId}`} className="flex items-center gap-[8px] font-[400] text-[16px] text-[#0088FF]">
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
                        {jobDetail.companyModel}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between font-[400] text-[16px]">
                      <div className="text-[#A6A6A6]">
                        Quy mô công ty
                      </div>
                      <div className="text-[#121212]">
                        {jobDetail.companyEmployees}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between font-[400] text-[16px]">
                      <div className="text-[#A6A6A6]">
                        Thời gian làm việc
                      </div>
                      <div className="text-[#121212]">
                        {jobDetail.companyWorkingTime}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between font-[400] text-[16px]">
                      <div className="text-[#A6A6A6]">
                        Làm việc ngoài giờ
                      </div>
                      <div className="text-[#121212]">
                        {jobDetail.companyWorkOvertime}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hết Thông tin công ty */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Hết Chi tiết công việc */}
    </>
  )
}