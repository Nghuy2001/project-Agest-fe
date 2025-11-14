/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [infoUser, setInfoUser] = useState<any>();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || data.code !== "success") {
          setIsLogin(false);
          setInfoUser(null);
          return;
        }

        if (data.infoUser) {
          setIsLogin(true);
          setInfoUser(data.infoUser);
        } else {
          setIsLogin(false);
          setInfoUser(null);
        }

        // if (data.infoCompany) {
        //   setIsLogin(true);
        //   setInfoUser(null);
        // }

      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLogin(false);
        setInfoUser(null);
      }
    };

    checkAuth();
  }, [pathname]);
  return { isLogin, infoUser };
}
