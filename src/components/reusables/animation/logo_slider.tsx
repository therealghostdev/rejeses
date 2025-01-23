import logos from "@/utils/data/logos.json";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function Logo_slider() {
  const controls = useAnimation();
  const pathName = usePathname();
  const isAboutPage = pathName === "/about-us";

  const startAnimation = useCallback(() => {
    controls.start({
      x: ["-100%", 0],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);
  return isAboutPage ? (
    <div className="w-full overflow-hidden">
      <motion.div
        className="lg:w-3/4 w-full flex md:justify-around justify-center items-center flex-nowrap gap-x-6"
        animate={controls}
      >
        {logos.concat(logos).map((logo, index) => (
          <Image
            key={index}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={`${logo.className} filter grayscale hover:grayscale-0 w-40`}
          />
        ))}
      </motion.div>
    </div>
  ) : (
    <motion.div
      className="lg:w-3/4 w-full flex md:justify-around justify-center items-center flex-nowrap gap-x-6"
      animate={controls}
    >
      {logos.concat(logos).map((logo, index) => (
        <Image
          key={index}
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className={`${logo.className} filter grayscale w-40 hover:grayscale-0`}
        />
      ))}
    </motion.div>
  );
}
