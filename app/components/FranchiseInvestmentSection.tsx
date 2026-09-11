"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play, Calculator, Sparkles, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  franchiseInvestmentConfig,
  benefitItemsData,
} from "@/app/data/franchiseInvestmentData";

import { BenefitItem } from "./franchise-investment/BenefitItem";
import { InvestmentTable } from "./franchise-investment/InvestmentTable";

// Register GSAP ScrollTrigger safely on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FranchiseInvestmentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pizzaRef = useRef<HTMLDivElement>(null);

  const [counterStarted, setCounterStarted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Motion values for subtle 3D card tilt & cursor parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
  const pizzaParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const pizzaParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const currentMouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const currentMouseY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !sectionRef.current) {
      setCounterStarted(true);
      return;
    }

    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      // 1. Fade & reveal Left Content
      if (leftContentRef.current) {
        const leftItems = leftContentRef.current.children;
        gsap.fromTo(
          Array.from(leftItems),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Right Investment Card Slide-in & 3D reveal
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            x: isMobile ? 0 : 40,
            y: isMobile ? 30 : 0,
            scale: 0.98,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              onEnter: () => setCounterStarted(true),
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Pizza Parallax Entrance (Desktop only)
      if (pizzaRef.current && !isMobile) {
        gsap.fromTo(
          pizzaRef.current,
          { x: -20, rotation: -3, scale: 0.96 },
          {
            x: 0,
            rotation: 1,
            scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // 4. Floating Ingredients Parallax (Tablet / Desktop only)
      if (!isMobile) {
        const floatingItems = sectionRef.current?.querySelectorAll(".floating-food");
        if (floatingItems) {
          floatingItems.forEach((item, idx) => {
            gsap.to(item, {
              y: -(idx + 1) * 18,
              rotation: (idx + 1) * 15,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-[#F7FBFF] dark:bg-slate-950 py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 selection:bg-[#079FE8] selection:text-white"
    >
      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      {/* Floating Ingredients Parallax - Only on Desktop/Tablet to avoid blocking text on mobile */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 hidden lg:block">
        {/* Floating Basil Leaf */}
        <motion.div
          className="floating-food absolute top-8 left-[6%] w-9 h-9 opacity-80"
          style={{ x: pizzaParallaxX, y: pizzaParallaxY }}
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-500 drop-shadow-md">
            <path d="M50 10 C20 30 10 70 50 90 C90 70 80 30 50 10 Z" fill="currentColor" opacity="0.85" />
            <path d="M50 10 L50 90" stroke="#047857" strokeWidth="3" />
          </svg>
        </motion.div>

        {/* Floating Tomato Slice */}
        <motion.div
          className="floating-food absolute bottom-16 left-[4%] w-8 h-8 opacity-80"
          style={{ x: pizzaParallaxX }}
        >
          <div className="w-full h-full rounded-full bg-rose-500 border-2 border-rose-300 shadow-md flex items-center justify-center p-1 opacity-90">
            <div className="w-2 h-2 rounded-full bg-amber-200" />
          </div>
        </motion.div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* ================================================== */}
          {/* LEFT SIDE (~48% Desktop / lg:col-span-6) */}
          {/* ================================================== */}
          <div ref={leftContentRef} className="lg:col-span-6 space-y-5 sm:space-y-6 relative pl-0 lg:pl-10 xl:pl-16 w-full min-w-0">
            
            {/* REALISTIC PIZZA IMAGE (Desktop only, positioned safely off canvas) */}
            <motion.div
              ref={pizzaRef}
              style={{ x: pizzaParallaxX, y: pizzaParallaxY }}
              className="hidden lg:block absolute -left-[320px] lg:-left-[380px] xl:-left-[430px] top-1/2 -translate-y-1/2 w-[340px] lg:w-[400px] xl:w-[460px] aspect-square pointer-events-none -z-10 opacity-75 transition-opacity duration-300"
            >
              <div className="relative w-full h-full drop-shadow-2xl">
                <Image
                  src="/pizza-board.jpg"
                  alt="Pizza Mood Gourmet Pizza"
                  fill
                  sizes="(max-width: 1024px) 0px, 460px"
                  priority
                  className="object-contain rounded-full shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Main Pill Badge */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-black tracking-wider uppercase bg-[#FFD21C] text-[#101A35] shadow-xs border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 shrink-0 fill-[#101A35]" />
                <span>{franchiseInvestmentConfig.badgeText}</span>
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1.5 relative z-10">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#101A35] dark:text-white tracking-tight leading-[1.15] break-words">
                {franchiseInvestmentConfig.mainHeadingLine1}
              </h1>
              <div className="relative inline-block max-w-full pb-1.5">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#079FE8] tracking-tight leading-[1.15] break-words">
                  {franchiseInvestmentConfig.mainHeadingLine2}
                </h2>
                {/* Yellow accent underline curve */}
                <svg className="w-full max-w-[260px] sm:max-w-full h-2.5 sm:h-3 text-[#FFD21C] absolute bottom-0 left-0 pointer-events-none" viewBox="0 0 200 20" fill="none">
                  <path d="M5 12 Q 100 22 195 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Description */}
            <div className="relative z-10">
              <p className="text-xs sm:text-sm lg:text-base text-slate-700 dark:text-slate-200 font-semibold leading-relaxed max-w-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border border-sky-100/60 dark:border-slate-800/60 shadow-2xs">
                {franchiseInvestmentConfig.description}
              </p>
            </div>

            {/* 3 Benefit Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 border-t border-sky-100 dark:border-slate-800">
              {benefitItemsData.map((item) => (
                <BenefitItem key={item.id} data={item} />
              ))}
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              {/* Primary CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const modalBtn = document.getElementById("open-franchise-modal");
                  if (modalBtn) modalBtn.click();
                  else window.location.href = "#franchise-form";
                }}
                className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-[#FFD21C] hover:bg-[#facc15] text-[#101A35] font-extrabold text-xs sm:text-sm md:text-base shadow-md shadow-amber-300/40 hover:shadow-amber-300/60 transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
              >
                <span className="whitespace-normal">{franchiseInvestmentConfig.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>

              {/* Secondary Video Button */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group inline-flex items-center justify-center sm:justify-start gap-3 px-4 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 border border-sky-100 dark:border-slate-700 text-[#101A35] dark:text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs cursor-pointer w-full sm:w-auto"
              >
                <span className="w-8 h-8 rounded-full bg-[#079FE8] text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </span>
                <div className="flex flex-col items-start leading-tight text-left">
                  <span className="font-bold text-[#101A35] dark:text-white">
                    {franchiseInvestmentConfig.secondaryCtaText}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal">
                    {franchiseInvestmentConfig.secondaryCtaSubtext}
                  </span>
                </div>
              </button>
            </div>

            {/* Handwritten Decorative Text - Good Food Good Mood */}
            <div className="pt-2 flex items-center gap-3 select-none">
              <div className="flex flex-col">
                <span className="font-serif italic text-lg sm:text-2xl font-bold text-[#101A35] dark:text-white tracking-wide rotate-[-3deg]">
                  Good Food
                </span>
                <span className="font-serif italic text-lg sm:text-2xl font-bold text-[#101A35] dark:text-white tracking-wide rotate-[-2deg] -mt-1">
                  Good Mood
                </span>
              </div>
              {/* Smile arc doodle */}
              <div className="text-[#FFD21C] -mt-1 sm:-mt-2">
                <svg className="w-8 sm:w-10 h-4 sm:h-5" viewBox="0 0 100 40" fill="none">
                  <path d="M10 10 Q 50 40 90 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="20" cy="8" r="4" fill="currentColor" />
                  <circle cx="80" cy="8" r="4" fill="currentColor" />
                </svg>
              </div>
            </div>

          </div>

          {/* ================================================== */}
          {/* RIGHT SIDE — SETUP EXPENSES CARD (~52% Desktop / lg:col-span-6) */}
          {/* ================================================== */}
          <div className="lg:col-span-6 w-full min-w-0">
            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY }}
              className="relative w-full rounded-[20px] sm:rounded-[24px] bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 p-4 sm:p-7 shadow-xl shadow-sky-900/5 transition-shadow duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-sky-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#E6F4FE] dark:bg-sky-950/80 text-[#079FE8] flex items-center justify-center shrink-0 shadow-2xs">
                    <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#101A35] dark:text-white tracking-tight">
                      {franchiseInvestmentConfig.cardTitle}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                      {franchiseInvestmentConfig.cardSubtitle}
                    </p>
                  </div>
                </div>

                {/* Pizza Mood Brand Badge */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-[#FFD21C] bg-[#079FE8] text-white flex flex-col items-center justify-center p-1 text-center shadow-sm">
                    <span className="text-[8px] font-black tracking-tighter leading-none uppercase">PIZZA</span>
                    <span className="text-[8px] font-black tracking-tighter leading-none uppercase text-[#FFD21C]">MOOD</span>
                  </div>
                </div>
              </div>

              {/* 3-COLUMN TABLE COMPONENT */}
              <div className="mt-5">
                <InvestmentTable counterStarted={counterStarted} />
              </div>

              {/* CARD FOOTER QUOTE BOX */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#EBF7FF] dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Quote className="w-4 h-4 text-[#079FE8] flex-shrink-0 rotate-180" />
                  <span>{franchiseInvestmentConfig.cardQuoteText}</span>
                </div>

                {/* Handwritten Doodle - More Pizza More Smiles */}
                <div className="flex-shrink-0 hidden sm:flex flex-col items-end leading-none select-none">
                  <span className="font-serif italic text-xs font-bold text-[#101A35] dark:text-white rotate-[3deg]">
                    More Pizza
                  </span>
                  <span className="font-serif italic text-xs font-bold text-[#101A35] dark:text-white rotate-[1deg]">
                    More Smiles
                  </span>
                  <div className="w-12 h-0.5 bg-[#FFD21C] mt-0.5 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Video Modal Trigger */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              ✕
            </button>
            <div className="aspect-video w-full flex items-center justify-center text-white bg-slate-900 p-8 text-center">
              <div>
                <Play className="w-14 h-14 text-[#079FE8] mx-auto mb-3 animate-pulse" />
                <h3 className="text-xl font-bold">Pizza Mood Franchise Model</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Transparent ₹12 Lakh Setup Expenses Breakdown & Growth Plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
