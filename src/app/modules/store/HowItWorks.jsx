import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Scan, Settings } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500 transition-all">
    <div className="mb-4 p-3 bg-purple-600 rounded-lg w-fit">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const HowItWorks = () => {
  const features = [
    {
      icon: <Smartphone className="w-5 h-5 text-white" />,
      title: "Get Your Digital Card",
      description: "Start with a sleek, modern business card solution."
    },
    {
      icon: <Scan className="w-5 h-5 text-white" />,
      title: "Tap or Scan to Connect",
      description: "Instant profile access with NFC tap or QR scan."
    },
    {
      icon: <Settings className="w-5 h-5 text-white" />,
      title: "Customize Anytime",
      description: "Update your profile in real-time from anywhere."
    }
  ];

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Smart Digital Business Cards
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transform your networking with our digital solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;