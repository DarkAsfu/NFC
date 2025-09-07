'use client';
import About from "../modules/store/About";
import BandMoto from "../modules/store/BandMoto";
import { HeroBanner } from "../modules/store/HeroBanner";

import dynamic from 'next/dynamic';
import { VideoPlayer } from "../modules/store/VideoPlayer";
import HowItWorks from "../modules/store/HowItWorks";
import ProductSection from "../modules/store/ProductSection";
import UniqueCollection from "../modules/store/UniqueCollection";
import WhatsWeProvide from "../modules/store/WhatsWeProvide";
import NFCSubscriptionPlans from "../modules/store/NFCSubscriptionPlans";
import { DualCarousel } from "../modules/store/DualCarousel";


// const Lanyard = dynamic(() => import('../modules/store/Lanyard'), { ssr: false });
const Home = () =>{
    return(
        <div>
            <HeroBanner/>
            <About/>
            <VideoPlayer/>
            <ProductSection/>
            {/* <UniqueCollection/> */}
            <DualCarousel/>
            <WhatsWeProvide/>
            <NFCSubscriptionPlans/>
            <BandMoto/>
            {/* <div className="hidden md:block">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </div> */}
        </div>
    )
}

export default Home;