import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from 'react-icons/fa';
import { Send } from 'lucide-react';
import { personalInfo } from '../mock';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    emailjs.sendForm(
      'service_a9cxb7h',
      'template_qlu9w65',
      form,
      'opLNsZS2nRqQV3QhG'
    )
      .then(() => {
        setIsSent(true);
        form.reset();

        setTimeout(() => {
          setIsSent(false);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const smoothEase = [0.22, 1, 0.36, 1];

  const containerBox = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: smoothEase,
      },
    },
  };

  const containerSocial = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const containerForm = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -120, y: 100 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  };

  const itemRight = {
    hidden: { opacity: 0, x: 120, y: 100 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  };

  const socialLinks = [
    { name: 'LinkedIn', href: personalInfo.linkedin, icon: FaLinkedin },
    { name: 'GitHub', href: personalInfo.github, icon: FaGithub },
    { name: 'Instagram', href: personalInfo.instagram, icon: FaInstagram },
    { name: 'Discord', href: personalInfo.discord, icon: FaDiscord },
  ];

  return (
    <section id="contact" className="min-h-screen py-16 px-4 sm:px-6 flex items-center">
      <div className="max-w-6xl mx-auto w-full">

        {/* Title */}
        <div className="text-center mb-12">

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: false,
              margin: window.innerWidth < 640 ? "-30px" : "-110px",
              amount: window.innerWidth < 640 ? 0.6 : 0.3
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #A855F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-gray-400 text-lg"
          >
            Have something to discuss? Send me a message and let's talk.
          </motion.p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* LEFT */}
          <motion.div
            variants={containerBox}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
          >
            <div className="rounded-2xl p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 h-full">
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>

              <motion.div
                variants={containerSocial}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                className="space-y-4"
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      variants={itemLeft}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 rounded-xl p-4 bg-zinc-800/40 border border-zinc-700/40 hover:border-purple-500/40 hover:bg-zinc-800/60 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{social.name}</p>
                        <p className="text-white font-medium">{social.name} Profile</p>
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={containerBox}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 h-full flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center">

                {!isSent ? (

                  <motion.div
                    key={isSent ? "sent" : "form"}   // ✅ ADD THIS
                    variants={containerForm}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.3 }}
                    className="w-full space-y-6"
                  >

                    <motion.h3 variants={itemRight} className="text-2xl font-bold text-white mb-2">
                      Send Message
                    </motion.h3>

                    <motion.div variants={itemRight}>
                      <label className="block text-sm text-gray-300 mb-2">Name</label>
                      <Input name="name" required className="bg-zinc-800/50 border-zinc-700 text-white" />
                    </motion.div>

                    <motion.div variants={itemRight}>
                      <label className="block text-sm text-gray-300 mb-2">Email</label>
                      <Input name="email" type="email" required className="bg-zinc-800/50 border-zinc-700 text-white" />
                    </motion.div>

                    <motion.div variants={itemRight}>
                      <label className="block text-sm text-gray-300 mb-2">Message</label>
                      <Textarea name="message" rows={5} required className="bg-zinc-800/50 border-zinc-700 text-white resize-none" />
                    </motion.div>

                    <motion.div variants={itemRight}>
                      <motion.button
                        type="submit"
                        whileHover={{
                          y: -6,           // moves upward
                          scale: 1.02,     // slight zoom
                        }}
                        whileTap={{
                          y: -2,           // press down feel
                          scale: 0.98,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 rounded-md py-2 shadow-md hover:shadow-xl"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </motion.button>
                    </motion.div>
                  </motion.div>

                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-400 text-3xl">✓</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>

                    <p className="text-gray-400">
                      Thanks for reaching out. I’ll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;