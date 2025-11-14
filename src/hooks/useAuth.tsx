/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [infoUser, setInfoUser] = useState<any>();
  const [infoCompany, setInfoCompany] = useState<any>();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
          credentials: "include",
        });

        if (!res.ok) {
          setIsLogin(false);
          setInfoUser(null);
          setInfoCompany(null);
          return;
        }
        const data = await res.json();

        if (data.infoUser) {
          setIsLogin(true);
          setInfoUser(data.infoUser);
          setInfoCompany(null);
        }

        if (data.infoCompany) {
          setIsLogin(true);
          setInfoCompany(data.infoCompany);
          setInfoUser(null);
        }

      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLogin(false);
        setInfoUser(null);
        setInfoCompany(null);
      }
    };

    checkAuth();
  }, [pathname]);
  return { isLogin, infoUser, infoCompany };
}
