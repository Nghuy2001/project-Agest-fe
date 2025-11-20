import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ButtonDisplay = (props: {
  api: string,
  item: any,
  loadJobs: () => void
}) => {
  const { api, item, loadJobs } = props;
  const handleDisplay = async () => {
    try {
      const res = await fetch(api, {
        method: "PATCH",
        credentials: "include",
      });

      if (res.status === 401) {
        window.location.href = "/company/login";
        return;
      }

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Không thể đọc phản hồi từ server!");
      }

      if (data.code === "error") {
        toast.error(data.message);
        return;
      }

      if (data.code === "success") {
        loadJobs();
        toast.success(data.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra!");
    }
  }
  const isDisplayed = item.display === true;
  const buttonText = isDisplayed ? "Ẩn" : "Hiển thị";
  const buttonColor = isDisplayed ? "bg-[#FF0000]" : "bg-[#0088FF]";
  return (
    <>
      <button
        className={`${buttonColor} mr-[12px] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]`}
        onClick={handleDisplay}
      >
        {buttonText}
      </button>
    </>
  )
}