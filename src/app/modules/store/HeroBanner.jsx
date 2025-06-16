"use client";

import { ArrowRight, SmartphoneNfc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export function HeroBanner() {
  const videoRef = useRef(null);

  return (
    <section className="relative w-full aspect-video overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          ref={videoRef}
          src="https://www.youtube.com/embed/v5snnfUFZw0?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=v5snnfUFZw0"
          className="w-full h-full"
          style={{ pointerEvents: 'none' }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="NFC Technology Background"
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Overlay */}
      <div className="max-w-7xl px-4 xl:px-0 mx-auto relative z-10 h-full flex items-center">
        <div className="">
          <div className="max-w-3xl space-y-6 text-white">
            {/* Logo/Badge */}
            <div className="inline-flex items-center gap-2 px-4 md:py-2 bg-primary/90 rounded-full my-4 text-[12px]">
              <SmartphoneNfc className="h-3 w-4 md:h-4 md:w-5" />
              <span className="font-medium">The Future of Networking</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[14px] sm:text-2xl md:text-4xl lg:text-6xl font-bold leading-tight mb-4">
              Create Your <span className="text-primary">Digital Identity</span> with NFC
            </h1>

            {/* Description */}
            <p className="text-[10px] mb-4 sm:text-[14px] md:text-lg lg:text-xl text-gray-300 max-w-2xl">
              Design your personalized NFC cards that instantly share your portfolio, 
              contact info, or social profiles when scanned. Perfect for professionals, 
              creators, and businesses looking to make lasting connections.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap gap-4  md:pt-4">
              <Button size="lg" className="gap-2 text-[10px]">
                Create Your Card Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="text-primary text-[10px] border-0 hover:bg-primary hover:text-white">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce w-6 h-10 border-4 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white mt-2 rounded-full" />
        </div>
      </div> */}
    </section>
  );
}