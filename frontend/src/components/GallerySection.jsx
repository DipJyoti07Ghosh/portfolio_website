import React, { useEffect, useState } from "react";

const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/gallery`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Gallery data:", data);
        setGalleryImages(data);
      })
      .catch((err) => {
        console.error("Gallery error:", err);
      });
  }, []);

  // EXACT SAME LOOP LOGIC
  const loopImages = [...galleryImages, ...galleryImages];

  return (
    <section>

      {/* Background */}

      {/* Heading */}
      <div className="max-w-8xl mx-auto text-center mb-10">
        <h2
          className="text-5xl md:text-6xl font-bold tracking-tight"
          style={{
            background:
              "linear-gradient(180deg, #FFFFFF 0%, #A855F7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          My Gallery
        </h2>
      </div>

      {/* Viewport */}
      <div
        className="w-full relative"
        style={{
          overflow: "visible",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >

        {/* Track */}
        <div className="gallery-track flex gap-6 md:gap-8 py-24">

          {loopImages.map((item, i) => {

            /*
              IMPORTANT:

              item is now the MongoDB object.

              We don't use Google Drive URL directly.
              We ask your backend for the image.
            */

            const imageUrl =
              `${process.env.REACT_APP_API_URL}/api/gallery/image/${item._id}`;

            return (
              <div
                key={`${item._id}-${i}`}
                className="gallery-item"
              >

                {/* IMAGE WRAPPER */}
                <div className="image-wrapper">

                  <img
                    src={imageUrl}
                    alt={`gallery-${i}`}
                  />

                  {/* MIRROR */}
                  <div className="mirror">

                    <img
                      src={imageUrl}
                      alt=""
                    />

                  </div>
                </div>

                {/* HUD */}
                <div className="gallery-hud">
                  <span className="hud-label">
                    Project
                  </span>
                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* STYLES */}
      <style>{`

        .gallery-track {
          width: max-content;
          display: flex;
          animation: scroll3D 40s linear infinite;
        }

        .gallery-track:hover {
          animation-play-state: paused;
        }

        /* CARD */
        .gallery-item {
          width: 260px;
          height: 320px;
          flex-shrink: 0;
          position: relative;
          border-radius: 20px;
          overflow: visible;
          background: linear-gradient(
            to bottom,
            rgba(39,39,42,0.4),
            rgba(10,10,12,0.9)
          );
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.5s ease;
        }

        .gallery-item:hover {
          transform: translateY(-8px) scale(1.03);
          border-color: rgba(168,85,247,0.5);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        /* IMAGE WRAPPER */
        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: visible;
          border-radius: 20px;
        }

        .image-wrapper > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          transition: 0.6s;
          filter: grayscale(20%) brightness(0.85);
        }

        .gallery-item:hover > .image-wrapper > img {
          transform: scale(1.08);
          filter: grayscale(0%) brightness(1.05);
        }

        /* MIRROR */
        .mirror {
          position: absolute;
          top: 105%;
          left: 0;
          width: 100%;
          height: 45%;
          transform: scaleY(-1);
          pointer-events: none;

          -webkit-mask-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.3) 20%,
            rgba(0, 0, 0, 0) 50%
          );

          mask-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.3) 20%,
            rgba(0, 0, 0, 0) 50%
          );

          filter: blur(3px);
          opacity: 0.7;
        }

        .mirror img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
        }

        /* HUD */
        .gallery-hud {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 16px;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.8),
            transparent
          );
          opacity: 0;
          transition: 0.4s;
          border-radius: 20px;
        }

        .gallery-item:hover .gallery-hud {
          opacity: 1;
        }

        .hud-label {
          font-size: 0.7rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #a855f7;
        }

        /* SAME ANIMATION */
        @keyframes scroll3D {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .gallery-item {
            width: 180px;
            height: 240px;
          }
        }

      `}</style>

    </section>
  );
};

export default GallerySection;