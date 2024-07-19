"use client";

import Image from "next/image";
import Link from "next/link";
import { NavTypes } from "@/utils/types/types";
import navData from "@/utils/data/nav_data.json";
import { useEffect, useRef, useState, useMemo } from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav_desktop() {
  const { logo, links, linkButtons }: NavTypes = navData;
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const decodedPathname = useMemo(
    () => decodeURIComponent(pathname),
    [pathname]
  );

  useEffect(() => {
    const updateWidth = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      setIsMobile(newWidth <= 1023);
    };

    window.addEventListener("resize", updateWidth);

    // Initial check
    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const handleHamburgerClick = () => {
    setOpenMobileNav(!openMobileNav);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMobileNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (linkUrl: string) => {
    const cleanLinkUrl = linkUrl.replace(/\/$/, "");
    const cleanPathname = decodedPathname.replace(/\/$/, "");

    return (
      cleanPathname === cleanLinkUrl || cleanPathname.startsWith(cleanLinkUrl)
    );
  };

  const handleMobileNavClick = () => {
    setOpenMobileNav(false);
  };

  const router = useRouter();

  const handleEnrollClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (pathname === "/training") {
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/training#pricing");
    }
  };

  return (
    <nav
      className="flex w-full justify-between items-center px-4 bg-white py-2 font-bricolage_grotesque lg:px-16 md:px-8 md:py-5"
      ref={navRef}
    >
      <section>
        <Link href={`/`}>
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={50}
            className="md:h-16 h-12"
          />
        </Link>
      </section>

      {!isMobile && (
        <>
          <section className="flex lg:ml-12 lg:mr-12 items-center">
            <ul className="flex lg:space-x-10 space-x-4">
              {links.map((link, index) => (
                <li
                  key={index}
                  className="list-none text-nowrap text-ellipsis font-bold"
                >
                  <Link
                    href={link.url}
                    className={`hover:text-[#89C13E] transition_border1 py-1 ${
                      isActive(link.url) ? "text-[#89C13E]" : ""
                    }`}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex space-x-4">
            {linkButtons.map((button, index) => (
              <Link
                key={index}
                href={button.url}
                // onClick={
                //   button.label === "Enroll Now" ? handleEnrollClick : undefined
                // }
                className={`${button.className} lg:w-[150px] md:text-center`}
                style={{
                  backgroundColor: index === 0 ? "#FFFFFF" : "#89C13E",
                  borderRadius: ".3rem",
                }}
              >
                {button.label.toUpperCase()}
              </Link>
            ))}
          </section>
        </>
      )}

      {isMobile && (
        <div>
          <button onClick={handleHamburgerClick} className="focus:outline-none">
            {!openMobileNav ? (
              <HamburgerMenuIcon width="30px" height="30px" color="#090909" />
            ) : (
              <Cross1Icon width="30px" height="30px" color="#090909" />
            )}
          </button>

          <AnimatePresence>
            {openMobileNav && (
              <motion.div
                className="absolute md:top-20 top-12 left-0 w-full bg-white z-10 p-4 md:px-14 px-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <section className="flex flex-col space-y-4">
                  <ul className="flex flex-col space-y-4">
                    {links.map((link, index) => (
                      <li key={index} className="list-none">
                        <Link
                          onClick={handleMobileNavClick}
                          href={link.url}
                          className={`hover:text-[#89C13E] transition_border1 py-1 ${
                            isActive(link.url) ? "text-[#89C13E]" : ""
                          }`}
                        >
                          {link.label.toUpperCase()}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="flex flex-col space-y-4">
                  {linkButtons.map((button, index) => (
                    <Link
                      key={index}
                      href={button.url}
                      // onClick={
                      //   button.label === "Enroll Now"
                      //     ? handleEnrollClick
                      //     : undefined
                      // }
                      className={`${button.className} w-full text-center`}
                      style={{
                        backgroundColor: index === 0 ? "#FFFFFF" : "#89C13E",
                        borderRadius: ".3rem",
                      }}
                    >
                      {button.label.toUpperCase()}
                    </Link>
                  ))}
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  );
}
