/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useAuth } from "@/hooks/useAuth"
import JustValidate from "just-validate";
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation";


registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);


export const FormProfile = () => {
  const { role, infoUser } = useAuth();
  const [avatars, setAvatars] = useState<any[]>([]);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (infoUser) {
      const validator = new JustValidate("#profileForm");
      if (infoUser.avatar) {
        setAvatars([
          {
            source: infoUser.avatar
          }
        ]);
      }
      validator
        .addField('#fullName', [
          {
            rule: 'required',
            errorMessage: 'Vui lòng nhập họ tên!'
          },
          {
            rule: 'minLength',
            value: 5,
            errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
          },
          {
            rule: 'maxLength',
            value: 50,
            errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
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
  }, [role, infoUser]);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    let avatar = null;
    if (avatars.length > 0 && avatars[0].file) {
      avatar = avatars[0].file;
    }
    if (isValid) {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("avatar", avatar);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      })
        .then(async (res) => {
          if (res.status === 401) {
            router.push("/user/login");
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
        .catch(() => {
          toast.error("Không thể kết nối tới server!");
        });
    }
  }
  return (
    <>
      <Toaster position="top-right" expand={false} richColors />
      {infoUser && (
        <>
          <form onSubmit={handleSubmit} id="profileForm" action="" className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="block font-[500] text-[14px] text-black mb-[5px]">
                Họ tên *
              </label>
              <input
                type="text"
                name="fullName"
                defaultValue={infoUser.fullName}
                id="fullName"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="avatar" className="block font-[500] text-[14px] text-black mb-[5px]">
                Avatar
              </label>
              <FilePond
                name="avatar"
                allowMultiple={false}
                allowRemove={true}
                labelIdle='+'
                acceptedFileTypes={["image/*"]}
                files={avatars}
                onupdatefiles={setAvatars}
              />
            </div>
            <div className="">
              <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
                Email *
              </label>
              <input
                type="email"
                name="email"
                defaultValue={infoUser.email}
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
                defaultValue={infoUser.phone}
                id="phone"
                className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
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
    </>
  )
}