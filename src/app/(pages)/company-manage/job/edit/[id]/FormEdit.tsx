/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { EditorMCE } from "@/app/components/editor/EditorMCE";
import JustValidate from "just-validate";
import { useEffect, useRef, useState } from "react"
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Toaster, toast } from 'sonner';
import { positionList, workingFormList } from "@/config/variable";
import { useRouter } from "next/navigation";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export const FormEdit = (props: {
  id: string
}) => {
  const { id } = props;
  const editorRef = useRef(null);
  const [isValid, setIsValid] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [jobDetail, setJobDetail] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/edit/${id}`, {
      credentials: "include"
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          toast.error("Session expired! Please log in again.");
          window.location.href = "/company/login";
          return null;
        }
        if (!res.ok) {
          const err = await res.json().catch(() => null);
          toast.error(err?.message || "An error occurred!");
          return null;
        }
        return res.json();
      }).then(data => {
        if (!data) return;

        if (data.code === "error") {
          toast.error(data.message);
          return;
        }

        if (data.code === "success") {
          setJobDetail(data.jobDetail);
        }
      });
  }, [id]);

  useEffect(() => {
    if (jobDetail) {
      if (jobDetail.images && jobDetail.images.length > 0) {
        setImages(
          jobDetail.images.map((img: string) => ({
            source: img,
          }))
        );
      }

      const validator = new JustValidate("#editForm");

      validator
        .addField("#title", [{ rule: "required", errorMessage: "Please enter the job title!" }])
        .addField("#salaryMin", [
          { rule: "minNumber", value: 0, errorMessage: "Minimum salary must be ≥ 0" },
        ])
        .addField("#salaryMax", [
          { rule: "minNumber", value: 0, errorMessage: "Maximum salary must be ≥ 0" },
        ])
        .onFail(() => {
          setIsValid(false);
        })
        .onSuccess(() => {
          setIsValid(true);
        });
    }
  }, [jobDetail]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const title = event.target.title.value;
    const salaryMin = event.target.salaryMin.value;
    const salaryMax = event.target.salaryMax.value;
    const position = event.target.position.value;
    const workingForm = event.target.workingForm.value;
    const technologies = event.target.technologies.value;
    let description = "";
    if (editorRef.current) {
      description = (editorRef.current as any).getContent();
    }

    if (isValid) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("salaryMin", salaryMin);
      formData.append("salaryMax", salaryMax);
      formData.append("position", position);
      formData.append("workingForm", workingForm);
      formData.append("technologies", technologies);
      formData.append("description", description);

      if (images.length > 0) {
        for (const image of images) {
          formData.append("images", image.file);
        }
      }

      const promise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/edit/${id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      })
        .then(async (res) => {
          if (res.status === 401) {
            router.push("/company/login");
            throw new Error("Please log in again!");
          }

          const data = await res.json().catch(() => null);

          if (!res.ok) {
            throw new Error(data?.message || "An error occurred!");
          }

          if (data?.code === "error") {
            throw new Error(data.message);
          }

          router.push("/company-manage/job/list");
          setImages([]);

          return data;
        });

      toast.promise(promise, {
        loading: 'Updating...',
        success: (data) => `${data.message}`,
        error: (err) => err.message || "An error occurred!",
      });
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      {jobDetail && (
        <form onSubmit={handleSubmit} id="editForm" className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block font-[500] text-[14px] text-black mb-[5px]">
              Tên công việc *
            </label>
            <input
              type="text"
              name="title"
              defaultValue={jobDetail.title}
              id="title"
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="salaryMin" className="block font-[500] text-[14px] text-black mb-[5px]">
              Mức lương tối thiểu ($)
            </label>
            <input
              type="number"
              name="salaryMin"
              defaultValue={jobDetail.salaryMin}
              id="salaryMin"
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="salaryMax" className="block font-[500] text-[14px] text-black mb-[5px]">
              Mức lương tối đa ($)
            </label>
            <input
              type="number"
              name="salaryMax"
              defaultValue={jobDetail.salaryMax}
              id="salaryMax"
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="position" className="block font-[500] text-[14px] text-black mb-[5px]">
              Cấp bậc *
            </label>
            <select
              name="position"
              defaultValue={jobDetail.position}
              id="position"
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            >
              {positionList.map((item, index) => (
                <option key={index} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="workingForm" className="block font-[500] text-[14px] text-black mb-[5px]">
              Hình thức làm việc *
            </label>
            <select
              name="workingForm"
              defaultValue={jobDetail.workingForm}
              id="workingForm"
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            >
              {workingFormList.map((item, index) => (
                <option key={index} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="technologies" className="block font-[500] text-[14px] text-black mb-[5px]">
              Các công nghệ
            </label>
            <input
              type="text"
              name="technologies"
              defaultValue={jobDetail.technologies.join(", ")}
              id="technologies"
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="images" className="block font-[500] text-[14px] text-black mb-[5px]">
              Danh sách ảnh
            </label>
            <FilePond
              name="images"
              allowMultiple={true} // Cho phép up nhiều ảnh
              allowRemove={true} // Cho phép xóa ảnh
              labelIdle='+'
              acceptedFileTypes={["image/*"]} // Chỉ cho phép ảnh
              files={images}
              onupdatefiles={setImages}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block font-[500] text-[14px] text-black mb-[5px]">
              Mô tả chi tiết
            </label>
            <EditorMCE
              editorRef={editorRef}
              id="description"
              value={jobDetail.description}
            />
          </div>
          <div className="sm:col-span-2">
            <button className="bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white">
              Cập nhật
            </button>
          </div>
        </form>
      )}
    </>
  )
}
