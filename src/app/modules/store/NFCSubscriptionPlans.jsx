import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
      bgGradient: "bg-gradient-to-br from-purple-50 to-indigo-100",
      accentColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
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
      bgGradient: "bg-gradient-to-br from-blue-50 to-cyan-100",
      accentColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
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
      bgGradient: "bg-gradient-to-br from-green-50 to-teal-100",
      accentColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-900 mb-4"
        >
          Choose Your Plan
        </motion.h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Get your custom NFC cards with flexible payment options to suit your needs.
        </p>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              transition={{ duration: 0.6 }}
              className={`${plan.bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative`}
            >
              {plan.popular && (
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs transform rotate-6">
                  MOST POPULAR
                </div>
              )}
              
              <div className="flex-1">
                {/* Image Container */}
                <div className="relative h-40 w-full mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={plan.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className={`text-lg font-medium ${plan.accentColor}`}>{plan.tagline}</p>
                </div>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                
                <p className="text-gray-700 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className={`flex-shrink-0 h-5 w-5 ${plan.accentColor} mr-2 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${plan.buttonColor} text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 w-full`}
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