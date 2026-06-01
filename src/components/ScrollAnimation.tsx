/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { Diamond } from "lucide-react";

const FRAME_FILES = [
  ...Array.from({ length: 25 }, (_, i) => (i + 1).toString().padStart(2, '0') + '.webp'),
  ...Array.from({ length: 11 }, (_, i) => (i + 40).toString().padStart(2, '0') + '.webp')
];

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 0.95) to frame index (0 to FRAME_FILES.length - 1)
  const frameIndex = useTransform(scrollYProgress, [0, 0.95], [0, FRAME_FILES.length - 1]);

  const drawImage = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    
    if (canvas && img && img.complete && img.naturalWidth > 0) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const { clientWidth, clientHeight } = canvas.parentElement || window;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR to prevent lag
        
        if (canvas.width !== Math.floor(clientWidth * dpr)) {
          canvas.width = Math.floor(clientWidth * dpr);
          canvas.style.width = `${clientWidth}px`;
        }
        if (canvas.height !== Math.floor(clientHeight * dpr)) {
          canvas.height = Math.floor(clientHeight * dpr);
          canvas.style.height = `${clientHeight}px`;
        }
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
        
        const isMobile = window.innerWidth < 768;
        
        let scale;
        if (isMobile) {
            scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        } else {
            scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        }
        
        const x = (canvas.width / 2) - (img.naturalWidth / 2) * scale;
        const y = (canvas.height / 2) - (img.naturalHeight / 2) * scale;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.6;
        ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
      }
    }
  }, []);

  const rafRef = useRef<number | null>(null);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (imagesLoaded) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      const index = Math.min(Math.max(Math.round(latest), 0), FRAME_FILES.length - 1);
      rafRef.current = requestAnimationFrame(() => drawImage(index));
    }
  });

  // Pre-load images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    FRAME_FILES.forEach((filename, i) => {
      const img = new Image();
      img.src = `/${filename}`;
      
      const handleLoad = () => {
        loadedCount++;
        if (loadedCount === FRAME_FILES.length) {
          setImagesLoaded(true);
          setTimeout(() => drawImage(0), 50);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad;
      images[i] = img;
    });
  }, [drawImage]);

  // Handle resize updates
  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded) {
        requestAnimationFrame(() => drawImage(Math.round(frameIndex.get())));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded, drawImage, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#05161E]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* The Animation Frame */}
        <div className="relative w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ opacity: imagesLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
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
