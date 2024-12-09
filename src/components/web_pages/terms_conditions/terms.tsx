"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      title: "Introduction",
      content:
        "Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use:",
    },
    {
      title: "Use of Website",
      content:
        "The content of the pages of this website is for your general information and use only. It is subject to change without notice.",
    },
    {
      title: "Intellectual Property",
      content:
        "This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice.",
    },
    {
      title: "Limitations of Liability",
      content:
        "Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.",
    },
    {
      title: "Governing Law",
      content:
        "Your use of this website and any dispute arising out of such use of the website is subject to the laws of your country of residence.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-[#89C13E] mb-8 text-center font-bricolage_grotesque"
        >
          Terms and Conditions
        </motion.h1>

        {sections.map((section, index) => (
          <motion.div key={index} variants={itemVariants} className="mb-6 my-12">
            <motion.h2
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setActiveSection(
                  activeSection === section.title ? null : section.title
                )
              }
              className="text-2xl font-semibold text-[#89C13E] py-4 font-bricolage_grotesque cursor-pointer mb-2 flex justify-between items-center"
            >
              {section.title}
              <motion.span
                animate={{ rotate: activeSection === section.title ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl"
              >
                ▼
              </motion.span>
            </motion.h2>
            <AnimatePresence>
              {activeSection === section.title && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <p className="text-[#5B5B5B] text-xl">{section.content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center bg-[#89C13E] bg-opacity-10 py-4 rounded-lg"
        >
          <p className="text-lg text-[#5B5B5B]">
            By using this website, you agree to these terms and conditions.
          </p>
          <p className="text-[#89C13E] text-lg mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
