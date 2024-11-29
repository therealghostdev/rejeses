"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Image */}
          <motion.div
            className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:min-h-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/contact_image.jpg"
              alt="Contact Us"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            className="lg:pl-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mx-auto max-w-lg lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-bricolage_grotesque">
                Get in touch
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                We&apos;d love to hear from you! Whether you have a question
                about our courses, need a career advice, or you want to make an
                enquiry, we&apos;re here for you.
              </p>
              {isSubmitted ? (
                <motion.div
                  className="mt-8 p-4 rounded-lg lg:text-3xl text-gray-500 text-2xl font-bold text-center font-bricolage_grotesque italic"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Thank you for your message! We&apos;ll get back to you soon.
                  <div className="my-6">
                    <motion.button
                      type="submit"
                      className="inline-flex w-full bg-[#89C13E] justify-center rounded-md border 
                      border-transparent bg-primary-green px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#89C13E]/90 
                      focus:outline-none focus:ring-2 focus:ring-[#89C13E] focus:ring-offset-2 sm:text-sm transition ease-in-out duration-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Go Back
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full rounded-md py-3 px-2 border-gray-300 shadow-sm border-none outline-none 
    focus:ring-2 focus:ring-[#89C13E] transition ease-in-out duration-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full rounded-md py-3 px-2 border-gray-300 shadow-sm border-none outline-none 
    focus:ring-2 focus:ring-[#89C13E] transition ease-in-out duration-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md py-3 px-2 border-gray-300 shadow-sm border-none outline-none 
    focus:ring-2 focus:ring-[#89C13E] transition ease-in-out duration-500"
                    ></textarea>
                  </div>
                  <div>
                    <motion.button
                      type="submit"
                      className="inline-flex w-full bg-[#89C13E] justify-center rounded-md border 
                      border-transparent bg-primary-green px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#89C13E]/90 
                      focus:outline-none focus:ring-2 focus:ring-[#89C13E] focus:ring-offset-2 sm:text-sm transition ease-in-out duration-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Message
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
