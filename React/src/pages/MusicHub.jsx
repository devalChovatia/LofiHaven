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
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(new Audio(idleSong));

    useEffect(() => {
        const audioInstance = new Audio(idleSong);
        audioInstance.loop = true; 
        setAudio(audioInstance);

        return () => {
            audioInstance.pause();
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlaying, audio]);

    useEffect(() => {
        setGif(backgroundGif);
    }, []);

    const backgroundStyle = {
        backgroundImage: `url(${gif})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        width: '100%',

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
        <div style={backgroundStyle} className="">
            <div className='flex flex-col text-center md:flex-row md:text-left md:justify-between px-5 pt-10'>
                <h1 className="font-caveat font-semibold text-3xl md:text-[40px] lg:text-[48px] 2xl:text-[70px] text-white">
                LofiHaven
                </h1>
                <div className="md:text-xl font-sawarabi sm:text-xl text-white">
                <Clock />
                </div>
                
            </div>
            <div className='flex flex-col gap-6 xl:gap-20 xl:w-[275px]'>
                <div className="">
                    <RadioStations handleGifChange={handleGifChange}/>
                </div>
                <div className="">
                    <Request />
                </div>
            </div>
            <div className='absolute bottom-1 w-full p-2 flex flex-col md:flex-row items-center justify-between mt-5 gap-7 md:mt-[60px]'>
                <div className="md:ml-4">
                    <Links />
                </div>  
                    <div className="">
                    <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                </div>
                <button onClick={handleFullscreenToggle} className=" text-white rounded hidden sm:block">
                    {isFullscreen ? <Minimize className='w-6 h-6 xl:w-8 xl:h-8'/> : <Maximize className='w-6 h-6 xl:w-8 xl:h-8' />}
                </button>  
                
            </div>

                {/* mt-5 mr-5 text-white rounded hidden sm:block ml-auto */}


            </div>
    );
}
