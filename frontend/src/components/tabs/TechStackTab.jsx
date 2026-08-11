import React from 'react';
import { motion } from 'framer-motion';
import { techStack } from '../../mock';

const TechStackTab = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
    >
      {techStack.map((tech, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{
            scale: 1.1,
            y: -10,
            boxShadow: '0 0 20px rgba(128,0,128,0.3)'
          }}
          className="relative group rounded-2xl p-6 bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 hover:border-purple-400/50 hover:bg-white/20" >
          {/* Devicon Icon */}
          <i
            className={`${tech.icon} text-4xl`}  // remove 'colored' class
            style={{ color: tech.color || "#fff" }} // only applies custom color if defined
          ></i>

          {/* Tech Name */}
          <span className="text-sm font-medium text-white group-hover:text-base text-center">
            {tech.name}
          </span>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-transparent group-hover:from-purple-100/20 group-hover:to-purple-300/20 transition-all duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TechStackTab;