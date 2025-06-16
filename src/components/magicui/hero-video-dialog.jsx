/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export default function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className
}) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div className={cn("relative", className)}>
      <div
        className="group relative cursor-pointer"
        onClick={() => setIsVideoOpen(true)}>
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="w-full rounded-md border shadow-lg transition-all duration-300 ease-out group-hover:brightness-[0.8]" />
        <div
          className="absolute inset-0 flex scale-[0.95] items-center justify-center rounded-2xl transition-all duration-300 ease-out group-hover:scale-100">
          <div className="relative flex size-28 items-center justify-center">
            {/* Double ping animation for smoother effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/40"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1.8,
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                repeatDelay: 0.5
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/15"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1.4,
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8,
                repeatDelay: 0.5
              }}
            />
            
            {/* Main play button with smooth hover */}
            <motion.div
              className="flex size-20 items-center justify-center rounded-full bg-gradient-to-b from-primary/40 to-primary shadow-lg"
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.1,
                transition: { 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 15,
                  duration: 0.3
                }
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Play
                  className="size-8 fill-white text-white"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  }} 
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsVideoOpen(false)}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div
              {...selectedAnimation}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                mass: 0.5
              }}
              className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black">
                <XIcon className="size-5" />
              </motion.button>
              <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white/20">
                <iframe
                  src={videoSrc}
                  className="size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}