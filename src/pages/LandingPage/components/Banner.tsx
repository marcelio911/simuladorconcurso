import React from 'react';
import { motion } from 'framer-motion';

interface BannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="relative bg-cover bg-center h-36"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="bg-blue-500 text-white p-8 text-left" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-xl">{subtitle}</p>
      </div>
    </motion.div >
  );
};

export default Banner;
