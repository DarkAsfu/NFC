import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CTitle from '../custom/CTitle';

const NFCSubscriptionPlans = () => {
  const plans = [
    {
      id: 1,
      name: "Monthly Plan",
      tagline: "Flexible subscription",
      description: "Perfect for trying out our NFC solutions with minimal commitment.",
      price: "$9.99",
      period: "per month",
      features: [
        "1 NFC card included",
        "Free replacement every 6 months",
        "Basic customer support",
        "Cancel anytime"
      ],
      cta: "Start Monthly",
      image: "/monthly.png",
      imageAlt: "Monthly NFC subscription",
      popular: false
    },
    {
      id: 2,
      name: "Yearly Plan",
      tagline: "Best value",
      description: "Get two months free when you commit to a full year.",
      price: "$99.99",
      period: "per year",
      features: [
        "2 NFC cards included",
        "Free replacement every 4 months",
        "Priority customer support",
        "Save 17% vs monthly"
      ],
      cta: "Start Yearly",
      image: "/yearly.png",
      imageAlt: "Yearly NFC subscription",
      popular: true
    },
    {
      id: 3,
      name: "One-Time Purchase",
      tagline: "Own it forever",
      description: "For those who prefer a single purchase with lifetime durability.",
      price: "$49.99",
      period: "one-time",
      features: [
        "1 premium NFC card",
        "Lifetime warranty",
        "Free design customization",
        "Priority customer support"
      ],
      cta: "Buy Now",
      image: "/one-time.jpg",
      imageAlt: "One-time NFC purchase",
      popular: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#010313]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-purple-900/20 blur-3xl"></div>
        <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-blue-900/20 blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto">
       <CTitle title={'Choose Your Plan'} />

        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              transition={{ duration: 0.6 }}
              className="bg-[#eee0ff12] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative border border-white/10"
            >
              {plan.popular && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-3 py-1 rounded-full text-xs transform rotate-6 z-10">
                  MOST POPULAR
                </div>
              )}
              
              <div className="flex-1">
                {/* Image Container */}
                <div className="relative h-40 w-full mb-6 rounded-lg overflow-hidden bg-white/5">
                  <Image
                    src={plan.image}
                    alt={plan.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-lg font-medium text-purple-300">{plan.tagline}</p>
                </div>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-[#EEE0FF]/80 ml-1">{plan.period}</span>
                </div>
                
                <p className="text-[#EEE0FF]/80 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-purple-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#EEE0FF]/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 w-full hover:from-purple-700 hover:to-blue-700"
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NFCSubscriptionPlans;