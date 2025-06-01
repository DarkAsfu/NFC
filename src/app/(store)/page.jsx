'use client';
import { HeroBanner } from "../modules/HeroBanner";

import dynamic from 'next/dynamic';

const Lanyard = dynamic(() => import('../modules/Lanyard'), { ssr: false });
const Home = () =>{
    return(
        <div>
            <HeroBanner/>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>
    )
}

export default Home;