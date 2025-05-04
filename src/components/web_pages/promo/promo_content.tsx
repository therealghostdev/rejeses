"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ClassSchedule from "@/components/web_pages/training/class_schedule";
import { usePayment, useNavigation } from "@/utils/context/payment";
import data from "@/utils/data/training_data.json";
import { Switch } from "radix-ui";
import { TrainingType, PaymentInfo } from "@/utils/types/types";
import usePromoData from "@/utils/hooks/usePromoData";
import { getNextMondayDates } from "@/utils/reusables/functions";
import { notify } from "@/utils/reusables/functions";

export default function PromoPage() {
  const { promoData, isLoading } = usePromoData();
  const [selectedTraining, setSelectedTraining] = useState(data[0]);
  const { paymentInfo, setPaymentInfo, selectedType, setSelectedType } =
    usePayment();
  const { isNigeria, setIsNigeria } = useNavigation();
  const [visibleItems, setVisibleItems] = useState(6);

  const mondayDates = getNextMondayDates(15);
  const itemsReplica = data[0];

  const initialPaymentInfo: PaymentInfo = {
    price: 0,
    price2: 0,
    original_price: 0,
    original_price2: 0,
    training_id: null,
    training_type: "",
    start_date: "",
    classScheduleType: "",
    is_group: false,
    promoPrices: {
      isPromo: false,
      prices: {
        naira: {
          training: 0,
          mentoring: 0,
          "training&mentoring": 0,
        },
        dollar: {
          training: 0,
          mentoring: 0,
          "training&mentoring": 0,
        },
      },
    },
  };

  const handleSeeMore = () => {
    if (visibleItems < 15) {
      setVisibleItems(visibleItems + 3);
    } else {
      setVisibleItems(6);
    }
  };

  const displayItems = new Array(15).fill(itemsReplica).map((item, index) => ({
    ...item,
    cohortIndex: index % data.length,
    mondayDate: mondayDates[index],
  }));

  function formatPrice(price: number): string {
    if (price >= 1000) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return price.toString();
    }
  }

  const handleTrainingChange = (trainingId: string, mondayDate?: Date) => {
    const selected = data.find((item) => item.id.toString() === trainingId);
    if (selected) {
      setSelectedTraining(selected);

      if (mondayDate) {
        const formattedDate = mondayDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        setPaymentInfo((prev) => ({
          ...prev,
          start_date: formattedDate,
        }));
      }
    }
  };

  useEffect(() => {
    setPaymentInfo(initialPaymentInfo);
  }, []);

  const handleTypeChange = (type: TrainingType) => {
    setSelectedType(type);

    if (type === "training" || type === "training&mentoring") {
      const firstTraining = {
        ...data[0],
        cohortIndex: 0,
        mondayDate: mondayDates[0],
      };

      handleTrainingChange(
        firstTraining.id.toString(),
        firstTraining.mondayDate
      );
    }
  };

  const classSchedulePrice = () => {
    const nairaPrice = promoData?.prices.naira[selectedType] ?? 0;
    const dollarprice = promoData?.prices.dollar[selectedType] ?? 0;
    console.log(dollarprice, nairaPrice, "here");

    return { nairaPrice, dollarprice };
  };

  // Update payment info when selection changes
  useEffect(() => {
    if (selectedTraining && promoData) {
      // Get price based on selected type and currency
      const price = isNigeria
        ? promoData.prices.naira[selectedType]
        : promoData.prices.dollar[selectedType];

      // Original prices from training data for reference
      const originalPriceNGN =
        selectedType === "training"
          ? Number(
              selectedTraining.pricing.individuals[0].training_only?.price2 || 0
            )
          : selectedType === "mentoring"
          ? 450000 // Mentoring price
          : Number(
              selectedTraining.pricing.individuals[1].training_with_mentorship
                ?.price2 || 0
            );

      const originalPriceUSD =
        selectedType === "training"
          ? Number(
              selectedTraining.pricing.individuals[0].training_only?.price || 0
            )
          : selectedType === "mentoring"
          ? 300 // Mentoring price
          : Number(
              selectedTraining.pricing.individuals[1].training_with_mentorship
                ?.price || 0
            );

      setPaymentInfo((prev) => ({
        ...prev,
        price: isNigeria
          ? promoData.prices.naira[selectedType]
          : promoData.prices.dollar[selectedType],
        price2: isNigeria
          ? promoData.prices.dollar[selectedType]
          : promoData.prices.naira[selectedType],
        training_id: selectedTraining.id,
        training_type:
          selectedType === "mentoring"
            ? "Project Management Mentoring"
            : selectedType === "training&mentoring"
            ? `${selectedTraining.title} & Mentoring`
            : `Project Management Training`,
        start_date: prev.start_date || selectedTraining.start_date,
        training_option: `You are subscribing to <b>rejeses consult</b> ${
          selectedType === "mentoring"
            ? "3-month mentoring plan"
            : selectedType === "training&mentoring"
            ? "35-hour training plus 3-month mentorship plan"
            : "35-hour training plan"
        }. You will be charged ${isNigeria ? "NGN " : "$"}${formatPrice(
          price
        )} for this.`,
        is_group: false,
        promo: true,
        original_price: originalPriceNGN,
        original_price2: originalPriceUSD,
      }));
    }
  }, [selectedTraining, selectedType, isNigeria, promoData]);

  useEffect(() => {
    console.log("selectedType", selectedType);
    console.log("selectedTraining", selectedTraining);
    console.log("startDate", paymentInfo);
    if (selectedType && selectedTraining) {
      handleTypeChange(selectedType);
    }
  }, [selectedType, selectedTraining]);

  const routetoPath = (): string => {
    if (
      paymentInfo.start_date === "1st March, 2034" ||
      !paymentInfo.start_date ||
      paymentInfo.start_date === ""
    ) {
      return "";
    } else {
      return `/training/${paymentInfo.training_id}`;
    }
  };

  const notifyuser = () => {
    if (
      paymentInfo.start_date === "1st March, 2034" ||
      !paymentInfo.start_date ||
      paymentInfo.start_date === ""
    ) {
      notify("select a training schedule");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#4B006E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If promo is disabled according to the JSON file
  if (promoData && !promoData.isPromo) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 mb-6"
        >
          <Image
            src="/images/no-promo.svg"
            alt="No Promotions"
            width={96}
            height={96}
            className="opacity-70"
          />
        </motion.div>
        <motion.h2
          className="text-3xl font-bold font-bricolage_grotesque text-gray-700 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          No Ongoing Promotions
        </motion.h2>
        <motion.p
          className="text-gray-500 max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Check back later for special offers on our training programs and
          mentorship opportunities.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Banner */}
      <motion.div
        className="relative w-full bg-gradient-to-r from-[#4B006E] to-white py-20 px-6 md:px-12"
        variants={fadeIn}
      >
        <motion.div
          className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 opacity-10 text-[#4B006E]"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Circular border */}
            <path
              d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"
              fill="currentColor"
            />

            {/* Percentage symbols */}
            <circle cx="70" cy="70" r="12" fill="currentColor" />
            <circle cx="130" cy="130" r="12" fill="currentColor" />
            <path
              d="M140 60L60 140"
              stroke="currentColor"
              stroke-width="6"
              stroke-linecap="round"
            />

            {/* Price tag shapes */}
            <path
              d="M40 100l15-15h30l5-5v-20l-5-5h-20l-5 5-20 20v20z"
              fill="currentColor"
              fill-opacity="0.5"
            />
            <path
              d="M140 60l15 15v30l5 5h20l5-5v-20l-5-5-20-20h-20z"
              fill="currentColor"
              fill-opacity="0.5"
            />

            {/* Star burst elements */}
            <path
              d="M100 15l3 12-3-12zm0 170l-3-12 3 12zm85-85l-12 3 12-3zm-170 0l12-3-12 3z"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-2 mb-4"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-full bg-[gray] flex items-center justify-center">
              <span className="text-white font-bold text-xl">%</span>
            </div>
            <span className="text-[#89C13E] font-medium">
              Limited Time Offer
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold font-bricolage_grotesque mb-6 max-w-3xl"
            variants={itemVariants}
          >
            <span className="text-gray-300">Special</span>{" "}
            <span className="text-[#89C13E]">Promotional</span>{" "}
            <span className="text-gray-300">Prices</span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8"
            variants={itemVariants}
          >
            Advance your career with our professional training programs and
            mentoring at special promotional prices. Limited seats available.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <Link
              href="#training-options"
              className="bg-[#89C13E] text-white px-8 py-4 rounded-md font-medium transition-all hover:bg-opacity-90 text-center"
            >
              View Promotions
            </Link>
            <Link
              href="#schedule"
              className="border border-[#89C13E] text-white px-8 py-4 rounded-md font-medium transition-all hover:bg-gray-300 hover:text-[#4B006E] text-center"
            >
              See Schedule
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Currency Switcher */}
      <motion.div className="w-full bg-[#F9F9F9] py-6" variants={itemVariants}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-end items-center gap-3">
          <span
            className={`font-medium ${
              isNigeria ? "text-[#4B006E]" : "text-gray-500"
            }`}
          >
            USD
          </span>
          <Switch.Root
            checked={isNigeria}
            onCheckedChange={() => setIsNigeria(!isNigeria)}
            className="w-[42px] h-[25px] bg-gray-200 rounded-full relative data-[state=checked]:bg-[#4B006E] transition-colors"
          >
            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-md transition-transform translate-x-1 data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
          <span
            className={`font-medium ${
              !isNigeria ? "text-[#4B006E]" : "text-gray-500"
            }`}
          >
            NGN
          </span>
        </div>
      </motion.div>

      {/* Training Options */}
      <motion.div
        className="py-16 px-6 md:px-12"
        id="training-options"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold font-bricolage_grotesque mb-2 text-center"
            variants={itemVariants}
          >
            Choose Your Program
          </motion.h2>
          <motion.p
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Select a training program to view the promotional price and schedule
            details
          </motion.p>

          {/* Program Type Selection */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
            variants={containerVariants}
          >
            <motion.div
              className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md p-6 ${
                selectedType === "training"
                  ? "border-[#4B006E] shadow-md"
                  : "border-[#DBE1E7]"
              }`}
              onClick={() => handleTypeChange("training")}
              whileHover={{ scale: 1.02 }}
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold font-bricolage_grotesque mb-3">
                Training Only
              </h3>
              <p className="text-gray-600 mb-6">
                35-hour comprehensive training program with certification
                preparation.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#4B006E] font-medium">Promo Price:</span>
                <span className="text-[#4B006E] font-bold text-xl">
                  {isNigeria
                    ? `NGN ${formatPrice(
                        promoData?.prices.naira[selectedType] || 0
                      )}`
                    : `$${formatPrice(
                        promoData?.prices.dollar[selectedType] || 0
                      )}`}
                </span>
              </div>
            </motion.div>

            <motion.div
              className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md p-6 ${
                selectedType === "mentoring"
                  ? "border-[#4B006E] shadow-md"
                  : "border-[#DBE1E7]"
              }`}
              onClick={() => handleTypeChange("mentoring")}
              whileHover={{ scale: 1.02 }}
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold font-bricolage_grotesque mb-3">
                Mentoring Only
              </h3>
              <p className="text-gray-600 mb-6">
                3-month personalized mentoring program with industry experts.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#4B006E] font-medium">Promo Price:</span>
                <span className="text-[#4B006E] font-bold text-xl">
                  {isNigeria
                    ? `NGN ${formatPrice(
                        promoData?.prices.naira.mentoring || 0
                      )}`
                    : `$${formatPrice(
                        promoData?.prices.dollar.mentoring || 0
                      )}`}
                </span>
              </div>
            </motion.div>

            <motion.div
              className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md p-6 ${
                selectedType === "training&mentoring"
                  ? "border-[#4B006E] shadow-md"
                  : "border-[#DBE1E7]"
              }`}
              onClick={() => handleTypeChange("training&mentoring")}
              whileHover={{ scale: 1.02 }}
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold font-bricolage_grotesque mb-3">
                Training + Mentoring
              </h3>
              <p className="text-gray-600 mb-6">
                Complete package with 35-hour training and 6-month mentorship
                program.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#4B006E]  font-medium">
                  Promo Price:
                </span>
                <span className="text-[#4B006E]  font-bold text-xl">
                  {isNigeria
                    ? `NGN ${formatPrice(
                        promoData?.prices.naira["training&mentoring"] || 0
                      )}`
                    : `$${formatPrice(
                        promoData?.prices.dollar["training&mentoring"] || 0
                      )}`}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {selectedType !== "mentoring" && (
            <div>
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  className="text-3xl font-bold font-bricolage_grotesque mb-2 text-center"
                  variants={itemVariants}
                >
                  Course Schedule
                </motion.h2>
                <motion.p
                  className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
                  variants={itemVariants}
                >
                  Explore our training programs to discover exclusive
                  promotional pricing and detailed schedules tailored to your
                  availability. Choose the one that best fits your goals and get
                  started today.
                </motion.p>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {displayItems.slice(0, visibleItems).map((training, index) => (
                  <motion.div
                    key={`${training.id}-${index}`}
                    className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                      selectedTraining.id === training.id &&
                      paymentInfo.start_date ===
                        training.mondayDate.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        ? "border-[#4B006E] shadow-md"
                        : "border-[#DBE1E7]"
                    }`}
                    onClick={() =>
                      handleTrainingChange(
                        training.id.toString(),
                        training.mondayDate
                      )
                    }
                    whileHover={{ scale: 1.02 }}
                    variants={itemVariants}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold font-bricolage_grotesque mb-3">
                        {training.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-2">
                        {training.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500">Start Date:</span>
                        <span className="text-gray-700 font-medium">
                          {training.mondayDate.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#4B006E] font-medium">
                          Promo Price:
                        </span>
                        <span className="text-[#4B006E] font-bold text-xl">
                          {isNigeria
                            ? `NGN ${formatPrice(
                                promoData?.prices.naira[selectedType] || 0
                              )}`
                            : `$${formatPrice(
                                promoData?.prices.dollar[selectedType] || 0
                              )}`}
                        </span>
                      </div>
                    </div>

                    {selectedTraining.id === training.id &&
                      paymentInfo.start_date ===
                        training.mondayDate.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }) && (
                        <div className="bg-[#4B006E] text-gray-300 font-medium text-center py-2">
                          Selected
                        </div>
                      )}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex justify-center mt-8"
                variants={itemVariants}
              >
                <button
                  onClick={handleSeeMore}
                  className="bg-white border border-[#4B006E] text-[#4B006E] hover:bg-[#F5E0F0] px-8 py-3 rounded-md font-medium transition-all"
                >
                  {visibleItems >= 15 ? "See Less" : "See More"}
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        className="w-full bg-[#F9F9F9] py-16 px-6 md:px-12"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold font-bricolage_grotesque mb-12 text-center"
            variants={itemVariants}
          >
            What&apos;s Included
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {selectedType === "training" ||
            selectedType === "training&mentoring" ? (
              <>
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-sm border border-[#DBE1E7]"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#F5E0F0] flex items-center justify-center mb-4">
                    <Image
                      src="/trophy.svg"
                      alt="Certificate"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="text-lg font-bold font-bricolage_grotesque mb-2">
                    Certification Preparation
                  </h3>
                  <p className="text-gray-600">
                    35-hour CAPM/PMP/PMI-ACP training with certification
                    preparation materials.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-lg shadow-sm border border-[#DBE1E7]"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#F5E0F0] flex items-center justify-center mb-4">
                    <Image
                      src="/material.svg"
                      alt="Practice"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="text-lg font-bold font-bricolage_grotesque mb-2">
                    Practice Materials
                  </h3>
                  <p className="text-gray-600">
                    450 exam practice questions with detailed explanations and
                    answers.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-lg shadow-sm border border-[#DBE1E7]"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#F5E0F0] flex items-center justify-center mb-4">
                    <Image
                      src="/resources.svg"
                      alt="Resources"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="text-lg font-bold font-bricolage_grotesque mb-2">
                    Learning Resources
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive textbooks and guides to support your learning
                    journey.
                  </p>
                </motion.div>
              </>
            ) : null}

            {selectedType === "mentoring" ||
            selectedType === "training&mentoring" ? (
              <>
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-sm border border-[#DBE1E7]"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#F5E0F0] flex items-center justify-center mb-4">
                    <Image
                      src="/expert.svg"
                      alt="Mentoring"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="text-lg font-bold font-bricolage_grotesque mb-2">
                    Expert Mentoring
                  </h3>
                  <p className="text-gray-600">
                    One-on-one sessions with industry experts to guide your
                    professional growth.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-lg shadow-sm border border-[#DBE1E7]"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#F5E0F0] flex items-center justify-center mb-4">
                    <Image
                      src="/template.svg"
                      alt="Templates"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="text-lg font-bold font-bricolage_grotesque mb-2">
                    PM Templates
                  </h3>
                  <p className="text-gray-600">
                    Access to professional project management templates and
                    resources.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-lg shadow-sm border border-[#DBE1E7]"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#F5E0F0] flex items-center justify-center mb-4">
                    <Image
                      src="/network.svg"
                      alt="Network"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="text-lg font-bold font-bricolage_grotesque mb-2">
                    Professional Network
                  </h3>
                  <p className="text-gray-600">
                    Connect with like-minded professionals and build your
                    network.
                  </p>
                </motion.div>
              </>
            ) : null}
          </motion.div>
        </div>
      </motion.div>

      {/* Class Schedule or Mentoring CTA */}
      <motion.div
        className="py-16 px-6 md:px-12"
        id="schedule"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto">
          {selectedType === "mentoring" ? (
            <motion.div
              className="text-center py-12 border-2 border-[#DBE1E7] rounded-lg p-8"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold font-bricolage_grotesque mb-4">
                Personalized Mentoring Program
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                This is a personalized mentoring program with flexible
                scheduling tailored to your needs. You&apos;ll work directly
                with industry experts to accelerate your career growth.
              </p>
              <Link
                href={`/mentorship/pricing`}
                className="bg-[#89C13E] text-white px-12 py-4 rounded-md font-medium transition-all hover:bg-opacity-90 inline-block"
              >
                Pay now {isNigeria ? "NGN " : "$"}
                {formatPrice(
                  isNigeria
                    ? promoData?.prices.naira.mentoring || 0
                    : promoData?.prices.dollar.mentoring || 0
                )}
              </Link>
            </motion.div>
          ) : (
            <ClassSchedule
              data={selectedTraining.class_schedule || []}
              all={selectedTraining}
              promo={promoData?.isPromo || false}
              promoPrices={classSchedulePrice()}
            />
          )}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="w-full bg-[#4B006E] py-16 px-6 md:px-12 text-white"
        variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-bricolage_grotesque mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Limited Time Promotional Offer
          </motion.h2>
          <motion.p
            className="text-lg mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Take advantage of our special pricing and start your professional
            development journey today. These promotional prices won&apos;t last
            long!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {selectedType === "mentoring" ? (
              <Link
                href={`/mentorship/pricing`}
                className="bg-white text-[#4B006E] px-12 py-4 rounded-md font-medium transition-all hover:bg-opacity-90 inline-block"
              >
                Enroll Now
              </Link>
            ) : (
              <Link
                onClick={notifyuser}
                href={routetoPath()}
                className="bg-white text-[#4B006E] px-12 py-4 rounded-md font-medium transition-all hover:bg-opacity-90 inline-block"
              >
                Enroll Now
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
