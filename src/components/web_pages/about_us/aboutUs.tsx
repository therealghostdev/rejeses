"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo_slider from "../../reusables/animation/logo_slider";

export default function AboutUs() {
  return (
    <section className="flex flex-col px-4 my-6">
      <div className="flex flex-col lg:justify-center lg:items-center w-full gap-y-4">
        <motion.header
          className="bg-[#4B006E] text-white py-6 lg:w-3/4 font-bricolage_grotesque lg:text-4xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">
              About Rejeses PM Consulting
            </h1>
          </div>
        </motion.header>

        <motion.div
          className="flex flex-col space-y-6 my-6 lg:w-3/4 gap-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-full flex flex-col gap-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#535353] font-bricolage_grotesque">
              We Build Skills. We Drive Success.
            </h2>
            <motion.div
              className="text-[#535353] flex flex-col gap-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <p className="text-lg my-2">
                At <strong>Rejeses PM Consulting,</strong> we are passionate
                about empowering individuals and organizations through
                exceptional training and mentoring in project management.
              </p>

              <p className="text-lg my-2">
                With a proven track record spanning over 18 years, we help
                project professionals and teams develop the skills, confidence,
                and knowledge they need to excel in today&apos;s dynamic
                business environment.
              </p>

              <p className="text-lg mt-2">
                While training and mentoring are our core focus, we also provide
                consulting services to help businesses overcome project
                challenges, optimize processes, and achieve their strategic
                goals.
              </p>
            </motion.div>
          </div>

          <div className="w-full flex flex-col gap-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#535353] font-bricolage_grotesque">
              Our Mission
            </h2>
            <motion.p
              className="text-lg text-[#535353]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              To equip individuals and organizations with the tools, skills, and
              strategies they need to deliver successful projects and achieve
              long-term growth.
            </motion.p>
          </div>

          <div className="w-full flex flex-col gap-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#535353] font-bricolage_grotesque">
              Our Vision
            </h2>
            <motion.p
              className="text-lg text-[#535353]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              To be a leading provider of project management training,
              mentoring, and consulting, transforming how businesses and
              professionals approach project delivery worldwide.
            </motion.p>
          </div>

          <div className="w-full flex flex-col gap-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#535353] font-bricolage_grotesque">
              Why Choose Us?
            </h2>
            <ul className="space-y-2 flex flex-col gap-y-2 text-[#535353]">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-[2px] text-lg">⭐</span>
                <div>
                  <p className="text-lg">
                    <b>Comprehensive Training:</b> From foundational principles
                    to advanced methodologies, we offer customized training
                    programs tailored to your needs.
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-[2px] text-lg">⭐</span>
                <div>
                  <p className="text-lg">
                    <b>Personalized Mentorship:</b> Our one-on-one mentoring
                    helps professionals overcome challenges, build confidence,
                    and achieve their career goals.
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-[2px] text-lg">⭐</span>
                <div>
                  <p className="text-lg">
                    <b>Consulting Expertise:</b> When needed, we step in to
                    provide actionable solutions for your project management
                    challenges.
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-[2px] text-lg">⭐</span>
                <div>
                  <p className="text-lg">
                    <b>Certified Excellence:</b> Led by certified PMPs with
                    extensive global experience.
                  </p>
                </div>
              </motion.li>
            </ul>
          </div>

          <div className="w-full flex flex-col gap-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#535353] font-bricolage_grotesque">
              Our Core Values
            </h2>
            <ul className="space-y-2 flex flex-col gap-y-2 text-[#535353]">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-[2px] text-lg">⭐</span>
                <div>
                  <p className="text-lg">
                    <b>Empowerment:</b> Equipping individuals and teams to
                    succeed.
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-[2px] text-lg">⭐</span>
                <div>
                  <p className="text-lg">
                    <b>Collaboration:</b> Building strong partnerships with our
                    clients.
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-[2px] text-lg">⭐</span>
                <div>
                  <p className="text-lg">
                    <b>Excellence:</b> Delivering top-tier services with
                    measurable results.
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.1 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-[2px] text-lg">⭐</span>
                <div>
                  <p className="text-lg">
                    <b>Adaptability:</b> Staying ahead in a rapidly changing
                    business landscape.
                  </p>
                </div>
              </motion.li>
            </ul>
          </div>

          <div className="w-full flex flex-col gap-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#535353] font-bricolage_grotesque">
              We have worked directly with such companies as
            </h2>
            <Logo_slider />
          </div>

          <div className="w-full flex flex-col gap-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#535353] font-bricolage_grotesque">
              Let&apos;s Grow Together
            </h2>
            <motion.div
              className="text-[#535353] flex flex-col gap-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1 }}
            >
              <p className="text-lg">
                Whether you&apos;re an aspiring project manager, a seasoned
                professional, or a business seeking project management
                expertise, <strong>Rejeses</strong> is here to support your
                journey.
              </p>

              <p className="text-lg my-2">
                Contact us today, or follow us on our social handles at the
                bottom of this page, to learn more about our training,
                mentoring, and consulting services.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="w-full flex justify-center items-center my-4">
          <span className="bg-[#89C13E] py-3 rounded-[.3rem]">
            <Link
              href="/training"
              className="bg-[#89C13E] text-white px-6 py-4 rounded-[.3rem] font-bricolage_grotesque transition_button4"
            >
              Enroll Now
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
