/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useAuth } from "@/hooks/useAuth"
import JustValidate from "just-validate";
import { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation";
import { EditorMCE } from "@/app/components/editor/EditorMCE";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export const FormProfile = () => {

  const { role, infoCompany } = useAuth();
  const [logos, setLogos] = useState<any[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [cityList, setCityList] = useState<any[]>([]);
  const router = useRouter();
  const editorRef = useRef(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/city/list`).then(res => res.json()).then(data => {
      setCityList(data.cityList)
    })
  }, [])
  // console.log(cityList)
  useEffect(() => {
    if (role === undefined) return;
    if (role === "candidate") {
      router.push("/");
    }
    if (role === null) {
      router.push("/company/login");
    }
    if (infoCompany) {
      const validator = new JustValidate("#profileForm");
      if (infoCompany.logo) {
        setLogos([
          {
            source: infoCompany.logo
          }
        ]);
      }
      validator
        .addField('#companyName', [
          {
            rule: 'required',
            errorMessage: 'Vui lòng nhập tên công ty!'
          },
          {
            rule: 'maxLength',
            value: 200,
            errorMessage: 'Tên công ty không được vượt quá 200 ký tự!',
          },
        ])
        .addField('#email', [
          {
            rule: 'required',
            errorMessage: 'Vui lòng nhập email của bạn!',
          },
          {
            rule: 'email',
            errorMessage: 'Email không đúng định dạng!',
          },
        ])
        .onFail(() => {
          setIsValid(false)
        })
        .onSuccess(() => {
          setIsValid(true);
        })

    }
  }, [infoCompany, role, router]);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const companyName = event.target.companyName.value;
    const cityId = event.target.cityId.value;
    const address = event.target.address.value;
    const companyModel = event.target.companyModel.value;
    const companyEmployees = event.target.companyEmployees.value;
    const workingTime = event.target.workingTime.value;
    const workOvertime = event.target.workOvertime.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    let description = "";
    if (editorRef.current) {
      description = (editorRef.current as any).getContent();
    }

    let logo = null;
    if (logos.length > 0 && logos[0].file) {
      logo = logos[0].file;
    }
    if (isValid) {
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("cityId", cityId);
      formData.append("address", address);
      formData.append("companyModel", companyModel);
      formData.append("companyEmployees", companyEmployees);
      formData.append("workingTime", workingTime);
      formData.append("workOvertime", workOvertime);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("description", description);
      formData.append("logo", logo);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/profile`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      })
        .then(async (res) => {
          if (res.status === 401) {
            router.push("/company/login");
            return null;
          }
          if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            toast.error(errorData?.message || "Có lỗi xảy ra!");
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          if (data.code === "success") {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error)
          toast.error("Không thể kết nối tới server!");
        });


    }
  }
  return (
    <>
      <Toaster position="top-right" expand={false} richColors />
      {infoCompany && (
        <>
          <form onSubmit={handleSubmit} id="profileForm" action="" className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
            <div className="sm:col-span-2">
              <label htmlFor="companyName" className="block font-[500] text-[14px] text-black mb-[5px]">
                Tên công ty *
              </label>
              <input
                type="text"
                defaultValue={infoCompany.companyName}
                name="companyName"
                id="companyName"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="logo" className="block font-[500] text-[14px] text-black mb-[5px]">
                Logo
              </label>
              <FilePond
                name="logo"
                allowMultiple={false} // Chỉ chọn 1 ảnh 
                allowRemove={true} // Cho phép xóa ảnh
                labelIdle='+'
                acceptedFileTypes={["image/*"]}
                files={logos}
                onupdatefiles={setLogos}
              />
            </div>
            <div className="">
              <label htmlFor="city" className="block font-[500] text-[14px] text-black mb-[5px]">
                Thành phố
              </label>
              <select
                name="cityId"
                defaultValue={infoCompany.cityId}
                id="cityId"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[10px] px-[20px] font-[500] text-[14px] text-black"
              >
                <option value="">-- Chọn thành phố --</option>
                {cityList.map(item => (
                  <option value={item.id} key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="">
              <label htmlFor="address" className="block font-[500] text-[14px] text-black mb-[5px]">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                defaultValue={infoCompany.address}
                id="address"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
              />
            </div>
            <div className="">
              <label htmlFor="companyModel" className="block font-[500] text-[14px] text-black mb-[5px]">
                Mô hình công ty
              </label>
              <input
                type="text"
                name="companyModel"
                defaultValue={infoCompany.companyModel}
                id="companyModel"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
              />
            </div>
            <div className="">
              <label htmlFor="companyEmployees" className="block font-[500] text-[14px] text-black mb-[5px]">
                Quy mô công ty
              </label>
              <input
                type="text"
                name="companyEmployees"
                defaultValue={infoCompany.companyEmployees}
                id="companyEmployees"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
              />
            </div>
            <div className="">
              <label htmlFor="workingTime" className="block font-[500] text-[14px] text-black mb-[5px]">
                Thời gian làm việc
              </label>
              <input
                type="text"
                name="workingTime"
                defaultValue={infoCompany.workingTime}
                id="workingTime"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
              />
            </div>
            <div className="">
              <label htmlFor="workOvertime" className="block font-[500] text-[14px] text-black mb-[5px]">
                Làm việc ngoài giờ
              </label>
              <input
                type="text"
                name="workOvertime"
                defaultValue={infoCompany.workOvertime}
                id="workOvertime"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
              />
            </div>
            <div className="">
              <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
                Email *
              </label>
              <input
                type="email"
                name="email"
                defaultValue={infoCompany.email}
                id="email"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
              />
            </div>
            <div className="">
              <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={infoCompany.phone}
                id="phone"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block font-[500] text-[14px] text-black mb-[5px]">
                Mô tả chi tiết
              </label>
              <EditorMCE
                editorRef={editorRef}
                value={infoCompany.description}
              />
            </div>
            <div className="sm:col-span-2">
              <button className="bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white">
                Cập nhật
              </button>
            </div>
          </form>
        </>
      )}
    </>)
}