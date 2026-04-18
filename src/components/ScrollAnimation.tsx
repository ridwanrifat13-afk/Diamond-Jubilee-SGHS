/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Diamond } from "lucide-react";

const FRAME_FILES = [
  ...Array.from({ length: 25 }, (_, i) => (i + 1).toString().padStart(2, '0') + '.webp'),
  ...Array.from({ length: 11 }, (_, i) => (i + 40).toString().padStart(2, '0') + '.webp')
];

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 0.95) to frame index (0 to FRAME_FILES.length - 1)
  const frameIndex = useTransform(scrollYProgress, [0, 0.95], [0, FRAME_FILES.length - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.min(Math.max(Math.round(latest), 0), FRAME_FILES.length - 1);
    if (index !== currentFrameIndex) {
      setCurrentFrameIndex(index);
    }
  });

  // Pre-load images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    
    // Safety timeout
    const timeout = setTimeout(() => {
      if (!imagesLoaded) {
        setImagesLoaded(true);
      }
    }, 5000);

    FRAME_FILES.forEach((filename) => {
      const img = new Image();
      img.src = `/${filename}`;
      
      const handleLoad = () => {
        loadedCount++;
        if (loadedCount === FRAME_FILES.length) {
          setImagesLoaded(true);
          clearTimeout(timeout);
        }
      };

      img.onload = handleLoad;
      img.onerror = () => {
        handleLoad();
      };
      images.push(img);
    });
    
    return () => clearTimeout(timeout);
  }, []);

  const frameFilename = FRAME_FILES[currentFrameIndex];

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#05161E]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* The Animation Frame */}
        <div className="relative w-full h-full">
          <img
            src={`/${frameFilename}`}
            alt={`Frame ${currentFrameIndex + 1}`}
            className="h-full w-full object-contain md:object-cover opacity-60"
            style={{ opacity: imagesLoaded ? 0.6 : 0 }}
            referrerPolicy="no-referrer"
          />
          
          {!imagesLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold bg-[#05161E]">
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Diamond size={64} className="text-[#1D4D5F]" />
                </motion.div>
                <div className="space-y-2 text-center">
                  <p className="text-2xl tracking-widest uppercase">Diamond Jubilee</p>
                  <p className="text-[#609194] animate-pulse">Loading Anniversary Experience...</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Overlay Content - Staggered based on scroll */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
          <motion.div 
            className="max-w-4xl text-center space-y-4 md:space-y-8"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
              scale: useTransform(scrollYProgress, [0, 0.2], [0.8, 1])
            }}
          >
            <h2 className="text-xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
              A LEGACY OF <span className="text-[#609194]">EXCELLENCE</span>
            </h2>
            <p className="text-xs md:text-2xl text-gray-100 font-medium leading-relaxed drop-shadow-lg">
              Celebrating 60 years of nurturing minds and building futures at Shiroil Govt. High School, Rajshahi.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 pt-4 md:pt-10">
              {[
                { year: "1967", event: "Foundation" },
                { year: "1992", event: "Silver Jubilee" },
                { year: "2017", event: "Golden Jubilee" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-2 md:p-6 bg-black/20 backdrop-blur-sm rounded-lg md:rounded-2xl border border-white/10">
                  <span className="text-lg md:text-4xl font-black text-[#609194]">{item.year}</span>
                  <span className="text-[8px] md:text-xs font-bold text-gray-300 uppercase tracking-widest mt-0.5 md:mt-2">{item.event}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
