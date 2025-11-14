import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6"

export const HeaderMenu = (
  props: {
    showMenu: boolean
  }
) => {
  const { showMenu } = props;
  const { isLogin } = useAuth();

  const menuList = [
    {
      name: "Việc Làm IT",
      link: "#",
      children: [
        {
          name: "Việc làm IT theo kỹ năng",
          link: "#",
          children: [
            {
              name: "ReactJS",
              link: "#",
              children: null
            },
            {
              name: "NodeJS",
              link: "#",
              children: null
            }
          ]
        },
        {
          name: "Việc làm IT theo công ty",
          link: "#",
          children: null
        },
        {
          name: "Việc làm IT theo thành phố",
          link: "#",
          children: null
        }
      ]
    },
    {
      name: "Top Công Ty IT",
      link: "#",
      children: [
        {
          name: "FPT Software",
          link: "#",
          children: null
        },
        {
          name: "Techcombank",
          link: "#",
          children: null
        },
        {
          name: "MB Bank",
          link: "#",
          children: null
        }
      ]
    },
    {
      name: "Nhà Tuyển Dụng",
      link: "#",
      isLogin: false,
      children: [
        {
          name: "Đăng Nhập",
          link: "/company/login",
          children: null
        },
        {
          name: "Đăng Ký",
          link: "/company/register",
          children: null
        }
      ]
    }
  ];



  return (
    <>
      <nav className={"lg:block " + (showMenu ? "fixed top-0 left-0 w-[280px] h-[100vh] z-[999] bg-[#000056]" : "hidden")}>
        <ul className="flex gap-x-[30px] flex-wrap">
          {menuList.map((menu, index) => (
            <li
              key={index}
              className={"inline-flex lg:w-auto w-full lg:justify-start justify-between p-[10px] items-center gap-x-[8px] relative group/sub-1 flex-wrap " + (menu.isLogin !== undefined && menu.isLogin !== isLogin ? "hidden" : "")}
            >
              <Link
                href={menu.link}
                className="text-white font-[600] text-[16px]"
              >
                {menu.name}
              </Link>
              {menu.children && (
                <FaAngleDown className="text-white text-[16px]" />
              )}
              {menu.children && (
                <ul className="lg:absolute relative lg:top-[100%] top-0 left-[0px] lg:w-[280px] w-full bg-[#000065] hidden group-hover/sub-1:block z-[999]">
                  {menu.children.map((menuSub1, indexSub1) => (
                    <li
                      key={indexSub1}
                      className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2 flex-wrap"
                    >
                      <Link
                        href={menuSub1.link}
                        className="text-white font-[600] text-[16px]"
                      >
                        {menuSub1.name}
                      </Link>
                      {menuSub1.children && (
                        <FaAngleRight className="text-white text-[16px]" />
                      )}
                      {menuSub1.children && (
                        <ul className="lg:absolute relative top-[0px] lg:left-[100%] left-0 lg:w-[280px] w-full bg-[#000065] hidden group-hover/sub-2:block z-[999]">
                          {menu.children.map((menuSub2, indexSub2) => (
                            <li
                              key={indexSub2}
                              className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096]"
                            >
                              <a
                                href={menuSub2.link}
                                className="text-white font-[600] text-[16px]"
                              >
                                {menuSub2.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}