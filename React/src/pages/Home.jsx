import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import backgroundGif from "../assets/LandingPage.gif";
import { Link } from 'react-router-dom';
import idleSong from "../../public/HomePage_Idle.mp3";

export default function Example() {
  useEffect(() => {
    const audio = new Audio(idleSong);
    audio.autoplay = true;
    audio.loop = true; 
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundGif})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    height: '100vh', 
    width: '100%',
    position: 'relative',
    overflow: 'hidden' 
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}>
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-12 lg:left-12">
          <motion.div
            initial='hidden'
            animate='visible'
            variants={{ 
              hidden: {
                scale: 0.6,
                opacity: 0
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.6,
                  duration: 1
                }
              }
            }}
          >
            <h1 className="font-caveat font-semibold text-xl sm:text-2xl md:text-[40px] lg:text-[48px] 2xl:text-[70px] text-white">
              LofiHaven
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}  
          transition={{ delay: 2.0, duration: 1 }} 
          className="relative mt-4 sm:mt-8 md:mt-12 lg:mt-16"
        >
          <Link to='/musichub'>
            <button className="relative px-6 py-3 rounded-3xl sm:w-60 bg-transparent text-white border border-white hover:bg-opacity-20 hover:bg-white transition duration-300 z-10">
              Start Listening
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
