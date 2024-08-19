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
            <div className='flex flex-col text-center lg:flex-row md:text-left lg:justify-between px-5 pt-10 '>
                <h1 className="font-caveat font-semibold text-3xl md:text-[40px] lg:text-[48px] 2xl:text-[70px] text-white">
                LofiHaven
                </h1>
                <div className="md:text-3xl font-sawarabi sm:text-xl text-white">
                <Clock />
                </div>
                
            </div>
            <div className="border border-red-500">
                <RadioStations handleGifChange={handleGifChange}/>
            </div>
            {/* <div className='flex'>
                <div className="absolute bottom-16 left-4">
                    <Request />
                </div>
                <div className="absolute bottom-28 right-6 md:right-0">
                    <Links />
                </div>
                <div className='absolute bottom-4 border left-1/2 transform -translate-x-1/2 flex items-center justify-center w-full p-2'>
                    <div className="flex-grow flex justify-center">
                        <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                    </div>
                    <button 
                        onClick={handleFullscreenToggle} className="text-white rounded hidden sm:block ml-auto">
                        {isFullscreen ? <Minimize className='w-8 h-8'/> : <Maximize className='w-8 h-8'/>}
                    </button>
                </div>
            </div> */}
        </div>
    );
}
