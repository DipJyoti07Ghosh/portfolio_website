import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [flippedProject, setFlippedProject] = useState(null);

  // ==========================================
  // DRAG SCROLL
  // ==========================================

  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // ==========================================
  // FETCH PROJECTS FROM BACKEND
  // ==========================================

  useEffect(() => {
    console.log("API URL =", process.env.REACT_APP_API_URL);
    fetch(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Projects:", data);
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ==========================================
  // SHOW MORE / SHOW LESS
  // ==========================================

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  // ==========================================
  // ANIMATIONS
  // ==========================================

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: (index) => {
      if (index % 3 === 0) {
        return {
          opacity: 0,
          x: -80,
        };
      }
      if (index % 3 === 1) {
        return {
          opacity: 0,
          y: 80,
        };
      }
      return {
        opacity: 0,
        x: 80,
      };
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
      },
    },
  };

  // ==========================================
  // FLIP CARD
  // ==========================================

  const handleCardClick = (projectId) => {
    setFlippedProject(flippedProject === projectId ? null : projectId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      {/* ======================================
          PROJECT GRID / MOBILE SLIDER
      ====================================== */}

      <motion.div
        ref={scrollRef}
        key={showAll ? "all" : "less"}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{
          once: false,
          margin: "-100px",
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="
          flex lg:grid
          flex-row lg:flex-none
          overflow-x-auto lg:overflow-visible
          gap-6
          lg:grid-cols-3
          pb-2 px-2
          snap-x snap-mandatory
          scroll-smooth
          cursor-grab
          active:cursor-grabbing
        "
      >
        {displayedProjects.map((project, index) => {
          const isFlipped = flippedProject === project._id;

          return (
            <motion.div
              key={project._id}
              custom={index}
              variants={itemVariants}
              whileHover={
                !isFlipped
                  ? {
                      y: -5,
                      rotateX: 5,
                      rotateY: -5,
                      scale: 1.01,
                    }
                  : {}
              }
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              style={{
                perspective: "1000px",
              }}
              className="
                  min-w-[75%]
                  sm:min-w-[55%]
                  md:min-w-[45%]
                  lg:min-w-0
                  h-[520px]
                  snap-center
                "
            >
              {/* =================================
                    FLIP CONTAINER
                ================================= */}

              <motion.div
                className="
                    relative
                    w-full
                    h-full
                    cursor-pointer
                  "
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateY: isFlipped ? 180 : 0,
                }}
                transition={{
                  duration: 0.6,
                }}
                onClick={() => handleCardClick(project._id)}
              >
                {/* =================================
                      FRONT
                  ================================= */}

                <div
                  className="
                      absolute
                      inset-0
                      group
                      rounded-2xl
                      overflow-hidden
                      bg-zinc-900/40
                      backdrop-blur-md
                      border border-zinc-800/50
                      flex flex-col
                    "
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      h-64
                      overflow-hidden
                    "
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/projects/image/${project._id}`}
                      alt={project.title}
                      className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-110
                        "
                    />
                  </div>

                  {/* CONTENT */}

                  <div
                    className="
                      p-6
                      flex
                      flex-col
                      flex-grow
                    "
                  >
                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-white
                        mb-3
                      "
                    >
                      {project.title}
                    </h3>

                    <p
                      className="
                        text-gray-400
                        mb-4
                        line-clamp-2
                      "
                    >
                      {project.description}
                    </p>

                    {/* TECHNOLOGIES */}

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-2
                        mb-4
                      "
                    >
                      {project.technologies?.map((tech, idx) => (
                        <span
                          key={idx}
                          className="
                                px-3
                                py-1
                                rounded-full
                                bg-purple-500/10
                                border
                                border-purple-500/20
                                text-xs
                                text-purple-300
                              "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* BUTTONS: Stacked vertically on mobile, side-by-side on larger screens */}

                    <div
                      className="
                          mt-auto
                          flex
                          flex-col sm:flex-row
                          gap-3
                        "
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* LIVE DEMO */}

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();

                          if (project.liveDemo) {
                            window.open(
                              project.liveDemo,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          }
                        }}
                        className="
                            w-full sm:flex-1
                            bg-purple-600
                            text-white
                            hover:bg-zinc-600
                          "
                      >
                        <ExternalLink
                          className="
                              w-4 h-4
                              mr-2
                            "
                        />
                        Live Demo
                      </Button>

                      {/* GITHUB */}

                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();

                          if (project.github) {
                            window.open(
                              project.github,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          }
                        }}
                        className="
                            w-full sm:flex-1
                            border-zinc-700
                            text-purple-700
                            hover:bg-zinc-600
                          "
                      >
                        <FaGithub
                          className="
                              w-4 h-4
                              mr-2
                            "
                        />
                        GitHub
                      </Button>
                    </div>

                    {/* FLIP HINT */}

                    <p
                      className="
                        text-center
                        text-xs
                        text-gray-500
                        mt-3
                      "
                    >
                      Click card to view description
                    </p>
                  </div>
                </div>

                {/* =================================
                      BACK
                  ================================= */}

                <div
                  className="
                      absolute
                      inset-0
                      rounded-2xl
                      overflow-hidden
                      p-6
                      backdrop-blur-lg
                      bg-white/10
                      border border-white/20
                      flex
                      flex-col
                      justify-between
                    "
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div>
                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-white
                        mb-4
                      "
                    >
                      {project.title}
                    </h3>

                    <div
                      className="
                        w-12
                        h-1
                        bg-purple-500
                        rounded-full
                        mb-6
                      "
                    />

                    {/* FULL DESCRIPTION */}

                    <p
                      className="
                        text-gray-200
                        leading-relaxed
                        text-sm
                      "
                    >
                      {project.description}
                    </p>

                    {/* TECHNOLOGIES */}

                    <div className="mt-6">
                      <h4
                        className="
                          text-white
                          font-semibold
                          mb-3
                        "
                      >
                        Technologies
                      </h4>

                      <div
                        className="
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        {project.technologies?.map((tech, idx) => (
                          <span
                            key={idx}
                            className="
                                  px-3
                                  py-1
                                  rounded-full
                                  bg-purple-500/10
                                  border
                                  border-purple-500/20
                                  text-xs
                                  text-purple-300
                                "
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* FLIP HINT (Consistent with front side) */}

                  <p
                    className="
                      text-center
                      text-xs
                      text-gray-400
                      mt-3
                    "
                  >
                    Click card to flip back
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ======================================
          SHOW MORE
      ====================================== */}

      {projects.length > 3 && (
        <div className="text-center mt-2 mb-20">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="hover:bg-purple-300"
          >
            {showAll ? "Show Less" : "Show More"}

            <ChevronDown
              className={`
                ml-2
                transition-transform
                ${showAll ? "rotate-180" : ""}
              `}
            />
          </Button>
        </div>
      )}
    </>
  );
};

export default ProjectsTab;