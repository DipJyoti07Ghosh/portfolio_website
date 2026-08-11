import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProjectsTab from "./tabs/ProjectsTab";
import CertificatesTab from "./tabs/CertificatesTab";
import TechStackTab from "./tabs/TechStackTab";

import { techStack } from "../mock";

const PortfolioShowcase = () => {
  const [activeTab, setActiveTab] = useState("projects");

  // ==========================================
  // MONGODB DATA
  // ==========================================

  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  // ==========================================
  // FETCH PROJECTS + CERTIFICATES
  // ==========================================

  useEffect(() => {
    // Fetch Projects
    fetch(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        return res.json();
      })
      .then((data) => {
        console.log("Portfolio Projects:", data);
        setProjects(data);
      })
      .catch((err) => {
        console.error("Projects fetch error:", err);
      });

    // Fetch Certificates
    fetch(`${process.env.REACT_APP_API_URL}/api/certificates`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch certificates");
        }

        return res.json();
      })
      .then((data) => {
        console.log("Portfolio Certificates:", data);

        setCertificates(data);
      })
      .catch((err) => {
        console.error("Certificates fetch error:", err);
      });
  }, []);

  // ==========================================
  // TABS
  // ==========================================

  const tabs = [
    {
      id: "projects",
      label: "Projects",
      count: projects.length,
    },
    {
      id: "certificates",
      label: "Certificates",
      count: certificates.length,
    },
    {
      id: "techstack",
      label: "Tech Stack",
      count: techStack.length,
    },
  ];

  // ==========================================
  // TAB CONTENT
  // ==========================================

  const renderTabContent = () => {
    switch (activeTab) {
      case "projects":
        return <ProjectsTab />;

      case "certificates":
        return <CertificatesTab />;

      case "techstack":
        return <TechStackTab />;

      default:
        return null;
    }
  };

  return (
    <section id="portfolio">
      <div className="container mx-auto px-4">
        {/* TITLE */}

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
                    text-5xl
                    -top-5
                    md:text-6xl
                    font-bold
                    text-white
                    mb-3
                    text-center
                  "
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #A855F7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Portfolio Showcase
        </motion.h2>

        {/* SUBTITLE */}

        <motion.p
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="
                  text-gray-400
                  -top-30
                  mb-3
                  text-lg
                  text-center
                "
        >
          Explore my projects, certifications, and technical expertise
        </motion.p>

        {/* ======================================
            TABS
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-12"
        >
          <div className="flex justify-center">
            <div
              className="
              inline-flex
              p-1
              rounded-xl
              bg-zinc-900/40
              backdrop-blur-md
              border border-zinc-800/50
              relative
            "
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative
                    px-8
                    py-3
                    rounded-lg
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }
                  `}
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  {/* ACTIVE TAB BACKGROUND */}

                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-purple-600/80
                        to-purple-500/80
                        rounded-lg
                      "
                      style={{
                        boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  <span
                    className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-center
                  "
                  >
                    {tab.label}

                    {/* COUNT BADGE */}

                    <span
                      className="
                      absolute
                      top-0
                      right-0
                      -mt-2.5
                      -mr-4
                      w-4
                      h-4
                      text-xs
                      rounded-full
                      bg-white
                      text-purple-600
                      flex
                      items-center
                      justify-center
                      shadow
                    "
                    >
                      {tab.count}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ======================================
            TAB CONTENT
        ====================================== */}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
