"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import CTitle from "../custom/CTitle"

const afterCards = [
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/c0a3c5b9-2fa1-4c20-d5a2-e821455fd700/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/5eb25bd7-3f2a-4fb8-f8e6-fba43216ca00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/d04cce45-8bdd-44f4-2764-bbc3fb359200/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/ea90e8ee-3894-4b99-feaa-d38faf810e00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/8e16a8ca-0040-439b-7eb2-a40ab3aee600/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/86138147-c82c-4921-7419-db8fb14d5600/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/30a7bdbc-314e-4342-855a-2df8faf2b000/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/234dab21-99d8-4332-78ea-575f468e8f00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/f6682678-bcf1-48d1-5535-e51c4c542d00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/d2a5fb83-b72d-4dc3-f745-08b0d504e900/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/d68df4f9-bbd7-4753-da2f-fff8a477b000/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/c9477c6e-8557-4847-2dcc-feb8b2ed5500/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/13e6f282-7898-4452-4868-d6af4feca000/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/02be9a09-f154-49e7-e658-742df21e3400/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/a45b8fd5-f8a4-4e40-91af-113e5acb8600/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/e72baf45-1914-4b75-1acc-ce598b55db00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/0e9f425d-e39a-4741-8c20-c210e5b49500/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/acbd61df-964e-4979-28b5-4d7454322600/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/98c0099b-f0b8-4e98-1ed2-65cd2c7f6100/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/b97d8d0a-a837-4e49-3112-a2bfccf9cb00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/112eeb13-cecd-4fc3-bed6-68cf77e6fd00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/21333a9c-aa8a-4296-4563-205746639d00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/336772c6-de20-4507-022f-7d793ba10700/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/a252774e-08f4-4c6e-676d-5077707c6400/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/6d9ea60f-6dee-4513-e205-825058fc4b00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/8b7ff120-3329-4f9a-921f-802d5a12e400/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/c741c2ed-f54c-439d-07c0-3c4bf4f14800/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/b9350dec-c7fa-4aa9-b2ec-e9656c3b8b00/cards",
]

const beforeCards = [
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/fcca3762-00a3-484c-8fc2-cbb445dcb700/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/4b83d360-9dd8-481d-be1f-f3626c476900/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/c0f32299-bc10-45f8-a15e-a5ed51e0f100/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/28b19b2d-05c5-4d69-f53a-93f9d9df3200/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/ca698d25-b6ac-4a8a-110c-c5b533995200/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/eaa02ea1-216f-45cc-6bfe-24e4a1dfc600/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/b5b8f938-4fc4-4e04-1113-cf34a9329100/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/249f2ff1-4e4a-4717-287c-bf2139359100/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/34701a86-771d-457e-2a35-ca310e491100/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/5e0dbdba-a5d2-4416-df9b-614f5cf63f00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/77c73756-7283-4840-3f18-6c3fb091a200/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/7a533e8e-8483-40c3-0b0f-668c9771cd00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/930f7f37-2bb7-4568-65b5-704537811c00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/9c2b0d8f-acda-4814-ba78-52b6f5362300/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/13fe8c19-3b3b-4149-4d89-eea2a5871d00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/461b745c-a043-45ef-c5a8-8a3fded39c00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/b8c3653b-7372-4ca0-286d-81e8b7435300/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/332ec329-0fa7-4c9d-d153-ec83517d0f00/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/29ef5272-eca7-4add-8fed-089084f8a400/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/209242f1-ae2d-4be6-6edd-1ecccdde7700/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/feae6938-9f01-4246-0524-99ec8061c400/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/4449c351-c4d5-4c77-19c3-d8e82e855400/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/cd09aaad-2395-4abc-9e05-8f1e58400200/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/b925c264-dc07-4293-5701-fd74428a2600/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/47299a76-dae8-420e-1ebd-e86d5120c700/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/45054188-7b4f-4249-6a78-d92a1a339300/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/154db486-8e5a-47c2-9436-85dd3ce46100/cards",
  "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/0a65e29c-ccbf-46a8-7265-46802a4eb600/cards",
]

export function DualCarousel() {
  const beforeRef = useRef(null)
  const afterRef = useRef(null)

  useEffect(() => {
    const animateMarquee = () => {
      if (beforeRef.current && afterRef.current) {
        const scrollSpeed = 0.1
        const currentTime = Date.now() * scrollSpeed
        const translateX = -((currentTime % (beforeCards.length * 204)) % (beforeCards.length * 204))

        beforeRef.current.style.transform = `translate3d(${translateX}px, 0px, 0px)`
        afterRef.current.style.transform = `translate3d(${translateX}px, 0px, 0px)`
      }
    }

    const interval = setInterval(animateMarquee, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-[#010313] py-8 pb-1">
      
    <CTitle title={'Our Exclusive Card Designs'} />
      {/* Split Screen Marquee */}
      <div className="pointer-events-none relative my-14 flex w-full select-none flex-col items-center">
        {/* Before Cards (Left Side) */}
        <div className="w-full overflow-hidden" style={{ clipPath: "inset(0 50% 0 0)" }}>
          <div className="flex" ref={beforeRef}>
            {[...beforeCards, ...beforeCards].map((cardUrl, index) => (
              <div
                key={`before-${index}`}
                className="relative ml-4 h-[260px] w-[200px] shrink-0 grow-0 basis-auto rounded-xl border border-neutral-200 bg-secondary"
                style={{ transform: "translate3d(0px, 0px, 0px)" }}
              >
                <Image
                  alt="Before"
                  loading="lazy"
                  decoding="async"
                  fill
                  className="object-contain object-center p-0"
                  sizes="200px"
                  src={cardUrl || "/placeholder.svg"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center Divider with Blue Glow */}
        <div className="absolute z-10 h-[calc(100%+20px)] w-[10px] translate-y-[-10px] rounded-full bg-white shadow-[0_0_20px_5px_rgba(5,130,255,0.75)]"></div>

        {/* After Cards (Right Side) */}
        <div className="absolute w-full overflow-hidden" style={{ clipPath: "inset(0 0 0 50%)" }}>
          <div className="flex" ref={afterRef}>
            {[...afterCards, ...afterCards].map((cardUrl, index) => (
              <div
                key={`after-${index}`}
                className="relative ml-4 h-[260px] w-[200px] shrink-0 grow-0 basis-auto rounded-xl border border-neutral-200 bg-secondary p-2"
                style={{ transform: "translate3d(0px, 0px, 0px)" }}
              >
                <Image
                  alt="After"
                  loading="lazy"
                  decoding="async"
                  fill
                  className="object-contain object-center p-2"
                  sizes="200px"
                  src={cardUrl || "/placeholder.svg"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
