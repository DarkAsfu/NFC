import React from 'react';

const WhatsWeProvide = () => {
    const ourServices = [
        {
            id: 1,
            title: 'No Language Barrier',
            description: 'Select any language and transfer your contact information to foreign business contacts\' phones in their language. Tago Card translates into any alphabet!',
            image: '/Multiple_Languages_720x.webp'
        },
        {
            id: 2,
            title: 'Forever Updates',
            description: 'Your contacts automatically receive your latest details even years later. When you update your information, all previous connections get access to your new details.',
            image: '/Forever_Updates_720x.webp'
        },
        {
            id: 3,
            title: 'Two-Way Contact Share',
            description: 'Obtain contact details from others while sharing yours. Receive their information directly to your email for easy import to your phone or email client.',
            image: '/Two_Way_Contact_Share_720x.webp'
        },
        {
            id: 4,
            title: 'Admin Panel',
            description: 'Manage multiple profiles, update contact information, and switch between different business roles easily through our convenient admin system.',
            image: '/Tago_Admin_Panel_720x.webp'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {ourServices.map((service, index) => (
                <div 
                    key={service.id}
                    className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
                        index % 2 === 1 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                    <div className="w-full md:w-1/2 order-1 md:order-none">
                        <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-none">
                        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WhatsWeProvide;