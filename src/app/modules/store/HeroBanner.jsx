"use client"

import { ArrowRight, SmartphoneNfc, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

export function HeroBanner() {
  const videoRef = useRef(null)

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* YouTube Video Background - Responsive for all devices */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/v5snnfUFZw0?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=v5snnfUFZw0&rel=0&iv_load_policy=3"
            className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              pointerEvents: "none",
              width: "100vw",
              height: "56.25vw", // 16:9 aspect ratio
              minHeight: "100vh",
              minWidth: "177.78vh", // 16:9 aspect ratio
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="NFC Technology Background"
          />
        </div>

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content Overlay - Responsive for all devices */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl">
            {/* Logo/Badge - Responsive */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6 sm:mb-8 text-white">
              <div className="p-1 bg-primary rounded-full">
                <SmartphoneNfc className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-wide">THE FUTURE OF NETWORKING</span>
            </div>

            {/* Main Heading - Fully Responsive with custom breakpoint */}
            <h1 className="text-2xl min-[475px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 text-white">
              Create Your{" "}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Digital Identity
              </span>{" "}
              with NFC
            </h1>

            {/* Description - Responsive */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 max-w-3xl mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
              Design personalized NFC cards that instantly share your portfolio, contact info, or social profiles when
              scanned. Perfect for professionals, creators, and businesses.
            </p>

            {/* Call-to-Action Buttons - Mobile Optimized */}
            <div className="flex flex-col min-[475px]:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Button
                size="lg"
                className="group px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 w-full min-[475px]:w-auto"
              >
                Create Your Card Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold text-white border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 w-full min-[475px]:w-auto"
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                How It Works
              </Button>
            </div>

            {/* Stats - Mobile Responsive Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">10K+</div>
                <div className="text-xs sm:text-sm text-gray-300">Cards Created</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">99.9%</div>
                <div className="text-xs sm:text-sm text-gray-300">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on small screens */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
        <div className="flex flex-col items-center text-white/70 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs mt-2 font-medium">Scroll Down</span>
        </div>
      </div>
    </section>
  )
}
