import ScrollBaseAnimation from '@/components/ui/text-marquee';
import React from 'react';
function BandMoto() {
  return (
    <>
      <div className="bg-gray-100 h-[200px] md:h-[500px] grid place-content-center">
        <ScrollBaseAnimation
          delay={200}
          baseVelocity={-3}
          clasname="font-bold uppercase tracking-[-0.07em] leading-[90%] text-primary">
          TAP · SCAN · SEND ·         
        </ScrollBaseAnimation>
        <ScrollBaseAnimation
          delay={200}
          baseVelocity={3}
          clasname="font-bold uppercase tracking-[-0.07em] leading-[90%]">
          TAP · SCAN · SEND · 
        </ScrollBaseAnimation>
      </div>
    </>
  );
}
export default BandMoto;
