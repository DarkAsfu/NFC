import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative  overflow-hidden">
        <motion.img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={isHovered ? 'hover' : 'normal'}
        />
        {product.sale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            SALE
          </div>
        )}
      </div>

      <div className="p-3 md:p-5">
        <h3 className="text-[14px] md:text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-[12px] md:text-sm text-gray-500 mb-3">{product.material}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-[12px] md:text-lg font-bold text-gray-900">Tk {product.price}</span>
          {product.originalPrice && (
            <span className="text-[12px] md:text-sm text-gray-400 line-through">Tk {product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;