import ScrollBaseAnimation from '@/components/ui/text-marquee';
import React from 'react';
function BandMoto() {
  return (
    <>
      <div className="bg-bG h-[200px] md:h-[500px] grid place-content-center">
        <hr className='border border-[#eee0ff12] mb-8' />
        <ScrollBaseAnimation
          delay={200}
          baseVelocity={-3}
          clasname="font-bold uppercase tracking-[-0.07em] md:leading-[150px] text-primary">
          TAP · SCAN · SEND ·         
        </ScrollBaseAnimation>
        <ScrollBaseAnimation
          delay={200}
          baseVelocity={3}
          clasname="font-bold uppercase tracking-[-0.07em] md:leading-[150px] text-white">
          TAP · SCAN · SEND · 
        </ScrollBaseAnimation>
      </div>
    </>
  );
}
export default BandMoto;
