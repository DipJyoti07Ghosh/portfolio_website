import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../mock';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'portfolio', 'gallery', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ FIXED SCROLL FUNCTION WITH OFFSET
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // adjust if needed
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'gallery', label: 'Gallery' }, // ✅ Gallery works now
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-900/40 backdrop-blur-md border-b border-zinc-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-white cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            {personalInfo.name}
          </motion.div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <span
                  className={`relative z-10 transition-colors duration-300 font-semibold ${
                    activeSection === link.id
                      ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
                      : "text-gray-300 group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] group-hover:bg-clip-text group-hover:text-transparent"
                  }`}
                >
                  {link.label}
                </span>

                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${
                    activeSection === link.id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </motion.button>
            ))}
          </nav>

          {/* MOBILE ICON */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white z-50 relative w-6 h-6"
            animate={menuOpen ? "open" : "closed"}
          >
            <motion.span
              className="absolute left-0 top-1 w-6 h-0.5 bg-white"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 },
              }}
            />
            <motion.span
              className="absolute left-0 top-3 w-6 h-0.5 bg-white"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
            />
            <motion.span
              className="absolute left-0 top-5 w-6 h-0.5 bg-white"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 },
              }}
            />
          </motion.button>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: -20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-6 right-6 w-72 
                  bg-zinc-900 
                  border border-zinc-800
                  rounded-2xl p-7 flex flex-col gap-6 
                  shadow-2xl"
                >
                  {navLinks.map((link) => (
                    <motion.button
                      key={link.id}
                      onClick={() => {
                        scrollToSection(link.id);
                        setMenuOpen(false);
                      }}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      className="text-left py-2 px-2"
                    >
                      <span className="relative inline-block group">
                        <span
                          className={`text-base font-medium transition-all duration-300 ${
                            activeSection === link.id
                              ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
                              : "text-gray-300 group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] group-hover:bg-clip-text group-hover:text-transparent"
                          }`}
                        >
                          {link.label}
                        </span>

                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] origin-left transition-transform duration-300 ${
                            activeSection === link.id
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;