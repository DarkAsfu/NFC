import Link from 'next/link';
import React from 'react';

const CButton = ({ label, href, className = '', target = '_self', rel = 'noopener noreferrer' }) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center text-center font-medium transition-all duration-300 ${className}`}
      target={target}
      rel={target === '_blank' ? rel : undefined}
    >
      {label}
      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
};

export default CButton;