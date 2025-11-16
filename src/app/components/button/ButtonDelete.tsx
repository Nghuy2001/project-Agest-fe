/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toaster, toast } from 'sonner';

export const ButtonDelete = (props: {
  api: string,
  item: any,
  onDeleteSuccess: (id: string) => void
}) => {
  const { api, item, onDeleteSuccess } = props;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa công việc: " + item.title + "?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(api, {
        method: "DELETE",
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
        toast.success(data.message);
        onDeleteSuccess(item.id);
      }
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra!");
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <button
        className="bg-[#FF0000] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]"
        onClick={handleDelete}
      >
        Xóa
      </button>
    </>
  )
}
