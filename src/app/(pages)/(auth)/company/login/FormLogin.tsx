/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";
import JustValidate from "just-validate";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export const FormLogin = () => {
  const router = useRouter();
  const isInitialized = useRef(false);
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    const validator = new JustValidate("#loginForm");
    validator
      .addField('#email', [
        {
          rule: "required",
          errorMessage: "Please enter your email!",
        },
        {
          rule: "email",
          errorMessage: "Email format is invalid!",
        },
      ])
      .addField('#password', [
        {
          rule: "required",
          errorMessage: "Please enter your password!",
        },
        {
          validator: (value: string) => value.length >= 8,
          errorMessage: "Password must be at least 8 characters!",
        },
        {
          validator: (value: string) => /[A-Z]/.test(value),
          errorMessage: "Password must contain at least one uppercase letter!",
        },
        {
          validator: (value: string) => /[a-z]/.test(value),
          errorMessage: "Password must contain at least one lowercase letter!",
        },
        {
          validator: (value: string) => /\d/.test(value),
          errorMessage: "Password must contain at least one number!",
        },
        {
          validator: (value: string) => /[@$!%*?&]/.test(value),
          errorMessage: "Password must contain at least one special character!",
        },
      ])
      .onSuccess((event: any) => {
        const email = event.target.email.value;
        const password = event.target.password.value;

        const dataFinal = {
          email: email,
          password: password
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFinal),
          credentials: "include",
        }).then(async (res) => {
          if (!res.ok) {
            const err = await res.json().catch(() => null);
            toast.error(err?.message || "An error occurred!");
            return null;
          }

          return res.json();
        })
          .then((data) => {
            if (!data) return;
            router.push("/");
          })
          .catch(() => {
            toast.error("Cannot connect to server!");
          });
      });
  }, []);

  return (
    <>
      <Toaster position="top-right" expand={false} richColors />
      <form id="loginForm" action="" className="grid grid-cols-1 gap-y-[15px]">
        <div className="">
          <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
            Email *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <label htmlFor="password" className="block font-[500] text-[14px] text-black mb-[5px]">
            Mật khẩu *
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <button className="bg-[#0088FF] rounded-[4px] w-[100%] h-[48px] px-[20px] font-[700] text-[16px] text-white">
            Đăng nhập
          </button>
        </div>
      </form>
    </>
  )
}
