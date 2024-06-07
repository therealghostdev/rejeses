"use client";

import Image from "next/image";
import Link from "next/link";
import { NavTypes } from "@/utils/types/types";
import navData from "@/utils/data/nav_data.json";
import { useEffect, useRef, useState } from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

export default function Nav_desktop() {
  const { logo, links, linkButtons }: NavTypes = navData;
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      setIsMobile(newWidth <= 767);
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

  return (
    <nav
      className="flex w-full justify-between items-center px-4 bg-white py-2"
      ref={navRef}
    >
      <section>
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={50}
          className="md:h-12 h-12"
        />
      </section>

      {!isMobile && (
        <>
          <section className="flex">
            <ul className="flex space-x-4">
              {links.map((link, index) => (
                <li key={index} className="list-none">
                  <Link href={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex space-x-4">
            {linkButtons.map((button, index) => (
              <Link
                key={index}
                href={button.url}
                className={button.className}
                style={{ borderRadius: ".5rem" }}
              >
                {button.label}
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

          {openMobileNav && (
            <div className="absolute top-12 left-0 w-full bg-white z-10 p-4">
              <section className="flex flex-col space-y-4">
                <ul className="flex flex-col space-y-4">
                  {links.map((link, index) => (
                    <li key={index} className="list-none">
                      <Link href={link.url}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="flex flex-col space-y-4 mt-4">
                {linkButtons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.url}
                    className={`${button.className} text-center`}
                    style={{ borderRadius: ".5rem" }}
                  >
                    {button.label}
                  </Link>
                ))}
              </section>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
