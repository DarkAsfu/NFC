'use client'

import { useParams } from 'next/navigation';
import React from 'react';

const page = () => {
    const {slug} = useParams();
    console.log(slug);
    return (
        <div className=' bg-bG py-24'>
            <div className='max-w-7xl mx-auto'>
            <h1 className='text-tX'>{slug}</h1>
            </div>
        </div>
    );
};

export default page;