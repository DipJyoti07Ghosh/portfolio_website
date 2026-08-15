import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { Button } from "../ui/button";

const CertificatesTab = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // DRAG SCROLL
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

  const displayedCertificates = showAll
    ? certificates
    : certificates.slice(0, 3);

  // FETCH CERTIFICATES
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/certificates`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Certificates:", data);
        setCertificates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      {/* ============================= */}
      {/* CERTIFICATE GRID / SLIDER */}
      {/* ============================= */}

      <motion.div
        ref={scrollRef}
        layout
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="
          flex lg:grid
          overflow-x-auto lg:overflow-visible
          gap-6
          lg:grid-cols-3
          pb-2 px-2
          snap-x snap-mandatory scroll-smooth
          cursor-grab active:cursor-grabbing
        "
      >
        {displayedCertificates.map((cert) => (
          <motion.div
            key={cert._id}
            layoutId={`card-${cert._id}`}
            whileHover={{
              y: -4,
              scale: 1.01,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 15,
            }}
            className="
              min-w-[75%] sm:min-w-[55%] md:min-w-[45%] lg:min-w-0
              bg-zinc-900 rounded-xl overflow-hidden
              cursor-pointer snap-center
            "
            onClick={() => {
              setSelectedCert(cert);
              setIsFlipped(false);
            }}
          >
            {/* 2:1 IMAGE CONTAINER */}
            <div
              className="
                relative
                w-full
                aspect-[2/1]
                bg-zinc-950
                overflow-hidden
              "
            >
              <img
                src={`${process.env.REACT_APP_API_URL}/api/certificates/image/${cert._id}`}
                alt={cert.title}
                loading="lazy"
                className="
                  w-full
                  h-full
                  object-contain
                  block
                "
              />
            </div>

            {/* CARD DETAILS */}
            <div className="p-4">
              <h3 className="text-white font-bold">
                {cert.title}
              </h3>

              <p className="text-purple-400 text-sm">
                {cert.issuer}
              </p>

              <p className="text-gray-500 text-sm">
                {cert.date}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ============================= */}
      {/* SHOW MORE */}
      {/* ============================= */}

      <div className="text-center mt-2 mb-20">
        <Button
          onClick={() => setShowAll(!showAll)}
          className="hover:bg-gray-600"
        >
          {showAll ? "Show Less" : "Show More"}

          <ChevronDown
            className={`ml-2 transition-transform ${
              showAll ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      {/* ============================= */}
      {/* MODAL */}
      {/* ============================= */}

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="
              fixed inset-0
              bg-black/80
              backdrop-blur-md
              z-50
              flex
              items-center
              justify-center
              p-4
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            {/* CLOSE BUTTON */}
            <button
              className="
                absolute
                top-6
                right-6
                text-white
                z-50
                hover:text-purple-400
                transition
              "
              onClick={() => setSelectedCert(null)}
            >
              <X size={28} />
            </button>

            {/* MODAL CARD */}
            <motion.div
              layoutId={`card-${selectedCert._id}`}
              className="
                w-[95%]
                max-w-5xl
                max-h-[90vh]
                rounded-2xl
                overflow-hidden
              "
              style={{
                perspective: "1000px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative w-full min-h-[500px]"
                animate={{
                  rotateY: isFlipped ? 180 : 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* ============================= */}
                {/* FRONT */}
                {/* ============================= */}

                <div
                  className="
                    absolute
                    inset-0
                    w-full
                    bg-zinc-900
                    rounded-2xl
                    overflow-hidden
                  "
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                  onClick={() => setIsFlipped(true)}
                >
                  {/* 2:1 CERTIFICATE IMAGE */}

                  <div
                    className="
                      relative
                      w-full
                      aspect-[2/1]
                      bg-black
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/certificates/image/${selectedCert._id}`}
                      alt={selectedCert.title}
                      className="
                        w-full
                        h-full
                        object-contain
                      "
                    />
                  </div>

                  {/* DETAILS */}

                  <div
                    className="
                      p-5
                      flex
                      flex-col
                      justify-between
                      min-h-[160px]
                    "
                  >
                    <div>
                      <h2 className="text-xl text-white font-bold">
                        {selectedCert.title}
                      </h2>

                      <p className="text-purple-400">
                        {selectedCert.issuer}
                      </p>

                      <p className="text-gray-400">
                        {selectedCert.date}
                      </p>
                    </div>

                    <div
                      className="
                        w-full
                        py-2
                        mt-4
                        text-center
                        rounded-lg
                        bg-purple-600
                        text-white
                        font-semibold
                        cursor-pointer
                        hover:bg-purple-700
                        transition
                      "
                    >
                      View More
                    </div>
                  </div>
                </div>

                {/* ============================= */}
                {/* BACK */}
                {/* ============================= */}

                <div
                  className="
                    absolute
                    inset-0
                    w-full
                    min-h-[500px]
                    rounded-2xl
                    p-6
                    backdrop-blur-lg
                    bg-white/10
                    border
                    border-white/20
                  "
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                  onClick={() => setIsFlipped(false)}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl text-white font-bold mb-2">
                        {selectedCert.title}
                      </h2>

                      <p className="text-purple-300">
                        {selectedCert.issuer}
                      </p>

                      <p className="text-gray-300 mb-4">
                        {selectedCert.date}
                      </p>

                      <p className="text-gray-200 text-sm leading-relaxed">
                        {selectedCert.description}
                      </p>
                    </div>

                    <div
                      className="
                        w-full
                        py-2
                        text-center
                        rounded-lg
                        bg-purple-600
                        text-white
                        font-semibold
                        cursor-pointer
                        hover:bg-purple-700
                        transition
                      "
                    >
                      Go Back
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificatesTab;