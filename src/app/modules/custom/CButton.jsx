import Link from 'next/link';
import React from 'react';

const CButton = ({ label, href, className = '', target = '_self', rel = 'noopener noreferrer' }) => {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md font-medium bg-primary text-white transition-colors duration-200 ${className}`}
      target={target}
      rel={target === '_blank' ? rel : undefined}
    >
      {label}
    </Link>
  );
};

export default CButton;