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
        <div style={backgroundStyle} className="flex flex-col justify-between p-4">
            <header className="flex justify-between items-start mb-4">
                <div className="mt-4">
                    <RadioStations handleGifChange={handleGifChange}/>
                </div>
                <div className="text-white sm:text-[15px] md:text-[25px] lg:text-[25px] xl:text-[27px] font-sawarabi">
                    <Clock />
                </div>
            </header>
            <div className="">
                <Request />
            </div>    
         
            <div className="mt-5 mr-[200px] md:ml-[400px] md:w-[500px] md:-mt-48 lg:ml-[650px] xl:ml-[1100px] 2xl:ml-[1550px]">
                    <Links />
            </div>
            <div className='flex gap-20 md:gap-[250px] lg:gap-[330px] xl:gap-[550px] 2xl:gap-[740px] items-center md:mb-6 '>
                <div className="ml-12 md:ml-[35%] lg:ml-[42%] xl:ml-[45%] 2xl:ml-[47%]">
                    <MusicPlayer />
                </div>
                <button 
                    onClick={handleFullscreenToggle} 
                    className="p-2 transparent text-white rounded hidden sm:block " 
                >
                    {isFullscreen ? <Minimize className='w-8 h-8'/> : <Maximize className='w-8 h-8'/>}
                </button>
            </div>
        </div>
    );
}
