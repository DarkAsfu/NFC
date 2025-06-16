import React from 'react';

const CTitle = ({title, className = ''}) => {
    return (
        <div>
            <h3 className={`text-[27px] text-black uppercase font-semibold text-center mb-4 ${className} `}>{title}</h3>
            <hr className='w-24 mx-auto border-2 border-primary mb-10' />
        </div>
    );
};

export default CTitle;