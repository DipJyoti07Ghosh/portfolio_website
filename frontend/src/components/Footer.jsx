import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-zinc-800/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto text-center"
      >
        <p className="text-gray-400 text-sm">
          © {currentYear} <b className='text-purple-700'>Dipjyoti Ghosh</b> - All Rights Reserved
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;