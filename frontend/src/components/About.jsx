import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Eye, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const About = () => {
  const [aboutStats, setAboutStats] = useState([]);
  const [resumeUrl, setResumeUrl] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/resume`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Resume:", data);
        setResumeUrl(data.googleDriveUrl);
      })
      .catch((err) => console.error(err));
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const top = element.offsetTop;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (url) => {
    if (!url) return;

    if (url.startsWith("#")) {
      const sectionId = url.substring(1);
      scrollToSection(sectionId);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/about-stats`)
      .then((res) => res.json())
      .then((data) => {
        console.log("About Stats:", data);
        setAboutStats(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔁 Re-trigger animation every time
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });

  // 🔥 Stagger for text flow
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.01,
      },
    },
  };

  // ✨ Text animation
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 18,
      },
    },
  };

  // 💎 Smooth card physics
  const smoothCardTransition = {
    type: "spring",
    stiffness: 45,
    damping: 16,
    mass: 1.2,
    restDelta: 0.001,
  };

  // 🎬 MICRO DELAY PER CARD
  const leftCard = {
    hidden: { opacity: 0, x: -180 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ...smoothCardTransition,
        delay: 0.2,
        opacity: { duration: 0.2 },
      },
    },
  };

  const middleCard = {
    hidden: { opacity: 0, y: 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...smoothCardTransition,
        delay: 0.2,
        opacity: { duration: 0.2 },
      },
    },
  };

  const rightCard = {
    hidden: { opacity: 0, x: 180 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ...smoothCardTransition,
        delay: 0.2,
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen py-20 px-6 flex items-center relative z-10"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Heading */}
          <motion.h2
            variants={textVariants}
            className="text-5xl md:text-6xl font-bold mb-8 tracking-tight text-center"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #A855F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About Me
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            variants={textVariants}
            className="text-gray-300 text-lg md:text-xl leading-relaxed text-center mb-10 max-w-4xl mx-auto"
          >
            Hello, I'm{" "}
            <span className="text-purple-400 font-semibold">
              Dipjyoti Ghosh
            </span>
            , a B.Tech CSE (AI & ML) student passionate about transforming ideas
            into intelligent and scalable digital experiences. I enjoy working
            at the intersection of full-stack development and machine learning,
            while continuously sharpening my skills by exploring modern
            technologies. As a dedicated Java-based DSA problem solver, I strive
            to turn complex challenges into efficient, user-centric
            applications, with a strong focus on growing into the IT industry
            and advancing towards AI and data science.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={textVariants}
            className="flex justify-center gap-5 mb-10 flex-wrap"
          >
            <Button
              onClick={() => {
                if (resumeUrl) {
                  window.open(resumeUrl, "_blank");
                }
              }}
              className="px-8 py-6 text-base bg-purple-600 hover:bg-zinc-800 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-3"
            >
              <Download size={20} />
              Download Resume
            </Button>

            <Button
              onClick={() => scrollToSection("portfolio")}
              variant="outline"
              className="px-8 py-6 text-base border-zinc-700 hover:bg-zinc-800 text-purple-700 hover:text-white flex items-center gap-3"
            >
              <Eye size={20} />
              View My Projects
            </Button>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {aboutStats.map((stat, index) => {
              const cardVariant =
                index === 0 ? leftCard : index === 1 ? middleCard : rightCard;

              return (
                <motion.div
                  key={stat._id}
                  onClick={() => handleCardClick(stat.redirectUrl)}
                  variants={cardVariant}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="rounded-2xl p-6 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 flex flex-col justify-between min-h-[180px] group cursor-pointer hover:border-purple-500/50 transition-all duration-2 shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-700/50 flex items-center justify-center bg-zinc-800/50 group-hover:ring-2 group-hover:ring-purple-500 transition-all duration-300">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/api/about-stats/image/${stat._id}`}
                        alt={stat.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-gray-600 group-hover:text-purple-400 transition-colors duration-2"
                    />
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-bold text-white">
                        {stat.value}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                      {stat.label}
                    </h4>
                    <p className="text-xs text-gray-400">{stat.subtitle}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
