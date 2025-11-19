/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useAuth } from "@/hooks/useAuth"
import JustValidate from "just-validate"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { toast, Toaster } from "sonner"

export const FormApply = (props: {
  jobId: string
}) => {
  const { infoUser } = useAuth();
  const userRef = useRef<any>(null);
  const router = useRouter();
  useEffect(() => {
    userRef.current = infoUser;
  }, [infoUser]);
  ;
  const { jobId } = props;
  useEffect(() => {
    const validator = new JustValidate("#applyForm");

    validator
      .addField('#fullName', [
        {
          rule: 'required',
          errorMessage: "Please enter your full name!"
        },
        {
          rule: 'minLength',
          value: 5,
          errorMessage: "Full name must be at least 5 characters!"
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: "Full name cannot exceed 50 characters!"
        },
      ])
      .addField('#phone', [
        {
          rule: 'required',
          errorMessage: 'Please enter your phone number!'
        },
        {
          rule: 'customRegexp',
          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          errorMessage: 'Invalid phone number format!'
        },
      ])
      .addField('#fileCV', [
        {
          rule: 'required',
          errorMessage: 'Please select a CV file!',
        },
        {
          validator: (value: any, fields: any) => {
            const file = fields['#fileCV']?.elem?.files?.[0];
            if (!file) return false;
            return file.type === 'application/pdf';
          },
          errorMessage: 'File must be in PDF format!',
        },
        {
          validator: (value: any, fields: any) => {
            const file = fields['#fileCV']?.elem?.files?.[0];
            if (!file) return false;
            return file.size <= 5 * 1024 * 1024;
          },
          errorMessage: 'File size must not exceed 5MB!',
        },
      ]).onSuccess((event: any) => {
        event.preventDefault();
        const currentUser = userRef.current;
        if (!currentUser) {
          return window.location.href = "/user/login";
        }
        const fullName = event.target.fullName.value;
        const phone = event.target.phone.value;
        const fileCV = event.target.fileCV.files[0];
        const formData = new FormData();
        formData.append("jobId", jobId);
        formData.append("fullName", fullName);
        formData.append("phone", phone);
        formData.append("fileCV", fileCV);

        const promise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/apply`, {
          method: "POST",
          body: formData,
          credentials: "include",
        })
          .then(async (res) => {
            const data = await res.json().catch(() => null);
            if (res.status === 401) {
              router.push("/user/login");
              throw new Error("Please log in again!");
            }
            if (!res.ok) {
              throw new Error(data?.message || "An unexpected error occurred!");
            }

            if (data?.code === "error") {
              throw new Error(data.message);
            }
            event.target.reset();
            return data;
          })
          .catch((err) => {
            throw new Error(err.message || "Unable to connect to server!");
          });

        toast.promise(promise, {
          loading: "Submitting application...",
          success: (data) => data.message || "Application submitted successfully!",
          error: (err) => err.message || "An error occurred!",
        });

      })
  }, [])
  return (
    <>
      <Toaster richColors position="top-right" />
      <form id="applyForm" action="" className="">
        <div className="mb-[15px]">
          <label htmlFor="fullName" className="block font-[500] text-[14px] text-black mb-[5px]">
            Họ tên *
          </label>
          <input type="text" name="fullName" id="fullName" className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" />
        </div>
        <div className="mb-[15px]">
          <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
            Số điện thoại *
          </label>
          <input type="text" name="phone" id="phone" className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" />
        </div>
        <div className="mb-[15px]">
          <label htmlFor="fileCV" className="block font-[500] text-[14px] text-black mb-[5px]">
            File CV dạng PDF *
          </label>
          <input type="file" name="fileCV" id="fileCV" accept="application/pdf" className="" />
        </div>
        <button className="w-[100%] h-[48px] rounded-[4px] bg-[#0088FF] font-[700] text-[16px] text-white">
          Gửi CV ứng tuyển
        </button>
      </form>
    </>)
}