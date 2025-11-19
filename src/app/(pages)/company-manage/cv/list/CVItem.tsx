import { ButtonDelete } from "@/app/components/button/ButtonDelete";
import { cvStatusList } from "@/config/variable";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBriefcase, FaCircleCheck, FaEnvelope, FaEye, FaPhone, FaUserTie } from "react-icons/fa6";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CVItem = (props: {
  item: any,
  onDeleteSuccess: (id: string) => void
}) => {
  const { item, onDeleteSuccess } = props;
  const router = useRouter();
  const statusDefault = cvStatusList.find(itemStatus => itemStatus.value == item.status);
  const [status, setStatus] = useState(statusDefault);
  const handleChangeStatus = async (action: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/cv/change-status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, id: item.id }),
      });

      if (res.status === 401) {
        toast.error("Session expired! Please log in again.");
        router.push("/company/login");
        return;
      }

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.code === "error") {
        throw new Error(data?.message || "An error occurred!");
      }

      if (data?.code === "success") {
        const newStatus = cvStatusList.find(s => s.value === action);
        if (newStatus) setStatus(newStatus);
        toast.success("Status updated successfully!");
      }

    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    }
  };
  return (
    <>
      <div
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
        <h3 className="mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2">
          {item.jobTitle}
        </h3>
        <div className="mt-[12px] text-center font-[400] text-[14px] text-black">
          Ứng viên: <span className="font-[700]">{item.fullName}</span>
        </div>
        <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
          <FaEnvelope className="" /> {item.email}
        </div>
        <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
          <FaPhone className="" /> {item.phone}
        </div>
        <div className="mt-[12px] text-center font-[600] text-[16px] text-[#0088FF]">
          {item.jobSalaryMin.toLocaleString("vi-VN")}$ - {item.jobSalaryMax.toLocaleString("vi-VN")}$
        </div>
        <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
          <FaUserTie className="text-[16px]" /> {item.jobPosition}
        </div>
        <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
          <FaBriefcase className="text-[16px]" /> {item.jobWorkingForm}
        </div>
        <div
          className={
            "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] "
            + (item.viewed ? "text-[#121212]" : "text-[#FF0000]")
          }
        >
          <FaEye className="text-[16px]" /> {item.viewed ? "Đã xem" : "Chưa xem"}
        </div>
        <div
          className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px]"
          style={{
            color: status?.color
          }}
        >
          <FaCircleCheck className="text-[16px]" /> {status?.label}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-[8px] mt-[12px] mb-[20px] mx-[10px]">
          <Link href={`/company-manage/cv/detail/${item.id}`} className="bg-[#0088FF] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]">
            Xem
          </Link>
          {(status?.value == "initial" || status?.value == "rejected") && (
            <button onClick={() => handleChangeStatus("approved")} className="bg-[#9FDB7C] rounded-[4px] font-[400] text-[14px] text-black inline-block py-[8px] px-[20px]">
              Duyệt
            </button>
          )}
          {(status?.value == "initial" || status?.value == "approved") && (
            <button onClick={() => handleChangeStatus("rejected")} className="bg-[#FF5100] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]">
              Từ chối
            </button>
          )}
          <ButtonDelete
            api={`${process.env.NEXT_PUBLIC_API_URL}/company/cv/delete/${item.id}`}
            item={item}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      </div>
    </>
  )
}
