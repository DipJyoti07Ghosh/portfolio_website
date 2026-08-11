import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaGithub, FaLinkedinIn, FaPlay, FaStop } from 'react-icons/fa6';
import { personalInfo, techTags } from '../mock';
import { Button } from './ui/button';
import profileImg from '../assets/myimage.png';
import { Mail, ExternalLink } from 'lucide-react';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  const texts = ['Tech Enthusiast', 'CSE (AI & ML) Student'];

  const ref = useRef(null);
  const requestRef = useRef(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });

  useEffect(() => {
    let timer;
    const currentText = texts[textIndex];

    if (!isDeleting && displayedText.length < currentText.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, 100);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      }, 50);
    } else if (!isDeleting && displayedText.length === currentText.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const smoothScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY < maxScroll - 2) {
      window.scrollBy(0, 3.5);
      requestRef.current = requestAnimationFrame(smoothScroll);
    } else {
      cancelAnimationFrame(requestRef.current);
      setIsAutoScrolling(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleAutoScroll = () => {
    if (isAutoScrolling) {
      cancelAnimationFrame(requestRef.current);
      setIsAutoScrolling(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAutoScrolling(true);
      requestRef.current = requestAnimationFrame(smoothScroll);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.20, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  const socialLinks = [
    { icon: FaLinkedinIn, url: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: FaGithub, url: personalInfo.github, label: 'GitHub' },
    { icon: FaInstagram, url: personalInfo.instagram, label: 'Instagram' }
  ];

  return (
    <>
      <AnimatePresence>
        {isAutoScrolling && scrolledPastHero && (
          <motion.button
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={toggleAutoScroll}
            className="fixed top-3 left-[35%] sm:left-[50%] md:left-[22%] z-[100] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-900/40 border border-red-500/50 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <FaStop className="w-3 h-3 text-red-400 animate-pulse" />
            <span className="text-sm font-medium text-red-200">Stop Tour</span>
          </motion.button>
        )}
      </AnimatePresence>

      <section ref={ref} id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] items-center gap-6">

            {/* LEFT */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="max-w-4xl text-left"
            >
              {/* Buttons, Heading, Tech Tags, Social Icons */}
              <motion.div variants={itemVariants} className="mb-8">
                <button
                  onClick={toggleAutoScroll}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 cursor-pointer ${isAutoScrolling
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-purple-500/10 border-purple-500/20'
                    }`}
                >
                  {isAutoScrolling ? (
                    <>
                      <FaStop className="w-3 h-3 text-red-400" />
                      <span className="text-sm font-medium text-red-300">Stop Tour</span>
                    </>
                  ) : (
                    <>
                      <FaPlay className="w-3 h-3 text-purple-400" />
                      <span className="text-sm font-medium text-purple-300">Ready to Auto Scroll 🚀</span>
                    </>
                  )}
                </button>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-bold mb-4" style={{ background: 'linear-gradient(to bottom, #ffffff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Hi👋,<br />I'm Dipjyoti Ghosh
              </motion.h1>

              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-white mb-6">
                {displayedText}<span className="animate-pulse">|</span>
              </motion.h2>

              <motion.p variants={itemVariants} className="text-lg text-gray-400 mb-8 max-w-2xl">{personalInfo.tagline}</motion.p>

              <motion.div variants={itemVariants} className="flex flex-nowrap overflow-x-auto gap-3 mb-8 scrollbar-hide">
                {techTags.map((tag, index) => (
                  <motion.span key={index} whileHover={{ y: -5, scale: 1.05 }} className="px-4 py-2 whitespace-nowrap rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-sm text-gray-300 backdrop-blur-sm">{tag}</motion.span>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button onClick={() => scrollToSection('portfolio')} className="px-8 py-6 text-base bg-purple-600 hover:bg-zinc-800 text-white">
                    Projects <ExternalLink size={18} />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button onClick={() => scrollToSection('contact')} variant="outline" className="px-8 py-6 text-base border-zinc-700 hover:bg-zinc-800 text-purple-700 hover:text-white">
                    Contact <Mail size={18} />
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a key={index} href={social.url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -6 }} className="w-12 h-12 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-colors">
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 4, type: "spring" }}
              className="flex justify-center lg:justify-end mt-10 lg:mt-0"
            >
              <motion.div animate={isInView ? { y: [0, -20, 0] } : { y: 0 }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative">
                <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-3xl scale-110"></div>
                {/* ✅ Responsive Image Position & Size */}
                <img
                  src={profileImg}
                  alt="profile"
                  className="
                  w-72 sm:w-80 md:w-[24rem] lg:w-[26rem]
                  h-72 sm:h-80 md:h-[24rem] lg:h-[26rem]
                  object-cover rounded-full
                  border-4 border-purple-500
                  relative z-10"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;