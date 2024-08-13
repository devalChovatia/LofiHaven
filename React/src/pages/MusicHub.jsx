import React, { useEffect, useState } from 'react';
import backgroundGif from "../assets/Placeholder.gif";
import RadioStations from '../components/RadioStations';
import Request from '../components/Request';
import Clock from '../components/Clock';
import MusicPlayer from '../components/MusicPlayer';
import idleSong from "../../public/HomePage_Idle.mp3";
import Links from '../components/Links';
import { Maximize, Minimize } from 'lucide-react';

export default function MusicHub() {
    const [gif, setGif] = useState();
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const audio = new Audio(idleSong);
        audio.autoplay = true;
        audio.loop = true; 
        audio.play();
    
        return () => {
          audio.pause();
        };
      }, []);

    useEffect(() => {
        setGif(backgroundGif);
    }, []);

    const backgroundStyle = {
        backgroundImage: `url(${gif})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        width: '100%',
        position: 'relative',
    };

    const handleGifChange = (gif) => {
        setGif(gif);
    };

    const handleFullscreenToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    return (
        <div style={backgroundStyle} className="flex flex-col flex-wrap items-center justify-center p-4">
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-6 md:left-6 lg:top-5 lg:left-5 ">
                <RadioStations handleGifChange={handleGifChange}/>
                <Request />
            </div>
            <div className="text-white text-[30px] font-sawarabi absolute top-4 right-4">
                <Clock />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <MusicPlayer />
            </div>
            <div className='absolute bottom-12 right-12'>
                <Links />
            </div>
            <button 
                onClick={handleFullscreenToggle} 
                className="absolute md:bottom-4 sm:hidden md:right-4 md:p-2 md:transparent md:text-white md:rounded"
            >
                {isFullscreen ? <Minimize/> : <Maximize/>}
            </button>
        </div>
    );
}
